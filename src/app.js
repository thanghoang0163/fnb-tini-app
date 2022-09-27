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
    oldSizePrice: 0,
    productTopping: [],
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
    if (position !== -1) this.cart.orderedProducts[position] = product;
    else this.cart.orderedProducts.push({ ...product, quantity });

    this.cart.oldSizePrice = product.size.price;
    this.cart.productTopping = product.topping;

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
    if (position !== -1)
      this.cart.orderedProducts[position].quantity = quantity;

    this.calculatePrices();
  },

  // Add Favorite Products
  addFavoritedProduct(product) {
    const position = this.cart.favoritedProducts.findIndex(
      (item) => item.id === product.id
    );

    if (position === -1)
      this.cart.favoritedProducts.push({ ...product, isLiked: true });
  },

  removeFavoritedProduct(product) {
    const position = this.cart.favoritedProducts.findIndex(
      (item) => item.id === product.id
    );

    if (position !== -1) this.cart.favoritedProducts.splice(position, 1);
  },

  calculatePrices() {
    const { shippingFee, coupon, orderedProducts } = this.cart;

    let toppingPrice = 0;

    toppingPrice = orderedProducts.map((item) =>
      item.topping.map((item) => ({
        price: item.price,
        quantity: item.quantity,
      }))
    );

    toppingPrice = toppingPrice.map((item) =>
      item.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0)
    );

    toppingPrice = toppingPrice.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    let price = orderedProducts.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity + curr.size.price;
    }, toppingPrice);

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
