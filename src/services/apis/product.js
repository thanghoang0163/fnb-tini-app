import request from "../index";

export const getProductsArchives = async () => {
  const res = await request({
    path: "/get-products-archives",
  });
  return res;
};

// export const getProductsArchives = async ({
//   search = null,
//   order = null,
//   orderby = null,
//   page = 1,
// }) => {
//   const params = {
//     page,
//   };
//   if (search) {
//     params["search"] = search;
//   }
//   if (order) {
//     params["order"] = order;
//   }
//   if (orderby) {
//     params["orderby"] = orderby;
//   }
//   const res = await request({
//     path: "/get-products-archives",
//     params,
//   });
//   return res;
// };

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
