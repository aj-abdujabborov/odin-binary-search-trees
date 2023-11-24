export default function getUniqueInSortedArray(array) {
  if (!array.length) return undefined;

  let prevValue = array[0];
  const uniqueArray = [array[0]];

  for (let i = 1; i < array.length; i += 1) {
    if (prevValue !== array[i]) {
      uniqueArray.push(array[i]);
      prevValue = array[i];
    }
  }

  return uniqueArray;
}
