function solution(numbers, diff) {
    let maxDeque = []; // Stores indices of elements, front is the maximum
    let minDeque = []; // Stores indices of elements, front is the minimum
    let left = 0;
    let result = [0, 0];
    let maxLength = 0;

    for (let right = 0; right < numbers.length; right++) {
        // Remove indices from back while new number is greater than last maximum
        while (maxDeque.length && numbers[right] >= numbers[maxDeque[maxDeque.length - 1]]) {
            maxDeque.pop();
        }
        // Remove indices from back while new number is less than last minimum
        while (minDeque.length && numbers[right] <= numbers[minDeque[minDeque.length - 1]]) {
            minDeque.pop();
        }

        maxDeque.push(right);
        minDeque.push(right);

        // Slide the window if difference exceeds
        while (numbers[maxDeque[0]] - numbers[minDeque[0]] > diff) {
            if (maxDeque[0] === left) maxDeque.shift();
            if (minDeque[0] === left) minDeque.shift();
            left++;
        }

        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
            result = [left, right];
        }
    }
    return result;
}

const numbers = [-1, 4, 6, 2, 8, 4, 7, 12];
const diff = 5;
console.log(solution(numbers, diff));  // [0, 3]
