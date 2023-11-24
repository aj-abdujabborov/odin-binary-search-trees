export default function mergeSort(array = []) {
  if (array.length < 2) return array;

  const midInd = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, midInd));
  const right = mergeSort(array.slice(midInd, array.length));

  const sortedArray = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      sortedArray.push(left.shift());
    } else {
      sortedArray.push(right.shift());
    }
  }

  return [...sortedArray, ...left, ...right];
}
