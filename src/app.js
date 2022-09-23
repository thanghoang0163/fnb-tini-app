import { getCartAPI, getCouponFromCodeAPI } from "./services/fake-apis/index";
import EventEmitter from "./utils/event";
import { EMITTERS } from "./utils/constants";

App({
  cartEvent: new EventEmitter(),

  cart: {
    buyer: {},
    seller: {},
    orderedProducts: [],
    favoritedProducts: [],
    productId: "",
    shippingFee: 0,
    price: 0,
    total: 0,
    coupon: {
      name: "",
      discount: 0,
      isValid: false,
    },
  },

  async loadCart() {
    try {
      const cart = await getCartAPI();
      this.cart = { ...this.cart, ...cart };
    } catch {}
  },

  setProductId(productId) {
    this.productId = productId;
  },

  addProduct(product, quantity) {
    const position = this.cart.orderedProducts.findIndex(
      (item) => item.id === product.id
    );
    if (position !== -1)
      this.cart.orderedProducts[position].quantity = quantity;
    else this.cart.orderedProducts.push({ ...product, quantity });

    console.log(this.cart.orderedProducts);
    this.calculatePrices();
  },

  removeProduct(product) {
    const position = this.cart.orderedProducts.findIndex(
      (item) => item.id === product.id
    );
    if (position !== -1) this.cart.orderedProducts.splice(position, 1);

    this.calculatePrices();
  },

  changeQuantityProduct(product, quantity) {
    const position = this.cart.orderedProducts.findIndex(
      (item) => item.id === product.id
    );
    if (position !== -1) {
      this.cart.orderedProducts[position].quantity = quantity;
    }

    this.calculatePrices();
  },

  // Add Favorite Products
  addFavoritedProduct(product) {
    const position = this.cart.favoritedProducts.findIndex(
      (item) => item.id === product.id
    );

    if (position === -1) {
      this.cart.favoritedProducts.push({ ...product, isLiked: true });
    }

    console.log(this.cart.favoritedProducts);
  },

  removeFavoritedProduct(product) {
    const position = this.cart.favoritedProducts.findIndex(
      (item) => item.id === product.id
    );

    if (position !== -1) {
      this.cart.favoritedProducts.splice(position, 1);
    }
  },

  calculatePrices() {
    const { shippingFee, coupon, orderedProducts } = this.cart;

    let price = orderedProducts.reduce((acc, curr) => {
      return (
        acc +
        curr.price * curr.quantity +
        curr.size.price +
        curr.topping.price * curr.topping.quantity
      );
    }, 0);
    const total = price > 0 ? price + shippingFee - coupon.discount : 0;
    this.cart = {
      ...this.cart,
      price,
      total,
    };

    this.cartEvent.emit(EMITTERS.CART_UPDATE, this.cart);
  },

  async selectCoupon(code) {
    try {
      const coupon = await getCouponFromCodeAPI(code);
      this.cart.coupon = coupon;

      this.calculatePrices();
    } catch {}
  },

  removeCoupon() {
    this.cart.coupon = {
      name: "",
      discount: 0,
      isValid: false,
    };

    this.calculatePrices();
  },

  resetCart() {
    this.cart = {
      ...this.cart,
      orderedProducts: [],
      price: 0,
      total: 0,
      coupon: {
        name: "",
        discount: 0,
        isValid: false,
      },
    };

    this.calculatePrices();
  },

  // Life cycle
  onShow() {
    this.loadCart();
  },
});
