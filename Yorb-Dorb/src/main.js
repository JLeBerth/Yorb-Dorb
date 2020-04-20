import * as canvas from "./canvas.js";
import * as dorb from "./dorbs.js";

let testDorb = new dorb.Dorb("Greybox", "He's Just A Grey Box!", dorb.type.Earth, [10, 5, 5, 5, 5, 5], dorb.personality.Mimic, "placeholder");
let testMove = new dorb.Move("Mapmaking Strike", "Uses the power of Greyboxing to wall in the enemy", dorb.type.Earth, 20);
let newtestMove = new dorb.Move("Grey Flash", "Shoots a grey bolt of energy", dorb.type.lightning, 50);
testDorb.addMove(testMove);
testDorb.addMove(newtestMove);
function init()
{
 canvas.setupCanvas(document.querySelector("#canvas"));
 canvas.drawHomeScreen(testDorb);
}

export{init};