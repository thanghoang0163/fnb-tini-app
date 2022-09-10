import request from "../index";

export const getSlideArchives = async () => {
  const res = await request({
    path: "/get-slide-archives",
  });
  return res;
};
