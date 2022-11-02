import request from "../index";

export const searchProducts = async ({ sort, search = "" }) => {
  const products = await request({
    path: "/get-products-archives",
  });
  let result = [...products];

  if (sort) {
    switch (sort) {
      case "asc":
        return result.sort((a, b) => +a.price - +b.price);
      case "desc":
        return result.sort((b, a) => +a.price - +b.price);
    }
  }

  capitalizeFirstLetter = (text) => {
    const words = text.split(" ");

    words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
  };

  if (search)
    result = result.filter((p) =>
      capitalizeFirstLetter(p.name).includes(capitalizeFirstLetter(search))
    );

  return result;
};
