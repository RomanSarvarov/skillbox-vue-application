<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input
          v-model="currentColor"
          class="colors__radio sr-only"
          type="radio"
          :value="color.id"
        />
        <span class="colors__value" :style="'background-color: ' + color.code + ';'"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['modelValue', 'colors'],
  emits: ['update:modelValue'],
  computed: {
    currentColor: {
      set(color) {
        this.$emit('update:modelValue', color);
      },
      get() {
        return this.modelValue;
      },
    },
    firstColor() {
      return this.colors.length > 0
        ? this.colors[0]
        : null;
    },
  },
  created() {
    this.currentColor = this.firstColor
      ? this.firstColor.id
      : null;
  },
};
</script>
