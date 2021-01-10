<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
          href="#"
          class="pagination__link pagination__link--arrow"
          :class="{'pagination__link--disabled': isFirstPage()}"
          @click.prevent="paginate(prevPage)"
          aria-label="Предыдущая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a
        href="#"
        class="pagination__link"
        :class="{'pagination__link--current': isCurrentPage(pageNumber)}"
        @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a
          href="#"
          class="pagination__link pagination__link--arrow"
          @click.prevent="paginate(nextPage)"
          :class="{'pagination__link--disabled': isLastPage()}"
          aria-label="Следующая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
    nextPage() {
      return this.page + 1;
    },
    prevPage() {
      return this.page - 1;
    },
  },
  methods: {
    paginate(page) {
      if (page >= 1 && page <= this.pages) {
        this.$emit('update:page', page);
        this.scrollToTop();
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    isCurrentPage(pageNumber) {
      return pageNumber === this.page;
    },
    isFirstPage() {
      return this.isCurrentPage(1);
    },
    isLastPage() {
      return this.isCurrentPage(this.pages);
    },
  },
};
</script>
