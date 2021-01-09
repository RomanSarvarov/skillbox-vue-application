<template>
  <main class="content container" v-if="orderInfo">
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
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" :to="{ name: 'orderCreation' }">
            Оформление заказа
          </RouterLink>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ <span>№ {{ orderId }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <ProductSideList
          :total="orderInfo.totalPrice"
          :count="+orderInfo.basket.items.length"
          :products-data="productsSide"
        />
      </form>
    </section>
  </main>
  <main class="content container" v-else-if="orderLoading">
    Идёт загрузка данных заказа {{ orderId }}...
  </main>
  <main class="content container" v-else-if="orderLoadingFailed">
    Ошибка загрузки данных заказа {{ orderId }}!
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductSideList from '@/components/products/ProductSideList';

export default {
  components: { ProductSideList },
  data() {
    return {
      orderLoading: false,
      orderLoadingFailed: false,
    };
  },
  computed: {
    ...mapState('order', ['orderInfo']),

    orderId() {
      return +this.$route.params.id;
    },
    productsSide() {
      if (!this.orderInfo.basket || this.orderInfo.basket.items.length < 1) {
        return [];
      }

      // Подводим ответ с сервера под наши параметры.
      return this.orderInfo.basket.items.map((productData) => {
        const newProductData = productData;
        newProductData.amount = newProductData.quantity;
        delete newProductData.quantity;

        return newProductData;
      });
    },
  },
  watch: {
    orderId: {
      handler() {
        // Загружаем данные по заказу,
        // если этих данных нет в глобальном хранилище.
        this.loadOrderInfoIfNeeded();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions('order', ['loadOrderInfo']),

    loadOrderInfoIfNeeded() {
      if (this.orderInfo && this.orderInfo.id === this.orderId) {
        return;
      }

      this.orderLoading = true;
      this.orderLoadingFailed = false;

      this.loadOrderInfo(this.orderId).catch(() => {
        this.orderLoadingFailed = true;
      }).then(() => {
        this.orderLoading = false;
      });
    },
  },
};
</script>
