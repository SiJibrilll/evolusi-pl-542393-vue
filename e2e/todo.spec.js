import { test, expect } from '@playwright/test'

test.describe('To-Do Feature E2E', () => {
  test('navigates from home to todos and completes a task flow', async ({ page }) => {
    // 1. Start from home page
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Kelola tugas harian')

    // 2. Click "Mulai Sekarang" link
    await page.locator('.hero-buttons a:has-text("Mulai Sekarang")').click()
    await expect(page).toHaveURL(/.*todos/)
    await expect(page.locator('h1')).toHaveText('Daftar Tugas Saya')

    // 3. Add a new task
    const input = page.locator('.task-input')
    await input.fill('Tugas E2E Playwright')
    await page.locator('button[type="submit"]').click()

    // 4. Verify task appears
    const taskItem = page.locator('.task-item').first()
    await expect(taskItem).toContainText('Tugas E2E Playwright')

    // 5. Toggle task completion
    const checkbox = taskItem.locator('input[type="checkbox"]')
    await checkbox.check()
    await expect(taskItem).toHaveClass(/completed/)

    // 6. Delete task
    await page.locator('.btn-delete').first().click()
    await expect(page.locator('.empty-state')).toBeVisible()
  })
})
