import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createComponent } from '@/testutils';
import FzLoadingOverlay from '../FzLoadingOverlay.vue';
import { useLoadingRefs } from '@/utils/loading';

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

    const loadingRefs = useLoadingRefs();

    loadingRefs.hide();
    loadingRefs.message.value = 'Carregando...';

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

  it('should use the global singleton when no props are passed', async () => {
    const loadingRefs = useLoadingRefs();

    loadingRefs.show('Global loading');

    const w = createComponent(FzLoadingOverlay);

    await w.vm.$nextTick();

    expect(w.find('.loading-overlay').exists()).toBe(true);

    vi.advanceTimersByTime(300);
    await w.vm.$nextTick();

    expect(w.text()).toContain('Global loading');

    w.unmount();
  });

  it('should hide when the global singleton becomes inactive', async () => {
    const loadingRefs = useLoadingRefs();

    loadingRefs.show('Global loading');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.loading-overlay').exists()).toBe(true);

    loadingRefs.hide();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.loading-overlay').exists()).toBe(false);
  });

  it('should let an explicit isLoading prop win over the global singleton', async () => {
    const loadingRefs = useLoadingRefs();

    loadingRefs.show('Global loading');

    const w = createComponent(FzLoadingOverlay, {
      props: { isLoading: false },
    });

    await w.vm.$nextTick();

    expect(w.find('.loading-overlay').exists()).toBe(false);

    w.unmount();
  });

  it('should let an explicit message prop win over the singleton message', async () => {
    const loadingRefs = useLoadingRefs();

    loadingRefs.show('Global loading');

    const w = createComponent(FzLoadingOverlay, {
      props: { message: 'Custom loading' },
    });

    await w.vm.$nextTick();

    expect(w.find('.loading-overlay').exists()).toBe(true);

    vi.advanceTimersByTime(300);
    await w.vm.$nextTick();

    expect(w.text()).toContain('Custom loading');
    expect(w.text()).not.toContain('Global loading');

    w.unmount();
  });
});
