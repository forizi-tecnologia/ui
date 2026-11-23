import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { h } from 'vue';
import { createComponent } from '@/testutils';
import FzMonthStepper from '../FzMonthStepper.vue';
import { getCurrentMonth, getMonthLabel } from '@/composables/useMonthPicker';

describe('FzMonthStepper', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzMonthStepper, { props: { modelValue: '2026-11' } });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function findButton(label: string) {
    return wrapper
      .findAllComponents({ name: 'v-btn' })
      .find((button) => button.attributes('aria-label') === label);
  }

  it('should render the localized label', () => {
    expect(wrapper.text()).toContain('Novembro 2026');
  });

  it('should fall back to the current month when the model is empty', () => {
    wrapper = createComponent(FzMonthStepper);

    expect(wrapper.text()).toContain(getMonthLabel(getCurrentMonth(), 'pt-BR'));
  });

  it('should render the English label', () => {
    wrapper = createComponent(FzMonthStepper, { props: { modelValue: '2026-11', locale: 'en' } });

    expect(wrapper.text()).toContain('November 2026');
  });

  it('should emit the previous month', async () => {
    await findButton('Mês anterior')?.trigger('click');

    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-10']);
  });

  it('should emit the next month', async () => {
    await findButton('Próximo mês')?.trigger('click');

    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-12']);
  });

  it('should disable the previous arrow at the min bound', () => {
    wrapper = createComponent(FzMonthStepper, {
      props: { modelValue: '2026-03', min: '2026-03' },
    });

    expect(findButton('Mês anterior')?.props('disabled')).toBe(true);
    expect(findButton('Próximo mês')?.props('disabled')).toBe(false);
  });

  it('should disable the next arrow at the max bound', () => {
    wrapper = createComponent(FzMonthStepper, {
      props: { modelValue: '2026-05', max: '2026-05' },
    });

    expect(findButton('Próximo mês')?.props('disabled')).toBe(true);
    expect(findButton('Mês anterior')?.props('disabled')).toBe(false);
  });

  it('should block future navigation when allowFuture is false', () => {
    wrapper = createComponent(FzMonthStepper, {
      props: { modelValue: getCurrentMonth(), allowFuture: false },
    });

    expect(findButton('Próximo mês')?.props('disabled')).toBe(true);
  });

  it('should not emit when a disabled arrow is activated', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    wrapper = createComponent(FzMonthStepper, {
      props: { modelValue: '2026-03', min: '2026-03' },
    });

    findButton('Mês anterior')?.vm.$emit('click');
    await wrapper.vm.$nextTick();

    wrapper.unmount();

    wrapper = createComponent(FzMonthStepper, {
      props: { modelValue: '2026-03', max: '2026-03' },
    });

    findButton('Próximo mês')?.vm.$emit('click');
    await wrapper.vm.$nextTick();

    warnSpy.mockRestore();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should disable both arrows when disabled is true', () => {
    wrapper = createComponent(FzMonthStepper, {
      props: { modelValue: '2026-11', disabled: true },
    });

    expect(findButton('Mês anterior')?.props('disabled')).toBe(true);
    expect(findButton('Próximo mês')?.props('disabled')).toBe(true);
  });

  it('should hide the arrows when arrows is false', () => {
    wrapper = createComponent(FzMonthStepper, {
      props: { modelValue: '2026-11', arrows: false },
    });

    expect(wrapper.findAllComponents({ name: 'v-btn' })).toHaveLength(0);
    expect(wrapper.text()).toContain('Novembro 2026');
  });

  it('should localize the aria labels in English', () => {
    wrapper = createComponent(FzMonthStepper, { props: { modelValue: '2026-11', locale: 'en' } });

    expect(findButton('Previous month')?.exists()).toBe(true);
    expect(findButton('Next month')?.exists()).toBe(true);
  });

  it('should replace the label through the default slot', () => {
    wrapper = createComponent(FzMonthStepper, {
      props: { modelValue: '2026-11' },
      slots: {
        default: ({ label }: { label: string }) => h('span', { class: 'custom-label' }, `Período: ${label}`),
      },
    });

    expect(wrapper.find('.custom-label').text()).toBe('Período: Novembro 2026');
  });
});
