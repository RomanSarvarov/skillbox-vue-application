import BaseFormField from '@/components/form/BaseFormField';

export default {
  components: { BaseFormField },
  props: ['modelValue', 'name', 'error', 'title', 'placeholder'],
  computed: {
    currentValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
    formattedPlaceholder() {
      return this.placeholder || `Введите ${this.title}`;
    },
  },
};
