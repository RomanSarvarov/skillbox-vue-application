<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="decreaseAmount">
      <svg :width="svgSize" :height="svgSize" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amount" name="count" />

    <button type="button" aria-label="Добавить один товар" @click.prevent="increaseAmount">
      <svg :width="svgSize" :height="svgSize" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
    },
    svgSize: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    amount: {
      get() {
        return this.modelValue;
      },
      set(value) {
        if (value < 1) {
          return;
        }

        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    increaseAmount() {
      this.amount += 1;
    },
    decreaseAmount() {
      this.amount -= 1;
    },
  },
};
</script>
