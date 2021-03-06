import * as canvas from "./canvas.js";
import * as dorb from "./dorbs.js";
import * as rita from "./rita.js";
import * as combat from "./combat.js";
import * as quiz from "./quiz.js";

//declare drawstate
let drawState = "home"

let ritaDorb, firstMove, secondMove, testDorb, loadDorb, testDorb2;
let click = false;
let clickCoordinates = [null, null];
let canvasElement = document.querySelector("#canvas");
let dorbList = [];
let quizResult = 0;

let dorbSelect = document.querySelector("#dorbSelect")

function loadDorbList()
{
    if(JSON.parse(localStorage.getItem('dorbList')) != null)
        {
            dorbList = JSON.parse(localStorage.getItem('dorbList'));
            
            restructureDorbList();
        }
    
}

function setupDorb()
{
if (dorbList.length > 0) 
{
    loadDorb = JSON.parse(localStorage.getItem(dorbList[0]));
    testDorb = loadDorb;
    canvas.setYourDorbImage(testDorb.imgURL);
} 
else
{
    drawState = 'quiz';
}
    
}

function quizDorb(personalityID)
{
    // Make Dorb
    ritaDorb = rita.generateDorb();
    let quizD = new dorb.Dorb(ritaDorb[0], dorb.personality[personalityID].name + ": " + ritaDorb[1], dorb.type[ritaDorb[2]], dorb.personality[personalityID].stats, dorb.personality[personalityID]);

    // Move 1
    let firstMove = rita.generateMove(quizD.type);
    let randMove = new dorb.Move(firstMove[0], firstMove[1], quizD.type, (Math.floor(Math.random() * 3) + 3) * 10, 1, 3);

    // Move 2
    let type2 = (Math.floor(Math.random() * 6));
    let secondMove = rita.generateMove(dorb.type[type2]);
    let randMove2 = new dorb.Move(secondMove[0], secondMove[1], dorb.type[type2], (Math.floor(Math.random() * 3) + 3) * 10, 2, 4);

    // Add Moves
    quizD.addMove(randMove);
    quizD.addMove(randMove2);
    
    return quizD;
}

function randomDorb()
{
    // Make Dorb
    ritaDorb = rita.generateDorb();
    let randDorb = new dorb.Dorb(ritaDorb[0], dorb.personality[ritaDorb[3]].name + ": " + ritaDorb[1], dorb.type[ritaDorb[2]], dorb.personality[ritaDorb[3]].stats, dorb.personality[ritaDorb[3]]);

    // Move 1
    let firstMove = rita.generateMove(randDorb.type);
    let randMove = new dorb.Move(firstMove[0], firstMove[1], randDorb.type, (Math.floor(Math.random() * 3) + 3) * 10, 1, 3);

    // Move 2
    let secondMove = rita.generateMove(randDorb.type);
    let randMove2 = new dorb.Move(secondMove[0], secondMove[1], randDorb.type, (Math.floor(Math.random() * 3) + 3) * 10, 2, 4);

    // Add Moves
    randDorb.addMove(randMove);
    randDorb.addMove(randMove2);
    
    return randDorb;
}
    
//make random dorb for combat
function generateEnemyDorb()
    {
        testDorb2 = randomDorb();
    }

function init() {
    loadDorbList();
    setupDorb();
    setupUI();
    canvas.setupCanvas(canvasElement);
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
            canvas.drawCombatScreen(combatState, click, clickCoordinates);
            break;
        case 'quiz':
            if(canvas.drawQuiz(quiz.quiz, click, clickCoordinates))
                {
                    testDorb = quizDorb(quizResult);
                    canvas.setYourDorbImage(testDorb.imgURL);
                    drawState = 'home';
                }
            break;
    }
    
    click = false;
    clickCoordinates = [null, null];
}

function setupUI() {
    let homeButton = document.querySelector("#home");
    let trainButton = document.querySelector("#training");
    let fightButton = document.querySelector("#combat");
    let saveButton = document.querySelector("#save");
    let loadButton = document.querySelector("#dorbLoad");

    homeButton.onclick = e => {
        if(drawState != 'quiz')
            {
        drawState = 'home';
            }
    }
    trainButton.onclick = e => {
        if(drawState != 'quiz')
            {
        drawState = 'train';
            }
    }
    fightButton.onclick = e => {
        if(drawState != 'quiz')
            {
        generateEnemyDorb();
        canvas.setEnemyDorbImage(testDorb2.imgURL);
        combat.reset();
        combat.assignDorbs(testDorb,testDorb2);
        combat.reset();
        drawState = 'combat';
            }
    }
    saveButton.onclick = e => {
        if(drawState != 'quiz')
            {
        saveDorb();
            }
    }
    
    loadButton.onclick = e => {
        if(drawState == 'quiz')
            {
                return;
            }
        if(drawState == 'combat')
            {return;}
        loadDorbFromList();
    }
}

//saves dorb then alters dorblist based on the new saves
function saveDorb() {
    localStorage.setItem(testDorb.name, JSON.stringify(testDorb));
    if(!dorbList.includes(testDorb.name))
        {
            dorbList.push(testDorb.name);
        }
    localStorage.setItem('dorbList', JSON.stringify(dorbList));
    
    //change dorbselect to account for new saves
    restructureDorbList();
    
}

//loads in dorbs
function loadDorbFromList()
{
    if(dorbSelect.value == 'NEWDORB')
        {
            drawState = 'quiz';
            canvas.resetQuiz();
        }
    else
        {
           loadDorb = JSON.parse(localStorage.getItem(dorbSelect.value));
           testDorb = loadDorb;
           canvas.setYourDorbImage(testDorb.imgURL);
        }
}

//sets up the dorb list
function restructureDorbList()
{
    //start by removing all options from dorbSelect
        while (dorbSelect.firstChild) {
            dorbSelect.removeChild(dorbSelect.lastChild);
        }
        
        //add elements for every dorb
        for(let i = 0; i < dorbList.length; i++)
            {
                let newoption = document.createElement('option');
                newoption.text = dorbList[i];
                newoption.value = dorbList[i];
                dorbSelect.add(newoption);
            }
    
    let newoption = document.createElement('option');
    newoption.text = 'New Dorb';
    newoption.value = 'NEWDORB';
    dorbSelect.add(newoption);
}

// listen for mousedown events
document.querySelector("#canvas").addEventListener('mousedown', e =>{
   handleMouseDown(e); 
});

function handleMouseDown(e){
    e.preventDefault();

    // get the mouse position
    let x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    let y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    
    x -= canvasElement.offsetLeft;
    y -= canvasElement.offsetTop;
    
    
     //console.log(x + "," + y);
    clickCoordinates = [parseInt(x), parseInt(y)];
    click = true;

    }

function setQuizID(number)
{
    quizResult = number;
}

export {
    init, setQuizID
};