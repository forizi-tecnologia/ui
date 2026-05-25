import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createPinia, setActivePinia } from 'pinia';
import FzCustomConfirmDialog from '../FzCustomConfirmDialog.vue';

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

    return all.length > 1 ? all[all.length - 1] : undefined;
  };
  const findCancelBtn = () => {
    const all = findButtons();

    return all.length > 0 ? all[0] : undefined;
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
});
