export interface ConfirmOptions {
  persistent?: boolean;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  cancelColor?: string;
  enterToConfirm?: boolean;
}

export interface ConfirmComponentRef {
  confirmDialog: (title: string, message: string, options?: ConfirmOptions) => Promise<boolean>;
}

export type NotifyType = 'success' | 'error' | 'warning' | 'info';

export interface NotifyOptions {
  type: NotifyType;
  title: string;
  message?: string;
  duration?: number;
}

export const NOTIFY_DURATION = 3000;

export const API_TIMEOUT = 30000;

export type TextFieldVariant = 'outlined' | 'filled' | 'plain' | 'solo' | 'solo-filled' | 'solo-inverted' | 'underlined';

export type TextFieldDensity = 'default' | 'comfortable' | 'compact';

type MenuBlock = 'top' | 'bottom';
type MenuInline = 'start' | 'end' | 'left' | 'right';

export type MenuAnchor =
  | MenuBlock
  | MenuInline
  | 'center'
  | 'center center'
  | `${MenuBlock} ${MenuInline | 'center'}`
  | `${MenuInline} ${MenuBlock | 'center'}`;

export type MenuOrigin = MenuAnchor | 'auto' | 'overlap';
