export default function binarySearch(array, query) {
    let low = 0, high = array.length;

    while (low < high) {
        let mid = parseInt((high + low) / 2);

        if (array[mid] === query)
            return mid;
        else if (array[mid] < query)
            low = mid;
        else
            high = mid;
    }

    return null;
}
