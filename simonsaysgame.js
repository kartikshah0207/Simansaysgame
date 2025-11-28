let gameSequence = [];
let playerSequence = [];
let level = 0;
let playing = false;

const quadrants = document.querySelectorAll('.quadrant');
const startBtn = document.getElementById('start-btn');
const levelDisplay = document.getElementById('level');


const colorIds = ['green', 'red', 'yellow', 'blue'];



    function flashColor(id) {
    const element = document.getElementById(id);
    element.classList.add('active');

    setTimeout(() => {
        element.classList.remove('active');
    }, 300); 
}

function playSequence() {
    playing = true;
    let i = 0;
    const interval = setInterval(() => {
        flashColor(gameSequence[i]);
        i++;
        if (i >= gameSequence.length) {
            clearInterval(interval);
            playing = false;
        }
    }, 600); 
}


function nextSequence() {
    playerSequence = [];
    level++;
    levelDisplay.textContent = level;

    
    const randomIndex = Math.floor(Math.random() * colorIds.length);
    const newColor = colorIds[randomIndex];
    gameSequence.push(newColor);

    playSequence();
}


function checkMatch(index) {

    if (playerSequence[index] === gameSequence[index]) {
        
        if (playerSequence.length === gameSequence.length) {
            
            setTimeout(() => {
                nextSequence(); 
            }, 1000); 
        }
    } else {
        alert(`Game Over! You reached Level ${level}.`);
        startGame(); 
    }
}

function handleQuadrantClick(event) {
    if (playing) return; 

    const clickedColor = event.target.dataset.color;
    flashColor(clickedColor);

    playerSequence.push(clickedColor);

    checkMatch(playerSequence.length - 1);
}

function startGame() {
    gameSequence = [];
    playerSequence = [];
    level = 0;
    levelDisplay.textContent = level;
    setTimeout(() => {
        nextSequence();
    }, 500); 
}

startBtn.addEventListener('click', startGame);

quadrants.forEach(quadrant => {
    quadrant.addEventListener('click', handleQuadrantClick);
});