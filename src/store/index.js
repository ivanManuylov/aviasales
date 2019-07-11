import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  isLoading: false,
  ticketList: [],
  rateList: {}
}

const getters = {
  getTickets: state => state.ticketList,
  loading: state => state.isLoading
}

const actions = {
  async fetchTickets ({commit, state}, transferString) {
    commit('fetchTicketsStart')
    const queryList = transferString ? transferString.split(',') : []
    const isAllCases = queryList.find(item => item === 'all')

    await axios.get('/static/api/tickets.json').then(response => {
      const ticketList = response.data.tickets.sort((prev, next) => (prev.price - next.price))

      if (isAllCases || !queryList.length) {
        return commit('fetchTicketsFinish', ticketList)
      }
      const newTicketList = ticketList.filter(item => queryList.some(id => id === item.stops.toString()))
      commit('fetchTicketsFinish', newTicketList)
    })
  },
  async fetchCurrencyRate ({commit, state}) {
    commit('fetchRatesStart')
    await axios.get('https://api.exchangeratesapi.io/latest?base=RUB').then(response => {
      commit('fetchRateFinish', response.data.rates)
    })
  }
}

const mutations = {
  fetchRatesStart (state) {
    state.isLoading = true
  },
  fetchTicketsStart (state) {
    state.isLoading = true
  },
  fetchRateFinish (state, dispatch) {
    Vue.set(state, 'rateList', dispatch)
    Vue.set(state, 'isLoading', false)
  },
  fetchTicketsFinish (state, dispatch) {
    Vue.set(state, 'ticketList', dispatch)
    Vue.set(state, 'isLoading', false)
  }
}

export const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
