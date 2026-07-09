import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createComponent } from '@/testutils';
import FzIconToolTip from '../FzIconToolTip.vue';

describe('FzIconToolTip', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil' },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  // ── Icon mode (asButton = false, default) ──

  it('should render the icon', () => {
    const icon = wrapper.findComponent({ name: 'v-icon' });

    expect(icon.props('icon')).toBe('mdi-pencil');
  });

  it('should render as icon when asButton is false', () => {
    const btn = wrapper.findComponent({ name: 'v-btn' });

    expect(btn.exists()).toBe(false);
  });

  it('should render tooltip with tooltip prop', () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', tooltip: 'Editar' },
    });

    const tooltip = wrapper.findComponent({ name: 'v-tooltip' });

    expect(tooltip.props('text')).toBe('Editar');
  });

  it('should disable tooltip when no tooltip is provided', () => {
    const tooltip = wrapper.findComponent({ name: 'v-tooltip' });

    expect(tooltip.props('disabled')).toBe(true);
  });

  it('should enable tooltip when tooltip is provided', () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', tooltip: 'Clique para editar' },
    });

    const tooltip = wrapper.findComponent({ name: 'v-tooltip' });

    expect(tooltip.props('disabled')).toBe(false);
  });

  it('should use the provided color on the icon', () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', color: 'error' },
    });

    const icon = wrapper.findComponent({ name: 'v-icon' });

    expect(icon.props('color')).toBe('error');
  });

  it('should default color to "primary" on the icon', () => {
    const icon = wrapper.findComponent({ name: 'v-icon' });

    expect(icon.props('color')).toBe('primary');
  });

  it('should emit click event when icon is clicked', async () => {
    const icon = wrapper.findComponent({ name: 'v-icon' });

    await icon.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('should emit click event with MouseEvent payload', async () => {
    const icon = wrapper.findComponent({ name: 'v-icon' });

    await icon.trigger('click');

    const emitted = wrapper.emitted('click');

    expect(emitted![0][0]).toBeInstanceOf(MouseEvent);
  });

  it('should prevent icon click when disabled', async () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', disabled: true },
    });

    const icon = wrapper.findComponent({ name: 'v-icon' });

    await icon.trigger('click');

    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('should add reduced opacity class when disabled in icon mode', () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', disabled: true },
    });

    const tooltip = wrapper.findComponent({ name: 'v-tooltip' });
    const activatorSlot = tooltip.find('span');

    expect(activatorSlot.classes()).toContain('opacity-50');
  });

  // ── Button mode (asButton = true) ──

  it('should render v-btn when asButton is true', () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', asButton: true },
    });

    const btn = wrapper.findComponent({ name: 'v-btn' });

    expect(btn.exists()).toBe(true);
  });

  it('should use variant "text" when asButton is true', () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', asButton: true },
    });

    const btn = wrapper.findComponent({ name: 'v-btn' });

    expect(btn.props('variant')).toBe('text');
  });

  it('should disable v-btn when disabled is true and asButton is true', () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', asButton: true, disabled: true },
    });

    const btn = wrapper.findComponent({ name: 'v-btn' });

    expect(btn.props('disabled')).toBe(true);
  });

  it('should not disable v-btn when disabled is not provided and asButton is true', () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', asButton: true },
    });

    const btn = wrapper.findComponent({ name: 'v-btn' });

    expect(btn.props('disabled')).toBe(false);
  });

  it('should emit click event with MouseEvent payload when asButton is true', async () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', asButton: true },
    });

    const btn = wrapper.findComponent({ name: 'v-btn' });

    await btn.trigger('click');

    const emitted = wrapper.emitted('click');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toBeInstanceOf(MouseEvent);
  });

  // ── disabledTooltip (mode-independent) ──

  it('should show disabledTooltip when disabled and disabledTooltip is provided', () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', disabled: true, disabledTooltip: 'Motivo de estar desabilitado' },
    });

    const tooltip = wrapper.findComponent({ name: 'v-tooltip' });

    expect(tooltip.props('text')).toBe('Motivo de estar desabilitado');
  });

  it('should disable tooltip when disabled is true but disabledTooltip is not provided', () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', disabled: true, tooltip: 'Editar' },
    });

    const tooltip = wrapper.findComponent({ name: 'v-tooltip' });

    expect(tooltip.props('disabled')).toBe(true);
  });

  it('should not enable tooltip from disabledTooltip when disabled is false', () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', disabledTooltip: 'Nao deve aparecer' },
    });

    const tooltip = wrapper.findComponent({ name: 'v-tooltip' });

    expect(tooltip.props('disabled')).toBe(true);
  });

  it('should wrap content in a span when disabled', () => {
    wrapper = createComponent(FzIconToolTip, {
      props: { icon: 'mdi-pencil', disabled: true, disabledTooltip: 'Desabilitado' },
    });

    const tooltip = wrapper.findComponent({ name: 'v-tooltip' });
    const activatorSlot = tooltip.find('span');

    expect(activatorSlot.exists()).toBe(true);
  });
});
