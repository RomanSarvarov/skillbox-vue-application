<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input
          v-model="selected"
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
  props: ['currentColor', 'colors'],
  computed: {
    selected: {
      set(color) {
        this.$emit('update:currentColor', color);
      },
      get() {
        return this.currentColor;
      },
    },
  },
};
</script>
