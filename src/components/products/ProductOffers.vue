<template>
  <ul class="sizes" v-if="props.length">
    <li class="sizes__item" v-for="prop in props" :key="prop.id">
      <label class="sizes__label">
        <input v-model="currentProp" class="sizes__radio sr-only" type="radio" :value="prop.id" />
        <span class="sizes__value">{{ prop.value }}</span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    modelValue: {},
    props: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  computed: {
    currentProp: {
      get() {
        return this.modelValue;
      },
      set(propId) {
        this.$emit('update:modelValue', propId);
      },
    },
    firstProp() {
      return this.props.length > 0
        ? this.props[0]
        : null;
    },
  },
  created() {
    this.currentProp = this.firstProp
      ? this.firstProp.id
      : null;
  },
};
</script>

<style scoped>
.sizes {
  margin-top: 12px;
}
</style>
