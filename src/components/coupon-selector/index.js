Component({
  props: {
    isShow: false,
    onClose: () => {},
    onSelect: () => {},
  },
  data: {
    value: "",
    initCoupons: [],
    coupons: [
      {
        name: "NH Tiên Phong",
        image: "/assets/icons/tp-bank.png",
      },
      {
        name: "NH Phát triển thành phố Hồ Chí Minh",
        image: "/assets/icons/hd-bank.png",
      },
      {
        name: "NH Dầu khí toàn cầu",
        image: "/assets/icons/gp-bank.png",
      },
    ],
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
      const value = e.detail.value;
      const filterCoupon = this.data.initCoupons.filter((coupon) =>
        coupon.name.includes(this.capitalizeTheFirstLetter(value))
      );

      console.log(filterCoupon);

      if (filterCoupon.length !== 0) {
        this.setData({
          value,
          coupons: filterCoupon,
        });
      } else {
        this.setData({
          coupons: [
            {
              name: "Không tìm thấy ngân hàng",
            },
          ],
        });
      }

      if (value === "") {
        this.setData({
          coupons: this.data.initCoupons,
        });
      }
    },

    capitalizeTheFirstLetter(string) {
      const arr = string.split(" ");
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
      const str2 = arr.join(" ");
      return str2;
    },
  },
  didMount() {
    this.setData({
      initCoupons: this.data.coupons,
    });
  },
});
