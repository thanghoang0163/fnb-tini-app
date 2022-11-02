Page({
  data: {
    imgs: undefined,
    initWidth: 0,
    initHeight: 0,
    newWidth: 0,
    newHeight: 0,
    imagePath: undefined,
    streetLabel: "Địa chỉ nhận hàng:*",
    selectedDate: [1665421200000],
    tagData: [
      {
        date: "09-11-2022",
        tag: "Aa",
      },
      {
        date: "10-11-2022",
        tag: "Aa",
      },
      {
        date: "11-11-2022",
        tag: "Aa",
      },
      {
        date: "12-11-2022",
        tag: "Aa",
        tagColor: "blue",
        tagInactiveColor: "red",
      },
      {
        date: "13-11-2022",
        tag: "Aa",
        disabled: true,
      },
      {
        date: "28-11-2022",
        tag: "Aa",
        tagColor: "blue",
        tagInactiveColor: "red",
      },
    ],
  },
  onSelect(data) {
    console.log(data);
  },
  onChange(data) {
    console.log(data);
  },
});
