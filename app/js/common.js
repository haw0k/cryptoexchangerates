// var URL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD";
var URL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";


var component = {
  template: `
  <table>
    <col><col>
    <tr>
      <th>Price:</th>
      <th class="amount">{{ btcData.ask | tocurrency(currencyName) }}</th>
    </tr>
    
    <tr>
      <td class="switch-title">
        <span class="white">Percent change</span>
      </td>
      <td class="switcher">
        <label>
          <input name="btcpercentage" class="checkbox" type="checkbox" value="0" v-model="percents">
          <span></span>
        </label>
      </td>
    </tr>
    <tr>
      <td>
        <span class="name">Hour change</span>
      </td>
      <td v-if='percents'>
        <span class="value" 
        v-bind:class="[{ 'value--minus': isNegative(btcDataChangesPercent.hour) }]"> 
          {{ btcDataChangesPercent.hour | shortFormat(currencyName, false)}}
        </span>
      </td>
      <td v-else>
        <span class="value" 
        v-bind:class="[{ 'value--minus': isNegative(btcDataChangesPrice.hour) }]"> 
          {{ btcDataChangesPrice.hour | shortFormat(currencyName, true) }} 
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <span class="name">Day change</span>
      </td>
      <td v-if='percents'>
        <span class="value" 
        v-bind:class="[{ 'value--minus': isNegative(btcDataChangesPercent.day) }]">
          {{ btcDataChangesPercent.day | shortFormat(currencyName, false) }}
        </span>
      </td>
      <td v-else>
        <span class="value" 
        v-bind:class="[{ 'value--minus': isNegative(btcDataChangesPrice.day) }]">
          {{ btcDataChangesPrice.day | shortFormat(currencyName, true) }}
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <span class="name">Week change</span>
      </td>
      <td v-if='percents'>
        <span class="value" 
        v-bind:class="[{ 'value--minus': isNegative(btcDataChangesPercent.week) }]">
          {{ btcDataChangesPercent.week | shortFormat(currencyName, false) }}
        </span>
      </td>
      <td v-else>
        <span class="value" 
        v-bind:class="[{ 'value--minus': isNegative(btcDataChangesPrice.week) }]">
          {{ btcDataChangesPrice.week | shortFormat(currencyName, true) }}
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <span class="name">Month change</span>
      </td>
      <td v-if='percents'>
        <span class="value" 
        v-bind:class="[{ 'value--minus': isNegative(btcDataChangesPercent.month) }]">
          {{ btcDataChangesPercent.month | shortFormat(currencyName, false) }}
        </span>
      </td>
      <td v-else>
        <span class="value" 
        v-bind:class="[{ 'value--minus': isNegative(btcDataChangesPrice.month) }]">
          {{ btcDataChangesPrice.month | shortFormat(currencyName, true) }}
        </span>
      </td>
    </tr>

  </table>
  `,
  props: ['currencyName', 'cryptoName'],
  data() {
    return {
      btcData: {},
      btcDataChangesPrice: {},
      btcDataChangesPercent: {},
      percents: false,
    }
  },
  methods: {
    isNegative(value) {
      if (value < 0) { return true }
      else { return false }
    },
    getExchangeRate() {
      axios.get(URL + this.cryptoName + this.currencyName)
        .then(response => {
          this.btcData = response.data;
          this.btcDataChangesPrice = response.data.changes.price;
          this.btcDataChangesPercent = response.data.changes.percent;
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  watch: {
    currencyName() {
      this.getExchangeRate()
    },
  },
  created() {
    this.getExchangeRate(this.currencyName)
  },
  filters: {
    round(amount) {
      return Math.round(amount)
    },
    tocurrency(amount, currName) {
      if (currName == 'RUB') {
        return new Intl.NumberFormat("en-US", { style: 'currency', currency: currName })
          .format(amount).replace(',', ' ').replace('RUB', '\u20BD');
      } else {
        return new Intl.NumberFormat("en-US", { style: 'currency', currency: currName })
        .format(amount).replace(',', ' ');
      }

    },
    shortFormat(amount, currName, isCurrency) {
      var formatedAmount;
      amount = Math.round(amount);
      if (amount == '-0') { amount = 0 };
      if (isCurrency) {
        formatedAmount = new Intl.NumberFormat(
          "ru-RU", { style: 'currency', currency: currName,
            currencyDisplay: 'symbol', useGrouping: false, minimumFractionDigits: 0,
            maximumFractionDigits: 0}
            ).format(amount).replace(/\s/g, '');
      } else {
        formatedAmount = amount + '%';
      }
      if (amount > 0) {
        return "+" + formatedAmount
      } else {
        return formatedAmount
      }
    }
  }
};

new Vue({
  el: '.body__wrapper',
  data() { 
    return {
      currency: 'USD'
    }
  },
  components: {
    btcBox: component
  },
  methods: {
    currencyChange(currency) {
      this.currency = currency;
    }
  }
});
