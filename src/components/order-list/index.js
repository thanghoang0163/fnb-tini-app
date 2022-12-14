import { navigate } from "../../utils/navigate";

Component({
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
    onTapInfo: () => {},
  },

  methods: {
    isCreated: false,
    selectedProduct: {},

    _onTapProduct(product) {
      const { id } = product;
      navigate({
        page: "product-detail",
        params: {
          id,
        },
      });
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

    onClickEditOrder(product) {
      const { id } = product;
      navigate({
        page: "product-detail",
        params: {
          id,
        },
      });
    },

    onTapInfo() {
      this.setData({
        modal: {
          isShow: true,
          headers: ["Thông tin"],
          descriptions: ["Đây là phí vận chuyển của bên vận chuyển đưa ra"],
          rightButton: "Đồng ý",
        },
      });
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
