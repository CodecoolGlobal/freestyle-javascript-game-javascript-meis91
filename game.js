const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole')
// const moles = moles.style.background = "url(static/adrian_before_ed.png) bottom center no-repeat";
let lastHole;
let timeUp = false;
let score = 0;


function randomCooler(){
    const coolers = ["adrian", "kathi", "david"];
    let randomCooler = coolers[Math.floor(Math.random() * coolers.length)];
    return `url(static/images/${randomCooler}_before_ed.png)`
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
    const time = randomTime(400, 1200);
    const hole = randomHole(holes);
    const image = document.getElementById('cooler')
    hole.classList.add('up');
    console.log(image)
    image.style.backgroundImage = randomCooler()
    console.log(image.style.backgroundImage)
    setTimeout(() => {
        hole.classList.remove('up');
        image.style.backgroundImage = randomCooler()
        if (!timeUp) peep();
    }, time);
}

function initGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    let time = setTimeout(() => timeUp = true, 10000)
    document.getElementById("remainingTime").innerHTML = time
}

function whack(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));