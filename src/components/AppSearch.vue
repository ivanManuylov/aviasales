<template>
  <div :class="b('wrapper')">
    <app-help-bar/>
    <div :class="b()">
      <div :class="b('inner-list')">
        <app-ticket-card :key="ticketListItem.price" v-for="ticketListItem of ticketList" v-bind="ticketListItem"/>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import AppHelpBar from '@/components/AppHelpBar'
import AppTicketCard from '@/components/AppTicketCard'

export default {
  name: 'app-search',
  components: {
    'app-help-bar': AppHelpBar,
    'app-ticket-card': AppTicketCard
  },
  created () {
    const {transfer, currency} = this.$route.query
    this.$store.dispatch('fetchTickets', transfer || '')
    this.$store.dispatch('fetchCurrencyRate', currency || '')
  },
  computed: {
    ...mapActions(['fetchTickets']),
    ticketList () {
      return this.$store.state.ticketList
    }
  }
}
</script>
<style scoped lang="scss">
  .app-search {
    &__wrapper {
      margin-top: 80px;
      width: 100%;
    }

    &__inner-list {
      margin: 160px auto 0 800px;
      width: 565px;
    }
  }
</style>
