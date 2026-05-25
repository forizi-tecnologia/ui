import { computed } from 'vue';
import { useDisplay } from 'vuetify';

export function useBreakpoint() {
  const display = useDisplay();

  const isMobile = computed(() => display.xs.value);
  const isMobileOrTablet = computed(() => display.smAndDown.value);

  return {
    isMobile,
    isMobileOrTablet,
  };
}
