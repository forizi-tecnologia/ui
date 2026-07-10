import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { createComponent } from '@/testutils';
import FzDateRangeField from '../FzDateRangeField.vue';

beforeAll(() => {
  vi.stubGlobal('visualViewport', {
    width: 1024,
    height: 768,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });

  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

describe('FzDateRangeField', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzDateRangeField, {
      attachTo: document.body,
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getInputs() {
    return wrapper.findAll('input');
  }

  function getStartInput() {
    return getInputs()[0];
  }

  function getEndInput() {
    return getInputs()[1];
  }

  function getStartInputValue(): string {
    return (getStartInput().element as HTMLInputElement).value;
  }

  function getEndInputValue(): string {
    return (getEndInput().element as HTMLInputElement).value;
  }

  function getValidationMessages(): string[] {
    const messages = wrapper.findAll('.v-messages__message');

    return messages.map((m) => m.text());
  }

  it('should render with default labels', () => {
    expect(wrapper.text()).toContain('Data inicial');
    expect(wrapper.text()).toContain('Data final');
  });

  it('should render custom labels', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDateRangeField, {
      attachTo: document.body,
      props: { labelStart: 'Início', labelEnd: 'Fim' },
    });

    expect(wrapper.text()).toContain('Início');
    expect(wrapper.text()).toContain('Fim');
  });

  it('should render default separator', () => {
    expect(wrapper.text()).toContain('até');
  });

  it('should render custom separator', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDateRangeField, {
      attachTo: document.body,
      props: { separator: 'a' },
    });

    expect(wrapper.text()).toContain('a');
  });

  it('should display empty inputs when modelValue is empty', () => {
    expect(getStartInputValue()).toBe('');
    expect(getEndInputValue()).toBe('');
  });

  it('should display modelValue dates formatted as dd/mm/yyyy by default', async () => {
    await wrapper.setProps({ modelValue: { start: '2024-03-15', end: '2024-06-20' } });

    expect(getStartInputValue()).toBe('15/03/2024');
    expect(getEndInputValue()).toBe('20/06/2024');
  });

  it('should emit update:modelValue with start date when start field changes', async () => {
    await getStartInput().setValue('15032024');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![emitted!.length - 1][0]).toEqual({ start: '2024-03-15', end: null });
  });

  it('should emit update:modelValue with end date when end field changes', async () => {
    await getEndInput().setValue('20062024');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![emitted!.length - 1][0]).toEqual({ start: null, end: '2024-06-20' });
  });

  it('should emit null when start field is cleared', async () => {
    await wrapper.setProps({ modelValue: { start: '2024-03-15', end: null } });
    await getStartInput().setValue('');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![emitted!.length - 1][0]).toEqual({ start: null, end: null });
  });

  it('should emit null when end field is cleared', async () => {
    await wrapper.setProps({ modelValue: { start: null, end: '2024-06-20' } });
    await getEndInput().setValue('');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![emitted!.length - 1][0]).toEqual({ start: null, end: null });
  });

  it('should show range validation error when start is after end', async () => {
    await wrapper.setProps({ modelValue: { start: '2024-06-20', end: '2024-03-15' } });

    const endInput = getEndInput();

    await endInput.trigger('focus');
    await endInput.trigger('blur');

    expect(getValidationMessages()).toContain('Data inicial não pode ser maior que a data final');
  });

  it('should show custom range validation message', async () => {
    await wrapper.setProps({
      modelValue: { start: '2024-06-20', end: '2024-03-15' },
      rangeInvalidMessage: 'Intervalo inválido',
    });

    const endInput = getEndInput();

    await endInput.trigger('focus');
    await endInput.trigger('blur');

    expect(getValidationMessages()).toContain('Intervalo inválido');
  });

  it('should not show range validation error when start is before end', async () => {
    await wrapper.setProps({ modelValue: { start: '2024-03-15', end: '2024-06-20' } });

    const endInput = getEndInput();

    await endInput.trigger('focus');
    await endInput.trigger('blur');

    expect(getValidationMessages()).not.toContain('Data inicial não pode ser maior que a data final');
  });

  it('should not show range validation error when dates are equal', async () => {
    await wrapper.setProps({ modelValue: { start: '2024-03-15', end: '2024-03-15' } });

    const endInput = getEndInput();

    await endInput.trigger('focus');
    await endInput.trigger('blur');

    expect(getValidationMessages()).not.toContain('Data inicial não pode ser maior que a data final');
  });

  it('should not show range validation error when one field is empty', async () => {
    await wrapper.setProps({ modelValue: { start: '2024-06-20', end: null } });

    const endInput = getEndInput();

    await endInput.trigger('focus');
    await endInput.trigger('blur');

    expect(getValidationMessages()).not.toContain('Data inicial não pode ser maior que a data final');
  });

  it('should disable both fields when disabled is true', async () => {
    await wrapper.setProps({ disabled: true });

    const inputs = getInputs();

    expect((inputs[0].element as HTMLInputElement).disabled).toBe(true);
    expect((inputs[1].element as HTMLInputElement).disabled).toBe(true);
  });

  it('should show required message on a field when required and empty', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzDateRangeField, {
      attachTo: document.body,
      props: { required: true },
    });

    const startInput = getStartInput();

    await startInput.trigger('focus');
    await startInput.trigger('blur');

    const messages = getValidationMessages();

    expect(messages).toContain('Data é obrigatória');
  });

  it('should apply custom rules to both fields', async () => {
    const customRule = (value: string) => (value.includes('2024') ? true : 'Ano deve ser 2024');

    wrapper.unmount();

    wrapper = createComponent(FzDateRangeField, {
      attachTo: document.body,
      props: { rules: [customRule] },
    });

    await getStartInput().setValue('01012023');

    const startInput = getStartInput();

    await startInput.trigger('focus');
    await startInput.trigger('blur');

    expect(getValidationMessages()).toContain('Ano deve ser 2024');
  });

  it('should show hint text when provided', async () => {
    await wrapper.setProps({ hint: 'Selecione o período' });

    expect(wrapper.text()).toContain('Selecione o período');
  });

  it('should render two date picker fields', () => {
    const inputs = getInputs();

    expect(inputs.length).toBe(2);
  });

  it('should update display when modelValue changes externally', async () => {
    await wrapper.setProps({ modelValue: { start: '2024-05-01', end: '2024-05-31' } });

    expect(getStartInputValue()).toBe('01/05/2024');
    expect(getEndInputValue()).toBe('31/05/2024');

    await wrapper.setProps({ modelValue: { start: '2024-06-01', end: '2024-06-30' } });

    expect(getStartInputValue()).toBe('01/06/2024');
    expect(getEndInputValue()).toBe('30/06/2024');
  });

  it('should clear display when modelValue is set to null dates', async () => {
    await wrapper.setProps({ modelValue: { start: '2024-03-15', end: '2024-06-20' } });

    expect(getStartInputValue()).toBe('15/03/2024');

    await wrapper.setProps({ modelValue: { start: null, end: null } });

    expect(getStartInputValue()).toBe('');
    expect(getEndInputValue()).toBe('');
  });
});
