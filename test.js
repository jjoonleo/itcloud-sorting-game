const htmlArray = document.getElementById('array');
console.log(htmlArray.children);
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function initArray(array) {
    for(let i = 0; i < array.length; i++){
        array[i] = Math.floor(Math.random() * 100);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


shuffle(array);
console.log(array);
numberOfCheckings = 0;



function isSorted(array){
    for(let i = 0; i < array.length - 1; i++){
        if(array[i] > array[i+1]){
            return false;
        }
    }
    return true;
}

function clearHtmlArray(){
    for(let i = 0; i < array.length; i++){
        let htmlElement = htmlArray.children[i];
        htmlElement.style.background = "white";
    }
}

function setHtmlArray(firstIndex, secondIndex){
    if(array[firstIndex] > array[secondIndex]){
        htmlArray.children[firstIndex].style.background = "red";
        htmlArray.children[secondIndex].style.background = "green";
    }else{
        htmlArray.children[firstIndex].style.background = "green";
        htmlArray.children[secondIndex].style.background = "red";
    }
}

function syncDelay(milliseconds){
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < milliseconds){
        end = new Date().getTime();
    }
}

let flag = false;
let firstIndex = 0, secondIndex = 0;
window.onkeydown = (e) => {
    //console.log(parseInt(e.key));
    
    let index = parseInt(e.key) - 1;
    if(index == -1) index = 9;
    console.log(index);

    if (index < array.length) {
        if (!flag) {
            clearHtmlArray();
            htmlArray.children[index].style.background = "gray";
            firstIndex = index;
            flag = true;
        }else{
            secondIndex = index;
            setHtmlArray(firstIndex, secondIndex);
            flag = false;
            //console.log(array);
            numberOfCheckings++;
        }
    }
    if(e.key == "Enter"){
        if(e.ctrlKey){
            if(isSorted(array)){
                alert("Sorted in " + numberOfCheckings + " checks");
            }else{
                alert("Not sorted");
            }
        }
        else{
            let tmp = array[firstIndex];
            array[firstIndex] = array[secondIndex];
            array[secondIndex] = tmp;
            setHtmlArray(firstIndex, secondIndex);
        }
    }
}
