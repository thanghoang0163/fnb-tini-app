Component({
  props: {
    isLoading: false,
    product: {
      id: "",
      images: [],
      name: "",
      price: 0,
      quantity: 1,
    },
    onClickRemoveOrder: () => {},
    onClickEditOrder: () => {},
    onTapProduct: () => {},
  },
  methods: {
    _onTapProduct() {
      this.props.onTapProduct(this.props.product);
    },
    _onClickRemoveOrder() {
      this.props.onClickRemoveOrder(this.props.product);
    },

    _onClickEditOrder() {
      this.props.onClickEditOrder(this.props.product);
    },

    _onChangeQuantityOrder(value) {
      this.props.onChangeQuantityOrder(this.props.product, value);
    },
  },
});
