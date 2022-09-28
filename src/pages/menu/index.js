import { productApis, searchApis } from "../../services/apis";
import { defaultSorts } from "../../utils/constants";

Page({
  data: {
    featuredProducts: [],
    products: [],
    isLoading: false,
    isInitial: true,
    skeletons: 4,
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

  async onSelectSort(selectedSort) {
    this.setData({
      isLoading: true,
    });

    const sortValue = selectedSort.value;
    let orderby = "";
    if (sortValue.includes("price")) {
      orderby = sortValue.split("/")[1];
    }

    try {
      const products = await searchApis
        .searchProducts({
          sort: orderby,
        })
        .finally(() => this.setData({ isLoading: false, isInitial: false }));

      this.setData({
        products,
        isLoading: false,
      });
    } catch (error) {
      this.setData({
        isLoading: false,
      });
    }
  },

  onInput(textSearch) {
    const recentSearch = textSearch;
    this.setData({
      textSearch: recentSearch,
      isInitial: false,
    });
  },

  async onSearch(textSearch) {
    if (textSearch) {
      this.searchProducts();
    }

    this.setData({
      products: this.data.products,
      isInitital: false,
    });
  },

  onConfirm(textSearch) {
    this.onSearch(textSearch);
  },

  async searchProducts() {
    this.setData({
      isLoading: true,
    });
    try {
      const products = await searchApis
        .searchProducts({
          search: this.data.textSearch,
        })
        .finally(() => this.setData({ isLoading: false, isInitial: false }));

      this.setData({
        products,
        isLoading: false,
      });
    } catch (error) {
      this.setData({
        isLoading: false,
      });
    }
  },

  async onReady() {
    this.loadData();
    this.setData({
      subCateName: "all",
    });
  },
});
