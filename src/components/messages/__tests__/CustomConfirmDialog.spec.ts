import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createPinia, setActivePinia } from 'pinia';
import FzCustomConfirmDialog from '../FzCustomConfirmDialog.vue';
import { useConfirmStore } from '@/utils/confirm';

function createWrapper() {
  const vuetify = createVuetify();

  return mount(FzCustomConfirmDialog, {
    global: {
      plugins: [vuetify, createPinia()],
    },
    attachTo: document.body,
  });
}

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('FzCustomConfirmDialog', () => {
  let wrapper: ReturnType<typeof createWrapper>;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  const openDialog = (title = 'Title', message = 'Message', options?: Record<string, unknown>) => {
    return wrapper.vm.confirmDialog(title, message, options);
  };

  const queryOverlay = () => document.body.querySelector<HTMLDivElement>('.custom-dialog-overlay');
  const findButtons = () => wrapper.findAllComponents({ name: 'v-btn' });
  const findConfirmBtn = () => {
    const all = findButtons();

    return all.length > 0 ? all[0] : undefined;
  };
  const findCancelBtn = () => {
    const all = findButtons();

    return all.length > 1 ? all[all.length - 1] : undefined;
  };

  it('should be hidden by default', () => {
    expect(queryOverlay()).toBeNull();
  });

  it('should show overlay when confirmDialog is called', async () => {
    openDialog();

    await wrapper.vm.$nextTick();

    expect(queryOverlay()).not.toBeNull();
  });

  it('should display the title and message', async () => {
    openDialog('My Title', 'My Message');

    await wrapper.vm.$nextTick();

    expect(queryOverlay()?.textContent).toContain('My Title');
    expect(queryOverlay()?.textContent).toContain('My Message');
  });

  it('should display default button labels in pt-BR', async () => {
    openDialog();

    await wrapper.vm.$nextTick();

    expect(queryOverlay()?.textContent).toContain('Sim');
    expect(queryOverlay()?.textContent).toContain('Não');
  });

  it('should use custom button labels when provided', async () => {
    openDialog('Title', 'Message', { confirmText: 'OK', cancelText: 'Close' });

    await wrapper.vm.$nextTick();

    expect(queryOverlay()?.textContent).toContain('OK');
    expect(queryOverlay()?.textContent).toContain('Close');
  });

  it('should use custom colors when provided', async () => {
    openDialog('Title', 'Message', { confirmColor: 'error', cancelColor: 'grey' });

    await wrapper.vm.$nextTick();

    expect(findConfirmBtn()?.props('color')).toBe('error');
    expect(findCancelBtn()?.props('color')).toBe('grey');
  });

  it('should use default colors when not provided', async () => {
    openDialog();

    await wrapper.vm.$nextTick();

    expect(findConfirmBtn()?.props('color')).toBe('primary');
    expect(findCancelBtn()?.props('color')).toBe('secondary');
  });

  it('should resolve to true when confirm button is clicked', async () => {
    const promise = openDialog();

    await wrapper.vm.$nextTick();
    await findConfirmBtn()?.trigger('click');

    await expect(promise).resolves.toBe(true);
  });

  it('should resolve to false when cancel button is clicked', async () => {
    const promise = openDialog();

    await wrapper.vm.$nextTick();
    await findCancelBtn()?.trigger('click');

    await expect(promise).resolves.toBe(false);
  });

  it('should close after confirm button click', async () => {
    openDialog();

    await wrapper.vm.$nextTick();
    await findConfirmBtn()?.trigger('click');
    await wrapper.vm.$nextTick();

    expect(queryOverlay()).toBeNull();
  });

  it('should close after cancel button click', async () => {
    openDialog();

    await wrapper.vm.$nextTick();
    await findCancelBtn()?.trigger('click');
    await wrapper.vm.$nextTick();

    expect(queryOverlay()).toBeNull();
  });

  it('should not close on overlay click when persistent (default)', async () => {
    openDialog();

    await wrapper.vm.$nextTick();
    queryOverlay()?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await wrapper.vm.$nextTick();

    expect(queryOverlay()).not.toBeNull();
  });

  it('should close on overlay click when not persistent', async () => {
    openDialog('Title', 'Message', { persistent: false });

    await wrapper.vm.$nextTick();
    queryOverlay()?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await wrapper.vm.$nextTick();

    expect(queryOverlay()).toBeNull();
  });

  it('should resolve to false when closed via non-persistent overlay click', async () => {
    const promise = openDialog('Title', 'Message', { persistent: false });

    await wrapper.vm.$nextTick();
    queryOverlay()?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    await expect(promise).resolves.toBe(false);
  });

  it('should not render the message block when message is empty', async () => {
    openDialog('Title', '');

    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'v-card-text' }).exists()).toBe(false);
  });

  it('should confirm on Enter when enterToConfirm is true', async () => {
    const promise = openDialog('Title', 'Message', { enterToConfirm: true });

    await wrapper.vm.$nextTick();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    await expect(promise).resolves.toBe(true);
  });

  it('should not confirm on Enter when enterToConfirm is false (default)', async () => {
    openDialog('Title', 'Message');

    await wrapper.vm.$nextTick();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wrapper.vm.$nextTick();

    expect(queryOverlay()).not.toBeNull();
  });

  it('should cancel on Escape when not persistent', async () => {
    const promise = openDialog('Title', 'Message', { persistent: false });

    await wrapper.vm.$nextTick();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    await expect(promise).resolves.toBe(false);
  });

  it('should not cancel on Escape when persistent (default)', async () => {
    openDialog('Title', 'Message');

    await wrapper.vm.$nextTick();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await wrapper.vm.$nextTick();

    expect(queryOverlay()).not.toBeNull();
  });

  it('should ignore unrelated keys', async () => {
    openDialog('Title', 'Message', { enterToConfirm: true, persistent: false });

    await wrapper.vm.$nextTick();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    await wrapper.vm.$nextTick();

    expect(queryOverlay()).not.toBeNull();
  });

  it('should stop listening for keydown after the dialog is closed', async () => {
    openDialog('Title', 'Message', { enterToConfirm: true });

    await wrapper.vm.$nextTick();
    await findConfirmBtn()?.trigger('click');
    await wrapper.vm.$nextTick();

    const promise = openDialog('Second', 'Message');

    await wrapper.vm.$nextTick();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wrapper.vm.$nextTick();

    expect(queryOverlay()).not.toBeNull();

    await findCancelBtn()?.trigger('click');

    await expect(promise).resolves.toBe(false);
  });

  it('should remove the keydown listener on unmount', async () => {
    openDialog('Title', 'Message', { enterToConfirm: true });

    await wrapper.vm.$nextTick();

    wrapper.unmount();

    expect(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    }).not.toThrow();
  });

  it('should resolve false when confirmDialog is called through the store after unmount', async () => {
    const store = useConfirmStore();

    wrapper.unmount();

    const result = await store.show('Title', 'Message');

    expect(result).toBe(false);
  });
});
