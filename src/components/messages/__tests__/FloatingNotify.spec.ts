import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { setActivePinia, createPinia } from 'pinia';
import { createComponent } from '@/testutils';
import { useNotifyStore } from '@/utils/notify';
import { NOTIFY_DURATION } from '@/utils/types';
import FzFloatingNotify from '../FzFloatingNotify.vue';

describe('FzFloatingNotify', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = createComponent(FzFloatingNotify);
  });

  afterEach(() => {
    getStore().hide();
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

  describe('progress ticking', () => {
    let localWrapper: ReturnType<typeof createComponent>;

    beforeEach(() => {
      setActivePinia(createPinia());
      localWrapper = createComponent(FzFloatingNotify);
    });

    afterEach(() => {
      useNotifyStore().hide();
      localWrapper.unmount();
    });

    const findLocalFill = () => localWrapper.find('.progress-fill');

    function wait(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    it('should decrease progress as time passes after the enter transition', async () => {
      const store = useNotifyStore();

      store.show('info', 'Título');
      await localWrapper.vm.$nextTick();

      await wait(500);
      await localWrapper.vm.$nextTick();

      expect(findLocalFill().attributes('style')).not.toContain('width: 100%');
    }, 10000);

    it('should clamp progress to a low value just before the store auto-hides at the full duration', async () => {
      const store = useNotifyStore();

      store.show('info', 'Título');
      await localWrapper.vm.$nextTick();

      await wait(NOTIFY_DURATION - 500);
      await localWrapper.vm.$nextTick();

      expect(store.isVisible).toBe(true);
      expect(findLocalFill().exists()).toBe(true);

      const style = (findLocalFill().element as HTMLElement).style.width;
      const width = parseFloat(style || '0');

      expect(width).toBeLessThan(40);
    }, 10000);

    it('should stop the loop when the notification is hidden while ticking', async () => {
      const store = useNotifyStore();

      store.show('info', 'Título');
      await localWrapper.vm.$nextTick();

      await wait(400);
      store.hide();
      await localWrapper.vm.$nextTick();

      await expect(wait(400)).resolves.not.toThrow();
    }, 10000);

    it('should keep the notification visible while the mouse hovers it', async () => {
      const store = useNotifyStore();

      store.show('info', 'Título');
      await localWrapper.vm.$nextTick();

      const el = localWrapper.find('.floating-notify').element as HTMLElement;

      vi.spyOn(el, 'matches').mockReturnValue(true);

      await wait(NOTIFY_DURATION + 300);
      await localWrapper.vm.$nextTick();

      expect(store.isVisible).toBe(true);
    }, 10000);

    it('should resume counting down once the mouse leaves the notification', async () => {
      const store = useNotifyStore();

      store.show('info', 'Título');
      await localWrapper.vm.$nextTick();

      const el = localWrapper.find('.floating-notify').element as HTMLElement;
      const matchesSpy = vi.spyOn(el, 'matches').mockReturnValue(true);

      await wait(400);

      matchesSpy.mockReturnValue(false);

      await wait(NOTIFY_DURATION + 300);
      await localWrapper.vm.$nextTick();

      expect(store.isVisible).toBe(false);
    }, 10000);

    it('should not treat hover as active before the enter transition ends', async () => {
      const store = useNotifyStore();

      store.show('info', 'Título');
      await localWrapper.vm.$nextTick();

      const el = localWrapper.find('.floating-notify').element as HTMLElement;

      vi.spyOn(el, 'matches').mockReturnValue(true);

      await wait(200);
      await localWrapper.vm.$nextTick();

      expect(store.isVisible).toBe(true);
      expect(findLocalFill().exists()).toBe(true);

      const style = (findLocalFill().element as HTMLElement).style.width;
      const width = parseFloat(style || '100');

      expect(width).toBeLessThan(100);
      expect(width).toBeGreaterThan(80);
    }, 10000);

    it('should reset progress to 100% when the notification transitions from hidden to visible again', async () => {
      const store = useNotifyStore();

      store.show('info', 'Primeiro');
      await localWrapper.vm.$nextTick();

      await wait(400);

      store.hide();
      await localWrapper.vm.$nextTick();

      store.show('warning', 'Segundo');
      await localWrapper.vm.$nextTick();

      expect(findLocalFill().attributes('style')).toContain('width: 100%');
    }, 10000);
  });

  describe('theme colors', () => {
    it('should use the light background for the current notify type by default', async () => {
      const store = getStore();
      store.show('error', 'Título');

      await wrapper.vm.$nextTick();

      const container = wrapper.find('.floating-notify');

      expect(container.attributes('style')).toContain('background-color: rgb(255, 235, 238)');
    });

    it('should fall back to the info background for an unmapped type on the progress track', async () => {
      const store = getStore();
      store.type = 'unmapped' as unknown as typeof store.type;
      store.isVisible = true;

      await wrapper.vm.$nextTick();

      const track = wrapper.find('.progress-track');

      expect(track.attributes('style')).toContain('background-color: rgb(227, 242, 253)');
    });

    it('should use dark backgrounds when the theme is dark', async () => {
      const vuetify = createVuetify({ theme: { defaultTheme: 'dark' } });
      const pinia = createPinia();
      setActivePinia(pinia);

      const darkWrapper = mount(FzFloatingNotify, {
        global: { plugins: [vuetify, pinia] },
      });

      getStore().show('success', 'Título');
      await darkWrapper.vm.$nextTick();

      const container = darkWrapper.find('.floating-notify');
      const track = darkWrapper.find('.progress-track');

      expect(container.attributes('style')).toContain('background-color: rgb(30, 30, 30)');
      expect(track.attributes('style')).toContain('background-color: rgba(255, 255, 255, 0.05)');

      darkWrapper.unmount();
    });
  });

});
