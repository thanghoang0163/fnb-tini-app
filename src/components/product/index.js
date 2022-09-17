import { navigate } from "../../utils/navigate";

const app = getApp();

Component({
  props: {
    isLoading: false,
    product: {
      id: "",
      name: "",
      price: "",
      feature_image: "",
    },
    className: "",
  },
  data: {
    selectedProduct: {
      id: "",
      images: [],
      name: "",
      price: 0,
      quantity: 1,
    },
  },
  methods: {
    _onTapProduct() {
      const { id } = this.props.product;
      navigate({
        page: "product-detail",
        params: {
          id,
        },
      });
    },

    addToCart() {
      this.setData({
        "selectedProduct.id": this.props.product.id,
        "selectedProduct.images": [{ src: this.props.product.feature_image }],
        "selectedProduct.name": this.props.product.name,
        "selectedProduct.price": this.props.product.price,
      });
      app.addProduct(
        this.data.selectedProduct,
        this.data.selectedProduct.quantity
      );
      // console.log(this.data.selectedProduct);
    },
  },
});
