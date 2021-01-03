<template>
  <div>
    <BaseHeader />

    <div :class="{ 'page-loading': isPageLoading }">
      <RouterView />
    </div>

    <BaseFooter />
  </div>
</template>

<script>
import PageLoading from '@/mixins/page-loading';
import BaseHeader from '@/components/BaseHeader';
import BaseFooter from '@/components/BaseFooter';

export default {
  components: { BaseFooter, BaseHeader },
  mixins: [PageLoading],
};
</script>

<style>
.page-loading {
  opacity: .7;
  pointer-events: none;
}
</style>
