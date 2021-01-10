<template>
  <BaseFormField :error="error" :title="title">
    <input
        class="form__input"
        :type="type"
        :placeholder="formattedPlaceholder"
        :name="name"
        v-model="currentValue"
    />
  </BaseFormField>
</template>

<script>
import FormFieldMixin from '@/mixins/form-field.mixin';

export default {
  mixins: [FormFieldMixin],
  props: {
    type: {
      default: 'text',
    },
  },
};
</script>
