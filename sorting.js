
class Sorting {

    constructor(arraySize, delay) {
        this.arraySize = arraySize;
        this.delay = delay;
        this.barArray = [];
        this.bars = document.getElementById("sorting");
    }

    deleteChild() {
        this.bars.innerHTML = "";
    }

    createNewArray() {
        this.deleteChild();
        this.barArray = [];
        while (this.barArray.length != this.arraySize) {
            let random = Math.floor(Math.random() * this.arraySize);
            if (!this.barArray.includes(random)) {
                this.barArray.push(random);
            }
        }

        console.log(`barArray: ${this.barArray}`);

        for (let i = 0; i < arraySize; i++) {
            const bar = document.createElement("div");
            bar.style.height = `${this.barArray[i] * 7}px`;
            bar.classList.add("bar");
            bar.classList.add("flex-item");
            bar.classList.add(`barNo${i}`);
            this.bars.appendChild(bar);
        }
    }

    // =========== SORTING ALGORITHMS ===========

    // ===== BUBBLE SORT =====
    bubbleSort = async () => {
        const element = document.querySelectorAll(".bar");
        for (let i = 0; i < element.length - 1; i++) {
            for (let j = 0; j < element.length - i - 1; j++) {
                if (hasPressedStop == true) {
                    return;
                }
                // Change color of bars that are being compared
                element[j].style.background = colors.secondary;
                element[j + 1].style.background = colors.secondary;
                // Compare height of bars
                if (parseInt(element[j].style.height) > parseInt(element[j + 1].style.height)) {
                    await delayTime(delay);
                    // Swap bars
                    swap(element[j], element[j + 1]);
                }
                // Change color of bars back to accent
                element[j].style.background = colors.accent;
                element[j + 1].style.background = colors.accent;
            }
            // Change color of bars that are sorted
            element[element.length - 1 - i].style.background = colors.primary;
        }
        // Change color of last bar
        element[0].style.background = colors.primary;
    }

    // ===== MERGE SORT =====
    merge = async (element, low, mid, high) => {
        // Create temp arrays
        const n1 = mid - low + 1;
        const n2 = high - mid;
        let left = new Array(n1);
        let right = new Array(n2);

        // copy left subarrays to temp arrays
        for (let i = 0; i < n1; i++) {
            if (hasPressedStop == true) {
                return;
            }
            await delayTime(delay);
            // Change color of bars that are being compared
            element[low + i].style.background = '#18ffff';
            // Copy data
            left[i] = element[low + i].style.height;
        }

        // copy right subarray to temp array
        for (let i = 0; i < n2; i++) {
            if (hasPressedStop == true) {
                return;
            }
            await delayTime(delay);
            // Change color of bars that are being compared
            element[mid + 1 + i].style.background = '#18ffff';
            // Copy data
            right[i] = element[mid + 1 + i].style.height;
        }

        await delayTime(delay);
        // Merge temp arrays back into element[low...high]
        let i = 0, j = 0, k = low;
        // Initial index of first subarray
        while (i < n1 && j < n2) {
            if (hasPressedStop == true) {
                return;
            }
            await delayTime(delay);

            // Change color of bars that are being compared
            if (parseInt(left[i]) <= parseInt(right[j])) {
                // Change color of bars that are being compared
                if ((n1 + n2) === element.length) {
                    element[k].style.background = '#64ffda';
                }
                else {
                    element[k].style.background = '#69f0ae';
                }
                // Copy data
                element[k].style.height = left[i];
                // Move to next element
                i++;
                k++;
            } else {
                // Change color of bars that are being compared 
                if ((n1 + n2) === element.length) {
                    element[k].style.background = '#64ffda';
                }
                else {
                    element[k].style.background = '#69f0ae';
                }
                // Copy data
                element[k].style.height = right[j];
                // Move to next element
                j++;
                k++;
            }
        }

        // Copy remaining elements of left array, if there are any
        while (i < n1) {
            if (hasPressedStop == true) {
                return;
            }
            await delayTime(delay);
            // Change color of bars that are being compared
            if ((n1 + n2) === element.length) {
                element[k].style.background = '#64ffda';
            }
            else {
                element[k].style.background = '#69f0ae';
            }
            // Copy data
            element[k].style.height = left[i];
            // Move to next element
            i++;
            k++;
        }

        // Copy remaining elements of right array, if there are any
        while (j < n2) {
            if (hasPressedStop == true) {
                return;
            }
            await delayTime(delay);
            // Change color of bars that are being compared
            if ((n1 + n2) === element.length) {
                element[k].style.background = '#64ffda';
            } else {
                element[k].style.background = '#69f0ae';
            }
            // Copy data
            element[k].style.height = right[j];
            // Move to next element
            j++;
            k++;
        }
    }

    mergeSortHelper = async (element, start, end) => {
        if (start >= end) {
            // It's been sorted
            return;
        }
        // Find the middle index
        let mid = Math.floor((start + end) / 2);
        // Sort the left side
        await this.mergeSortHelper(element, start, mid);
        // Sort the right side
        await this.mergeSortHelper(element, mid + 1, end);
        // Merge the left and right side
        await this.merge(element, start, mid, end);
    }

    mergeSort = async () => {
        const element = document.querySelectorAll(".bar");
        let n = parseInt(element.length) - 1;
        this.mergeSortHelper(element, 0, n);
    }

    // ===== QUICK SORT =====
    selectionSort = async () => {
        const element = document.querySelectorAll(".bar");
        // One by one move boundary of unsorted subarray
        for (let i = 0; i < element.length; i++) {
            let min_index = i;
            // Find the minimum element in unsorted array
            element[min_index].style.background = colors.secondary;
            // Change color of bars that are being compared
            for (let j = i + 1; j < element.length; j++) {
                if (hasPressedStop == true) {
                    return;
                }
                // Change color of bars that are being compared
                element[j].style.background = colors.secondary;
                await delayTime(delay);
                // Change color of bars back to accent
                if (parseInt(element[j].style.height) < parseInt(element[min_index].style.height)) {
                    // Change color of bars back to accent
                    if (min_index !== i) {
                        element[min_index].style.background = colors.accent;
                    }
                    // Change color of bars that are being compared
                    min_index = j;
                } else {
                    // Change color of bars back to accent
                    element[j].style.background = colors.accent;
                }
            }
            await delayTime(delay);
            // Swap the found minimum element with the first element
            swap(element[min_index], element[i]);
            // Change color of bars back to accent
            element[i].style.background = colors.primary;
            // Change color of bars back to accent
            if (i === element.length - 1) {
                // Change color of bars back to accent
                element[min_index].style.background = colors.primary;
            } else if (min_index !== i) {
                // Change color of bars back to accent
                element[min_index].style.background = colors.accent;
            }
        }
    }


    // ===== QUICK SORT =====
    partition = async (element, low, high) => {
        let i = low - 1;
        element[high].style.background = colors.primary;
        for (let j = low; j <= high - 1; j++) {
            if (hasPressedStop == true) {
                return;
            }
            element[j].style.background = colors.yellow;
            await delayTime(delay);
            if (hasPressedStop == true) {
                return;
            }
            if (parseInt(element[j].style.height) < parseInt(element[high].style.height)) {
                i++;
                swap(element[i], element[j]);
                element[i].style.background = colors.orange;
                if (i != j) {
                    element[j].style.background = colors.orange;
                }
                await delayTime(delay);
            }
            else {
                element[j].style.background = colors.pink;
            }
        }
        i++;
        if (hasPressedStop) {
            return;
        }
        await delayTime(delay);
        if (hasPressedStop) {
            return;
        }
        swap(element[i], element[high]);
        // color
        element[high].style.background = colors.primary;
        element[i].style.background = colors.accent;
        if (hasPressedStop) {
            return;
        }
        await delayTime(delay);
        if (hasPressedStop) {
            return;
        }
        // color
        for (let k = 0; k < element.length; k++) {
            if (element[k].style.background != colors.accent) {
                element[k].style.background = colors.primary;
            }
        }
        return i;

    }

    quickSortHelper = async (element, start, end) => {
        if (start < end) {
            let pivotIndex = await this.partition(element, start, end);
            await this.quickSortHelper(element, start, pivotIndex - 1);
            await this.quickSortHelper(element, pivotIndex + 1, end);
        } else {
            if (start >= 0 && end >= 0 && start < element.length && end < element.length) {
                element[end].style.background = colors.primary;
                element[start].style.background = colors.primary;
            }
        }

    }

    quickSort = async () => {
        const element = document.querySelectorAll(".bar");
        let n = parseInt(element.length) - 1;
        await this.quickSortHelper(element, 0, n);
    }

    // ===== INSERTION SORT =====
    insertionSort = async () => {
        const element = document.querySelectorAll(".bar");
        for (let i = 1; i < element.length; i++) {
            let j = i - 1;
            let key = element[i].style.height;
            element[i].style.background = colors.secondary;
            await delayTime(delay);
            while (j >= 0 && (parseInt(element[j].style.height) > parseInt(key))) {
                if (hasPressedStop == true) {
                    return;
                }
                element[j].style.background = colors.secondary;
                element[j + 1].style.height = element[j].style.height;
                j--;
                await delayTime(delay);
                for (let k = i; k >= 0; k--) {
                    element[k].style.background = colors.primary;
                }
            }
            element[j + 1].style.height = key;
            element[i].style.background = colors.primary;
        }
    }

    
    // ====== HEAP SORT ======
    heapify = async (element, n, i) => {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        if (l < n && parseInt(element[l].style.height) > parseInt(element[largest].style.height)) {
            if (largest !== i) {
                element[largest].style.background = colors.primary;
            }
            largest = l;
            element[largest].style.background = colors.secondary;
        }
        if (r < n && parseInt(element[r].style.height) > parseInt(element[largest].style.height)) {
            if (largest !== i) {
                element[largest].style.background = colors.primary;
            }
            largest = r;
            element[largest].style.background = colors.secondary;
        }
        if (largest !== i) {
            swap(element[i], element[largest]);
            element[i].style.background = colors.primary;
            element[largest].style.background = colors.primary;
            await delayTime(delay);
            await this.heapify(element, n, largest);
        }
    }

    heapSort = async () => {
        const element = document.querySelectorAll(".bar");
        let n = element.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await this.heapify(element, n, i);
        }
        for (let i = n - 1; i > 0; i--) {
            await delayTime(delay);
            swap(element[0], element[i]);
            element[i].style.background = colors.primary;
            await this.heapify(element, i, 0);
        }
        element[0].style.background = colors.primary;
    }

}