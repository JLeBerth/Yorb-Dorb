import * as dorb from "./dorbs.js";
let ctx,canvasWidth,canvasHeight

let hpBag, attBag, sklBag, defBag, resBag, spdBag;

let clicks = [
    ["Health", 0, 10],
    ["Attack", 0, 10],
    ["Skill", 0, 10],
    ["Defense", 0, 10],
    ["Resist", 0, 10],
    ["Speed", 0, 10]
];

hpBag.onclick = clickBag;

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
    ctx.fillStyle = "#faa298";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    
    // title
    ctx.textAlign = "center";
    ctx.fillText("Training with " + yourDorb.name, canvasWidth/2, 100); 
    
    setThresholds(yourDorb);
    setupBags();
    
}

/* image on click (https://stackoverflow.com/questions/20090415/img-onclick-call-to-javascript-function)
     disable the button for a little bit for cooldown?
         https://stackoverflow.com/questions/9914286/onclick-button-timeout-javascript
     do a lil canvas jig or something (animation)?
     tick up the algorithm, check if the stat / clicker count reached a current
         if so, update the appropriate dorb's stat

 make a variable
 set it equal to stat * 3
 have different variables for tracking clicks on each bag
     have a switch based on the image's alt to choose which variable gets increased
 as part of your thing, check if the current limit is met
     if it's met, increase the related stat and reset the new threshold for clicks needed*/

function drawCombatScreen(yourDorb)
{
    
}

function setupBags()
{
    // document references
    hpBag = document.querySelector("#bag-hp");
    attBag = document.querySelector("#bag-att");
    sklBag = document.querySelector("#bag-skl");
    defBag = document.querySelector("#bag-def");
    resBag = document.querySelector("#bag-res");
    spdBag = document.querySelector("#bag-spd");
    
    // draw images
    let bagHalfWidth = hpBag.width/2;
    let bagHalfHeight = hpBag.height/2;
    
    ctx.textAlign = "center";
    ctx.font = "28px Arial";
    let fontBuffer = 28 + 20;
    
    let column1 = 1/5 * canvasWidth;
    let column2 = 1/2 * canvasWidth;
    let column3 = 4/5 * canvasWidth;

    let row1 = 1/3 * canvasHeight;
    let row2 = 2/3 * canvasHeight;
    
    // hp bag
    ctx.drawImage(
        hpBag, 
        column1 - bagHalfWidth, 
        row1 - bagHalfHeight
    );
    
    // hp label
    ctx.fillText(
        hpBag.alt, 
        column1,        // center aligned, so just column1
        row1 + bagHalfHeight + fontBuffer
    );
        
    // attack
    ctx.drawImage(attBag, column2 - bagHalfWidth, row1 - bagHalfHeight);
    ctx.fillText(attBag.alt, column2, row1 + bagHalfHeight + fontBuffer);
    
    // skill
    ctx.drawImage(sklBag, column3 - bagHalfWidth, row1 - bagHalfHeight);        
    ctx.fillText(sklBag.alt, column3, row1 + bagHalfHeight + fontBuffer);

    // defense
    ctx.drawImage(defBag, column1 - bagHalfWidth, row2 - bagHalfHeight);
    ctx.fillText(defBag.alt, column1, row2 + bagHalfHeight + fontBuffer);

    // resist
    ctx.drawImage(resBag, column2 - bagHalfWidth, row2 - bagHalfHeight);
    ctx.fillText(resBag.alt, column2, row2 + bagHalfHeight + fontBuffer);
    
    // speed
    ctx.drawImage(spdBag, column3 - bagHalfWidth, row2 - bagHalfHeight);
    ctx.fillText(resBag.alt, column3, row2 + bagHalfHeight + fontBuffer);
}

function setThresholds(yourDorb)
{
    for(let i = 0; i < 6; i++)
    {
        clicks[0][2] = yourDorb.stats[i] * 3;
    }
    /*for(let i = 0; i < 6; i++)
    {
        ctx.fillText(dorb.statDefinitions[i] + ":", canvasWidth / 2 + 10, 180 + spacing * (i+1));
        ctx.fillText(yourDorb.stats[i], canvasWidth / 2 + 110, 180 + spacing * (i+1));
    }*/
}

function clickBag(e)
{
    let bag = e.alt;
    let index;
    for(let i = 0; i < 6; i++)
    {
        if (clicks[0][0] == bag)
        {
            index = i;
        }
    }
}

export{setupCanvas, drawHomeScreen, drawTrainingScreen, drawCombatScreen};