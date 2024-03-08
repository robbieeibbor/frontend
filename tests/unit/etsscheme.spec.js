import { mount } from '@vue/test-utils';
import EtsScheme from '../../src/components/EtsScheme.vue';

describe('EtsScheme.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(EtsScheme);

    expect(wrapper.find('h1').exists()).toBe(true);

    expect(wrapper.html()).toContain('For more information');
  
  }),
  it('exports the component as default', () => {
    expect(EtsScheme).toEqual(expect.objectContaining({
      name: 'EtsScheme',  
    }));
})
})