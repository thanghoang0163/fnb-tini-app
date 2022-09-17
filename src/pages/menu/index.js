import { productApis } from "../../services/apis";

Page({
  data: {
    featuredProducts: [],
    products: [],
    isLoading: false,
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

  async onReady() {
    this.loadData();
  },
});
