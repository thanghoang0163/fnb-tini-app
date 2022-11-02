import { getTrackingDetail } from "../../services/fake-apis/index";

Page({
  data: {
    activeIndex: 0,
    isLoading: true,
    items: [],
  },

  mappingTrackingDetail(data) {
    return data.map((order) => ({
      label: order.status,
      sub: order.date,
    }));
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });

    try {
      const trackingSteps = await getTrackingDetail();

      this.setData({
        items: this.mappingTrackingDetail(trackingSteps),
        isLoading: false,
      });
    } catch (error) {
      this.setData({
        isLoading: false,
      });
    }
  },

  // Life cycle
  onReady() {
    this.loadData();
  },
});
