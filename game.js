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
    return `url(../static/images/${randomCooler}_before_ed.png)`
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
    const cooler = document.querySelectorAll('.mole')
    const grid = document.getElementsByClassName('game')
    // holes.children.style.backgroundImage = randomCooler()
    console.log(cooler)
    // for(cool of cooler ){
    //     console.log(cool)
    //     cool.style.backgroundImage = randomCooler()
    //     console.log(cool)
    // }
    // cooler.style.backgroundImage = randomCooler()
    // for(cool in cool){
    //     consol.log(cool);
    //     cool.style.backgroundImage = randomCooler();
    // }

    // cooler[0].style.backgroundImage = randomCooler()
    // console.log(grid)
    // hole.classList.add('up');
    // console.log(image)
    // // console.log(document.getElementsByClassName('game'))
    // for(hole of document.getElementsByClassName('game')){
    //     console.dir(hole)
    //     for (cooler of hole.children){
    //
    //         console.log(cooler.backgroundImage)
    //     }
    // };
    // image.style.backgroundImage = randomCooler()
    // console.log(image.style.backgroundImage)
    setTimeout(() => {
        console.log('xxx')
        hole.classList.remove('up');
        // image.style.backgroundImage = randomCooler()
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

moles.forEach(mole => mole.addEventListener('click', whack));