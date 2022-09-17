import { navigate } from "../../utils/navigate";

Component({
  isCreated: false,
  selectedProduct: {},

  props: {
    isLoading: false,
    shippingFee: 0,
    price: 0,
    total: 0,
    products: [],
    coupon: {},
    skeletons: 0,
    onChangeTotal: () => {},
    onRemoveProduct: () => {},
    onChangeQuantityProduct: () => {},
    onTapProduct: () => {},
  },

  methods: {
    isCreated: false,
    selectedProduct: {},

    _onTapProduct(product) {
      this.props.onTapProduct(product);
    },
    _onRemoveProduct() {
      this.props.onRemoveProduct(this.selectedProduct);
      this.hideModal();
    },

    _onChangeQuantityOrder(product, quantity) {
      this.props.onChangeQuantityProduct(product, quantity);
    },

    confirmRemoveOrder(product) {
      this.selectedProduct = product;
      this.setData({
        modal: {
          isShow: true,
          headers: ["Xác nhận"],
          descriptions: ["Bạn chắc chắn muốn bỏ sản phẩm này?"],
          leftButton: "Không",
          rightButton: "Đồng ý",
        },
      });
    },

    onClickEditOrder() {
      my.navigateBack()
    },

    hideModal() {
      this.setData({
        modal: {
          isShow: false,
        },
      });
    },
  },
});
