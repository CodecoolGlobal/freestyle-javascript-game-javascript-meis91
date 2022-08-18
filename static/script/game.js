const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const coolers = ["adrian", "kathi", "david"];
let lastHole;
let timeUp = false;
let score = 0;
let onWhack = false;


function initGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 1000)
}


function randomCooler(){
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
    if(!timeUp) {
        setTimeout(() => {
                hole.classList.remove('up');
                peep();
            }
            , time);
    }
}


function whack(event) {
    let cooler = event.target
    timeUp = true;
    if (!event.isTrusted) return;
    whackFace(cooler)
    score++;
    scoreBoard.textContent = score;
    console.log("start Timeout")
    setTimeout(whackCoolerDown,500, cooler);
    timeUp = false;
}


function whackCoolerDown(cooler){
    cooler.parentNode.classList.remove('up');
}


function whackFace(cooler){
    let whackCooler = 4
    if (cooler.style.backgroundImage == 'url("../static/img/adrian.before.png")') {whackCooler = 0}
    else if (cooler.style.backgroundImage == 'url("../static/img/kathi.before.png")') {whackCooler = 1}
    else if (cooler.style.backgroundImage == 'url("../static/img/david.before.png")')  {whackCooler= 2}
    console.log('before is', cooler.style.backgroundImage);
    cooler.style.backgroundImage = `url("../static/img/${coolers[whackCooler]}.after.png")`;
    console.log('after is', cooler.style.backgroundImage);
}


moles.forEach(mole => mole.addEventListener('click', whack));
