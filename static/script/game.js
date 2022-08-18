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
    const time = randomTime(400, 1200);
    const hole = randomHole(holes);
    hole.classList.add('up');
    hole.classList.add('up');
    for(desk of holes){
        desk.children[0].style.backgroundImage = randomCooler()
    }
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function initGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
}

function whack(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

// function cursor(){
//     document.getElementsByTagName("body").style.cursor = "pointer"
// }

// for(let i = 0; i < moles.length; i++){
//   moles[i].addEventListener("click", function(){whack(e, i);});
// }
moles.forEach(mole => mole.addEventListener('click', whack))
;

// moles.forEach(mole => mole.addEventListener('mouseover', function () {
//     document.getElementsByTagName("body").style.cursor = "pointer"
//
// }))
