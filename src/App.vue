<template>
  <div>
    <BaseHeader />

    <RouterView />

    <BaseFooter />
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader';
import BaseFooter from '@/components/BaseFooter';

export default {
  components: { BaseFooter, BaseHeader },
};
</script>
