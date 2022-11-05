const delay = 2;
const arraySize = 50;
var hasPressedStop = false;

const sort = new Sorting(arraySize, delay);
sort.createNewArray();

controls.new.addEventListener(
    "click", function () {
        hasPressedStop = false;
        enableSortingBtn();
        sort.createNewArray();
    }
);

controls.stop.addEventListener(
    "click", function () {
        disableSortingBtn();
        hasPressedStop = true;
    }
);

function onClick(element, func) {
    element.addEventListener(
        "click", async function () {
            hasPressedStop = false;
            disableSortingBtn();
            disableNewArrayBtn();
            enableStopSortingBtn();
            await func();
            if (hasPressedStop !== true) {
                enableSortingBtn();
            }
            enableNewArrayBtn();
            disableStopSortingBtn();
        }
    );
}

onClick(sortButtons[".bubbleSort"], sort.bubbleSort);
onClick(sortButtons[".mergeSort"], sort.mergeSort);
onClick(sortButtons[".selectionSort"], sort.selectionSort);
onClick(sortButtons[".quickSort"], sort.quickSort);
onClick(sortButtons[".insertionSort"], sort.insertionSort);
onClick(sortButtons[".heapSort"], sort.heapSort);