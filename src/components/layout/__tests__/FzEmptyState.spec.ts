import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { h } from 'vue';
import { createComponent } from '@/testutils';
import FzEmptyState from '../FzEmptyState.vue';

describe('FzEmptyState', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzEmptyState, { props: { title: 'Nenhuma fatura' } });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the title', () => {
    expect(wrapper.text()).toContain('Nenhuma fatura');
  });

  it('should render the description when provided', () => {
    wrapper = createComponent(FzEmptyState, {
      props: { title: 'Nenhuma fatura', description: 'Comece registrando sua primeira fatura.' },
    });

    expect(wrapper.text()).toContain('Comece registrando sua primeira fatura.');
  });

  it('should not render the description when it is empty', () => {
    expect(wrapper.find('.text-body-2').exists()).toBe(false);
  });

  it('should render the default icon and color', () => {
    const icon = wrapper.findComponent({ name: 'v-icon' });

    expect(icon.props('icon')).toBe('mdi-inbox-outline');
    expect(icon.props('color')).toBe('medium-emphasis');
    expect(icon.props('size')).toBe(48);
  });

  it('should render a custom icon and color', () => {
    wrapper = createComponent(FzEmptyState, {
      props: { title: 'Erro', icon: 'mdi-alert-circle-outline', iconColor: 'error' },
    });

    const icon = wrapper.findComponent({ name: 'v-icon' });

    expect(icon.props('icon')).toBe('mdi-alert-circle-outline');
    expect(icon.props('color')).toBe('error');
  });

  it('should not render the default action button without actionText', () => {
    expect(wrapper.findComponent({ name: 'v-btn' }).exists()).toBe(false);
  });

  it('should render the default action button when actionText is provided', () => {
    wrapper = createComponent(FzEmptyState, {
      props: {
        title: 'Nenhuma fatura',
        actionText: 'Nova fatura',
        actionIcon: 'mdi-plus',
        actionColor: 'secondary',
        actionVariant: 'outlined',
      },
    });

    const button = wrapper.findComponent({ name: 'v-btn' });

    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Nova fatura');
    expect(button.props('prependIcon')).toBe('mdi-plus');
    expect(button.props('color')).toBe('secondary');
    expect(button.props('variant')).toBe('outlined');
  });

  it('should emit action when the default button is clicked', async () => {
    wrapper = createComponent(FzEmptyState, {
      props: { title: 'Nenhuma fatura', actionText: 'Nova fatura' },
    });

    await wrapper.findComponent({ name: 'v-btn' }).trigger('click');

    expect(wrapper.emitted('action')).toHaveLength(1);
  });

  it('should replace the default action through the action slot', () => {
    wrapper = createComponent(FzEmptyState, {
      props: { title: 'Nenhuma fatura', actionText: 'Nova fatura' },
      slots: {
        action: () => h('button', { class: 'custom-action' }, 'Criar'),
      },
    });

    expect(wrapper.find('.custom-action').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'v-btn' }).exists()).toBe(false);
  });

  it('should render extra content through the default slot', () => {
    wrapper = createComponent(FzEmptyState, {
      props: { title: 'Nenhuma fatura' },
      slots: {
        default: () => h('span', { class: 'extra-content' }, 'Filtro aplicado'),
      },
    });

    expect(wrapper.find('.extra-content').exists()).toBe(true);
  });

  it('should use the compact icon size and title typography', () => {
    wrapper = createComponent(FzEmptyState, {
      props: { title: 'Nenhuma fatura', compact: true },
    });

    const icon = wrapper.findComponent({ name: 'v-icon' });
    const title = wrapper.find('.text-subtitle-1');

    expect(icon.props('size')).toBe(32);
    expect(title.exists()).toBe(true);
    expect(title.classes()).toContain('font-weight-medium');
  });

  it('should use the regular title typography by default', () => {
    expect(wrapper.find('.text-h6').exists()).toBe(true);
  });
});
