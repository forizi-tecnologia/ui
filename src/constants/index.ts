import type { InjectionKey } from 'vue';
import type { FzDefaults } from '@/types/FzDefaults';

export const FZ_DEFAULTS_KEY: InjectionKey<FzDefaults> = Symbol('fz-defaults');
