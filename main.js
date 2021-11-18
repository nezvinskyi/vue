Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
	      <ul>
            <li v-for="detail in details">{{detail}}</li>
          </ul>`,
});
Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
      // default: true,
    },
  },
  template: `
	      <div class="product">
        <div class="product-image">
          <img v-bind:src="image" :alt="altText" />
        </div>

        <div class="product-info">
          <h1>{{title}}</h1>
          <p v-if="inventory > 10">In Stock</p>
          <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
          <p v-else :class="{outOfStock: !inStock}">Out of Stock</p>
          <p>{{description}}</p>
          <p>{{sale}}</p>

          <a :href="link" target="_blank">More products like this</a>

					<p>Shipping: {{shipping}}</p>

					<product-details :details="details"></product-details>

          <ul>
            <li v-for="size in sizes" :key="size">{{size}}</li>
          </ul>

          <div
            v-for="(variant, index) in variants"
            v-bind:key="variant.variantId"
            class="color-box"
            v-bind:style="{backgroundColor: variant.variantColor}"
            @mouseover="updateProduct(index)"
          ></div>

          <button
            v-on:click="addToCart"
            :disabled="!inStock"
            :class="{disabledButton: !inStock}"
          >
            Add to Cart
          </button>
          <button @click="removeFromCart">Remove from Cart</button>

          <div class="cart">
            <p>Cart({{cart}})</p>
          </div>
        </div>
      </div>`,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      selectedVariant: 0,
      altText: 'A pair of socks',
      description: 'This is description',
      link: 'https://www.amazon.de/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      onSale: true,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: './assets/vmSocks-green.jpg',
          variantQuantity: 10,
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: './assets/vmSocks-blue.jpg',
          variantQuantity: 0,
        },
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      cart: 0,
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      if (this.cart === 0) return;
      this.cart--;
    },
    updateProduct(index) {
      if (this.selectedVariant === index) return;
      this.selectedVariant = index;
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inventory() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    inStock() {
      return this.inventory;
    },
    sale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' is on sale!';
      } else {
        return this.brand + ' ' + this.product + ' is not on sale';
      }
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      } else {
        return '2,99';
      }
    },
  },
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
  },
});

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString(),
  },
});
