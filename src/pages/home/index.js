import { homeApis, productApis } from "../../services/apis";
import { defaultSorts } from "../../utils/constants";

Page({
  maxSearch: 5,

  data: {
    isLoading: false,
    isLoadingCarousel: false,
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

  async onReady() {
    this.setData({ isLoadingCarousel: true });
    this.loadData();

    my.hideBackHome({ hide: true });
  },
});
