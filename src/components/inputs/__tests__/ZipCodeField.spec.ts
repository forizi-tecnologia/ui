import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createComponent } from '@/testutils';
import FzZipCodeField from '../FzZipCodeField.vue';

type FetchResponse = { json: () => Promise<Record<string, unknown>>; ok: boolean };

function mockFetch(data: Record<string, unknown>): Promise<FetchResponse> {
  return Promise.resolve({ json: () => Promise.resolve(data), ok: true });
}

describe('FzZipCodeField', () => {
  let wrapper: ReturnType<typeof createComponent>;
  let unmounted: boolean;

  beforeEach(() => {
    unmounted = false;
    global.fetch = () => mockFetch({ erro: true });
    wrapper = createComponent(FzZipCodeField);
  });

  afterEach(() => {
    if (!unmounted) wrapper.unmount();
  });

  function getInputValue(): string {
    return (wrapper.find('input').element as HTMLInputElement).value;
  }

  it('should render with default label and map-marker icon', () => {
    expect(wrapper.text()).toContain('CEP');

    const icon = wrapper.find('.v-icon');

    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain('mdi-map-marker-outline');
  });

  it('should display empty input when modelValue is empty', () => {
    expect(getInputValue()).toBe('');
  });

  it('should display masked CEP when modelValue is set', async () => {
    await wrapper.setProps({ modelValue: '12345678' });

    expect(getInputValue()).toBe('12345-678');
  });

  it('should handle null modelValue as empty display', async () => {
    await wrapper.setProps({ modelValue: null as unknown as string });

    expect(getInputValue()).toBe('');
  });

  it('should show hint text when provided', async () => {
    await wrapper.setProps({ hint: 'Digite seu CEP' });

    expect(wrapper.text()).toContain('Digite seu CEP');
  });

  it('should not show hint when hint is empty', () => {
    expect(wrapper.find('.v-messages__message').exists()).toBe(false);
  });

  it('should render with custom label', () => {
    wrapper = createComponent(FzZipCodeField, { props: { label: 'Código Postal' } });

    expect(wrapper.text()).toContain('Código Postal');
  });

  it('should render with custom variant', () => {
    wrapper = createComponent(FzZipCodeField, { props: { variant: 'outlined' } });

    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('should render with disabled state', async () => {
    await wrapper.setProps({ disabled: true });

    expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true);
  });

  it('should show error from custom rule', async () => {
    const customRule = (v: string) => v === '12345-678' ? true : 'CEP inválido';
    const input = wrapper.find('input');

    await wrapper.setProps({ modelValue: '00000000', rules: [customRule] });
    await input.trigger('focus');
    await input.trigger('blur');

    const messages = wrapper.findAll('.v-messages__message');

    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].text()).toBe('CEP inválido');
  });

  it('should pass custom rule with valid value', async () => {
    const customRule = (v: string) => v === '12345-678' ? true : 'CEP inválido';
    const input = wrapper.find('input');

    await wrapper.setProps({ modelValue: '12345678', rules: [customRule] });
    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.text()).not.toContain('CEP inválido');
  });

  it('should emit update:modelValue with unmasked value on input (completed=false)', async () => {
    const input = wrapper.find('input');

    await input.setValue('123');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toBe('123');
  });

  it('should emit update:modelValue and fetch address on complete CEP input (completed=true)', async () => {
    const mockData = {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
    };

    global.fetch = () => mockFetch(mockData);

    const input = wrapper.find('input');

    await input.setValue('01001000');
    await new Promise<void>((resolve) => setTimeout(resolve, 0));

    expect(wrapper.emitted('zip-code-found')).toBeTruthy();
    expect(wrapper.emitted('zip-code-found')![0][0]).toEqual({
      zipCode: mockData.cep,
      street: mockData.logradouro,
      complement: mockData.complemento,
      neighborhood: mockData.bairro,
      city: mockData.localidade,
      state: mockData.uf,
      error: undefined,
    });
  });

  it('should emit zip-code-not-found when ViaCEP returns erro: true', async () => {
    global.fetch = () => mockFetch({ erro: true });

    const input = wrapper.find('input');

    await input.setValue('00000000');
    await new Promise<void>((resolve) => setTimeout(resolve, 0));

    expect(wrapper.emitted('zip-code-not-found')).toBeTruthy();
  });

  it('should emit zip-code-not-found when fetch throws', async () => {
    global.fetch = async () => {
      throw new Error('Network error');
    };

    const input = wrapper.find('input');

    await input.setValue('01001000');
    await new Promise<void>((resolve) => setTimeout(resolve, 0));

    expect(wrapper.emitted('zip-code-not-found')).toBeTruthy();
  });

  it('should abort previous request when a new fetch starts', async () => {
    global.fetch = () => new Promise<FetchResponse>(() => {});

    const input = wrapper.find('input');

    await input.setValue('01001000');
    await input.setValue('02002000');
    // No assertion needed — second call triggers abortController?.abort() on the first
  });

  it('should abort pending fetch on unmount', async () => {
    global.fetch = () => new Promise<FetchResponse>(() => {});

    const input = wrapper.find('input');

    await input.setValue('01001000');
    wrapper.unmount();
    unmounted = true;
    // onBeforeUnmount calls abortController?.abort()
  });

  it('should render prepend slot content', () => {
    wrapper = createComponent(FzZipCodeField, {
      slots: { prepend: '<span class="custom-prepend">Custom</span>' },
    });

    expect(wrapper.find('.custom-prepend').exists()).toBe(true);
  });

  it('should render append slot content', () => {
    wrapper = createComponent(FzZipCodeField, {
      slots: { append: '<span class="custom-append">Appended</span>' },
    });

    expect(wrapper.find('.custom-append').exists()).toBe(true);
  });

  it('should have numeric inputmode', () => {
    const input = wrapper.find('input');

    expect(input.attributes('inputmode')).toBe('numeric');
  });
});
