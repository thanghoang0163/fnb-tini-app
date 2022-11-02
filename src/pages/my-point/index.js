import { getMyPoint } from "../../services/fake-apis/index";

Page({
  data: {
    isLoading: true,
    myPoint: {},
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });

    try {
      const myPoint = await getMyPoint();

      this.setData({
        myPoint,
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
