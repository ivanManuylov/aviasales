<template>
  <div :class="b()">
    <div :class="b('title')">
      ВАЛЮТА
    </div>
    <div :class="b('button-container')">
      <filter-currency-button
        :active="activeCurrency('RUB')"
        :first="true"
        currency-name="RUB"
      />
      <filter-currency-button
        :active="activeCurrency('USD')"
        currency-name="USD"
      />
      <filter-currency-button
        :active="activeCurrency('EUR')"
        :last="true"
        currency-name="EUR"
      />
    </div>
  </div>
</template>
<script>
import FilterCurrencyButton from '@/components/FilterCurrencyButton'
import {mapActions} from 'vuex'

export default {
  name: 'filter-currency',
  components: {
    'filter-currency-button': FilterCurrencyButton
  },
  methods: {
    ...mapActions(['fetchCurrencyRate']),
    activeCurrency (value) {
      return this.currency === value
    }
  },
  computed: {
    currency () {
      return this.$route.query.currency || 'RUB'
    }
  },
  mounted () {
    console.log(this.$store.state.rateList)
  }
}
</script>
<style lang="scss" scoped>
.filter-currency {
  &__title {
    font-size: 14px;
    font-weight: bold;
  }

  &__button-container {
    display: block;
    height: 63px;
    margin-top: 21px;
  }
}
</style>
