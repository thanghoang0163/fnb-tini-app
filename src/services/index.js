import queryString from "query-string";

export const BASE_URL = "https://gaspa.vn/wp-json/wp/v2";

export const request = async ({
  path = "",
  method = "GET",
  headers = {},
  params = null,
  baseUrl,
  data,
}) => {
  return new Promise((resolve, reject) => {
    my.request({
      url: `${queryString.stringifyUrl(
        {
          url: `${BASE_URL}${path}`,
          query: { ...params },
        },
        { skipNull: true }
      )}`,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      method,
      data,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export default request;
