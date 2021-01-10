<template>
  <fieldset class="form__block">
    <legend class="form__legend">Категория</legend>
    <label class="form__label form__label--select">
      <select class="form__select" name="category" v-model.number="currentCategoryId">
        <option value="0">Все категории</option>
        <option
            v-for="category in categories"
            :value="category.id"
            :key="category.id">
          {{ category.title }}
        </option>
      </select>
    </label>
  </fieldset>

  <ProductPropsFilter
    v-model="currentProps"
    :category-id="currentCategoryId"
  />
</template>

<script>
import { mapActions } from 'vuex';
import ProductPropsFilter from '@/components/products/filter/ProductPropsFilter';

export default {
  components: { ProductPropsFilter },
  props: ['categoryId', 'props'],
  emits: ['update:categoryId', 'update:props'],
  data() {
    return {
      categoriesData: null,
      currentProps: {},
      colorsData: null,
    };
  },
  computed: {
    currentCategoryId: {
      get() {
        return this.categoryId;
      },
      set(value) {
        this.currentProps = {};
        this.$emit('update:categoryId', value);
      },
    },
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
  },
  watch: {
    currentProps(props) {
      this.$emit('update:props', props);
    },
  },
  methods: {
    ...mapActions('productCategory', ['loadCategoriesData']),
    ...mapActions('productColor', ['loadColorsData']),

    async loadCategories() {
      this.categoriesData = await this.loadCategoriesData();
    },
    async loadColors() {
      this.colorsData = await this.loadColorsData();
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>

<style>
.form__block-element--not-first {
  margin-top: 30px;
}
</style>
