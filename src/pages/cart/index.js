import { getCouponsAPI } from "../../services/fake-apis/index";
import { productApis } from "../../services/apis";
import { EMITTERS } from "../../utils/constants";
import { navigate } from "../../utils/navigate";

const app = getApp();

Page({
  disposableCollection: [],

  data: {
    isLoading: false,
    cart: {
      buyer: {},
      seller: {},
      orderedProducts: [],
      shippingFee: 0,
      price: 0,
      total: 0,
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
      const res = await productApis.getProductsArchives();

      this.setData({
        popularProducts: this.mappingProductsData(res).slice(0, 4),
        coupons,
        cart: app.cart,
        isLoading: false,
      });
    } catch {
      console.error();
      this.setData({
        isLoading: false,
      });
    }
  },

  onTapProduct() {
    my.navigateBack();
  },

  onRemoveProduct(product) {
    app.removeProduct(product);
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
