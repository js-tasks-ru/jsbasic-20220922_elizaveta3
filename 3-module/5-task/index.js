function getMinMax(str) {
  let arr = str.split(" ");
  let numericarr = arr.filter((item) => +item);
  let max = Math.max(...numericarr);
  let min = Math.min(...numericarr);
  let result = {min: min, max: max};
  return result;
}
