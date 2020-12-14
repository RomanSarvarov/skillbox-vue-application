<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.name">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.name }}
      </a>
    </h3>

    <span class="catalog__price">{{ product.price }} ₽</span>

    <ul class="colors colors--black">
      <li class="colors__item">
        <label class="colors__label">
          <input
            v-model="color"
            class="colors__radio sr-only"
            type="radio"
            value="#7386ea"
            checked
          />
          <span class="colors__value" style="background-color: #7386ea;"></span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input
            v-model="color"
            class="colors__radio sr-only"
            type="radio"
            value="#8be000"
          />
          <span class="colors__value" style="background-color: #8be000;"></span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input
            v-model="color"
            class="colors__radio sr-only"
            type="radio"
            value="#222"
          />
          <span class="colors__value" style="background-color: #222;"></span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      color: '#7386ea',
    };
  },
};
</script>
