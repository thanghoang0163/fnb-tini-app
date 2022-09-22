import { productApis } from "../../services/apis";
import { parseQuery } from "../../utils/navigate";

const app = getApp();

Page({
  data: {
    isLoading: false,
    isClicked: false,
    product: {
      images: [],
      name: "",
      price: 0,
      size: {},
      topping: {},
    },
    quantity: 1,
    totalPrice: 0,
    sizes: [
      {
        id: 1,
        name: "S",
        price: 0,
      },
      {
        id: 2,
        name: "M",
        price: 4000,
      },
      {
        id: 3,
        name: "L",
        price: 10000,
      },
    ],
    toppings: [
      {
        id: 1,
        name: "Trân châu đường đen",
        price: 10000,
        quantity: 0,
      },
      {
        id: 2,
        name: "Thạch trái cây",
        price: 20000,
        quantity: 0,
      },
      {
        id: 3,
        name: "Thêm đường",
        price: 30000,
        quantity: 0,
      },
    ],
    oldSizePrice: 0,
    toppingId: 0,
    productId: 0,
  },

  onTapAddQuantity() {
    const add = this.data.quantity + 1;
    const totalPrice = +this.data.product.price * add;
    this.setData({
      quantity: add,
      totalPrice,
    });
  },

  // Product
  onTapSubtractQuantity() {
    const subtract = this.data.quantity - 1;
    if (subtract < 1) return;
    const totalPrice = +this.data.product.price * subtract;
    this.setData({
      quantity: subtract,
      totalPrice,
    });
  },

  // Add Price Size Button
  _onSelectOptionSize(size) {
    let totalPrice = this.data.totalPrice;

    if (this.data.oldSizePrice !== size.price) {
      totalPrice -= this.data.oldSizePrice;
      this.setData({
        oldSizePrice: size.price,
      });
      totalPrice += size.price;
    }

    this.setData({
      selectedSize: size,
      "product.size": size,
      totalPrice,
    });

    console.log(this.data.product.size);
  },

  // Add Topping Button
  onTapAddToppingQuantity(topping) {
    let totalPrice = +this.data.totalPrice + topping.price;

    this.data.toppings[topping.id - 1] = {
      ...this.data.toppings[topping.id - 1],
      quantity: topping.quantity + 1,
    };

    this.setData({
      selectedTopping: topping,
      toppings: this.data.toppings,
      "product.topping": topping,
      totalPrice,
    });

    console.log(this.data.product.topping);
  },

  onTapSubtractToppingQuantity(topping) {
    let totalPrice = +this.data.totalPrice - topping.price;
    let quantity = topping.quantity - 1;

    if (quantity < 0) return;

    this.data.toppings[topping.id - 1] = {
      ...this.data.toppings[topping.id - 1],
      quantity,
    };
    this.setData({
      selectedTopping: topping,
      toppings: this.data.toppings,
      "product.topping": topping,
      totalPrice,
    });
  },

  addToFavoriteList() {
    if (!this.data.isClicked) {
      this.setData({
        isClicked: true,
      });
      app.addFavoritedProduct(this.data.product);
    } else {
      this.setData({
        isClicked: false,
      });
      app.removeFavoritedProduct(this.data.product);
    }
  },

  // Cart Button
  addToCart() {
    app.addProduct(this.data.product, this.data.quantity);
    app.addSize(this.data.product.size);
    app.addTopping(this.data.product.topping);
    my.navigateTo({ url: "pages/cart/index" });
  },

  addAndGoToCart() {
    app.addProduct(this.data.product, this.data.quantity);
    app.addSize(this.data.product.size);
    app.addTopping(this.data.product.topping);
    my.navigateTo({ url: "pages/cart/index" });
  },

  async onLoad(query) {
    const { id } = parseQuery(query);
    const product = await productApis.getProductDetail(id);

    this.setData({
      product,
      totalPrice: product.price,
      productId: id,
    });
  },
});
