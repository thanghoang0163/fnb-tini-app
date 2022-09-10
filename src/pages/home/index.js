import { homeApis, productApis } from "../../services/apis";

Page({
  data: {
    isLoading: false,
    isLoadingCarousel: false,
    sliders: [],
    products: [],
    newProducts: [],
  },

  mappingSlidersData(data) {
    if (!data) return [];
    return data.map((slider) => ({
      id: slider.ID,
      image: slider.feature_image,
    }));
  },

  mappingProductsData(data) {
    if (!data) return [];
    return data.map((product) => ({
      id: product.id,
      image: product.feature_image,
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

      const resProduct = await productApis.getProductsArchives();
      const featuredProduct = await productApis.getFeaturedProducts(12572);
      if (resProduct) {
        this.setData({
          products: this.mappingProductsData(resProduct).slice(0, 4),
          newProducts: this.mappingProductsData(featuredProduct),
        });
      }
      // console.log(featuredProduct);
    } catch (error) {}
  },

  async onReady() {
    this.setData({ isLoadingCarousel: true });
    this.loadData();
  },
});
