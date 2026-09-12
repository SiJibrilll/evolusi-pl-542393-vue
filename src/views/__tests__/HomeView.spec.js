import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'

describe('HomeView', () => {
  it('renders brand and Indonesian hero title', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    expect(wrapper.find('.brand-name').text()).toBe('TaskFlow')
    expect(wrapper.find('.hero-title').text()).toBe(
      'Kelola tugas harian jadi lebih mudah dan teratur.',
    )
  })

  it('renders 4 core feature cards with simple descriptions', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    const cards = wrapper.findAll('.feature-card')
    expect(cards.length).toBe(4)
    expect(wrapper.text()).toContain('Catat Cepat')
    expect(wrapper.text()).toContain('Kategori Tugas')
    expect(wrapper.text()).toContain('Tingkat Prioritas')
    expect(wrapper.text()).toContain('Pantau Selesai')
  })

  it('renders 3 simple workflow steps', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    const steps = wrapper.findAll('.step-card')
    expect(steps.length).toBe(3)
    expect(wrapper.text()).toContain('Catat')
    expect(wrapper.text()).toContain('Urutkan')
    expect(wrapper.text()).toContain('Selesaikan')
  })

  it('contains call-to-action buttons', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    expect(wrapper.text()).toContain('Mulai Sekarang')
  })
})
