import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { createComponent } from '@/testutils';
import { useNotifyStore } from '@/utils/notify';
import FzFloatingNotify from '../FzFloatingNotify.vue';

describe('FzFloatingNotify', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = createComponent(FzFloatingNotify);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  const findAlert = () => wrapper.findComponent({ name: 'v-alert' });
  const findProgressFill = () => wrapper.find('.progress-fill');
  const getStore = () => useNotifyStore();

  it('should be hidden by default', () => {
    expect(findAlert().exists()).toBe(false);
  });

  it('should render when store.show is called', async () => {
    const store = getStore();
    store.show('success', 'Título');

    await wrapper.vm.$nextTick();

    expect(findAlert().exists()).toBe(true);
  });

  it('should display title, message and type from the store', async () => {
    const store = getStore();
    store.show('error', 'Erro crítico', 'Detalhes do erro');

    await wrapper.vm.$nextTick();

    expect(findAlert().props('title')).toBe('Erro crítico');
    expect(findAlert().props('text')).toBe('Detalhes do erro');
    expect(findAlert().props('type')).toBe('error');
  });

  const NOTIFY_TYPES = [
    { type: 'success' },
    { type: 'error' },
    { type: 'warning' },
    { type: 'info' },
  ] as const;

  it.each(NOTIFY_TYPES)('should render with type "$type"', async ({ type }) => {
    const store = getStore();
    store.show(type, 'Teste');

    await wrapper.vm.$nextTick();

    expect(findAlert().props('type')).toBe(type);
  });

  it('should hide after store.hide is called', async () => {
    const store = getStore();
    store.show('info', 'Info');

    await wrapper.vm.$nextTick();
    expect(findAlert().exists()).toBe(true);

    store.hide();
    await wrapper.vm.$nextTick();

    expect(findAlert().exists()).toBe(false);
  });

  it('should hide when v-alert emits click:close', async () => {
    const store = getStore();
    store.show('warning', 'Aviso');

    await wrapper.vm.$nextTick();
    expect(findAlert().exists()).toBe(true);

    findAlert().vm.$emit('click:close');
    await wrapper.vm.$nextTick();

    expect(findAlert().exists()).toBe(false);
  });

  it('should render progress bar at 100% when notification appears', async () => {
    const store = getStore();
    store.show('success', 'Título');

    await wrapper.vm.$nextTick();

    const fill = findProgressFill();

    expect(fill.exists()).toBe(true);
    expect(fill.attributes('style')).toContain('width: 100%');
  });

  it('should call cleanup when component unmounts', () => {
    const store = getStore();
    const cleanupSpy = vi.spyOn(store, 'cleanup');

    wrapper.unmount();

    expect(cleanupSpy).toHaveBeenCalledOnce();
  });
});
