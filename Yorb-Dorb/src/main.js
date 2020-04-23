import * as canvas from "./canvas.js";
import * as dorb from "./dorbs.js";
import * as rita from "./rita.js";
import * as combat from "./combat.js";

// Make Dorb
let ritaDorb = rita.generateDorb();
let testDorb = new dorb.Dorb(ritaDorb[0], dorb.personality[ritaDorb[3]] + ": " + ritaDorb[1], dorb.type[ritaDorb[2]], [10, 5, 5, 5, 5, 5], dorb.personality[ritaDorb[3]], "placeholder");

// Move 1
let firstMove = rita.generateMove(testDorb.type);
let testMove = new dorb.Move(firstMove[0], firstMove[1], testDorb.type, (Math.floor(Math.random() * 3) + 3) * 10 );

// Move 2
let secondMove = rita.generateMove(testDorb.type);
let testMove2 = new dorb.Move(secondMove[0], secondMove[1], testDorb.type, (Math.floor(Math.random() * 3) + 3) * 10 );

// Add Moves
testDorb.addMove(testMove);
testDorb.addMove(testMove2);

//make second dorb for testing combat
// Make Dorb
ritaDorb = rita.generateDorb();
let testDorb2 = new dorb.Dorb(ritaDorb[0], dorb.personality[ritaDorb[3]] + ": " + ritaDorb[1], dorb.type[ritaDorb[2]], [10, 5, 5, 5, 5, 5], dorb.personality[ritaDorb[3]], "placeholder");

// Move 3
firstMove = rita.generateMove(testDorb2.type);
let testMove3 = new dorb.Move(firstMove[0], firstMove[1], testDorb.type, (Math.floor(Math.random() * 3) + 3) * 10 );

// Move 4
secondMove = rita.generateMove(testDorb2.type);
let testMove4 = new dorb.Move(secondMove[0], secondMove[1], testDorb.type, (Math.floor(Math.random() * 3) + 3) * 10 );

// Add Moves
testDorb2.addMove(testMove3);
testDorb2.addMove(testMove4);

function init()
{
 canvas.setupCanvas(document.querySelector("#canvas"));
 canvas.drawHomeScreen(testDorb);
 combat.assignDorbs(testDorb, testDorb2);
 combat.loop();
}

export{init};