const htmlArray = document.getElementById('array');
const startBtn = document.getElementById('startBtn');
const nameInput = document.getElementById('nameInput');
const scoreboard = document.getElementById('scoreboard');
console.log(htmlArray.children);
let array = [10, 6, 1, 9, 3, 2, 4, 8, 7, 5];
let scores = [];
let isStarted = false;
let userName;
let text = ["시작하기","제출하기"];

function startStop(){
    isStarted = !isStarted;
    htmlArray.classList.toggle("invisible");
    startBtn.children[0].innerText = text[Number(isStarted)];
    flag = -1;
}

function stop(){
    isStarted = false;
    htmlArray.className = "invisible checkbox__1";
    startBtn.children[0].innerText = text[Number(isStarted)];
    flag = -1;
}

function onStart(){
    
    if(!isStarted){
        if(nameInput.value){
            
            userName = nameInput.value;
            init();
            startStop();
            nameInput.value = "";
        }else{
            alert("학번이름을 입력하세요.");
        }
    }
    else{
        if(isSorted(array)){
            alert("Sorted in " + numberOfCheckings + " checks");
            startStop();
            scores = scores.filter((element) => element[0] !== userName || element[1] < numberOfCheckings);
            scores.push([userName, numberOfCheckings]);
            let set = new Set(scores);
            scores = [...set];
            scores.sort(function(a, b) { 
                return a[1] - b[1]; // 1, 2, 3, 4, 10, 11 
            });
            scoreboard.innerHTML = "";
            scores.forEach((data)=>{
                let li = document.createElement("li");
                let nameHTML = document.createElement("h3");
                nameHTML.innerText = data[0];
                let scoreHTML = document.createElement("h3");
                scoreHTML.innerText = data[1]+"회";
                li.appendChild(nameHTML);
                li.appendChild(scoreHTML);
                scoreboard.appendChild(li);
            });
            console.log(scores);

        }else{
            alert("Not sorted");
        }
    }
    console.log("onStart");
}


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

function init(){
    //shuffle(array);
    array = [10, 6, 1, 9, 3, 2, 4, 8, 7, 5];
    console.log(array);
    numberOfCheckings = 0;
    clearHtmlArray();
}


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
    firstIndex = -1;
    secondIndex = -1;
}

function syncDelay(milliseconds){
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < milliseconds){
        end = new Date().getTime();
    }
}

let flag = 0;
let firstIndex = 0, secondIndex = 0;
window.onkeydown = (e) => {
    //console.log(parseInt(e.key));
    if (isStarted){
        let index = parseInt(e.key) - 1;
        if(index == -1) index = 9;
        console.log(index);

        ctrElementClick(index);

        if(e.key == "q"){
           swapElement();
        }
    }
    
}

function onElementClicked(clicked_id){
    ctrElementClick(clicked_id);
    console.log(clicked_id);
}

function swapElement(){
    if(flag == 0){
        let tmp = array[firstIndex];
        array[firstIndex] = array[secondIndex];
        array[secondIndex] = tmp;
        setHtmlArray(firstIndex, secondIndex);
        flag = 0;
    }
}

function ctrElementClick(index){
    if (index < array.length) {
        if (flag != 1) {
            clearHtmlArray();
            htmlArray.children[index].style.background = "gray";
            firstIndex = index;
            flag = 1;
        }else if(flag == 1){
            secondIndex = index;
            setHtmlArray(firstIndex, secondIndex);
            flag = 0;
            //console.log(array);
            numberOfCheckings++;
        }
    }
}
