import { describe, it, expect } from 'vitest'
import router from '../index.js'

describe('Router', () => {
  it('has routes for home and todos', () => {
    const routeNames = router.getRoutes().map((r) => r.name)
    expect(routeNames).toContain('home')
    expect(routeNames).toContain('todos')
  })

  it('navigates to / route', async () => {
    await router.push('/')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('navigates to /todos route', async () => {
    await router.push('/todos')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/todos')
    expect(router.currentRoute.value.name).toBe('todos')
  })
})
