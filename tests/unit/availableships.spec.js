import { mount } from '@vue/test-utils';
import AvailableShips from '../../src/components/AvailableShips.vue';

describe('AvailableShips.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(AvailableShips);

    expect(wrapper.find('h1').exists()).toBe(true);

    expect(wrapper.html()).toContain('Champs Elysees');
  
  }),
  it('exports the component as default', () => {
    expect(AvailableShips).toEqual(expect.objectContaining({
      name: 'AvailableShips',  
    }));
})
})