<template>
  <BaseFormField :error="error" :title="title">
    <textarea
      class="form__input form__input--area"
      :name="name"
      :placeholder="formattedPlaceholder"
      v-model="currentValue">
    </textarea>
  </BaseFormField>
</template>

<script>
import FormFieldMixin from '@/mixins/form-field.mixin';

export default {
  mixins: [FormFieldMixin],
};
</script>
