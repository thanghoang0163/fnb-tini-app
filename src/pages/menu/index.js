import { productApis } from "../../services/apis";
import { defaultSorts } from "../../utils/constants";

Page({
  data: {
    featuredProducts: {
      data: [],
      defaultData: [],
    },
    products: {
      data: [],
      defaultData: [],
    },
    isLoading: false,
    isShowSort: false,
    isInitial: true,
    textSearch: "",
    sorts: defaultSorts,
    selectedSort: {
      label: "",
      value: "",
    },
    categories: [
      {
        name: "beverage",
        image: "/assets/icons/beverage.svg",
        text: "Đồ uống",
      },
      {
        name: "food",
        image: "/assets/icons/food.svg",
        text: "Đồ ăn",
      },
      {
        name: "cake",
        image: "/assets/icons/cake.svg",
        text: "Bánh ngọt",
      },
    ],
    subCateName: "",
  },

  mappingProductsData(data) {
    if (!data) return [];
    return data.map((product) => ({
      id: product.id,
      feature_image: product.feature_image,
      price: product.price,
      name: product.name,
    }));
  },

  onSetAllCate(e) {
    this.setData({
      subCateName: "all",
    });
    setTimeout(() => {
      this.setData({
        isInitial: true,
      });
    }, 1000);
  },

  onTap(e) {
    this.setData({
      subCateName: e.target.dataset.name,
      isInitial: false,
      isLoading: true,
    });
    setTimeout(() => {
      this.setData({
        isLoading: false,
      });
    }, 1000);
  },

  onFocus() {
    this.setData({
      isShowSort: true,
    });
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });

    try {
      const featuredProducts = await productApis
        .getFeaturedProducts(12572)
        .finally(() => this.setData({ isLoading: false }));
      const res = await productApis
        .getProductsArchives()
        .finally(() => this.setData({ isLoading: false }));

      this.setData({
        products: this.mappingProductsData(res),
        featuredProducts: this.mappingProductsData(featuredProducts),
      });
    } catch (error) {
      console.log(error);
      this.setData({
        isLoading: false,
      });
    }
  },

  async onSearch(textSearch) {
    this.setData({ isLoading: true });
    const { products, selectedSort } = this.data;
    if (textSearch) {
      let orderby = selectedSort.value;
      let order = "desc";
      if (selectedSort.value.includes("price")) {
        order = selectedSort.value.split("/")[1];
        orderby = "price";
      }
      const data = await productApis.getProductsArchives({
        order,
        orderby,
        search: textSearch,
      });
      this.setData({
        products: {
          ...products,
          data,
        },
        isLoading: false,
        textSearch,
      });
    } else {
      this.setData({
        products: {
          ...products,
          data: products.defaultData,
        },
        isLoading: false,
      });
    }
  },

  async onSelectSort(selectedSort) {
    const sortValue = selectedSort.value;
    let orderby = sortValue;
    let order = "desc";
    if (sortValue.includes("price")) {
      order = sortValue.split("/")[1];
      orderby = "price";
    }
    const { textSearch, products } = this.data;
    const data = await productApis.getProductsArchives({
      search: textSearch,
      order,
      orderby,
    });
    this.setData({
      products: {
        ...products,
        data,
      },
      isLoading: false,
      selectedSort,
    });
  },

  async onReady() {
    this.loadData();
    this.setData({
      subCateName: "all",
    });
  },
});
