<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="productData in productsData" :key="productData.product.id">
        <h3>{{ productData.product.title }}</h3>
        <b>{{ numberFormat.price(productData.amount * productData.product.price) }} ₽</b>
        <span>Артикул: {{ productData.product.id }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Итого: <b>{{ count }}</b> товара на сумму <b>{{ numberFormat.price(total) }} ₽</b></p>
    </div>

    <slot/>
  </div>
</template>

<script>
export default {
  props: ['total', 'count', 'productsData'],
};
</script>
