import { mount } from '@vue/test-utils';
import MethodologyPage from '../../src/components/MethodologyPage.vue';

describe('MethodologyPage.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(MethodologyPage);

    expect(wrapper.find('h1').exists()).toBe(true);

    expect(wrapper.html()).toContain('All of the available ships are over 18,000 TEU');
  
  }),
  it('exports the component as default', () => {
    expect(MethodologyPage).toEqual(expect.objectContaining({
      name: 'MethodologyPage',  
    }));
})
})