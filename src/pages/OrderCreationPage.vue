<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
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
      <form class="cart__form form" action="#" method="POST">
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
                name="comments"
                title="Комментарии"
                placeholder="Введите ваши пожелания"
                :error="formErrors.comments"
                v-model="formData.comments"
            />
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order">
              <h3>Смартфон Xiaomi Redmi Note 7 Pro 6/128GB</h3>
              <b>18 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
            <li class="cart__order">
              <h3>Гироскутер Razor Hovertrax 2.0ii</h3>
              <b>4 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
            <li class="cart__order">
              <h3>Электрический дрифт-карт Razor Lil’ Crazy</h3>
              <b>8 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>3</b> товара на сумму <b>37 970 ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/form/BaseFormText';
import BaseFormTextarea from '@/components/form/BaseFormTextarea';

export default {
  components: { BaseFormTextarea, BaseFormText },
  data() {
    return {
      formData: {},
      formErrors: {},
    };
  },
};
</script>
