import request from "../index";

export const getProductsArchives = async () => {
  const res = await request({
    path: "/get-products-archives",
  });
  return res;
};

export const getFeaturedProducts = async (product_id) => {
  const res = await request({
    path: "/get-products-similar/" + product_id,
  });
  return res;
};

export const getProductDetail = async (product_id) => {
  const res = await request({
    path: "/get-products-single",
    params: {
      product_id,
    },
  });
  return res;
};
