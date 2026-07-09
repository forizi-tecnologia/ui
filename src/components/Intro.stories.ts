import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Forizi UI',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
    options: {
      showPanel: false,
    },
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

const IntroContent = {
  template: `
    <div style="max-width: 800px; margin: 0 auto; padding: 24px; font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #2E3438;">
      <div style="padding: 40px 0 20px; text-align: center;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 12px; color: #1D2125;">👋 Welcome to Forizi UI</h1>
        <p style="font-size: 1.15rem; color: #5E6C84; max-width: 620px; margin: 0 auto;">
          <strong>Production-ready Vue 3 component library built on Vuetify 3.</strong><br/>
          Clean, accessible, and extensible components that solve real-world UI problems — form inputs, modals, notifications, loading overlays, and more. No reinventing the wheel, just what you actually need to ship faster.
        </p>
      </div>

      <hr style="border: none; border-top: 1px solid #DFE1E6; margin: 32px 0;" />

      <h2 style="font-size: 1.5rem; font-weight: 600; color: #1D2125; margin: 32px 0 12px;">What is Forizi UI?</h2>
      <p>
        Forizi UI is a <strong>Vue 3 + TypeScript + Vuetify 3</strong> component library designed for teams that want consistent, well-tested UI building blocks without writing everything from scratch. It wraps and extends Vuetify components with sensible defaults, Portuguese (pt-BR) labels, and useful abstractions — while keeping full Vuetify customization through your theme.
      </p>
      <p>Every component is:</p>
      <ul>
        <li><strong>Self-contained</strong> — drop it in and it works</li>
        <li><strong>Override-friendly</strong> — every label and behavior can be customized via props</li>
        <li><strong>Zero-config for Vuetify projects</strong> — just register and start using</li>
        <li><strong>Tree-shakeable</strong> — import only what you need</li>
      </ul>

      <h2 style="font-size: 1.5rem; font-weight: 600; color: #1D2125; margin: 32px 0 12px;">Why Forizi UI?</h2>
      <p>Building production apps with raw Vuetify means you end up writing the same patterns over and over. Forizi UI packages these battle-tested patterns into reusable, typed components.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <thead>
          <tr style="background: #F4F5F7;">
            <th style="padding: 10px 14px; text-align: left; border: 1px solid #DFE1E6;">Raw Vuetify</th>
            <th style="padding: 10px 14px; text-align: left; border: 1px solid #DFE1E6;">Forizi UI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px 14px; border: 1px solid #DFE1E6;"><code style="background: #F4F5F7; padding: 2px 6px; border-radius: 3px; font-size: 0.88rem;">v-text-field + mask + format</code></td>
            <td style="padding: 10px 14px; border: 1px solid #DFE1E6;"><code style="background: #F4F5F7; padding: 2px 6px; border-radius: 3px; font-size: 0.88rem;">FzMoneyField v-model="price" currency="BRL"</code></td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; border: 1px solid #DFE1E6;"><code style="background: #F4F5F7; padding: 2px 6px; border-radius: 3px; font-size: 0.88rem;">Manual dialog + actions + state</code></td>
            <td style="padding: 10px 14px; border: 1px solid #DFE1E6;"><code style="background: #F4F5F7; padding: 2px 6px; border-radius: 3px; font-size: 0.88rem;">FzModalBase v-model="open" :actions="actions"</code></td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; border: 1px solid #DFE1E6;"><code style="background: #F4F5F7; padding: 2px 6px; border-radius: 3px; font-size: 0.88rem;">Custom snackbar + queue + animation</code></td>
            <td style="padding: 10px 14px; border: 1px solid #DFE1E6;"><code style="background: #F4F5F7; padding: 2px 6px; border-radius: 3px; font-size: 0.88rem;">notify.success('Saved!', 'Item saved')</code></td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; border: 1px solid #DFE1E6;"><code style="background: #F4F5F7; padding: 2px 6px; border-radius: 3px; font-size: 0.88rem;">v-overlay + spinner + manual</code></td>
            <td style="padding: 10px 14px; border: 1px solid #DFE1E6;"><code style="background: #F4F5F7; padding: 2px 6px; border-radius: 3px; font-size: 0.88rem;">loading.show() / loading.hide()</code></td>
          </tr>
        </tbody>
      </table>

      <h2 style="font-size: 1.5rem; font-weight: 600; color: #1D2125; margin: 32px 0 12px;">Key Features</h2>

      <h3 style="font-size: 1.2rem; font-weight: 600; color: #1D2125; margin: 24px 0 8px;">📝 Smart Inputs</h3>
      <p>Pre-configured form fields with masking, validation, and formatting out of the box:</p>
      <ul>
        <li><strong>FzMoneyField</strong> — Currency input with locale-aware formatting (BRL, USD, EUR)</li>
        <li><strong>FzNumberField</strong> — Numeric input with configurable decimal places</li>
        <li><strong>FzPhoneField</strong> — Brazilian phone number mask (mobile and landline)</li>
        <li><strong>FzZipCodeField</strong> — Brazilian CEP input with auto-address lookup</li>
        <li><strong>FzEmailField</strong> — Email input with built-in validation</li>
        <li><strong>FzFullAddress</strong> — Composite address component</li>
      </ul>

      <h3 style="font-size: 1.2rem; font-weight: 600; color: #1D2125; margin: 24px 0 8px;">🔔 Global Utilities (no setup)</h3>
      <p>Import and use anywhere — no component instances needed in your template:</p>
      <pre style="background: #1D2125; color: #B3BAC5; padding: 16px 20px; border-radius: 6px; font-size: 0.88rem; overflow-x: auto;"><code>import { notify, confirm, loading } from '@forizi/ui';

// Notification toasts — auto-hide with progress bar, pause on hover
notify.success('Saved!', 'Your changes have been saved');
notify.error('Error', 'Something went wrong');

// Async confirmation dialogs
const ok = await confirm.show('Delete?', 'This cannot be undone');
if (ok) await deleteItem();

// Loading overlay
loading.show('Processing...');
await doWork();
loading.hide();</code></pre>

      <h3 style="font-size: 1.2rem; font-weight: 600; color: #1D2125; margin: 24px 0 8px;">📐 Config Provider</h3>
      <p>Set global defaults once — every <code style="background: #F4F5F7; padding: 2px 6px; border-radius: 3px;">Fz*</code> component inherits them:</p>
      <pre style="background: #1D2125; color: #B3BAC5; padding: 16px 20px; border-radius: 6px; font-size: 0.88rem; overflow-x: auto;"><code>&lt;FzConfigProvider :defaults="{ variant: 'outlined' }"&gt;
  &lt;FzMoneyField v-model="price" label="Price" /&gt;
  &lt;FzEmailField v-model="email" label="Email" /&gt;
  &lt;!-- Override per instance --&gt;
  &lt;FzPhoneField v-model="phone" variant="filled" /&gt;
&lt;/FzConfigProvider&gt;</code></pre>

      <h3 style="font-size: 1.2rem; font-weight: 600; color: #1D2125; margin: 24px 0 8px;">🧩 Composable API</h3>
      <p>Reactive utilities for use inside <code style="background: #F4F5F7; padding: 2px 6px; border-radius: 3px;">setup()</code>:</p>
      <pre style="background: #1D2125; color: #B3BAC5; padding: 16px 20px; border-radius: 6px; font-size: 0.88rem; overflow-x: auto;"><code>import { useBreakpoint, useGlobals } from '@forizi/ui';

const { isMobile, isMobileOrTablet } = useBreakpoint();
const { notify, loading, confirm } = useGlobals();</code></pre>

      <h2 style="font-size: 1.5rem; font-weight: 600; color: #1D2125; margin: 32px 0 12px;">Components at a Glance</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <thead>
          <tr style="background: #F4F5F7;">
            <th style="padding: 10px 14px; text-align: left; border: 1px solid #DFE1E6;">Category</th>
            <th style="padding: 10px 14px; text-align: left; border: 1px solid #DFE1E6;">Component</th>
            <th style="padding: 10px 14px; text-align: left; border: 1px solid #DFE1E6;">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 8px 14px; border: 1px solid #DFE1E6; font-weight: 600;" rowspan="6">Inputs</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">FzMoneyField</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">Formatted currency input</td></tr>
          <tr><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">FzNumberField</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">Numeric input with configurable decimals</td></tr>
          <tr><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">FzPhoneField</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">Phone number with pt-BR mask</td></tr>
          <tr><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">FzZipCodeField</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">CEP input with address lookup</td></tr>
          <tr><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">FzEmailField</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">Email with built-in validation</td></tr>
          <tr><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">FzFullAddress</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">Composite address form</td></tr>

          <tr style="background: #FAFBFC;"><td style="padding: 8px 14px; border: 1px solid #DFE1E6; font-weight: 600;">Modals</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">FzModalBase</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">Flexible modal dialog with action buttons</td></tr>

          <tr><td style="padding: 8px 14px; border: 1px solid #DFE1E6; font-weight: 600;" rowspan="3">Messages</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">FzFloatingNotify</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">Floating notification toast system</td></tr>
          <tr><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">FzConfirmDialog</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">Global async confirmation dialog</td></tr>
          <tr><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">FzCustomConfirmDialog</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">Custom-styled confirmation dialog</td></tr>

          <tr style="background: #FAFBFC;"><td style="padding: 8px 14px; border: 1px solid #DFE1E6; font-weight: 600;" rowspan="2">Layout</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">FzConfigProvider</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">Global defaults provider</td></tr>
          <tr style="background: #FAFBFC;"><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">FzLoadingOverlay</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">Full-screen loading overlay</td></tr>

          <tr><td style="padding: 8px 14px; border: 1px solid #DFE1E6; font-weight: 600;">Buttons</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">FzIconToolTip</td><td style="padding: 8px 14px; border: 1px solid #DFE1E6;">Icon button with tooltip</td></tr>
        </tbody>
      </table>

      <h2 style="font-size: 1.5rem; font-weight: 600; color: #1D2125; margin: 32px 0 12px;">Quick Start</h2>
      <pre style="background: #1D2125; color: #B3BAC5; padding: 16px 20px; border-radius: 6px; font-size: 0.88rem; overflow-x: auto;"><code>pnpm add @forizi/ui</code></pre>
      <p style="font-size: 0.9rem; color: #5E6C84;">Make sure your project already has <strong>Vue 3, Vuetify 3, Pinia, and Axios</strong> installed (they are peer dependencies — not bundled).</p>

      <pre style="background: #1D2125; color: #B3BAC5; padding: 16px 20px; border-radius: 6px; font-size: 0.88rem; overflow-x: auto;"><code>import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import { setupLib, requiredVuetifyComponents } from '@forizi/ui';
import '@forizi/ui/style.css';

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify({ components: requiredVuetifyComponents });

app.use(pinia);
app.use(vuetify);
setupLib(app);
app.mount('#app');</code></pre>

      <pre style="background: #1D2125; color: #B3BAC5; padding: 16px 20px; border-radius: 6px; font-size: 0.88rem; overflow-x: auto;"><code>&lt;!-- App.vue --&gt;
&lt;template&gt;
  &lt;v-app&gt;
    &lt;FzConfigProvider :defaults="{ variant: 'outlined' }"&gt;
      &lt;router-view /&gt;
      &lt;FzFloatingNotify /&gt;
      &lt;FzLoadingOverlay /&gt;
      &lt;FzConfirmDialog /&gt;
    &lt;/FzConfigProvider&gt;
  &lt;/v-app&gt;
&lt;/template&gt;</code></pre>

      <h2 style="font-size: 1.5rem; font-weight: 600; color: #1D2125; margin: 32px 0 12px;">Tree-shakeable Imports</h2>
      <pre style="background: #1D2125; color: #B3BAC5; padding: 16px 20px; border-radius: 6px; font-size: 0.88rem; overflow-x: auto;"><code>// Main barrel — everything
import { FzMoneyField, useBreakpoint, notify } from '@forizi/ui';

// Components only
import { FzMoneyField, FzModalBase } from '@forizi/ui/components';

// Composables only
import { useBreakpoint } from '@forizi/ui/composables';

// Utilities only
import { notify, confirm, loading } from '@forizi/ui/utils';</code></pre>

      <hr style="border: none; border-top: 1px solid #DFE1E6; margin: 40px 0 24px;" />
      <p style="text-align: center; font-size: 0.9rem; color: #5E6C84; padding-bottom: 40px;">
        <strong>Forizi UI</strong> · MIT License · Built on Vuetify 3
      </p>
    </div>
  `,
};

export const Welcome: Story = {
  render: () => ({
    components: { IntroContent },
    template: '<v-app><IntroContent /></v-app>',
  }),
};
