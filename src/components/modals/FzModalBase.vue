<template>
  <v-dialog
    v-model="isOpen"
    :max-width="maxWidth"
    :persistent="persistent"
    :content-class="dialogContentClass"
    :fullscreen="fullscreen"
    scrollable
    :z-index="2400"
    @keydown="onDialogKeydown"
  >
    <v-card>
      <v-card-title
        v-if="title"
        class="text-h5 d-flex align-center modal-title"
        :class="titleSpacingClass"
      >
        <v-icon v-if="titleIcon" class="mr-2">{{ titleIcon }}</v-icon>
        <span>{{ title }}</span>
      </v-card-title>

      <v-card-text :class="bodySpacingClass">
        <slot>
          {{ message }}
        </slot>
      </v-card-text>

      <v-card-actions :class="actionsSpacingClass">
        <v-spacer />
        <v-btn
          v-for="(action, index) in actions"
          :key="index"
          :color="action.color || 'primary'"
          :prepend-icon="action.icon"
          :variant="action.variant || getDefaultVariant(action.color)"
          type="button"
          class="text-none"
          @click="handleAction(action)"
        >
          {{ action.text }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from 'vuetify';

const MIN_MODAL_SPACING = 0;
const MAX_MODAL_SPACING = 12;

export interface ModalAction {
  text: string;
  icon?: string;
  color?: string;
  variant?: 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain';
  handler?: () => void | Promise<void>;
}

interface Props {
  modelValue: boolean;
  title?: string;
  message?: string;
  maxWidth?: string | number;
  persistent?: boolean;
  enterToConfirm?: boolean;
  actions?: ModalAction[];
  contentClass?: string;
  fullscreen?: boolean;
  titleIcon?: string;
  padding?: number;
  mobilePadding?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  message: '',
  maxWidth: 500,
  persistent: true,
  enterToConfirm: false,
  actions: () => [],
  contentClass: undefined,
  fullscreen: false,
  titleIcon: undefined,
  padding: 4,
  mobilePadding: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const theme = useTheme();

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const dialogThemeClass = computed(() => `v-theme--${theme.global.name.value}`);

const dialogContentClass = computed(() => {
  if (!props.contentClass) return dialogThemeClass.value;

  return `${dialogThemeClass.value} ${props.contentClass}`;
});

const desktopInset = computed(() => clampSpacing(props.padding));
const mobileInset = computed(() => clampSpacing(props.mobilePadding ?? Math.floor(desktopInset.value / 2)));

const horizontalPaddingClass = computed(() => `px-${mobileInset.value} px-md-${desktopInset.value}`);

const titleSpacingClass = computed(
  () => `${horizontalPaddingClass.value} pt-${mobileInset.value} pt-md-${desktopInset.value} pb-${mobileInset.value} pb-md-${desktopInset.value}`,
);

const bodySpacingClass = computed(() => props.title
  ? `${horizontalPaddingClass.value} py-0`
  : `${horizontalPaddingClass.value} pt-${mobileInset.value} pt-md-${desktopInset.value} pb-0`);

const actionsSpacingClass = computed(
  () => `${horizontalPaddingClass.value} py-${mobileInset.value} py-md-${desktopInset.value}`,
);

function clampSpacing(value: number): number {
  return Math.min(Math.max(value, MIN_MODAL_SPACING), MAX_MODAL_SPACING);
}

function findCancelAction(): ModalAction | undefined {
  return props.actions.find((a) => a.color === 'secondary' || a.color === 'error');
}

function findPrimaryAction(): ModalAction | undefined {
  return props.actions.find(
    (a) => a.color === 'primary' || (!a.color && props.actions.indexOf(a) === props.actions.length - 1),
  );
}

function isInteractiveElement(target: HTMLElement): boolean {
  return target.tagName === 'TEXTAREA';
}

function getDefaultVariant(color?: string): 'elevated' | 'outlined' | 'text' {
  if (!color || color === 'primary') return 'elevated';

  if (color === 'secondary' || color === 'error') return 'outlined';

  return 'text';
}

async function handleAction(action: ModalAction): Promise<void> {
  if (!action.handler) return;

  await action.handler();
}

function onDialogKeydown(e: KeyboardEvent): void {
  if (props.actions.length === 0) return;

  if (e.key === 'Escape') {
    if (props.persistent) return;

    const cancelAction = findCancelAction();

    if (!cancelAction) return;

    e.preventDefault();
    e.stopPropagation();
    handleAction(cancelAction);

    return;
  }

  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    if (!props.enterToConfirm) return;

    const target = e.target as HTMLElement;

    if (isInteractiveElement(target)) return;

    const primaryAction = findPrimaryAction();

    if (!primaryAction) return;

    e.preventDefault();
    e.stopPropagation();
    handleAction(primaryAction);
  }
}

</script>

<style scoped>
.modal-title {
  word-break: break-word;
  white-space: normal;
}
</style>

<!-- Vuetify renders overlays as siblings at root; adjust z-index so v-select/v-menu popups inside this dialog appear above the dialog overlay -->
<style>
.v-overlay-container .v-menu > .v-overlay__content,
.v-overlay-container .v-select__content,
.v-overlay-container .v-autocomplete__content {
  z-index: 2500;
}
</style>
