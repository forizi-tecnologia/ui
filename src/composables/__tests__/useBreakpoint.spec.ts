import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { defineComponent } from 'vue';
import { useBreakpoint } from '../useBreakpoint';

function createBreakpointHost() {
  let result: ReturnType<typeof useBreakpoint> | null = null;

  const Host = defineComponent({
    setup() {
      result = useBreakpoint();
    },
    template: '<div />',
  });

  const vuetify = createVuetify();
  const wrapper = mount(Host, {
    global: { plugins: [vuetify] },
  });

  return { wrapper, result: result! };
}

describe('useBreakpoint', () => {
  it('should return isMobile as a boolean value', () => {
    const { result } = createBreakpointHost();

    expect(typeof result.isMobile.value).toBe('boolean');
  });

  it('should return isMobileOrTablet as a boolean value', () => {
    const { result } = createBreakpointHost();

    expect(typeof result.isMobileOrTablet.value).toBe('boolean');
  });

  it('should return isMobile as false with default jsdom viewport (1024px)', () => {
    const { result } = createBreakpointHost();

    expect(result.isMobile.value).toBe(false);
  });

  it('should return isMobileOrTablet as false with default jsdom viewport (1024px)', () => {
    const { result } = createBreakpointHost();

    expect(result.isMobileOrTablet.value).toBe(false);
  });

  it('should return both breakpoints as reactive computed refs', () => {
    const { result } = createBreakpointHost();

    expect(result.isMobile).toHaveProperty('value');
    expect(result.isMobileOrTablet).toHaveProperty('value');
  });

  it('should return an object with exactly two keys', () => {
    const { result } = createBreakpointHost();

    const keys = Object.keys(result);

    expect(keys).toEqual(['isMobile', 'isMobileOrTablet']);
  });

  it('should return isMobileOrTablet as true when isMobile is true', () => {
    const { result } = createBreakpointHost();

    // smAndDown includes xs, so when xs is true, smAndDown must also be true
    const implication = !result.isMobile.value || result.isMobileOrTablet.value;

    expect(implication).toBe(true);
  });
});
