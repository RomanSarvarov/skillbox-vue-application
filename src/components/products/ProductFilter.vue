<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="apply()">
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

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" name="category" v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option
              v-for="category in categories"
              :value="category.id"
              :key="category.id">
              {{ category.name }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item">
            <label class="colors__label">
              <input
                  class="colors__radio sr-only"
                  type="radio"
                  name="color"
                  value="#73b6ea"
                  v-model="currentColor"
              />
              <span class="colors__value" style="background-color: #73b6ea;"></span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#ffbe15"
                v-model="currentColor"
              />
              <span class="colors__value" style="background-color: #FFBE15;"></span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#939393"
                v-model="currentColor"
              />
              <span class="colors__value" style="background-color: #939393;"></span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#8be000"
                v-model="currentColor"
              />
              <span class="colors__value" style="background-color: #8be000;"></span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#ff6b00"
                v-model="currentColor"
              />
              <span class="colors__value" style="background-color: #FF6B00;"></span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#ffffff"
                v-model="currentColor"
              />
              <span class="colors__value" style="background-color: #ffffff;"></span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#000000"
                v-model="currentColor"
              />
              <span class="colors__value" style="background-color: #000000;"></span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import categories from '@/data/categories';

export default {
  props: ['priceFrom', 'priceTo', 'categoryId'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: null,
    };
  },
  computed: {
    categories() {
      return categories;
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    currentColor(value) {
      this.currentColor = value;
    },
  },
  methods: {
    apply(reset = false) {
      this.$emit('update:priceFrom', reset ? 0 : this.currentPriceFrom);
      this.$emit('update:priceTo', reset ? 0 : this.currentPriceTo);
      this.$emit('update:categoryId', reset ? 0 : this.currentCategoryId);
      this.$emit('update:color', reset ? null : this.currentColor);
    },
    reset() {
      this.apply(true);
    },
  },
};
</script>
