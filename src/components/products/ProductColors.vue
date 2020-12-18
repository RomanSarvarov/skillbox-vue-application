<template>
  <ul class="colors" :class="classes">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input
          v-model="selected"
          class="colors__radio sr-only"
          type="radio"
          :value="color.code"
        />
        <span class="colors__value" :style="'background-color: ' + color.code + ';'"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['currentColor', 'colors', 'classes'],
  computed: {
    selected: {
      set(colorCode) {
        this.$emit('update:currentColor', colorCode);
      },
      get() {
        return this.currentColor;
      },
    },
  },
};
</script>
