import * as dorb from "./dorbs.js";
let ctx,canvasWidth,canvasHeight

let hBag = document.querySelector("#bag-h");
let aBag = document.querySelector("#bag-a");
let sBag = document.querySelector("#bag-s");
let dBag = document.querySelector("#bag-d");
let rBag = document.querySelector("#bag-r");
let sBag = document.querySelector("#bag-s");

function setupCanvas(canvasElement)
{
    ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
}

function drawHomeScreen(yourDorb)
{
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    
    //dorb name
    ctx.fillText(yourDorb.name, canvasWidth / 2 - 100, 100);
    
    //test rectangle for dorb image
    ctx.fillRect(100, 200, 300, 300);
    
    //add description
    ctx.font = "20px Arial";
    ctx.fillText(yourDorb.description, 100, 600);
    
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    
    //make stat box
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, 200);
    let spacing = 300/6;
    ctx.lineTo(canvasWidth/2, 500);
    ctx.lineTo(canvasWidth/2 + 160, 500);
    ctx.lineTo(canvasWidth / 2 + 160, 200);
    ctx.closePath();
    ctx.stroke();

    //input stats
    for(let i = 0; i < 6; i++)
        {
            ctx.fillText(dorb.statDefinitions[i] + ":", canvasWidth / 2 + 10, 180 + spacing * (i+1));
            ctx.fillText(yourDorb.stats[i], canvasWidth / 2 + 110, 180 + spacing * (i+1));
        }
    
    //write moves
    for(let i = 0; i < yourDorb.moves.length; i++)
        {
            ctx.font = "25px Arial";
            ctx.fillText(yourDorb.moves[i].name, 120, 700 + (i * 65));
            ctx.font = "18px Arial";
            ctx.fillText("Power: " + yourDorb.moves[i].power, 450, 700 + (i * 65));
            ctx.fillText(yourDorb.moves[i].description, 120, 720 + (i * 65));
            ctx.fillText("Type: " + yourDorb.moves[i].type.name, 600, 720 + (i * 65));
        }
}

function drawTrainingScreen(yourDorb)
{
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    
    // title
    ctx.fillText("Training with " + yourDorb.name, canvasWidth / 2 - 100, 100);  
}

// image on click (https://stackoverflow.com/questions/20090415/img-onclick-call-to-javascript-function)
    // disable the button for a little bit for cooldown?
        // https://stackoverflow.com/questions/9914286/onclick-button-timeout-javascript
    // do a lil canvas jig or something (animation)?
    // tick up the algorithm, check if the stat / clicker count reached a current
        // if so, update the appropriate dorb's stat
    

function drawCombatScreen(yourDorb)
{
    
}

export{setupCanvas, drawHomeScreen, drawTrainingScreen, drawCombatScreen};