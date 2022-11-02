Component({
  isTyping: null,
  props: {
    className: "",
    placeholder: "Tìm kiếm...",
    value: "",
    onInput: () => {},
    onSearch: () => {},
    onConfirm: () => {},
  },

  methods: {
    isTyping: null,

    _onChangeSearchInput(event) {
      const { value } = event.detail;
      this.props.onInput(value);
    },

    _clearSearchInput() {
      this.props.onInput("");
      this._onSearch();
    },

    _onSearch() {
      this.props.onSearch(this.props.value);
    },

    _onConfirm(event) {
      // this.props.onConfirm(event.detail.value);
      my.getAuthCode({
        success: (res) => {
          console.log(res);
        },
        fail: (res) => {
          console.log(res);
        },
      });
    },
  },

  // Life cycle
  didUpdate() {
    if (this.isTyping) {
      clearTimeout(this.isTyping);
    }
    this.isTyping = setTimeout(() => {
      this._onSearch();
    }, 400);
  },
});
