import { method } from "lodash";

Component({
  props: {
    isLoading: false,
    name: "",
    price: "",
    className: "",
    option: {},
    onTap: () => {},
  },
  methods: {
    _onTap(e) {
      this.props.onTap(this.props.option);
      // console.log(this.props.option);
    },
  },
});
