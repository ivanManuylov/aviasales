<template>
  <section :class="b('wrapper')">
    <div :class="b('part-buy')">
      <div
        :class="b('image')"
        :style="{backgroundImage: 'url(/static/images/airlines.png)'}"
      />
      <div
        :class="b('button-buy')"
        @click="handleBuy"
      >
        Купить <br> за {{getTicketPrice}}
      </div>
    </div>
    <div :class="b('part-info')">
      <div :class="b('block-side')">
        <div :class="b('departure-time')">
          {{departure_time}}
        </div>
        <div :class="b('origin-name')">
          {{origin}},
          {{origin_name}}
        </div>
        <div :class="b('departure-date')">
          {{departureDay}} {{departureMonth}} {{departureYear}}, {{departureWeekday}}
        </div>
      </div>
      <div :class="b('block-transfer')">
        <div :class="b('stops')">
          <span v-if="stops !== 0">
            {{stops}} {{stops === 1 ? 'ПЕРЕСАДКА' : 'ПЕРЕСАДКИ'}}
          </span>
        </div>
        <div :class="b('airplane')"></div>
      </div>
      <div :class="b('block-side', {right: true})">
        <div :class="b('departure-time')">
          {{arrival_time}}
        </div>
        <div :class="b('origin-name')">
          {{destination_name}},
          {{destination}}
        </div>
        <div :class="b('departure-date')">
          {{arrivalDay}} {{arrivalMonth}} {{arrivalYear}}, {{arrivalWeekday}}
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'app-ticket-card',
  props: {
    arrival_date: {
      type: String,
      required: true
    },
    arrival_time: {
      type: String,
      required: true
    },
    carrier: {
      type: String,
      required: true
    },
    departure_date: {
      type: String,
      required: true
    },
    departure_time: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    destination_name: {
      type: String,
      required: true
    },
    origin: {
      type: String,
      required: true
    },
    origin_name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    stops: {
      type: Number,
      required: true
    }
  },
  computed: {
    arrivalDay () {
      return this.dateProps(this.arrival_date, {day: 'numeric'})
    },
    arrivalMonth () {
      return this.dateProps(this.arrival_date, {month: 'short'})
    },
    arrivalYear () {
      return this.dateProps(this.arrival_date, {year: 'numeric'})
    },
    arrivalWeekday () {
      const weekday = this.dateProps(this.arrival_date, {weekday: 'short'})
      return weekday.replace(weekday.charAt(0), weekday.charAt(0).toUpperCase())
    },
    departureDay () {
      return this.dateProps(this.departure_date, {day: 'numeric'})
    },
    departureMonth () {
      return this.dateProps(this.departure_date, {month: 'short'})
    },
    departureYear () {
      return this.dateProps(this.departure_date, {year: 'numeric'})
    },
    departureWeekday () {
      const weekday = this.dateProps(this.departure_date, {weekday: 'short'})
      return weekday.replace(weekday.charAt(0), weekday.charAt(0).toUpperCase())
    },
    getTicketPrice () {
      const currencyName = this.getCurrencyName()
      const language = this.getCurrencyLanguage(currencyName)

      if (currencyName === 'RUB') {
        return this.price.toLocaleString(language, {style: 'currency', currency: currencyName, maximumSignificantDigits: 8})
      }
      return (this.price * this.$store.state.rateList[currencyName]).toLocaleString(language, {style: 'currency', currency: currencyName}).replace(',', '.')
    }
  },
  methods: {
    getCurrencyLanguage (name) {
      if (name === 'USD') {
        return 'en-US'
      }
      if (name === 'EUR') {
        return 'de-DE'
      } else {
        return 'ru-RU'
      }
    },
    getCurrencyName () {
      return this.$route.query.currency ? this.$route.query.currency : 'RUB'
    },
    dateProps (date, options) {
      return this.dateTransform(date, 'ru', options)
    },
    dateTransform (date, language, options) {
      return new Date(date).toLocaleString(language, options).replace('.', '')
    },
    handleBuy () {
      console.warn('you buy a ticket')
    }
  }
}
</script>
<style lang="scss" scoped>
$cWhite: #fff;
$cGrayMain: #a0a0a0;
$cGrayLine: #dcdcdc;

.app-ticket-card {
  &__wrapper {
    border-radius: 5px;
    background: $cWhite;
    display: flex;
    height: 162px;
    margin-bottom: 19px;
    width: 100%;
  }

  &__part-buy {
    display: block;
    border-right: 1px solid $cGrayLine;
  }

  &__image {
    height: 48px;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    margin: 19px 39px 0 41px;
    width: 119px;
  }

  &__part-info {
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
    padding: 22px 26px;
  }

  &__button-buy {
    background-color: #ff7d01;
    box-shadow: none;
    border-radius: 5px;
    color: $cWhite;
    cursor: pointer;
    font-size: 18px;
    line-height: 22px;
    margin: 15px 20px;
    padding: 6px 0;
    transition: background-color 1s, box-shadow 0.5s;

    @media (hover: hover) {
      &:hover {
        box-shadow: 0 5px 20px $cGrayMain;
        background-color: #ff9400;
      }
    }
  }

  &__departure-time {
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 32px;
    color: #000;
    margin-bottom: 6px;
  }

  &__departure-date {
    color: $cGrayMain;
    font-size: 12px;
  }

  &__block-transfer {
    color: $cGrayMain;
    font-size: 10px;
    font-weight: 500;
    left: 50%;
    position: absolute;
    top: 26px;
    transform: translateX(-50%);
    width: 100px;
  }

  &__stops {
    height: 11px;
  }

  &__airplane {
    border-bottom: 1px solid $cGrayLine;
    margin-top: 8px;
    position: absolute;
    width: 87px;
    left: 0;

    &::after {
      content: "\2708";
      font-size: 18px;
      position: absolute;
      right: -18px;
      top: -10px;
    }
  }

  &__block-side {
    text-align: left;

    &_right {
      text-align: right;
    }
  }

  &__origin-name {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
  }
}
</style>
