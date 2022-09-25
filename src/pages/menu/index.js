import { productApis } from "../../services/apis";
import { defaultSorts } from "../../utils/constants";

Page({
  data: {
    featuredProducts: [],
    products: [],
    isLoading: false,
    isShowSort: false,
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
  },

  onTap(e) {
    this.setData({
      subCateName: e.target.dataset.name,
    });
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
      const { products } = this.data;
      const featuredProducts = await productApis
        .getFeaturedProducts(12572)
        .finally(() => this.setData({ isLoading: false }));
      const res = await productApis
        .getProductsArchives()
        .finally(() => this.setData({ isLoading: false }));

      if (res) {
        this.setData({
          featuredProducts: this.mappingProductsData(featuredProducts),
          products: this.mappingProductsData(res),
        });
      }
    } catch (error) {
      console.log(error);
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
        page: 1,
      });
      this.setData({
        products: {
          ...products,
          data,
          page: 1,
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
      page: 1,
    });
    this.setData({
      products: {
        ...products,
        data,
        page: 1,
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
