Component({
  props: {
    isShow: false,
    coupons: [],
    onClose: () => {},
    onSelect: () => {},
  },
  data: {
    value: "",
  },
  methods: {
    _onClose() {
      this.props.onClose();
    },
    _onSelect(e) {
      const { item } = e.target.dataset;
      const code = (item && item.code) || this.data.value;
      this.props.onSelect(code);
    },
    onInput(e) {
      this.setData({
        value: e.detail.value,
      });
    },
  },
});
