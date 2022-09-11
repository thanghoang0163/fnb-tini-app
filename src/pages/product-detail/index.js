import { productApis } from "../../services/apis";
import parse from "@tiki.vn/mini-html-parser2";
import { parseQuery } from "../../utils/navigate";
import { navigate } from "../../utils/navigate";
import { decode } from "html-entities";

Page({
  data: {
    isLoading: false,
    isClicked: false,
    product: {
      images: [],
      name: "",
      price: 0,
    },
    quantity: 1,
    quantityTopping: 0,
    totalPrice: 0,
    toppingPrice: 10000,
    sizeSPrice: 0,
    sizeMPrice: 4000,
    sizeLPrice: 10000,
  },

  onTapAddQuantity() {
    const add = this.data.quantity + 1;
    const totalPrice = +this.data.totalPrice + this.data.product.price 
    this.setData({
      quantity: add,
      totalPrice 
    });
  },

  onTapSubtractQuantity() {
    const subtract = this.data.quantity - 1;
    if (subtract < 1) return;
    const totalPrice = +this.data.totalPrice - +this.data.product.price 
    this.setData({
      quantity: subtract,
      totalPrice
    });
  },

  // Add Topping Button
  onTapAddToppingQuantity() {
    const add = this.data.quantityTopping + 1;
    const totalPrice = +this.data.totalPrice + +this.data.toppingPrice 
    this.setData({
      quantityTopping: add,
      totalPrice
    });
  },

  onTapSubtractToppingQuantity() {
    const subtract = this.data.quantityTopping - 1;
    if (subtract < 0) return;
    const totalPrice = +this.data.totalPrice - this.data.toppingPrice 
    this.setData({
      quantityTopping: subtract,
      totalPrice
    });
  },
  

  addToFavoriteList() {
    this.setData({
      isClicked: true,
    });
  },

  async onLoad(query) {
    const { id } = parseQuery(query);
    const product = await productApis.getProductDetail(id);
    // console.log(product.images);

    this.setData({
      product,
      totalPrice: product.price,
    });
  },
});
