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
      const featuredProducts = await productApis.getFeaturedProducts(12572);
      const res = await productApis.getProductsArchives();
      // console.log(res)

      if (res) {
        this.setData({
          featuredProducts: this.mappingProductsData(featuredProducts),
          products: this.mappingProductsData(res)
        });
      }
    }
    catch(error) {
      console.log(error)
    }
  },

  async onReady() {
    this.loadData();
  },
});
