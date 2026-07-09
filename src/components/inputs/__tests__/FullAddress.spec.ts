import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createComponent } from '@/testutils';
import FzFullAddress from '../FzFullAddress.vue';
import FzZipCodeField from '../FzZipCodeField.vue';

const FULL_ADDRESS = {
  zipCode: '01001000',
  street: 'Rua Exemplo',
  number: '100',
  complement: 'Apto 1',
  neighborhood: 'Centro',
  city: 'São Paulo',
  state: 'SP',
};

const ZIP_RESPONSE = {
  street: 'Rua Encontrada',
  neighborhood: 'Vila Nova',
  city: 'São Paulo',
  state: 'SP',
};

const DEFAULT_LABELS = [
  'CEP',
  'Logradouro',
  'Número',
  'Complemento',
  'Bairro',
  'Cidade',
  'Estado',
] as const;

const CUSTOM_LABELS = [
  { field: 'street', label: 'Rua Custom' },
  { field: 'number', label: 'Nº Custom' },
  { field: 'complement', label: 'Compl Custom' },
  { field: 'neighborhood', label: 'Bairro Custom' },
  { field: 'city', label: 'Cidade Custom' },
  { field: 'state', label: 'Estado Custom' },
] as const;

const MODEL_VALUE_CASES = [
  { input: { street: 'Rua Parcial', number: '42' }, expected: expect.objectContaining({ street: 'Rua Parcial', number: '42' }) },
  { input: FULL_ADDRESS, expected: FULL_ADDRESS },
] as const;

const INPUT_CASES = [
  { index: 2, value: '42', field: 'number', expected: '42' },
  { index: 3, value: 'Apto 5', field: 'complement', expected: 'Apto 5' },
  { index: 4, value: 'Bairro Teste', field: 'neighborhood', expected: 'Bairro Teste' },
  { index: 5, value: 'Cidade Teste', field: 'city', expected: 'Cidade Teste' },
] as const;

describe('FzFullAddress', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzFullAddress);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it.each(DEFAULT_LABELS)('should render default label "%s"', (label) => {
    expect(wrapper.text()).toContain(label);
  });

  it.each(CUSTOM_LABELS)('should render custom label for $field', ({ label }) => {
    wrapper = createComponent(FzFullAddress, {
      props: {
        labels: {
          street: 'Rua Custom',
          number: 'Nº Custom',
          complement: 'Compl Custom',
          neighborhood: 'Bairro Custom',
          city: 'Cidade Custom',
          state: 'Estado Custom',
        },
      },
    });

    expect(wrapper.text()).toContain(label);
  });

  it.each(MODEL_VALUE_CASES)('should sync internal when modelValue is set externally (no re-emit)', async () => {
    await wrapper.setProps({ modelValue: { street: 'Rua Sincronizada', number: '42' } });

    // External prop changes sync internally (input[1] = street field)
    await wrapper.vm.$nextTick();

    const streetInput = wrapper.findAll('input')[1];

    expect((streetInput.element as HTMLInputElement).value).toBe('Rua Sincronizada');
  });

  it('should disable all inputs when disabled is true', async () => {
    await wrapper.setProps({ disabled: true });

    const inputs = wrapper.findAll('input');

    for (const input of inputs) {
      expect((input.element as HTMLInputElement).disabled).toBe(true);
    }
  });

  it('should enable all inputs by default', () => {
    const inputs = wrapper.findAll('input');

    for (const input of inputs) {
      expect((input.element as HTMLInputElement).disabled).toBe(false);
    }
  });

  it('should fill fields when zip code is found', async () => {
    const zipField = wrapper.findComponent(FzZipCodeField);

    zipField.vm.$emit('zip-code-found', ZIP_RESPONSE);
    await wrapper.vm.$nextTick();

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![emitted!.length - 1][0]).toMatchObject(ZIP_RESPONSE);
    expect(emitted![emitted!.length - 1][0]).toMatchObject({ zipCode: '', number: '', complement: '' });
  });

  it('should toggle zipCodeFound on zip-code-not-found', async () => {
    const zipField = wrapper.findComponent(FzZipCodeField);

    zipField.vm.$emit('zip-code-found', ZIP_RESPONSE);
    await wrapper.vm.$nextTick();

    zipField.vm.$emit('zip-code-not-found');
    await wrapper.vm.$nextTick();

    zipField.vm.$emit('zip-code-found', { ...ZIP_RESPONSE, street: 'Rua B' });
    await wrapper.vm.$nextTick();

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![emitted!.length - 1][0]).toMatchObject({ street: 'Rua B' });
  });

  it('should disable auto fields when disabledFields is true and zip code is found', async () => {
    await wrapper.setProps({ disabledFields: true });

    const zipField = wrapper.findComponent(FzZipCodeField);

    zipField.vm.$emit('zip-code-found', ZIP_RESPONSE);
    await wrapper.vm.$nextTick();

    const disabledFields = wrapper.findAll('.v-field--disabled');

    expect(disabledFields.length).toBeGreaterThan(0);
    expect(disabledFields.length).toBeLessThan(7);
  });

  it('should not disable inputs when disabledFields is true and zip code is not found', async () => {
    await wrapper.setProps({ disabledFields: true });

    const inputs = wrapper.findAll('input');

    for (const input of inputs) {
      expect((input.element as HTMLInputElement).disabled).toBe(false);
    }
  });

  it('should not disable inputs when disabledFields is false and zip code is found', async () => {
    const zipField = wrapper.findComponent(FzZipCodeField);

    zipField.vm.$emit('zip-code-found', ZIP_RESPONSE);
    await wrapper.vm.$nextTick();

    const inputs = wrapper.findAll('input');

    for (const input of inputs) {
      expect((input.element as HTMLInputElement).disabled).toBe(false);
    }
  });

  it('should sync internal when modelValue changes externally (no re-emit)', async () => {
    await wrapper.setProps({ modelValue: { street: 'Rua Alterada', city: 'Nova Cidade' } });

    // After a tick for the watcher to process, verify the street input shows the new value
    await wrapper.vm.$nextTick();

    const streetInput = wrapper.findAll('input')[1];

    expect((streetInput.element as HTMLInputElement).value).toBe('Rua Alterada');
  });

  it('should not re-emit update:modelValue when modelValue is set externally', async () => {
    await wrapper.setProps({ modelValue: { street: 'Rua Externa' } });
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should emit update:modelValue when user types in street', async () => {
    const inputs = wrapper.findAll('input');

    await inputs[1].setValue('Rua Digitada');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toMatchObject({ street: 'Rua Digitada' });
  });

  it.each(INPUT_CASES)('should emit update:modelValue when user types in $field', async ({ index, value, field, expected }) => {
    const inputs = wrapper.findAll('input');

    await inputs[index].setValue(value);

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![emitted!.length - 1][0]).toMatchObject({ [field]: expected });
  });

  it('should update zipCode via FzZipCodeField v-model', async () => {
    const zipField = wrapper.findComponent(FzZipCodeField);

    zipField.vm.$emit('update:modelValue', '12345678');
    await wrapper.vm.$nextTick();

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![emitted!.length - 1][0]).toMatchObject({ zipCode: '12345678' });
  });

  it('should update state via VSelect v-model', async () => {
    const select = wrapper.findComponent({ name: 'VSelect' });

    select.vm.$emit('update:modelValue', 'SP');
    await wrapper.vm.$nextTick();

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![emitted!.length - 1][0]).toMatchObject({ state: 'SP' });
  });

  it('should render with outlined variant', () => {
    wrapper = createComponent(FzFullAddress, {
      props: { variant: 'outlined' },
    });

    expect(wrapper.find('input').exists()).toBe(true);
  });
});
