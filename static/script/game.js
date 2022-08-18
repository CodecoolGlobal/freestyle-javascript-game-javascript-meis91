const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const coolers = ["adrian", "kathi", "david"];
let lastHole;
let timeUp = false;
let whackCoolerUp = false;
let score = 0;


function randomCooler(){
    const coolers = ["adrian", "kathi", "david"];
    let randomCooler = coolers[Math.floor(Math.random() * coolers.length)];
    return `url(../static/img/${randomCooler}.before.png)`
}


function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}


function peep() {
    const time = randomTime(600, 1200);
    const hole = randomHole(holes);
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
            sendUserScore();
        }
        remainingTime.innerText = 'Remaining time: ' + timeleft;
        timeleft -= 1;
    }, 900);
    peep();
}


function whack(event) {
    let cooler = event.target
    if (!event.isTrusted) return;
    whackFace(cooler)
    whackCoolerUp = true;
    score++;
    scoreBoard.textContent = score;
    setTimeout(whackCoolerDown,500, cooler);
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
    cooler.style.backgroundImage = `url("../static/img/${coolers[whackCooler]}.after.png")`;
}


function sendUserScore() {
    const request = new XMLHttpRequest()
    request.open('POST', `/save_score/${score}`)
    request.send()
    ;}


moles.forEach(mole => mole.addEventListener('click', whack));
