import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createComponent } from '@/testutils';
import FzLoadingOverlay from '../FzLoadingOverlay.vue';

class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

const MESSAGE_CASES = [
  { message: 'Carregando...', expected: 'Carregando...' },
  { message: 'Salvando...', expected: 'Salvando...' },
] as const;

describe('FzLoadingOverlay', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    vi.useFakeTimers();
    wrapper = createComponent(FzLoadingOverlay);
  });

  afterEach(() => {
    wrapper.unmount();
    vi.useRealTimers();
  });

  it('should not render the overlay when isLoading is false by default', () => {
    expect(wrapper.find('.loading-overlay').exists()).toBe(false);
  });

  it('should render the overlay immediately when isLoading becomes true', async () => {
    await wrapper.setProps({ isLoading: true });

    expect(wrapper.find('.loading-overlay').exists()).toBe(true);
  });

  it('should not show the spinner before the delay expires', async () => {
    await wrapper.setProps({ isLoading: true });

    expect(wrapper.findComponent({ name: 'v-progress-circular' }).exists()).toBe(false);
  });

  it('should show the spinner after the default delay of 300ms', async () => {
    await wrapper.setProps({ isLoading: true });

    vi.advanceTimersByTime(300);
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'v-progress-circular' }).exists()).toBe(true);
  });

  it.each(MESSAGE_CASES)('should display "$expected" when message is "$message"', async ({ message, expected }) => {
    await wrapper.setProps({ isLoading: true, message });

    vi.advanceTimersByTime(300);
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain(expected);
  });

  it('should hide overlay and spinner immediately when isLoading becomes false', async () => {
    await wrapper.setProps({ isLoading: true });

    vi.advanceTimersByTime(300);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.loading-overlay').exists()).toBe(true);

    await wrapper.setProps({ isLoading: false });

    expect(wrapper.find('.loading-overlay').exists()).toBe(false);
    expect(wrapper.findComponent({ name: 'v-progress-circular' }).exists()).toBe(false);
  });

  it('should cancel the timeout when isLoading becomes false before the delay expires', async () => {
    await wrapper.setProps({ isLoading: true });
    await wrapper.setProps({ isLoading: false });

    vi.advanceTimersByTime(300);
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'v-progress-circular' }).exists()).toBe(false);
  });

  it('should respect a custom delay of 500ms', async () => {
    await wrapper.setProps({ isLoading: true, delay: 500 });

    vi.advanceTimersByTime(300);
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'v-progress-circular' }).exists()).toBe(false);

    vi.advanceTimersByTime(200);
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'v-progress-circular' }).exists()).toBe(true);
  });

  it('should not throw when unmounted with a pending timeout', () => {
    const w = createComponent(FzLoadingOverlay, {
      props: { isLoading: true },
    });

    w.unmount();

    expect(() => {
      vi.advanceTimersByTime(300);
    }).not.toThrow();
  });

  it('should hide without error when isLoading starts true and no timeout was scheduled yet', async () => {
    const w = createComponent(FzLoadingOverlay, {
      props: { isLoading: true },
    });

    await w.setProps({ isLoading: false });

    expect(w.find('.loading-overlay').exists()).toBe(false);

    w.unmount();
  });
});
