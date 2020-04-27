import * as canvas from "./canvas.js";
import * as dorb from "./dorbs.js";
import * as rita from "./rita.js";
import * as combat from "./combat.js";

//declare drawstate
let drawState = "home"

let ritaDorb, firstMove, secondMove, testDorb, loadDorb, testDorb2;
let click = false;
let clickCoordinates = [null, null];

function setupDorb()
{
if (JSON.parse(localStorage.getItem('myDorb')) != null) 
{
    loadDorb = JSON.parse(localStorage.getItem('myDorb'));
    testDorb = loadDorb;
} 
else
{
    // Make Dorb
    ritaDorb = rita.generateDorb();
    testDorb = new dorb.Dorb(ritaDorb[0], dorb.personality[ritaDorb[3]].name + ": " + ritaDorb[1], dorb.type[ritaDorb[2]], [10, 5, 5, 5, 5, 5], dorb.personality[ritaDorb[3]]);

    // Move 1
    firstMove = rita.generateMove(testDorb.type);
    let testMove = new dorb.Move(firstMove[0], firstMove[1], testDorb.type, (Math.floor(Math.random() * 3) + 3) * 10, 1, 3);

    // Move 2
    secondMove = rita.generateMove(testDorb.type);
    let testMove2 = new dorb.Move(secondMove[0], secondMove[1], testDorb.type, (Math.floor(Math.random() * 3) + 3) * 10, 1, 3);

    // Add Moves
    testDorb.addMove(testMove);
    testDorb.addMove(testMove2);
}
}
    
//make random dorb for combat
function generateEnemyDorb()
    {
// Make Dorb
ritaDorb = rita.generateDorb();
testDorb2 = new dorb.Dorb(ritaDorb[0], dorb.personality[ritaDorb[3]] + ": " + ritaDorb[1], dorb.type[ritaDorb[2]], [10, 5, 5, 5, 5, 5], dorb.personality[ritaDorb[3]]);

// Move 3
firstMove = rita.generateMove(testDorb2.type);
let testMove3 = new dorb.Move(firstMove[0], firstMove[1], testDorb2.type, (Math.floor(Math.random() * 3) + 3) * 10, 2, 5);

// Move 4
secondMove = rita.generateMove(testDorb2.type);
let testMove4 = new dorb.Move(secondMove[0], secondMove[1], testDorb2.type, (Math.floor(Math.random() * 3) + 3) * 10, 2, 5);

// Add Moves
testDorb2.addMove(testMove3);
testDorb2.addMove(testMove4);
    }

function init() {
    setupDorb();
    canvas.setupCanvas(document.querySelector("#canvas"));
    setupUI();
    canvas.setYourDorbImage(testDorb.imgURL);
    loop();
}

function loop() {
    setTimeout(loop);
    switch (drawState) {
        case "home":
            canvas.drawHomeScreen(testDorb);
            break;
        case "train":
            canvas.setThresholds(testDorb);
            canvas.drawTrainingScreen(testDorb, click, clickCoordinates);
            break;
        case "combat":
            
            let combatState = combat.loop(click);
            canvas.drawCombatScreen(combatState)

            break;
    }
    
    click = false;
}

function setupUI() {
    let homeButton = document.querySelector("#home");
    let trainButton = document.querySelector("#training");
    let fightButton = document.querySelector("#combat");
    let saveButton = document.querySelector("#save");

    homeButton.onclick = e => {
        drawState = 'home';
    }
    trainButton.onclick = e => {
        drawState = 'train';
    }
    fightButton.onclick = e => {
        generateEnemyDorb();
        canvas.setEnemyDorbImage(testDorb2.imgURL);
        combat.assignDorbs(testDorb,testDorb2);
        combat.reset();
        drawState = 'combat';
    }
    saveButton.onclick = e => {
        saveDorb();
    }
}

function saveDorb() {
    console.log("saved");
    localStorage.setItem('myDorb', JSON.stringify(testDorb));
}

// listen for mousedown events
document.querySelector("#canvas").addEventListener('mousedown', e =>{
   handleMouseDown(e); 
});

function handleMouseDown(e){
    e.preventDefault();

    // get the mouse position
    // console.log(e.clientX + "," + e.clientY);
    clickCoordinates = [parseInt(e.clientX), parseInt(e.clientY)];
    click = true;

    }

export {
    init
};