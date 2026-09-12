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
    expect(wrapper.text()).toContain('0 dari 0 selesai (0%)')
  })

  it('adds a new task with custom category and priority, saving to localStorage', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    const wrapper = mount(TodoView, stubOptions)

    expect(wrapper.findAll('.task-item').length).toBe(0)

    const input = wrapper.find('.task-input')
    const categorySelect = wrapper.find('#category-select')
    const prioritySelect = wrapper.find('#priority-select')

    await input.setValue('Belajar Vitest dan CI/CD')
    await categorySelect.setValue('Belajar')
    await prioritySelect.setValue('Tinggi')
    await wrapper.find('.task-form').trigger('submit')

    const items = wrapper.findAll('.task-item')
    expect(items.length).toBe(1)
    expect(wrapper.text()).toContain('Belajar Vitest dan CI/CD')
    expect(wrapper.find('.badge-category').text()).toBe('Belajar')
    expect(wrapper.find('.priority-tinggi').text()).toBe('Tinggi')
    expect(setItemSpy).toHaveBeenCalled()

    // Verify localStorage item payload
    const stored = JSON.parse(localStorage.getItem('taskflow_todos_v1'))
    expect(stored.length).toBe(1)
    expect(stored[0].title).toBe('Belajar Vitest dan CI/CD')
    expect(stored[0].category).toBe('Belajar')
    expect(stored[0].priority).toBe('Tinggi')
    expect(stored[0].completed).toBe(false)
  })

  it('does not add a task if title is empty or only whitespace', async () => {
    const wrapper = mount(TodoView, stubOptions)

    const input = wrapper.find('.task-input')
    await input.setValue('   ')
    await wrapper.find('.task-form').trigger('submit')

    expect(wrapper.findAll('.task-item').length).toBe(0)
  })

  it('toggles task completion and updates progress bar', async () => {
    const wrapper = mount(TodoView, stubOptions)

    // Add a task
    const input = wrapper.find('.task-input')
    await input.setValue('Tugas untuk diceklis')
    await wrapper.find('.task-form').trigger('submit')

    const taskItem = wrapper.find('.task-item')
    expect(taskItem.classes()).not.toContain('completed')
    expect(wrapper.text()).toContain('0 dari 1 selesai (0%)')

    // Toggle checkbox
    const checkbox = taskItem.find('input[type="checkbox"]')
    await checkbox.trigger('change')

    expect(taskItem.classes()).toContain('completed')
    expect(wrapper.text()).toContain('1 dari 1 selesai (100%)')

    // Untoggle
    await checkbox.trigger('change')
    expect(taskItem.classes()).not.toContain('completed')
    expect(wrapper.text()).toContain('0 dari 1 selesai (0%)')
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

    // Filter "Semua"
    await filterBtns[0].trigger('click')
    displayed = wrapper.findAll('.task-item')
    expect(displayed.length).toBe(2)
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
    expect(remaining[0].text()).toContain('Tugas Tetap')
  })

  it('loads previously saved tasks from localStorage correctly', () => {
    const savedData = [
      {
        id: 'saved-1',
        title: 'Tugas Tersimpan Sebelumnya',
        category: 'Pekerjaan',
        priority: 'Tinggi',
        completed: false,
        createdAt: '12/09/2026',
      },
      {
        id: 'saved-2',
        title: 'Tugas yang Sudah Selesai',
        category: 'Pribadi',
        priority: 'Rendah',
        completed: true,
        createdAt: '12/09/2026',
      },
    ]
    localStorage.setItem('taskflow_todos_v1', JSON.stringify(savedData))

    const wrapper = mount(TodoView, stubOptions)
    expect(wrapper.findAll('.task-item').length).toBe(2)
    expect(wrapper.text()).toContain('Tugas Tersimpan Sebelumnya')
    expect(wrapper.text()).toContain('Tugas yang Sudah Selesai')
    expect(wrapper.text()).toContain('1 dari 2 selesai (50%)')
  })

  it('handles invalid or corrupted localStorage data gracefully', () => {
    localStorage.setItem('taskflow_todos_v1', 'corrupted JSON string {')

    const wrapper = mount(TodoView, stubOptions)
    expect(wrapper.findAll('.task-item').length).toBe(0)
    expect(wrapper.find('.empty-state').exists()).toBe(true)
  })
})
