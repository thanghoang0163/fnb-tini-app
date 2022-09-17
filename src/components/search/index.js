Component({
  props: {
    className: "",
  },
  data: {
    value: "",
    isFocus: false,
  },
  methods: {
    getTextValue(e) {
      this.setData({
        value: e.detail.value,
      });
    },
    onTapIcon() {
      this.setData({
        value: "",
        isFocus: true,
      });
    },
    navigateToMenu() {
      my.switchTab({ url: "pages/menu/index" });
    },
  },
});
