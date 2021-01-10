<template>
  <fieldset class="form__block" v-if="propsData">
    <div
        v-for="(prop, index) in propsData" :key="prop.id"
        class="form__block-element"
        :class="{ 'form__block-element--not-first': index > 0 }">
      <legend class="form__legend">{{ prop.title }}</legend>

      <ul class="check-list">
        <li class="check-list__item" v-for="availableValue in prop.availableValues" :key="availableValue.value">
          <label class="check-list__label">
            <input
                v-model="currentProps[prop.code]"
                class="check-list__check sr-only"
                type="checkbox"
                :value="availableValue.value"
            />
            <span class="check-list__desc">
              {{ availableValue.value }}
              <span>({{ availableValue.productsCount }})</span>
            </span>
          </label>
        </li>
      </ul>
    </div>
  </fieldset>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['modelValue', 'categoryId'],
  emits: ['update:modelValue'],
  data() {
    return {
      currentProps: {},
      propsData: null,
    };
  },
  watch: {
    currentProps(props) {
      this.$emit('update:modelValue', props);
    },
    categoryId(value) {
      this.loadCategory(value);
    },
    propsData(propsData) {
      this.currentProps = {};

      if (!propsData) {
        return;
      }

      propsData.forEach((propData) => {
        this.currentProps[propData.code] = [];
      });
    },
  },
  methods: {
    ...mapActions('productCategory', ['loadCategoryData']),

    async loadCategory(categoryId) {
      if (!categoryId) {
        this.propsData = null;
        return;
      }
      this.propsLoading = true;

      const categoryData = await this.loadCategoryData(categoryId);

      if (!categoryData) {
        this.propsData = null;
        return;
      }

      this.propsData = categoryData.productProps || null;
    },
  },
};
</script>
