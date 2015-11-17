var selectionSort = function (arr) {
  let i,m,j;
  for (i = -1; ++i < a.length;) {
    for (m = j = i; ++j < a.length;) {
      if (arr[m] > arr[j]) m = j;
    }
    [arr[m], arr[i]] = [arr[i], arr[m]];
 }
 return arr;
}