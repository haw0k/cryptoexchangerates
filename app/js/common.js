var URL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD";

function currencyChanged( currencyName ) {
  $("#dropdownMenuButton").html(currencyName);
  if (currencyName == "USD") {
    console.log("USD");
    // getBTCUSD();
  }
}
var app = new Vue({
  el: '.box--btc',
  data: {
    btcData: {},
    btcDataChangesPrice: {},
    btcDataChangesPercent: {},
    percents: false
  },
  methods: {
    isNegative(value) {
      if (value < 0) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    axios.get(URL)
    .then(response => {
      this.btcData = response.data;
      this.btcDataChangesPrice = response.data.changes.price;
      this.btcDataChangesPercent = response.data.changes.percent;
      if (this.percents) {console.log('percents=true')}
        else { console.log('percents=false') };      
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  filters: {
    tousd(amount) {
      return new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(amount).replace(',',' ');
    },
    toeur(amount) {
      return new Intl.NumberFormat("en-US", { style: 'currency', currency: 'EUR' }).format(amount).replace(',', ' ');
    },
    roundusd(amount) {
      amount = Math.round(amount);
      if (amount < 0) {
        return "-" + amount + "$";
      } else {
        return "+" + amount + "$";
      }
    },
    roundeur(amount) {
      amount = Math.round(amount);
      if (amount < 0) {
        return "-" + amount + '\u20AC';
      } else {
        return "+" + amount + '\u20AC';
      }
    },
    roundpercents(amount) {
      amount = Math.round(amount);
      if (amount < 0) {
        return "-" + amount + '%';
      } else {
        return "+" + amount + '%';
      }
    }
  }
});


// function getBTCUSD () {

//   axios.get(URL)
//     .then(function (response) {
//       // handle success
//       console.log(response);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//     .then(function () {
//       // always executed
//     });

  // var resultObj = $.parseJSON($.ajax(URL));
  // console.log(resultObj);
  
  // console.log($.ajax(URL).responseJSON);
  // console.log($.parseJSON($.ajax(URL).responseJSON));

  // $.getJSON(URL).done(function (data) {
  //     $.each(data.items, function (i, item) {
  //       if (i === 4 || i === 5) {
  //         $('.grid').append('<div class="grid-item grid-item--width2">');
  //       } else {
  //         $('.grid').append('<div class="grid-item">');
  //       };
  //       $('.grid-item:last').css({
  //         "background-image":
  //           "url('" + flicrImgBig(item.media.m) + "')", "background-repeat": "repeat",
  //         "background-position": "center"
  //       });
  //       $('.grid-item:last').append("<p>" + cutTextUntilSpace(item.tags) + "</p>");
  //       if (i === 6) {
  //         var $grid = $('.grid').masonry({
  //           itemSelector: '.grid-item',
  //           columnwidth: '.grid-sizer',
  //           gutter: 20
  //         });
  //         // $grid.masonry('reload');
  //         return false;
  //       }
  //     });
  // });
// };


$(function() {

  // $('.dropdown-toggle').dropdown( 'toggle' );

});
