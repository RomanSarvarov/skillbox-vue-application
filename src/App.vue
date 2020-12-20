<template>
  <component :is="currentPageComponent" :page-params="currentPageParams" />
</template>

<script>
import MainPage from '@/pages/MainPage';
import ProductPage from '@/pages/ProductPage';
import NotFoundPage from '@/pages/errors/NotFoundPage';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  components: { MainPage, ProductPage, NotFoundPage },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },
  created() {
    this.emitter.on('navigate', (data) => {
      this.currentPage = data.page;
      this.currentPageParams = data.params || {};
    });
  },
};
</script>
