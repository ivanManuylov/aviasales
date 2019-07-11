<template>
  <div :class="b('wrapper')">
    <filter-currency />
    <filter-transfer />
  </div>
</template>
<script>
import FilterCurrency from '@/components/FilterCurrency'
import FilterTransfer from '@/components/FilterTransfer'

export default {
  name: 'app-help-bar',
  components: {
    'filter-currency': FilterCurrency,
    'filter-transfer': FilterTransfer
  }
}
</script>
<style lang="scss" scoped>
.app-help-bar{
  &__wrapper {
    background-color: white;
    border-radius: 5px;
    height: 300px;
    left: 547px;
    padding: 18px 13px 15px 15px;
    position: fixed;
    text-align: left;
    top: 160px;
    width: 205px;
  }
}
</style>
