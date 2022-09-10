Component({
  props: {
    isLoading: false,
    list: [],
    size: "",
  },
  data: {
    current: 0,
  },
  methods: {
    onChange(e) {
      this.setData({
        current: e.detail.current,
      });
    },
  },
});
