Component({
  props: {
    title: "",
    description: "",
    buttonText: "",
    className: "",
    showBottomDivider: false,
  },
  methods: {
    onTapContinue() {
      my.switchTab({ url: "pages/home/index" });
    },
  },
});
