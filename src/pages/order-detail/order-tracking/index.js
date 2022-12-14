import { isObjectEqual } from "../../../utils/common";

Component({
  data: {
    activeIndex: 0,
    orderInfo: {},
    items: [
      {
        label: "delivered",
        sub: "19:27, 21/05/2021",
      },
    ],
  },
  props: {
    isLoading: false,
    order: {
      id: "",
      tracking: {},
      buyer: {},
      seller: {},
    },
  },

  methods: {
    onMoveTrackingDetail() {
      my.navigateTo({ url: "pages/tracking-detail/index" });
    },
  },

  deriveDataFromProps(nextProps) {
    if (isObjectEqual(this.props, nextProps)) return;

    if (nextProps.order.id) {
      const { tracking } = nextProps.order;
      const steps = [
        {
          id: tracking.id,
          status: tracking.status,
          description: tracking.date,
        },
      ];

      this.setData({
        orderSteps: steps,
      });
    }
  },
});
