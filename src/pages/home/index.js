import { homeApis, productApis } from "../../services/apis";
import { defaultSorts } from "../../utils/constants";

Page({
  maxSearch: 5,

  data: {
    isLoading: false,
    isLoadingCarousel: false,
    isShowSort: false,
    sliders: [],
    products: [],
    newProducts: [],
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
      if (resProduct) {
        this.setData({
          products: this.mappingProductsData(resProduct).slice(0, 4),
          newProducts: this.mappingProductsData(featuredProduct),
        });
      }
    } catch (error) {}
  },

  async onSearch(textSearch) {
    this.setData({
      isLoading: true,
      isShowSort: true,
    });
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

  async onSelectSort(selectSort) {
    const sortValue = selectSort.value;
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
      selectSort,
    });
  },

  async onReady() {
    this.setData({ isLoadingCarousel: true });
    this.loadData();

    my.hideBackHome({ hide: true });
  },
});
