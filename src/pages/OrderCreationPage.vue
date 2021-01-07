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
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" :to="{ name: 'orderCreation' }">
            Оформление заказа
          </RouterLink>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" method="POST" @submit.prevent="submitOrder">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              name="name"
              title="ФИО"
              placeholder="Введите ваше ФИО"
              :error="formErrors.name"
              v-model="formData.name"
            />

            <BaseFormText
              name="address"
              title="Адрес доставки"
              placeholder="Введите ваш адрес"
              :error="formErrors.address"
              v-model="formData.address"
            />

            <BaseFormText
                name="phone"
                title="Телефон"
                placeholder="Введите ваш телефон"
                type="tel"
                :error="formErrors.phone"
                v-model="formData.phone"
            />

            <BaseFormText
                name="email"
                title="Email"
                placeholder="Введите ваш Email"
                type="email"
                :error="formErrors.email"
                v-model="formData.email"
            />

            <BaseFormTextarea
                name="comment"
                title="Комментарии"
                placeholder="Введите ваши пожелания"
                :error="formErrors.comment"
                v-model="formData.comment"
            />
          </div>
        </div>

        <ProductSideList
          :total="cartTotalPrice"
          :count="cartCount"
          :products-data="cartDetailProducts">
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </ProductSideList>

        <div class="cart__error form__error-block" v-if="formFatalError">
          <h4>Заявка не отправлена!</h4>
          <p>{{ formFatalError }}</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/form/BaseFormText';
import BaseFormTextarea from '@/components/form/BaseFormTextarea';
import axios from 'axios';
import config from '@/config';
import { mapMutations, mapGetters } from 'vuex';
import ProductSideList from '@/components/products/ProductSideList';

export default {
  components: { ProductSideList, BaseFormTextarea, BaseFormText },
  data() {
    return {
      formData: {},
      formErrors: {},
      formFatalError: '',
    };
  },
  computed: {
    ...mapGetters(['cartDetailProducts', 'cartCount', 'cartTotalPrice']),
  },
  methods: {
    ...mapMutations(['pageLoadStart', 'pageLoadStop', 'pageLoadFailed', 'cartFlush', 'updateOrderInfo']),

    async submitOrder() {
      this.formErrors = {};
      this.formFatalError = '';
      this.pageLoadStart();
      this.pageLoadFailed(false);

      try {
        const response = await axios.post(`${config.API_URL}/api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.auth.token,
          },
        });

        // Обновляем данные заказы в глобальном хранилище.
        this.updateOrderInfo(response.data);

        // Очищаем корзину.
        this.cartFlush();

        // Делаем редирект на страницу заказа.
        this.redirectToOrderViewPage(response.data.id);
      } catch (e) {
        this.formErrors = e.response.data.error.request || {};
        this.formFatalError = e.response.data.error.message;
        this.pageLoadFailed(true);
      } finally {
        this.pageLoadStop();
      }
    },
    redirectToOrderViewPage(orderId) {
      this.$router.push(
        { name: 'orderView', params: { id: orderId } },
      );
    },
  },
};
</script>
