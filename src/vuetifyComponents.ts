/**
 * Vuetify components required by this library.
 *
 * Use this when configuring Vuetify in the consumer project to
 * register only the components this library needs, avoiding a
 * full import of `vuetify/components`.
 *
 * @example
 * // consumer's vuetify.ts
 * import { requiredVuetifyComponents } from '@forizi/ui'
 * import { ... } from 'vuetify/components' // your own components
 *
 * export default createVuetify({
 *   components: {
 *     ...requiredVuetifyComponents,
 *     // ...your other components
 *   },
 * })
 */
import type { Component } from 'vue';
import {
  VAlert,
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VCol,
  VDialog,
  VIcon,
  VMenu,
  VProgressCircular,
  VRow,
  VSelect,
  VSpacer,
  VTextField,
  VTooltip,
} from 'vuetify/components';

export const requiredVuetifyComponents: Record<string, Component> = {
  VAlert,
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VCol,
  VDialog,
  VIcon,
  VMenu,
  VProgressCircular,
  VRow,
  VSelect,
  VSpacer,
  VTextField,
  VTooltip,
};
