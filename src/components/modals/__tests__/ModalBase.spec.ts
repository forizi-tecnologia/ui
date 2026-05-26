import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { createComponent } from '@/testutils';
import FzModalBase, { type ModalAction } from '../FzModalBase.vue';

beforeAll(() => {
  vi.stubGlobal('visualViewport', {
    width: 1024,
    height: 768,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
});

describe('FzModalBase', () => {
  let wrapper: ReturnType<typeof createComponent>;

  const cancelHandler = vi.fn();
  const primaryHandler = vi.fn();

  const defaultActions: ModalAction[] = [
    { text: 'Cancelar', color: 'secondary', handler: cancelHandler },
    { text: 'Confirmar', color: 'primary', handler: primaryHandler },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    wrapper = createComponent(FzModalBase, {
      attachTo: document.body,
      props: {
        modelValue: false,
        actions: defaultActions,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function findDialog() {
    return wrapper.findComponent({ name: 'v-dialog' });
  }

  function findCardTitle() {
    return wrapper.findComponent({ name: 'v-card-title' });
  }

  function findActionButtons() {
    return wrapper.findAllComponents({ name: 'v-btn' });
  }

  describe('visibility', () => {
    it('should be hidden when modelValue is false', () => {
      expect(findDialog().props('modelValue')).toBe(false);
    });

    it('should be visible when modelValue is true', async () => {
      await wrapper.setProps({ modelValue: true });

      expect(findDialog().props('modelValue')).toBe(true);
    });

    it('should sync dialog visibility from modelValue prop (no re-emit)', async () => {
      await wrapper.setProps({ modelValue: true });

      expect(findDialog().props('modelValue')).toBe(true);

      await wrapper.setProps({ modelValue: false });

      expect(findDialog().props('modelValue')).toBe(false);

      // Parent-initiated changes should NOT re-emit (controlled component pattern)
      const emitted = wrapper.emitted('update:modelValue');

      expect(emitted).toBeFalsy();
    });
  });

  describe('title', () => {
    it('should render title when provided', async () => {
      await wrapper.setProps({ modelValue: true, title: 'Confirmação' });

      expect(findCardTitle().exists()).toBe(true);
      expect(findCardTitle().text()).toBe('Confirmação');
    });

    it('should not render title when not provided', async () => {
      await wrapper.setProps({ modelValue: true });

      expect(findCardTitle().exists()).toBe(false);
    });

    it('should render titleIcon when provided', async () => {
      await wrapper.setProps({ modelValue: true, title: 'Aviso', titleIcon: 'mdi-alert' });

      const icon = document.querySelector('.v-icon');

      expect(icon).toBeTruthy();
      expect(icon?.classList.contains('mdi-alert')).toBe(true);
    });

    it('should not render titleIcon when not provided', async () => {
      await wrapper.setProps({ modelValue: true, title: 'Aviso' });

      expect(document.querySelector('.v-icon')).toBeNull();
    });
  });

  describe('message and slot', () => {
    it('should render message text when provided', async () => {
      await wrapper.setProps({ modelValue: true, message: 'Deseja salvar as alterações?' });

      const cardText = wrapper.findComponent({ name: 'v-card-text' });

      expect(cardText.text()).toContain('Deseja salvar as alterações?');
    });

    it('should render default slot content over message', () => {
      wrapper.unmount();

      wrapper = createComponent(FzModalBase, {
        attachTo: document.body,
        props: { modelValue: true, message: 'Mensagem padrão' },
        slots: { default: '<span class="custom-slot">Conteúdo personalizado</span>' },
      });

      const customSlot = document.querySelector('.custom-slot');

      expect(customSlot).toBeTruthy();
      expect(customSlot?.textContent).toContain('Conteúdo personalizado');
    });
  });

  describe('actions', () => {
    it('should render action buttons with correct text', async () => {
      await wrapper.setProps({ modelValue: true });

      const buttons = findActionButtons();

      expect(buttons).toHaveLength(2);
      expect(buttons[0].text()).toContain('Cancelar');
      expect(buttons[1].text()).toContain('Confirmar');
    });

    it('should use default variant "elevated" for primary action when not specified', async () => {
      const actions: ModalAction[] = [
        { text: 'OK', color: 'primary' },
      ];

      await wrapper.setProps({ modelValue: true, actions });

      const button = findActionButtons()[0];

      expect(button.props('variant')).toBe('elevated');
    });

    it('should use default variant "outlined" for secondary action when not specified', async () => {
      const actions: ModalAction[] = [
        { text: 'Cancelar', color: 'secondary' },
      ];

      await wrapper.setProps({ modelValue: true, actions });

      const button = findActionButtons()[0];

      expect(button.props('variant')).toBe('outlined');
    });

    it('should use default variant "outlined" for error action when not specified', async () => {
      const actions: ModalAction[] = [
        { text: 'Excluir', color: 'error' },
      ];

      await wrapper.setProps({ modelValue: true, actions });

      const button = findActionButtons()[0];

      expect(button.props('variant')).toBe('outlined');
    });

    it('should use default variant "text" for other colors when not specified', async () => {
      const actions: ModalAction[] = [
        { text: 'Info', color: 'info' },
      ];

      await wrapper.setProps({ modelValue: true, actions });

      const button = findActionButtons()[0];

      expect(button.props('variant')).toBe('text');
    });

    it('should use provided variant when specified', async () => {
      const actions: ModalAction[] = [
        { text: 'OK', color: 'primary', variant: 'elevated' },
      ];

      await wrapper.setProps({ modelValue: true, actions });

      const button = findActionButtons()[0];

      expect(button.props('variant')).toBe('elevated');
    });

    it('should use provided color for each action', async () => {
      await wrapper.setProps({ modelValue: true });

      const buttons = findActionButtons();

      expect(buttons[0].props('color')).toBe('secondary');
      expect(buttons[1].props('color')).toBe('primary');
    });

    it('should default color to "primary" when not provided', async () => {
      const actions: ModalAction[] = [
        { text: 'OK' },
      ];

      await wrapper.setProps({ modelValue: true, actions });

      const button = findActionButtons()[0];

      expect(button.props('color')).toBe('primary');
    });

    it('should render prepend-icon when provided', async () => {
      const actions: ModalAction[] = [
        { text: 'Salvar', icon: 'mdi-content-save' },
      ];

      await wrapper.setProps({ modelValue: true, actions });

      const button = findActionButtons()[0];

      expect(button.props('prependIcon')).toBe('mdi-content-save');
    });

    it('should call action handler when button is clicked', async () => {
      await wrapper.setProps({ modelValue: true });

      const buttons = findActionButtons();

      await buttons[0].trigger('click');
      await buttons[1].trigger('click');

      expect(cancelHandler).toHaveBeenCalledTimes(1);
      expect(primaryHandler).toHaveBeenCalledTimes(1);
    });

    it('should not throw when action has no handler', async () => {
      const actions: ModalAction[] = [
        { text: 'Fechar' },
      ];

      await wrapper.setProps({ modelValue: true, actions });

      const button = findActionButtons()[0];

      await expect(button.trigger('click')).resolves.toBeUndefined();
    });

    it('should not render action buttons when actions is empty', async () => {
      await wrapper.setProps({ modelValue: true, actions: [] });

      expect(findActionButtons()).toHaveLength(0);
    });
  });

  describe('persistent', () => {
    it('should pass persistent as true by default', () => {
      expect(findDialog().props('persistent')).toBe(true);
    });

    it('should pass persistent to dialog when set', async () => {
      await wrapper.setProps({ persistent: false });

      expect(findDialog().props('persistent')).toBe(false);
    });
  });

  describe('keyboard — dialog @keydown', () => {
    it('should trigger cancel action on Escape key', async () => {
      await wrapper.setProps({ modelValue: true, persistent: false });

      const card = wrapper.findComponent({ name: 'v-card' });

      await card.trigger('keydown', { key: 'Escape' });

      expect(cancelHandler).toHaveBeenCalledTimes(1);
    });

    it('should trigger primary action on Enter key', async () => {
      await wrapper.setProps({ modelValue: true, enterToConfirm: true });

      const card = wrapper.findComponent({ name: 'v-card' });

      await card.trigger('keydown', { key: 'Enter' });

      expect(primaryHandler).toHaveBeenCalledTimes(1);
    });

    it('should not trigger cancel action on Escape when no cancel action exists', async () => {
      const actions: ModalAction[] = [
        { text: 'OK', color: 'primary', handler: primaryHandler },
      ];

      await wrapper.setProps({ modelValue: true, persistent: false, actions });

      const card = wrapper.findComponent({ name: 'v-card' });

      await card.trigger('keydown', { key: 'Escape' });

      expect(primaryHandler).not.toHaveBeenCalled();
    });

    it('should use last action as primary when no action has color "primary"', async () => {
      const lastHandler = vi.fn();
      const actions: ModalAction[] = [
        { text: 'Cancel', color: 'secondary' },
        { text: 'OK', handler: lastHandler },
      ];

      await wrapper.setProps({ modelValue: true, enterToConfirm: true, actions });

      const card = wrapper.findComponent({ name: 'v-card' });

      await card.trigger('keydown', { key: 'Enter' });

      expect(lastHandler).toHaveBeenCalledTimes(1);
    });

    it('should not trigger primary action on Enter when target is a textarea', () => {
      wrapper.unmount();

      wrapper = createComponent(FzModalBase, {
        attachTo: document.body,
        props: {
          modelValue: true,
          actions: defaultActions,
        },
        slots: {
          default: '<textarea data-test="textarea"></textarea>',
        },
      });

      const textarea = document.querySelector('textarea');

      expect(textarea).toBeTruthy();

      textarea?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    });

    it('should do nothing when actions is empty', async () => {
      await wrapper.setProps({ modelValue: true, actions: [] });

      const card = wrapper.findComponent({ name: 'v-card' });

      await expect(card.trigger('keydown', { key: 'Escape' })).resolves.toBeUndefined();
      await expect(card.trigger('keydown', { key: 'Enter' })).resolves.toBeUndefined();
    });
  });

  describe('keyboard — dialog @keydown (no global handler)', () => {
    it('should trigger cancel action on window Escape via Vuetify internal handler', async () => {
      await wrapper.setProps({ modelValue: true, persistent: false });

      // Vuetify's v-dialog internally captures Escape at the window level
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(cancelHandler).toHaveBeenCalledTimes(1);
    });

    it('should not trigger actions from window keydown when dialog is closed', () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(cancelHandler).not.toHaveBeenCalled();
      expect(primaryHandler).not.toHaveBeenCalled();
    });

    it('should do nothing when actions is empty', async () => {
      await wrapper.setProps({ modelValue: true, actions: [] });

      const card = wrapper.findComponent({ name: 'v-card' });

      await expect(card.trigger('keydown', { key: 'Escape' })).resolves.toBeUndefined();
      await expect(card.trigger('keydown', { key: 'Enter' })).resolves.toBeUndefined();

      expect(cancelHandler).not.toHaveBeenCalled();
      expect(primaryHandler).not.toHaveBeenCalled();
    });
  });

  describe('maxWidth', () => {
    it('should pass maxWidth to dialog', async () => {
      await wrapper.setProps({ maxWidth: 800 });

      expect(findDialog().props('maxWidth')).toBe(800);
    });

    it('should use default maxWidth of 500', () => {
      expect(findDialog().props('maxWidth')).toBe(500);
    });
  });

  describe('fullscreen', () => {
    it('should pass fullscreen to dialog when true', async () => {
      await wrapper.setProps({ fullscreen: true });

      expect(findDialog().props('fullscreen')).toBe(true);
    });

    it('should pass fullscreen as false by default', () => {
      expect(findDialog().props('fullscreen')).toBe(false);
    });
  });

  describe('contentClass', () => {
    it('should combine custom contentClass with theme class', () => {
      wrapper.unmount();

      wrapper = createComponent(FzModalBase, {
        attachTo: document.body,
        props: { modelValue: false, contentClass: 'custom-dialog-class' },
      });

      const dialog = findDialog();
      const dialogContentClass = dialog.props('contentClass') as string;

      expect(dialogContentClass).toContain('custom-dialog-class');
      expect(dialogContentClass).toContain('v-theme--');
    });

    it('should use only theme class when contentClass is not provided', () => {
      expect(findDialog().props('contentClass')).toContain('v-theme--');
    });
  });
});
