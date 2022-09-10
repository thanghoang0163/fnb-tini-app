Component({
  props: {
    value: "",
    className: "",
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
      });
    },
    navigateToMenu() {
      my.switchTab({ url: "pages/menu/index" });
      console.log(1);
    },
  },
});
