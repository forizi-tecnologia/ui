import type { TextFieldVariant, TextFieldDensity, HideDetails } from '@/utils/types';

export type SelectValue = string | number;

export type SelectModelValue = SelectValue | SelectValue[] | null;

export type SelectValidationRule = (value: unknown) => boolean | string;

export interface FzSelectFieldProps {
  modelValue?: SelectModelValue;
  label?: string;
  items?: readonly unknown[];
  itemTitle?: string;
  itemValue?: string;
  rules?: SelectValidationRule[];
  disabled?: boolean;
  hint?: string;
  persistentHint?: boolean;
  required?: boolean;
  validateOnBlur?: boolean;
  requiredMessage?: string;
  variant?: TextFieldVariant;
  density?: TextFieldDensity;
  hideDetails?: HideDetails;
  clearable?: boolean;
  multiple?: boolean;
}

export type FzAutocompleteFieldProps = FzSelectFieldProps;

export interface FzSelectBaseProps extends FzSelectFieldProps {
  component: 'select' | 'autocomplete';
}
