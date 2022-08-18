const tables = document.querySelectorAll('.table');
const scoreBoard = document.querySelector('.score');
const coolers = document.querySelectorAll('.cooler');
const possibleCoolers = ["adrian", "kathi", "david"];
let lastTable;
let timeUp = false;
let whackCoolerUp = false;
let score = 0;


function randomCooler(){
    let randomCooler = possibleCoolers[Math.floor(Math.random() * possibleCoolers.length)];
    return `url(../static/img/${randomCooler}.before.png)`
}


function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function randomTable(tables) {
    const idx = Math.floor(Math.random() * tables.length);
    const table = tables[idx];
    if (table === lastTable) {
        return randomTable(tables);
    }
    lastTable = table;
    return table;
}


function peep() {
    const time = randomTime(600, 1200);
    const hole = randomTable(tables);
    console.log(hole.children[0])
    hole.children[0].style.backgroundImage = randomCooler()
    hole.classList.add('up');
    if(!whackCoolerUp&&!timeUp) {
        setTimeout(() => {
                hole.classList.remove('up');
                peep();
        }, time);
    }
}


function initGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    remainingTime = document.getElementById("remainingTime");
    let timeleft = 10;
    let timer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(timer);
            timeUp = true;
            score = scoreBoard.textContent
            console.log(score)
            sendUserScore();
            coolers.forEach(mole => mole.removeEventListener('click', whack));
        }
        remainingTime.innerText = 'Remaining time: ' + timeleft;
        timeleft -= 1;
    }, 900);
    peep();
}


function whack(event) {
    let coolerToWhack = event.target
    if (!event.isTrusted) return;
    whackFace(coolerToWhack)
    whackCoolerUp = true;
    score++;
    scoreBoard.textContent = score;
    setTimeout(whackCoolerDown,500, coolerToWhack);
    whackCoolerUp = false;
}


function whackCoolerDown(cooler){
    cooler.parentNode.classList.remove('up');
}


function whackFace(cooler){
    let whackCooler = 4
    if (cooler.style.backgroundImage == 'url("../static/img/adrian.before.png")') {whackCooler = 0}
    else if (cooler.style.backgroundImage == 'url("../static/img/kathi.before.png")') {whackCooler = 1}
    else if (cooler.style.backgroundImage == 'url("../static/img/david.before.png")')  {whackCooler= 2}
    cooler.style.backgroundImage = `url("../static/img/${possibleCoolers[whackCooler]}.after.png")`;
}


function sendUserScore() {
    const request = new XMLHttpRequest()
    request.open('POST', `/save_score/${score}`)
    request.send()
    ;}


coolers.forEach(mole => mole.addEventListener('click', whack));
