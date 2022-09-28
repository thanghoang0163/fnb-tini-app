import { homeApis, productApis, searchApis } from "../../services/apis";
import { defaultSorts } from "../../utils/constants";

Page({
  maxSearch: 5,

  data: {
    isLoading: false,
    isLoadingCarousel: false,
    isInitial: true,
    skeletons: 4,
    sliders: [],
    products: [],
    newProducts: [],
    textSearch: "",
    sorts: defaultSorts,
    selectedSort: {
      label: "",
      value: "",
    },
  },

  mappingSlidersData(data) {
    if (!data) return [];
    return data.map((slider) => ({
      id: slider.ID,
      feature_image: slider.feature_image,
    }));
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

  async loadData() {
    this.setData({
      isLoading: true,
    });

    try {
      const res = await homeApis
        .getSlideArchives()
        .finally(() => this.setData({ isLoadingCarousel: false }));
      if (res.success) {
        this.setData({
          sliders: this.mappingSlidersData(res.data),
        });
      }

      const resProduct = await productApis
        .getProductsArchives()
        .finally(() => this.setData({ isLoading: false }));
      const featuredProduct = await productApis
        .getFeaturedProducts(12572)
        .finally(() => this.setData({ isLoading: false }));

      this.setData({
        products: this.mappingProductsData(resProduct).slice(0, 4),
        newProducts: this.mappingProductsData(featuredProduct),
      });
    } catch (error) {
      console.log(error);
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
    this.setData({ isLoadingCarousel: true });
    this.loadData();

    my.hideBackHome({ hide: true });
  },
});
