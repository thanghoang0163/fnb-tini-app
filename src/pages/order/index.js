import { getOrders } from "../../services/fake-apis/index";
import queryString from "query-string";

Page({
  data: {
    isLoading: false,
    activeTab: 0,
    orderTabs: [
      {
        id: 1,
        title: "All",
      },
      {
        id: 2,
        title: "Chờ thanh toán",
      },
      {
        id: 3,
        title: "Đang tiến hành",
      },
      {
        id: 4,
        title: "Đang giao",
      },
    ],
    orders: [],
    selectedOrder: {},
  },

  onTabClick({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  onChangeTab({ index, tabsName }) {
    if (!this.data.isLoading) {
      this.setData({
        [tabsName]: index,
      });
    }
    this.loadData();
  },

  onMoveOrderDetail() {
    my.navigateTo({ url: "pages/order-detail/index" });
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });

    try {
      const orders = await getOrders();

      this.setData({
        orders,
        isLoading: false,
      });
    } catch (error) {
      this.setData({
        isLoading: false,
      });
    }
  },

  // Life cycle
  onLoad(query) {},

  onReady() {
    this.loadData();
  },
});
