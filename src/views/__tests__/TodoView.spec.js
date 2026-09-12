import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoView from '../TodoView.vue'

const stubOptions = {
  global: {
    stubs: {
      RouterLink: {
        template: '<a><slot /></a>',
      },
    },
  },
}

describe('TodoView', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('renders a fresh empty page with empty state message at start', () => {
    const wrapper = mount(TodoView, stubOptions)

    expect(wrapper.find('.page-title').text()).toBe('Daftar Tugas Saya')
    expect(wrapper.findAll('.task-item').length).toBe(0)
    expect(wrapper.find('.empty-state').exists()).toBe(true)
    expect(wrapper.text()).toContain('Belum Ada Tugas')
  })

  it('adds a new task and saves to localStorage', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    const wrapper = mount(TodoView, stubOptions)

    expect(wrapper.findAll('.task-item').length).toBe(0)

    const input = wrapper.find('.task-input')
    await input.setValue('Tugas Baru Untuk Diuji')
    await wrapper.find('.task-form').trigger('submit')

    const items = wrapper.findAll('.task-item')
    expect(items.length).toBe(1)
    expect(wrapper.text()).toContain('Tugas Baru Untuk Diuji')
    expect(setItemSpy).toHaveBeenCalled()
  })

  it('toggles task completion when checkbox changes', async () => {
    const wrapper = mount(TodoView, stubOptions)

    // Add a task
    const input = wrapper.find('.task-input')
    await input.setValue('Tugas untuk diceklis')
    await wrapper.find('.task-form').trigger('submit')

    const taskItem = wrapper.find('.task-item')
    expect(taskItem.classes()).not.toContain('completed')

    const checkbox = taskItem.find('input[type="checkbox"]')
    await checkbox.trigger('change')

    expect(taskItem.classes()).toContain('completed')
  })

  it('deletes a task when clicking delete button', async () => {
    const wrapper = mount(TodoView, stubOptions)

    // Add a task
    const input = wrapper.find('.task-input')
    await input.setValue('Tugas untuk dihapus')
    await wrapper.find('.task-form').trigger('submit')

    expect(wrapper.findAll('.task-item').length).toBe(1)

    const deleteBtn = wrapper.find('.btn-delete')
    await deleteBtn.trigger('click')

    expect(wrapper.findAll('.task-item').length).toBe(0)
    expect(wrapper.find('.empty-state').exists()).toBe(true)
  })

  it('filters tasks by active and completed status', async () => {
    const wrapper = mount(TodoView, stubOptions)

    // Add task 1 (active)
    const input = wrapper.find('.task-input')
    await input.setValue('Tugas 1')
    await wrapper.find('.task-form').trigger('submit')

    // Add task 2 (will complete)
    await input.setValue('Tugas 2')
    await wrapper.find('.task-form').trigger('submit')

    // Mark task 2 completed
    const items = wrapper.findAll('.task-item')
    await items[0].find('input[type="checkbox"]').trigger('change')

    const filterBtns = wrapper.findAll('.filter-btn')

    // Filter "Aktif"
    await filterBtns[1].trigger('click')
    let displayed = wrapper.findAll('.task-item')
    expect(displayed.length).toBe(1)
    expect(displayed[0].classes()).not.toContain('completed')

    // Filter "Selesai"
    await filterBtns[2].trigger('click')
    displayed = wrapper.findAll('.task-item')
    expect(displayed.length).toBe(1)
    expect(displayed[0].classes()).toContain('completed')
  })

  it('clears completed tasks when Hapus Selesai is clicked', async () => {
    const wrapper = mount(TodoView, stubOptions)

    // Add task 1 (active)
    const input = wrapper.find('.task-input')
    await input.setValue('Tugas Tetap')
    await wrapper.find('.task-form').trigger('submit')

    // Add task 2 (completed)
    await input.setValue('Tugas Selesai')
    await wrapper.find('.task-form').trigger('submit')

    const items = wrapper.findAll('.task-item')
    await items[0].find('input[type="checkbox"]').trigger('change')

    const clearBtn = wrapper.find('.btn-clear')
    expect(clearBtn.exists()).toBe(true)
    await clearBtn.trigger('click')

    // Only active task remains
    const remaining = wrapper.findAll('.task-item')
    expect(remaining.length).toBe(1)
    expect(remaining[0].classes()).not.toContain('completed')
  })

  it('loads previously saved tasks from localStorage', () => {
    const savedData = [
      {
        id: 'saved-1',
        title: 'Tugas Tersimpan Sebelumnya',
        category: 'Pekerjaan',
        priority: 'Tinggi',
        completed: false,
        createdAt: '12/09/2026',
      },
    ]
    localStorage.setItem('taskflow_todos_v1', JSON.stringify(savedData))

    const wrapper = mount(TodoView, stubOptions)
    expect(wrapper.findAll('.task-item').length).toBe(1)
    expect(wrapper.text()).toContain('Tugas Tersimpan Sebelumnya')
  })
})
