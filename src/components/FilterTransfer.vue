<template>
  <div :class="b()">
    <div :class="b('title')">КОЛИЧЕСТВО ПЕРЕСАДОК</div>
    <filter-transfer-checkbox
      :active="activeCheckbox('all')"
      query="all"
      title="Все"
      :checked="false"
    />
    <filter-transfer-checkbox
      :active="activeCheckbox('0')"
      query="0"
      title="Без пересадок"
      :checked="false"
    />
    <filter-transfer-checkbox
      :active="activeCheckbox('1')"
      query="1"
      title="1 пересадка"
      :checked="false"
    />
    <filter-transfer-checkbox
      :active="activeCheckbox('2')"
      query="2"
      title="2 пересадки"
      :checked="false"
    />
    <filter-transfer-checkbox
      :active="activeCheckbox('3')"
      query="3"
      title="3 пересадки"
      :checked="false"
    />
  </div>
</template>
<script>
import FilterTransferCheckbox from '@/components/FilterTransferCheckbox'

export default {
  name: 'filter-transfer',
  components: {
    'filter-transfer-checkbox': FilterTransferCheckbox
  },
  methods: {
    activeCheckbox (value) {
      return this.transfer.some(el => value === el)
    }
  },
  computed: {
    transfer () {
      return this.$route.query.transfer ? this.$route.query.transfer.split(',') : []
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-transfer {
  margin-right: 4px;

  &__title {
    font-size: 12.5px;
    font-weight: bold;
    margin-bottom: 17px;
  }

}
</style>
