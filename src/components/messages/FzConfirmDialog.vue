<template>
  <FzCustomConfirmDialog ref="customDialogRef" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FzCustomConfirmDialog from './FzCustomConfirmDialog.vue';
import type { ConfirmOptions } from '@/utils/types';

const customDialogRef = ref<InstanceType<typeof FzCustomConfirmDialog> | null>(null);

const confirmDialog = (title: string, message: string, options?: ConfirmOptions): Promise<boolean> => {
  return (customDialogRef.value as InstanceType<typeof FzCustomConfirmDialog>).confirmDialog(title, message, options);
};

defineExpose({
  confirmDialog,
});
</script>
