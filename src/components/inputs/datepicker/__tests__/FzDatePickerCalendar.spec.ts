import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { createComponent } from '@/testutils';
import FzDatePickerCalendar from '../FzDatePickerCalendar.vue';

beforeAll(() => {
  vi.stubGlobal('visualViewport', {
    width: 1024,
    height: 768,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });

  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

describe('FzDatePickerCalendar', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzDatePickerCalendar, {
      attachTo: document.body,
      props: {
        open: true,
        selected: '2024-03-15',
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function findMenu() {
    return wrapper.findComponent({ name: 'v-menu' });
  }

  function findHeaderButtons() {
    return wrapper.findAllComponents({ name: 'v-btn' });
  }

  function findTriggerIcon() {
    return wrapper
      .findAllComponents({ name: 'v-icon' })
      .find((icon) => icon.classes().some((cls) => cls.startsWith('mdi-calendar')));
  }

  function findArrowButton(iconClass: string) {
    return findHeaderButtons().find((btn) => {
      const icon = btn.findComponent({ name: 'v-icon' });

      return icon.exists() && icon.classes().includes(iconClass);
    });
  }

  function bodyText(): string {
    return document.body.textContent ?? '';
  }

  it('should render the calendar trigger icon', () => {
    const icon = findTriggerIcon();

    expect(icon?.exists()).toBe(true);
    expect(icon?.classes()).toContain('mdi-calendar');
  });

  it('should render a custom trigger icon', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePickerCalendar, {
      attachTo: document.body,
      props: { open: true, selected: '', icon: 'mdi-calendar-month' },
    });

    expect(findTriggerIcon()?.classes()).toContain('mdi-calendar-month');
  });

  it('should pass the open prop down to the menu', () => {
    expect(findMenu().props('modelValue')).toBe(true);
  });

  it('should disable the menu when disabled prop is true', async () => {
    await wrapper.setProps({ disabled: true });

    expect(findMenu().props('disabled')).toBe(true);
  });

  it('should show the month and year as the header title in the days view', () => {
    expect(bodyText()).toContain('Março de 2024');
  });

  it('should show only the year as the header title after drilling into months', async () => {
    const title = findHeaderButtons().find((btn) => btn.text().includes('Março'));

    await title?.trigger('click');

    expect(bodyText()).toContain('2024');
    expect(bodyText()).not.toContain('Março de 2024');
  });

  it('should navigate to the previous month with the left arrow', async () => {
    const prevButton = findArrowButton('mdi-chevron-left');

    await prevButton?.trigger('click');

    expect(bodyText()).toContain('Fevereiro de 2024');
  });

  it('should navigate to the next month with the right arrow', async () => {
    const nextButton = findArrowButton('mdi-chevron-right');

    await nextButton?.trigger('click');

    expect(bodyText()).toContain('Abril de 2024');
  });

  it('should emit select and close the menu when a day is picked', async () => {
    const dayButtons = wrapper.findAllComponents({ name: 'v-btn' });
    const day20 = dayButtons.find((btn) => btn.text() === '20');

    await day20?.trigger('click');

    expect(wrapper.emitted('select')?.[0]).toEqual(['2024-03-20']);
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false]);
  });

  it('should select today using the default pt-BR label', async () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const todayBtn = buttons.find((btn) => btn.text() === 'Hoje');

    expect(todayBtn?.exists()).toBe(true);
  });

  it('should use the english today label when locale is en', async () => {
    await wrapper.setProps({ locale: 'en' });

    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const todayBtn = buttons.find((btn) => btn.text() === 'Today');

    expect(todayBtn?.exists()).toBe(true);
  });

  it('should use a custom today label when provided', async () => {
    await wrapper.setProps({ todayLabel: 'Agora' });

    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const todayBtn = buttons.find((btn) => btn.text() === 'Agora');

    expect(todayBtn?.exists()).toBe(true);
  });

  it('should select a month and drill back to the days view', async () => {
    const title = findHeaderButtons().find((btn) => btn.text().includes('Março'));

    await title?.trigger('click');

    const monthButtons = wrapper.findAllComponents({ name: 'v-btn' });
    const july = monthButtons.find((btn) => btn.text() === 'Jul');

    await july?.trigger('click');

    expect(bodyText()).toContain('Julho de 2024');
  });

  it('should select a year and drill to the months view', async () => {
    const title = findHeaderButtons().find((btn) => btn.text().includes('Março'));

    await title?.trigger('click');
    await title?.trigger('click');

    const yearButtons = wrapper.findAllComponents({ name: 'v-btn' });
    const year2030 = yearButtons.find((btn) => btn.text() === '2030');

    await year2030?.trigger('click');

    expect(bodyText()).toContain('2030');
    expect(wrapper.findAllComponents({ name: 'v-btn' }).some((btn) => btn.text() === 'Jan')).toBe(true);
  });

  it('should reset the focused view and date when reopened', async () => {
    const title = findHeaderButtons().find((btn) => btn.text().includes('Março'));

    await title?.trigger('click');

    await wrapper.setProps({ open: false });
    await wrapper.setProps({ open: true });

    expect(bodyText()).toContain('Março de 2024');
  });
});
