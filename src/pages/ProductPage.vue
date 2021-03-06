<template>
  <main class="content container" v-if="isPageLoadFailed">Не удалось загрузить товар</main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" :to="{ name: 'main' }">
            {{ renderValue(['category', 'title']) }}
          </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ renderValue(['product', 'title']) }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" v-if="product.image" :src="product.image.file.url" :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ renderValue(['product', 'id']) }}</span>
        <h2 class="item__title">
          {{ renderValue(['product', 'title']) }}
        </h2>
        <div class="item__form">
          <form class="form" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ numberFormat.price(renderValue(['product', 'price'], 0)) }} ₽
            </b>

            <fieldset class="form__block" v-if="product.colors">
              <legend class="form__legend">Цвет:</legend>

              <ProductColors
                  :colors="product.colors"
                  v-model:current-color="color"
              />
            </fieldset>

            <div class="item__row">
              <ProductAmount v-model="amount" :svg-size="12" />

              <button class="button button--primery" type="submit" :disabled="productAddingToCart">
                В корзину
              </button>
            </div>

            <div v-show="productAddedToCart">Товар добавлен в корзину</div>
            <div v-show="productAddingToCart">Товар добавляется в корзину</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import PageLoading from '@/mixins/page-loading';
import axios from 'axios';
import config from '@/config';
import ProductColors from '@/components/products/ProductColors';
import ProductAmount from '@/components/products/ProductAmount';
import { mapActions } from 'vuex';

export default {
  components: { ProductAmount, ProductColors },
  mixins: [PageLoading],
  data() {
    return {
      color: null,
      amount: 1,
      productData: null,

      productAddedToCart: false,
      productAddingToCart: false,
    };
  },
  computed: {
    product() {
      return {
        id: 0,
        price: 0,
        title: 'загрузка...',

        ...this.productData,
      };
    },
    category() {
      return {
        id: 0,
        title: 'загрузка...',

        ...(this.productData ? this.productData.category : null),
      };
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        if (+this.$route.params.id > 0) {
          this.loadProduct();
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),

    async addToCart() {
      this.productAddedToCart = false;
      this.productAddingToCart = true;

      await this.addProductToCart({ productId: this.product.id, amount: this.amount });

      this.productAddedToCart = true;
      this.productAddingToCart = false;
    },
    async loadProduct() {
      this.pageLoadStart();
      this.pageLoadFailed(false);

      try {
        const response = await axios.get(`${config.API_URL}/api/products/${+this.$route.params.id}`);

        this.productData = response.data;
      } catch (e) {
        console.log(e);
        this.pageLoadFailed(true);
      } finally {
        this.pageLoadStop();
      }
    },
  },
};
</script>
