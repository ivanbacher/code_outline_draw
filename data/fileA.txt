//https://github.com/benoitvallon/computer-science-in-javascript/tree/master/sorting-algorithms-in-javascript

function resetCounters() {
    countOuter = 0;
    countInner = 0;
    countSwap = 0;
}

// classic implementation (with Hoare or Lomuto partition scheme, you can comment either one method or the other to see the difference)
function quicksort(partitionType, array, left, right) {
    countOuter++;

    left = left || 0;
    right = right || array.length - 1;
    partitionType = partitionType || 'hoare'

    if(partitionType === 'hoare') {
        var temp1 = 'hoare partition selected';
        //console.log(temp1);

        var pivot = partitionHoare(array, left, right);
    }

    if(partitionType === 'lomuto') {
        var temp2 = 'Lomuto partition selected';
        //console.log(temp2);

        var pivot = partitionLomuto(array, left, right);
    }

    if (left < pivot - 1) {
        quicksort(partitionType, array, left, pivot - 1);
    }

    if (right > pivot) {
        quicksort(partitionType, array, pivot, right, partitionType);
    }
    return array;

    // Lomuto partition scheme, it is less efficient than the Hoare partition scheme
    function partitionLomuto(array, left, right) {
        var pivot = right;
        var i = left;
        var last = left;

        for (var j = left; j < right; j++) {
            countInner++;
            if (array[j] <= array[pivot]) {
                countSwap++;
                [array[i], array[j]] = [array[j], array[i]];
                i = i + 1;
            }
            last = j + 1;
        }
        countSwap++;
        [array[i], array[last]] = [array[last], array[i]];
        return i;
    }

    // Hoare partition scheme, it is more efficient than the Lomuto partition scheme because it does three times fewer swaps on average
    function partitionHoare(array, left, right) {
        var pivot = Math.floor((left + right) / 2);

        while (left <= right) {
            countInner++;
            while (array[left] < array[pivot]) {
                left++;
            }
            while (array[right] > array[pivot]) {
                right--;
            }
            if (left <= right) {
                countSwap++;
                [array[left], array[right]] = [array[right], array[left]];
                left++;
                right--;
            }
        }
        return left;
    }
}

// sample of arrays to sort
var arrayRandom = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];
var arrayOrdered = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var arrayReversed = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

var countOuter = 0;
var countInner = 0;
var countSwap = 0;

quicksort('hoare', arrayRandom.slice());
// => Hoare: outer: 9 inner: 12 swap: 12
console.log(`outer: ${countOuter}, inner: ${countInner}, swap: ${countSwap}`);
resetCounters();

quicksort('hoare', arrayOrdered.slice());
// => Hoare: outer: 9 inner: 9 swap: 9
console.log(`outer: ${countOuter}, inner: ${countInner}, swap: ${countSwap}`);
resetCounters();

quicksort('hoare', arrayReversed.slice());
// => Hoare: outer: 9 inner: 13 swap: 13
console.log(`outer: ${countOuter}, inner: ${countInner}, swap: ${countSwap}`);
resetCounters();

quicksort('lomuto', arrayRandom.slice());
// => Lomuto: outer: 10 inner: 35 swap: 28
console.log(`outer: ${countOuter}, inner: ${countInner}, swap: ${countSwap}`);
resetCounters();

quicksort('lomuto', arrayOrdered.slice());
// => Lomuto: outer: 9 inner: 45 swap: 54
console.log(`outer: ${countOuter}, inner: ${countInner}, swap: ${countSwap}`);
resetCounters();

quicksort('lomuto', arrayReversed.slice());
// => Lomuto: outer: 10 inner: 54 swap: 39
console.log(`outer: ${countOuter}, inner: ${countInner}, swap: ${countSwap}`);
resetCounters();
