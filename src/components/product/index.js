import { navigate } from "../../utils/navigate";

Component({
  props: {
    isLoading: false,
    product: {
      id: "",
      name: "",
      price: "",
      image: "",
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
