Component({
  props: {
    isLoading: false,
    buyer: {
      avatar: "",
      address: "",
      name: "",
      phone: "",
    },
  },
  methods: {
    _onOpenAddress() {
      my.navigateTo({ url: "pages/location/index" });
    },
  },
});
