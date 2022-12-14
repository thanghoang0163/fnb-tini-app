import { getCouponsAPI } from "../../services/fake-apis/index";
import { productApis } from "../../services/apis";
import { EMITTERS } from "../../utils/constants";
import { navigate } from "../../utils/navigate";

const app = getApp();

Page({
  disposableCollection: [],

  data: {
    isLoading: false,
    isLoadingEmpty: false,
    cart: {
      buyer: {},
      seller: {},
      orderedProducts: [],
      shippingFee: 0,
      price: 0,
      total: 0,
      size: {},
      topping: [],
      coupon: {
        name: "",
        discount: 0,
        isValid: false,
      },
    },
    coupons: [],
    modal: {
      key: "",
      isShow: false,
      headers: [],
      descriptions: [],
      leftButton: "",
      rightButton: "",
    },
    isShowCouponBottomSheet: false,
  },

  mappingProductsData(data) {
    if (!data) return [];
    return data.map((product) => ({
      id: product.id,
      feature_image: product.feature_image,
      price: product.price,
      name: product.name,
    }));
  },

  async loadData() {
    try {
      this.setData({
        isLoading: true,
      });

      const coupons = await getCouponsAPI();
      const res = await productApis
        .getProductsArchives()
        .finally(() => this.setData({ isLoading: false }));

      this.setData({
        popularProducts: this.mappingProductsData(res).slice(0, 4),
        coupons,
        cart: app.cart,
      });
    } catch {
      console.error();
      this.setData({
        isLoading: false,
      });
    }
  },

  onRemoveProduct(product) {
    app.removeProduct(product);
    this.setData({
      isLoadingEmpty: true,
    });
    my.hideOverlay({});
  },

  onChangeQuantityProduct(product, quantity) {
    app.changeQuantityProduct(product, quantity);
  },

  showCouponBottomSheet() {
    if (this.data.cart.total > 0)
      this.setData({
        isShowCouponBottomSheet: true,
      });
  },

  hideCouponBottomSheet() {
    this.setData({
      isShowCouponBottomSheet: false,
    });
  },

  onRemoveCoupon() {
    app.removeCoupon();
  },

  async onSelectCoupon(code) {
    this.hideCouponBottomSheet();
    app.selectCoupon(code);
    my.hideOverlay({});
  },

  hideModal() {
    this.setData({
      modal: {
        isShow: false,
      },
    });
  },

  makePayment() {
    this.setData({
      modal: {
        key: "payment",
        isShow: true,
        headers: ["Thanh to??n"],
        descriptions: ["B???n mu???n thanh to??n c??c s???n ph???m n??y?"],
        leftButton: "Kh??ng",
        rightButton: "?????ng ??",
      },
    });
  },

  makePaymentFail() {
    this.setData({
      modal: {
        key: "payment_failed",
        isShow: true,
        headers: ["Thanh to??n kh??ng th??nh c??ng"],
        descriptions: ["Thanh to??n b??? t??? ch???i! Vui l??ng th??? l???i"],
        leftButton: "",
        rightButton: "OK",
      },
    });
  },

  makePaymentSucess() {
    app.resetCart();
    this.setData({
      modal: {
        key: "payment_success",
        isShow: true,
        headers: ["Thanh to??n th??nh c??ng"],
        descriptions: [
          "Vui l??ng ki???m tra ????n h??ng t???i m???c 'Qu???n l?? thanh to??n'",
        ],
        leftButton: "Mua s???m",
        rightButton: "Ki???m tra",
      },
    });
  },

  onClickModalLeftButton() {
    switch (this.data.modal.key) {
      case "payment":
        this.makePaymentFail();
        break;
      case "payment_success":
        this.hideModal();
        my.navigateTo({ url: "pages/home/index" });
        my.showTabBar({
          animation: true,
        });
        break;
    }
  },

  onClickModalRightButton() {
    switch (this.data.modal.key) {
      case "payment":
        this.makePaymentSucess();
        break;
      case "payment_failed":
        this.hideModal();
        break;
      case "payment_success":
        this.hideModal();
        my.navigateTo({ url: "pages/order/index" });
        my.showTabBar({
          animation: true,
        });
        break;
    }
  },

  async onLoad() {
    this.disposableCollection.push(
      app.cartEvent.on(EMITTERS.CART_UPDATE, (cart) =>
        this.setData({
          cart,
        })
      )
    );
  },

  async onReady() {
    this.loadData();
  },

  onUnload() {
    this.disposableCollection.forEach((dispose) => dispose());
  },
});
