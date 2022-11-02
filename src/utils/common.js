export const create_UUID = () => {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};
const listTagsRemove = [
  { start: "<img", end: "/>" },
  { start: "<!--", end: "-->" },
];

const removeContentWithTag = (value, startTag, endTag) => {
  const index = value.search(startTag);
  if (index === -1) return value;
  const content2 = value.slice(index);
  const indexEnd = content2.search(endTag);
  const imgTag = content2.slice(0, indexEnd) + endTag;
  const newHTML = value.replace(imgTag, "");
  return removeContentWithTag(newHTML, startTag, endTag);
};

export const getContent = (html) => {
  let htmlValue = html;
  listTagsRemove.forEach(({ start, end }) => {
    htmlValue = removeContentWithTag(htmlValue, start, end);
  });
  return htmlValue;
};
