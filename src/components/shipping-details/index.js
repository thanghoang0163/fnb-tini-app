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
      my.getAddress({
        success: (res) => {
          console.log("address", res);
        },
        fail: (e) => {
          console.log(console.error(e));
        },
      });
    },
  },
});
