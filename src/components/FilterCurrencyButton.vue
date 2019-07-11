<template>
  <span
    :class="b('button', {first, hover, active, last})"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="handleChangeCurrency(currencyName)"
  >
    {{currencyName}}
  </span>
</template>
<script>
export default {
  name: 'filter-currency-button',
  props: {
    active: {
      type: Boolean
    },
    currencyName: {
      type: String,
      required: true
    },
    last: {
      type: Boolean
    },
    first: {
      type: Boolean
    }
  },
  data () {
    return {
      hover: false
    }
  },
  methods: {
    handleChangeCurrency (value) {
      const transferString = this.$route.query.currency
      const isExist = transferString === value
      if (isExist) {
        return null
      }
      this.$store.dispatch('fetchCurrencyRate', value)
      this.updateRoute(value)
    },
    updateRoute (query) {
      const oldQuery = this.$route.query

      this.$router.replace({
        query: {
          ...oldQuery,
          currency: query
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-currency-button {
  &__button {
    border: none;
    color: dodgerblue;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    padding: 12px 19px;
    position: relative;
    user-select: none;
    transition: background-color 0.5s, color 0.5s;

    &::after {
      content: '';
      border: 1px solid #d3d3d3;
      height: 100%;
      left: -1px;
      position: absolute;
      top: -1px;
      transition: border-color 0.5s, z-index 0s;
      width: calc(100% - 1px);
      z-index: 0;
    }

    &_first {
      &::after {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      /*border-right-width: 0 !important;*/
    }

    &_last {
      padding-right: 22px;
      padding-left: 20px;

      &::after {
        left: -1px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
    &_hover {
      background-color: rgba(30, 140, 255, 0.05);
      color: dodgerblue;

      &::after {
        border: 1px solid dodgerblue;
        z-index: 1;
      }
    }

    &_active {
      background-color: dodgerblue;
      color: white;

      &::after {
        z-index: 2;
        border: 1px solid dodgerblue;
      }
    }
  }
}
</style>
