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
  },
});
