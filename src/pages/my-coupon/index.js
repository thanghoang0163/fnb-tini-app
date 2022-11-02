import { getCouponsAPI } from "../../services/fake-apis/index";

Page({
  data: {
    isLoading: true,
    coupons: [],
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });

    try {
      const coupons = await getCouponsAPI();

      this.setData({
        coupons,
        isLoading: false,
      });
    } catch (error) {
      this.setData({
        isLoading: false,
      });
    }
  },

  onReady() {
    this.loadData();
  },
});
