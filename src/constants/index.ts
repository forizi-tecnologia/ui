import type { InjectionKey } from 'vue';
import type { FzDefaults } from '@/types/FzDefaults';

export const FZ_DEFAULTS_KEY: InjectionKey<FzDefaults> = Symbol('fz-defaults');

export const MODAL_Z_INDEX = 2400;

export const CONFIRM_Z_INDEX = 2600;

export const NOTIFY_Z_INDEX = 9999;
