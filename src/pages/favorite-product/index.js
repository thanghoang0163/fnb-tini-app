import { productApis } from "../../services/apis/index";

const app = getApp();

Page({
  data: {
    isLoading: true,
    products: [],
    favoritedProducts: [],
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

  mappingFavoritedProduct(data) {
    if (!data) return [];
    return data.map((product) => ({
      id: product.id,
      feature_image: data.images[0].src,
      price: product.price,
      name: product.name,
    }));
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });
    try {
      const res = await productApis
        .getProductsArchives()
        .finally(() => this.setData({ isLoading: false }));

      const favoritedProducts = app.cart.favoritedProducts;

      this.setData({
        products: this.mappingProductsData(res),
        favoritedProducts,
        isLoading: false,
      });
    } catch (error) {
      this.setData({
        isLoading: false,
      });
    }
  },

  onReady() {
    this.loadData();
  },
});
