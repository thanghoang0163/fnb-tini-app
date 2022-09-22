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
      my.navigateTo({ url: "pages/home/index" });
    },
  },
});
