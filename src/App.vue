<template>
  <div>
    <BaseHeader />

    <div :class="{ 'page-loading': pageLoading }">
      <RouterView />
    </div>

    <BaseFooter />
  </div>
</template>

<script>
import PageLoading from '@/mixins/page-loading';
import BaseHeader from '@/components/BaseHeader';
import BaseFooter from '@/components/BaseFooter';
import { mapActions, mapMutations } from 'vuex';

export default {
  components: { BaseFooter, BaseHeader },
  mixins: [PageLoading],
  methods: {
    ...mapActions('cart', ['loadCart']),
    ...mapMutations('auth', ['updateAuthToken']),
  },
  created() {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      this.updateAuthToken(authToken);
    }

    this.loadCart();
  },
};
</script>

<style>
.page-loading {
  opacity: .7;
  pointer-events: none;
}
</style>
