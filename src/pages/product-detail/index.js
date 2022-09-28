import { productApis } from "../../services/apis";
import { parseQuery } from "../../utils/navigate";

const app = getApp();

Page({
  data: {
    isLoading: false,
    isLiked: false,
    product: {
      images: [],
      name: "",
      price: 0,
      size: {},
      topping: [],
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
    productId: 0,
    productTopping: [],
  },

  onTapAddQuantity() {
    const add = this.data.quantity + 1;
    const totalPrice = +this.data.product.price * add;
    this.setData({
      quantity: add,
      "product.quantity": add,
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
      "product.quantity": subtract,
      totalPrice,
    });
  },

  // Add Price Size Button
  onSelectOptionSize(size) {
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
  },

  // Add Topping Button
  onTapAddToppingQuantity(topping) {
    let totalPrice = +this.data.totalPrice + topping.price;
    let quantity = topping.quantity + 1;

    this.setData({
      selectedTopping: topping,
    });

    this.data.toppings[topping.id - 1] = {
      ...this.data.toppings[topping.id - 1],
      quantity: topping.quantity + 1,
    };

    let positon = this.data.productTopping.findIndex(
      (item) => item.id === topping.id
    );

    if (positon === -1) {
      this.data.productTopping.push(this.data.toppings[topping.id - 1]);
    } else {
      this.data.productTopping[positon].quantity = quantity;
    }

    this.setData({
      toppings: this.data.toppings,
      "product.topping": this.data.productTopping,
      totalPrice,
    });
  },

  onTapSubtractToppingQuantity(topping) {
    let totalPrice = +this.data.totalPrice - topping.price;
    let quantity = topping.quantity - 1;

    if (quantity < 0) return;

    this.data.toppings[topping.id - 1] = {
      ...this.data.toppings[topping.id - 1],
      quantity,
    };

    let positon = this.data.productTopping.findIndex(
      (item) => item.id === topping.id
    );

    if (positon === -1) {
      this.data.productTopping.push(this.data.toppings[topping.id - 1]);
    } else {
      this.data.productTopping[positon].quantity = quantity;
    }

    this.setData({
      selectedTopping: topping,
      toppings: this.data.toppings,
      "product.topping": this.data.productTopping,
      totalPrice,
    });
  },

  addToFavoriteList() {
    if (!this.data.isLiked) {
      this.setData({
        isLiked: true,
      });
      app.addFavoritedProduct(this.data.product);
    } else {
      this.setData({
        isLiked: false,
      });
      app.removeFavoritedProduct(this.data.product);
    }
  },

  // Cart Button
  addToCart() {
    const isUndefined = typeof this.data.product["topping"] === "undefined";

    if (isUndefined) {
      this.data.product = {
        ...this.data.product,
        topping: [
          {
            price: 0,
            quantity: 0,
          },
        ],
      };
    }

    const position = this.data.productTopping.findIndex(
      (item) => item.quantity == 0
    );

    if (position !== -1) {
      this.data.productTopping.splice(position, 1);
    }

    this.setData({
      "product.topping": this.data.productTopping,
    });

    app.addProduct(this.data.product, this.data.quantity);
    my.navigateTo({ url: "pages/cart/index" });
  },

  addAndGoToCart() {
    const isUndefined = typeof this.data.product["topping"] === "undefined";

    if (isUndefined) {
      this.data.product = {
        ...this.data.product,
        topping: [
          {
            price: 0,
            quantity: 0,
          },
        ],
      };
    }

    const position = this.data.productTopping.findIndex(
      (item) => item.quantity == 0
    );

    if (position !== -1) {
      this.data.productTopping.splice(position, 1);
    }

    this.setData({
      "product.topping": this.data.productTopping,
    });

    app.addProduct(this.data.product, this.data.quantity);
    my.navigateTo({ url: "pages/cart/index" });
  },

  async onLoad(query) {
    const { id } = parseQuery(query);
    const product = await productApis.getProductDetail(id).finally(() =>
      this.setData({
        isLoading: false,
      })
    );

    this.setData({
      product,
      productId: id,
      "product.size": this.data.sizes[0],
    });

    const position = app.cart.orderedProducts.findIndex(
      (item) => item.id === product.id
    );

    if (position !== -1) {
      const orderedProduct = app.cart.orderedProducts[position];
      const selectedSize = orderedProduct.size;
      const quantity = orderedProduct.quantity;
      const toppingProduct = orderedProduct.topping;
      const toppingPrice = toppingProduct.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
      const totalPrice =
        +orderedProduct.price + +selectedSize.price + toppingPrice;

      this.data.toppings.map((topping) => {
        return toppingProduct.map((item) => {
          if (topping.id === item.id) {
            return (topping.quantity = item.quantity);
          }
        });
      });

      this.setData({
        product: orderedProduct,
        selectedSize,
        quantity,
        totalPrice,
        toppings: this.data.toppings,
        oldSizePrice: app.cart.oldSizePrice,
        productTopping: app.cart.productTopping,
      });
    } else {
      this.setData({
        totalPrice: product.price,
      });
    }

    const positionFavorite = app.cart.favoritedProducts.findIndex(
      (item) => item.id === product.id
    );

    if (positionFavorite !== -1) {
      if (app.cart.favoritedProducts[positionFavorite].isLiked) {
        this.setData({
          isLiked: true,
        });
      } else {
        this.setData({
          isLiked: false,
        });
      }
    }
  },

  onReady() {
    this.setData({
      isLoading: true,
      selectedSize: this.data.sizes[0],
    });
  },
});
