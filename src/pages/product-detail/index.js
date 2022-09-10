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
    quantityTopping: 1,
    totalPrice: 0,
    toppingPrice: 10000,
    sizeSPrice: 0,
    sizeMPrice: 4000,
    sizeLPrice: 10000,
  },

  onTapAdd() {
    const add = this.data.quantity + 1;
    this.setData({
      quantity: add,
    });
  },

  onTapSubtract() {
    const subtract = this.data.quantity - 1;
    if (subtract < 1) return;
    this.setData({
      quantity: subtract,
    });
  },

  // goBack() {
  //   my.navigateBack();
  // },

  addToFavoriteList() {
    this.setData({
      isClicked: true,
    });
  },

  async onLoad(query) {
    const { id } = parseQuery(query);
    const product = await productApis.getProductDetail(id);
    console.log(product.images);

    this.setData({
      product,
      totalPrice: 250000,
    });
  },
});
