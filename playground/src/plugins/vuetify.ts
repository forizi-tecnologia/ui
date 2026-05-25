import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { requiredVuetifyComponents } from '@/index';

const defaultLightColors = {
  primary: '#1867C0',
  secondary: '#5CBBF6',
  accent: '#005CAF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FB8C00',
  background: '#FFFFFF',
  surface: '#FFFFFF',
};

const defaultDarkColors = {
  primary: '#2196F3',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFA726',
  background: '#121212',
  surface: '#212121',
};

export default createVuetify({
  components: {
    ...requiredVuetifyComponents,
  },
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: defaultLightColors,
      },
      dark: {
        dark: true,
        colors: defaultDarkColors,
      },
    },
  },
  defaults: {
    VTextField: { variant: 'underlined', density: 'comfortable' },
    VTextarea: { variant: 'underlined' },
    VSelect: { variant: 'underlined' },
    VAutocomplete: { variant: 'underlined' },
    VCombobox: { variant: 'underlined' },
  },
});
