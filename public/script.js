new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [
    ],
    cart: [],
    search: '',
    lastSearch: '',
    loading: false,
  },
  methods: {
    onSubmit: function() {
      this.loading = true
      this.items = []
      this.$http
        .get(`/search/${this.search}`)
        .then(function(res) {
          this.loading=false;
          this.lastSearch = this.search
          this.search = ''
          this.items = res.data.map((item, idx) => {
            return {
              title: item.title,
              id: idx,
              price: Math.floor(Math.random()*10)+1,
              image: item.link
            }
          })
        })
    },
    addItem: function(itemId) {
      const item = this.items[itemId]
      ///has item at index ?
      const cartIdx = this.cart.findIndex(el => el.id === item.id)
      if (cartIdx >= 0) {
        this.cart[cartIdx].qty += 1
      } else {
        this.cart.push({
          id: item.id,
          title: item.title,
          price: item.price,
          qty: 1
        })
      }
      this.total += item.price
    },
    decItem: function(itemId) {
      const item = this.items[itemId]
      ///has item at index ?
      const cartIdx = this.cart.findIndex(el => el.id === item.id)

      if (cartIdx === -1) {return}
      if (this.cart[cartIdx].qty === 1) {
        this.cart.splice(cartIdx,1)
      } else {
        this.cart[cartIdx].qty -= 1
      }
      this.total -= item.price
    }
  },
  filters: {
    currency: function(price) {
      const newPrice = price.toFixed(2)
      return `$ ${newPrice}`
    }
  }
});
