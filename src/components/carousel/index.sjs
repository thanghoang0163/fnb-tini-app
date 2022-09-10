function getSizeCarousel(size) {
  switch (size) {
    case "large":
      return "large";
    default:
      return "medium";
  }
}

export default {
  getSizeCarousel,
};
