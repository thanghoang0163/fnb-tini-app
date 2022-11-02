Component({
  props: {
    className: "",
    sorts: [],
    onSelect: () => {},
  },

  data: {
    isShow: false,
    selected: null,
  },

  methods: {
    showBottomSheet() {
      my.hideTabBar();
      this.setData({
        isShow: true,
      });
    },

    hideBottomSheet() {
      my.showTabBar();
      this.setData({
        isShow: false,
      });
    },

    _onSelect(event) {
      const { item } = event.target.dataset;
      this.setData({
        selected: item,
      });
      this.hideBottomSheet();
      this.props.onSelect(item);
    },
  },
});
