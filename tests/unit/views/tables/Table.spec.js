import Vue from 'vue'
import { mount, shallowMount } from '@vue/test-utils';
import CoreuiVue from '@coreui/vue'
import Table from '@/views/tables/Table'

Vue.use(CoreuiVue)

describe('Table.vue', () => {
  it('has a name', () => {
    expect(Table.name).toMatch('Table')
  })
  it('is Vue instance', () => {
    const wrapper = mount(Table)
    expect(wrapper.isVueInstance()).toBe(true)
  })
  test('renders correctly', () => {
    const wrapper = shallowMount(Table)
    expect(wrapper.element).toMatchSnapshot()
  })
})
