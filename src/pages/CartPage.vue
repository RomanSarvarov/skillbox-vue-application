<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </RouterLink>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ cartCount }} товар(-ов)
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" method="POST" @submit.prevent="makeOrder">
        <div v-if="isCartLoading">Идет загрузка корзины...</div>
        <div v-else-if="isCartLoadFailed">Не получилось загрузить корзину</div>
        <div class="cart__field" v-else>
          <ul class="cart__list">
            <CartItem
              v-for="cartProduct in cartProducts"
              :cart-product="cartProduct"
              :key="cartProduct.productId"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ numberHelper.price(totalPrice) }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit" v-if="cartCount > 0">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '@/components/cart/CartItem';

export default {
  components: { CartItem },
  computed: {
    ...mapGetters('cart', {
      cartProducts: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      cartCount: 'cartCount',
      isCartLoading: 'isCartLoading',
      isCartLoadFailed: 'isCartLoading',
    }),
  },
  methods: {
    makeOrder() {
      this.$router.push({ name: 'orderCreation' });
    },
  },
};
</script>
