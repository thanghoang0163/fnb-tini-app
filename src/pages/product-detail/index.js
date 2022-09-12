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
      },
      {
        id: 2,
        name: "Thạch trái cây",
        price: 20000,
      },
      {
        id: 3,
        name: "Thêm đường",
        price: 30000,
      },
    ],
    selectedSize: {},
    isSelected: false,
    oldSizePrice: 0,
  },

  onTapAddQuantity() {
    const add = this.data.quantity + 1;
    const totalPrice = +this.data.totalPrice + +this.data.product.price;
    this.setData({
      quantity: add,
      totalPrice,
    });
  },

  onTapSubtractQuantity() {
    const subtract = this.data.quantity - 1;
    if (subtract < 1) return;
    const totalPrice = +this.data.totalPrice - +this.data.product.price;
    this.setData({
      quantity: subtract,
      totalPrice,
    });
  },

  // Add Price Size Button
  _onSelectOption(size) {
    let totalPrice = +this.data.totalPrice;

    console.log(size.price);
    if (this.data.oldSizePrice != size.price) {
      totalPrice -= this.data.oldSizePrice;
      this.setData({
        oldSizePrice: size.price,
      });
      totalPrice += +size.price;
      console.log("qbc");
    }

    this.setData({
      selectedSize: size,
      totalPrice,
    });
    // console.log(oldPrice);
  },

  // Add Topping Button
  onTapAddToppingQuantity() {
    const add = +this.data.quantityTopping + 1;
    const totalPrice = +this.data.totalPrice + +this.data.toppings.price;
    this.setData({
      quantityTopping: add,
      totalPrice,
    });
  },

  onTapSubtractToppingQuantity() {
    const subtract = +this.data.quantityTopping - 1;
    if (subtract < 0) return;
    const totalPrice = +this.data.totalPrice - +this.data.toppingPrice;
    this.setData({
      quantityTopping: subtract,
      totalPrice,
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

    this.setData({
      product,
      totalPrice: product.price,
    });
  },
});
