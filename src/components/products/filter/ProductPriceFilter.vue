<template>
  <fieldset class="form__block">
    <legend class="form__legend">Цена</legend>
    <label class="form__label form__label--price">
      <input
        class="form__input"
        type="text"
        name="min-price"
        v-model.number="currentPriceFrom"
      />
      <span class="form__value">От</span>
    </label>
    <label class="form__label form__label--price">
      <input
        class="form__input"
        type="text"
        name="max-price"
        v-model.number="currentPriceTo"
      />
      <span class="form__value">До</span>
    </label>
  </fieldset>
</template>

<script>
export default {
  props: ['priceFrom', 'priceTo'],
  emits: ['update:priceFrom', 'update:priceTo'],
  computed: {
    currentPriceFrom: {
      get() {
        return this.priceFrom;
      },
      set(price) {
        this.$emit('update:priceFrom', price);
      },
    },
    currentPriceTo: {
      get() {
        return this.priceTo;
      },
      set(price) {
        this.$emit('update:priceTo', price);
      },
    },
  },
};
</script>
