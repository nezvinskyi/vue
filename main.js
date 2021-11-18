var eventBus = new Vue();

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

					<info-tabs :shipping="shipping" :details="details"></info-tabs>

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

					<product-tabs :reviews="reviews"></product-tabs>

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
          variantQuantity: 11,
        },
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.$emit(
        'remove-from-cart',
        this.variants[this.selectedVariant].variantId,
      );
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
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview);
    });
  },
});

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

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
			<p v-if="errors.length">
				<b>Please correct the following error(s):</b>
				<ul>
					<li v-for="error in errors">{{error}}</li>
				</ul>
			</p>


      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review" ></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

			<p>
        <p for="recommend">Would you recommend this product?</p>
				<label>
					Yes
					<input type="radio" value="Yes" v-model="recommend"/>
				</label>
        <label>
					No
					<input type="radio" value="No" v-model="recommend"/>
				</label>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
	`,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend,
        };
        eventBus.$emit('review-submitted', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push('Name required');
        if (!this.review) this.errors.push('Review required');
        if (!this.rating) this.errors.push('Rating required');
        if (!this.recommend) this.errors.push('Recommendation required');
      }
    },
  },
});

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: false,
    },
  },
  template: `
		<div>
			<span class="tab"
						:class="{activeTab: selectedTab === tab}"
						v-for="(tab, idx) in tabs"
						:key="idx"
						@click="selectedTab = tab">
							{{tab}}
			</span>

			<div v-show="selectedTab === 'Make a Review'">
				<product-review></product-review>
			</div>

			<div v-show="selectedTab === 'Reviews'">

				<p v-if="!reviews.length">There are no reviews yet</p>
				<ul>
					<li v-for="review in reviews">
						<p>{{ review.name }}</p>
						<p>Rating {{ review.rating }}</p>
						<p>{{ review.review }}</p>
					</li>
				</ul>
			</div>
		</div>
	`,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews',
    };
  },
});

Vue.component('info-tabs', {
  props: {
    shipping: {
      type: String,
      required: true,
    },
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
		<div>
			<span v-for="(tab, idx) in tabs"
						class="tab"
						:class="{activeTab: selectedTab === tab}"
						:key="idx"
						@click="selectedTab = tab" >
						 	{{tab}}
			</span>

			<div v-show="selectedTab === 'Shipping'">
				<p>Shipping: {{shipping}}</p>
			</div>

			<product-details v-show="selectedTab === 'Details'" :details="details"></product-details>
		</div>
	`,
  data() {
    return {
      tabs: ['Shipping', 'Details'],
      selectedTab: 'Shipping',
    };
  },
});

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeItem(id) {
      const index = this.cart.indexOf(id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
  },
});

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString(),
  },
});
