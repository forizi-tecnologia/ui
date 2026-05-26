import { inject } from 'vue';
import { FZ_DEFAULTS_KEY } from '@/constants';
import type { FzDefaults } from '@/types/FzDefaults';

export function useFzDefaults(): FzDefaults {
  return inject(FZ_DEFAULTS_KEY, {});
}
