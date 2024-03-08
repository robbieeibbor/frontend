import { mount } from '@vue/test-utils';
import AboutPage from '../../src/components/AboutPage.vue';

describe('AboutPage.vue', () => {
  it('renders ok', () => {
    const wrapper = mount(AboutPage);

    expect(wrapper.find('h1').exists()).toBe(true);

    expect(wrapper.html()).toContain('Emissions Without Omissions');
  
  }),
  it('exports component default', () => {
    expect(AboutPage).toEqual(expect.objectContaining({
      name: 'AboutPage',  
    }));
})
})