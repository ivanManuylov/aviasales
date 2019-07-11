<template>
  <span
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    :class="b('wrapper')"
  >
    <span
      @click="handleCheck(query)"
      :class="b('check-wrapper')"
    >
      <span :class="b('checkbox', {checked: active})">
        <div
          v-if="active"
          :class="b('check')"
        >
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               width="9px" height="9px" viewBox="0 0 611.99 611.99" style="enable-background:new 0 0 611.99 611.99;"
               xml:space="preserve" fill="#1E90FF">
              <g id="_x39__34_">
                <path d="M589.105,80.63c-30.513-31.125-79.965-31.125-110.478,0L202.422,362.344l-69.061-70.438
                  c-30.513-31.125-79.965-31.125-110.478,0c-30.513,31.125-30.513,81.572,0,112.678l124.29,126.776
                  c30.513,31.125,79.965,31.125,110.478,0l331.453-338.033C619.619,162.202,619.619,111.755,589.105,80.63z" />
              </g>
          </svg>
        </div>
      </span>
      {{title}}
    </span>
    <span
      v-if="hover"
      @click="handleClickOnly(query)"
      :class="b('title-label')"
    >
      только
    </span>
  </span>
</template>
<script>

import {mapActions} from 'vuex'

export default {
  name: 'filter-transfer-checkbox',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    query: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      hover: false
    }
  },
  methods: {
    ...mapActions(['fetchTickets']),
    handleCheck () {
      const transferString = this.$route.query.transfer
      const transferList = transferString ? transferString.split(',') : []
      const isExist = transferList.some(el => el === this.query)
      let newTransferList = [...transferList]
      if (!isExist) {
        newTransferList.push(this.query)
      } else {
        newTransferList = transferList.filter(value => value !== this.query)
      }
      const newTransferString = newTransferList.join(',')
      this.check = !this.check
      this.$store.dispatch('fetchTickets', newTransferString || '')
      this.updateRoute(newTransferString || '')
    },
    handleClickOnly (query) {
      this.$store.dispatch('fetchTickets', '')
      this.updateRoute(query)
    },
    updateRoute (query) {
      const oldQuery = this.$route.query
      if (query) {
        this.$router.replace({
          query: {
            ...oldQuery,
            transfer: query
          }
        })
      } else {
        this.$router.replace({
          query: oldQuery
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-transfer-checkbox {
  &__wrapper {
    align-items: center;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    height: 20px;
    margin-bottom: 15px;
  }

  &__check {
    color: dodgerblue;
    position: absolute;
    top: 2px;
    left: 5px;
  }

  &__check-wrapper {
    display: flex;
    align-items: center;
  }

  &__checkbox {
    border-radius: 3px;
    border: 1px solid #d3d3d3;
    display: inline-block;
    height: 19px;
    margin-right: 10px;
    position: relative;
    width: 18px;
    &_checked {
      border-color: dodgerblue;
    }
  }

  &__title-label {
    font-size: 15px;
    color: dodgerblue;
  }
}
</style>
