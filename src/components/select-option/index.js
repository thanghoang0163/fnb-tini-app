import { method } from "lodash";

Component({
  props: {
    type: "size",
    isLoading: false,
    name: "",
    price: "",
    className: "",
    quantity: 0,
    option: {},
    onTap: () => {},
    onTapAdd: () => {},
    onTapSubtract: () => {},
  },
  methods: {
    _onTap(e) {
      this.props.onTap(this.props.option);
    },
    onTapAdd() {
      this.props.onTapAdd(this.props.option);
    },
    onTapSubtract() {
      this.props.onTapSubtract(this.props.option);
    },
  },
});
