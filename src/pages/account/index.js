import { getUserInfo, getNumOrders } from "../../services/fake-apis/index";

Page({
  data: {
    isLoading: false,
    user: {},
    numOrders: {},
  },

  onMoveToFavoriteProduct() {
    my.navigateTo({ url: "pages/favorite-product/index" });
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });

    try {
      const user = await getUserInfo();
      const numOrders = await getNumOrders();

      this.setData({
        user,
        numOrders,
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
