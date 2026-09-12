import process from 'node:process'
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const distAssetsDir = './dist/assets'
const readmePath = './README.md'

if (!fs.existsSync(distAssetsDir)) {
  console.error(`Directory ${distAssetsDir} does not exist. Run "npm run build" first.`)
  process.exit(1)
}

if (!fs.existsSync(readmePath)) {
  console.error(`File ${readmePath} does not exist.`)
  process.exit(1)
}

const files = fs.readdirSync(distAssetsDir)
let totalRaw = 0
let totalGzip = 0

const rows = []

for (const file of files) {
  const filePath = path.join(distAssetsDir, file)
  const stat = fs.statSync(filePath)
  if (!stat.isFile()) continue

  const content = fs.readFileSync(filePath)
  const gzipped = zlib.gzipSync(content)

  totalRaw += stat.size
  totalGzip += gzipped.length

  const rawKb = (stat.size / 1024).toFixed(2) + ' KB'
  const gzipKb = (gzipped.length / 1024).toFixed(2) + ' KB'

  let desc = 'Aset Produksi'
  if (file.endsWith('.js')) {
    desc = file.startsWith('index-') ? 'Bundel Utama (Core JS)' : 'Lazy Route JS'
  } else if (file.endsWith('.css')) {
    desc = file.startsWith('index-') ? 'Style Global & Landing' : 'Scoped CSS'
  }

  rows.push({ file, desc, rawKb, gzipKb })
}

// Sort alphabetically by filename
rows.sort((a, b) => a.file.localeCompare(b.file))

const totalRawKb = (totalRaw / 1024).toFixed(2) + ' KB'
const totalGzipKb = (totalGzip / 1024).toFixed(2) + ' KB'

let table = `<!-- BUNDLE_SIZE_START -->\n`
table += `| Asset | Deskripsi | Ukuran (Raw) | Gzipped |\n`
table += `| --- | --- | --- | --- |\n`
for (const r of rows) {
  table += `| \`${r.file}\` | ${r.desc} | ${r.rawKb} | ${r.gzipKb} |\n`
}
table += `| **Total Dist** | **Seluruh Aset Produksi** | **${totalRawKb}** | **${totalGzipKb}** |\n`
table += `<!-- BUNDLE_SIZE_END -->`

let readme = fs.readFileSync(readmePath, 'utf8')
const regex = /<!-- BUNDLE_SIZE_START -->[\s\S]*?<!-- BUNDLE_SIZE_END -->/

if (regex.test(readme)) {
  readme = readme.replace(regex, table)
  fs.writeFileSync(readmePath, readme, 'utf8')
  console.log('✅ README.md successfully updated with latest live bundle size table.')
} else {
  console.warn('⚠️ Could not find <!-- BUNDLE_SIZE_START --> delimiters in README.md')
}

// Log to console
console.log('\n=== 📦 Latest Live Bundle Sizes ===')
for (const r of rows) {
  console.log(`${r.file.padEnd(30)} ${r.rawKb.padStart(10)} (gzip: ${r.gzipKb})`)
}
console.log(`Total Build: ${totalRawKb} (gzip: ${totalGzipKb})\n`)

// Append to GitHub Actions step summary if running in CI
if (process.env.GITHUB_STEP_SUMMARY) {
  const summary = `### 📦 Live Bundle Size Summary\n\n${table}\n`
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary, 'utf8')
}
