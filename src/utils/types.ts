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
