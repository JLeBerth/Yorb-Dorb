import * as classes from "./classes.js";
import * as dorb from "./dorbs.js";
import * as utils from "./utils.js";
import * as combat from "./combat.js";
import * as main from "./main.js";

let ctx,canvasWidth,canvasHeight;

let hpBag, attBag, sklBag, defBag, resBag, spdBag;

let dorbSprite;
let enemydorbSprite;

let heightperAnswers;
let numAnswers;
let heightperAnswer;

// Image references
hpBag = document.querySelector("#bag-hp");
attBag = document.querySelector("#bag-att");
sklBag = document.querySelector("#bag-skl");
defBag = document.querySelector("#bag-def");
resBag = document.querySelector("#bag-res");
spdBag = document.querySelector("#bag-spd");

let graphics;
let sweatLeft = document.querySelector("#sweat-l");
let sweatRight = document.querySelector("#sweat-r");
let exclamation = document.querySelector("#exclamation");

let gradient1;
let gradient2;

let gradientsX;
let gradientsY;

let currentQuestion = 0;

let bagHalfWidth, bagHalfHeight;
let columns, rows;

let quizResults = [0,0,0,0,0,0,0];

let yourDorbImage = new Image();
yourDorbImage.onload = function() {
    dorbSprite =  new classes.ImageSprite(250,350,300,{x:1,y:0},0,yourDorbImage);
}

let enemyDorbImage = new Image();
enemyDorbImage.onload = function()
{
    enemydorbSprite = new classes.ImageSprite(canvasWidth - 250, 350, 300, {x:1,y:0},0,enemyDorbImage);
}

let clicks = [
    ["Health", 0, 20],
    ["Attack", 0, 10],
    ["Skill", 0, 10],
    ["Defense", 0, 10],
    ["Resist", 0, 10],
    ["Speed", 0, 10]
    // Alt, Count, Threshold
];

function setupCanvas(canvasElement)
{
    ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
    gradientsX = canvasWidth * Math.random();
    gradientsY = canvasHeight * Math.random();
    
    gradient1 = utils.getLinearGradient(ctx,0,0,gradientsX,gradientsY,[{percent:0,color:"blue"},{percent:1,color:"magenta"}]);
    gradient2 = utils.getLinearGradient(ctx,gradientsX, gradientsY,0,0,[{percent:0,color:"gray"},{percent:1,color:"green"}]);
    rows = [1/3 * canvasHeight, 
            2/3 * canvasHeight];
    columns = [1/5 * canvasWidth, 
               1/2 * canvasWidth, 
               4/5 * canvasWidth];
    
    bagHalfWidth = hpBag.width/2;
    bagHalfHeight = hpBag.height/2;

    // graphics = [];
    
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    
    graphics = [];
}

function drawAnswers(question)
{
    heightperAnswers = canvasHeight - 500;
    numAnswers = question.answers.length;
    heightperAnswer = heightperAnswers/numAnswers;
    
    for(let i = 0; i < numAnswers; i++)
        {
            ctx.save();
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.5;
            ctx.fillRect(50, 400 + (heightperAnswer * i), canvasWidth - 100, heightperAnswer - 25);
            ctx.restore();
            
            
            wrapText(question.answers[i].text,100, 500 + (heightperAnswer * i), canvasWidth - 100, 60, ctx);
        }
    
}

function drawQuiz(questions, click, coordinates)
{
    
    
    //draw gradient
    gradientsX += 0.25;
    gradientsY += 0.5;
    if(gradientsX > canvasWidth)
        {
            gradientsX = 0;
        }
    if(gradientsY > canvasHeight)
        {
            gradientsY = 0;
        }
    gradient1 = utils.getLinearGradient(ctx,0,0,gradientsX,gradientsY,[{percent:0,color:"blue"},{percent:1,color:"magenta"}]);
    gradient2 = utils.getLinearGradient(ctx,gradientsX, gradientsY,0,0,[{percent:0,color:"blue"},{percent:1,color:"green"}]);
    ctx.save();
    ctx.fillStyle = gradient1;
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.fillStyle = gradient2;
    ctx.globalAlpha = 0.9;
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.globalAlpha = 1;
    
    //write question and answers
    ctx.font = "60px Arial";
    ctx.fillStyle = "white";
    wrapText(questions[currentQuestion].text,100, 80, canvasWidth-100, 80, ctx);
    
    //draw answers
    drawAnswers(questions[currentQuestion]);

    
    if(click == true)
        {
            for(let i = 0; i < numAnswers; i++)
                {
                    if (utils.AABB(coordinates[0], coordinates[1], 50, 400 + (heightperAnswer * i), canvasWidth - 100, heightperAnswer - 25))
                        {
                            let id = questions[currentQuestion].answers[i].score[0].ID;
                            let increase = questions[currentQuestion].answers[i].score[0].increase;
                            quizResults[id] += increase;
                            currentQuestion++;
                        }
                }
        }
    
    
    ctx.restore();
    if(currentQuestion >= questions.length)
        {
            let personalityID = 0;
            let idScore = 0;
            for(let i = 0; i < quizResults.length; i++)
                {
                    if (quizResults[i] > idScore)
                        {
                            personalityID = i;
                            idScore = quizResults[i];
                        }
                }
            main.setQuizID(personalityID);
            return true;
        }
    return false;
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
    
    //dorb type
    ctx.font = "30px Arial";
    ctx.fillText("Type: " + yourDorb.type.name, canvasWidth /2 - 100, 150);
    
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
            ctx.fillText("Type: " + yourDorb.moves[i].type.name, 650, 720 + (i * 65));
        }
    
    if(dorbSprite != null)
        {
            dorbSprite.draw(ctx);
        }
}

function drawTrainingScreen(yourDorb, click, coordinates)
{    
    ctx.save();
    ctx.fillStyle = "#faa298";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Training with " + yourDorb.name, canvasWidth/2, 100); 
    
    drawBags();
    
    if (click == true)
    {
        for (let a = 0; a < 2; a++)
        {
            for (let b = 0; b < 3; b++)
            {
                if (utils.AABB(coordinates[0], coordinates[1], columns[b] - bagHalfWidth, rows[a] - (bagHalfHeight * 3/5), bagHalfWidth * 2, bagHalfHeight * 2))
                {
                    
                    let bag = "";
                    switch ("" + a + b + "")
                    {
                        case "00":
                            bag = "Health";
                            break;
                        case "01":
                            bag = "Attack";
                            break;
                        case "02":
                            bag = "Skill";
                            break;
                        case "10":
                            bag = "Defense";
                            break;
                        case "11":
                            bag = "Resist";
                            break;
                        case "12":
                            bag = "Speed";
                            break;
                    }  
                    
                    if (trainStat(bag, yourDorb))
                    {
                        addGraphic("exclamation", columns[b], rows[a]);
                    }
                    else
                    {
                        addGraphic("sweat", columns[b], rows[a]);
                    }
                    
                    ctx.restore();
                    return;
                }
            } 
        }
    }
    
    drawGraphics();
    
    ctx.restore();
}

function drawCombatScreen(combatState, click, coordinates)
{
    graphics = [];
    let texty =  canvasHeight - (canvasHeight/3);
    ctx.save();
    ctx.fillStyle="#7EC850";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    
    ctx.fillStyle = "black";
    ctx.fillRect(0,texty,canvasWidth,canvasHeight);
    
    
    if(dorbSprite != null)
        {
            dorbSprite.draw(ctx);
        }
    
    if(enemydorbSprite != null)
        {
            enemydorbSprite.draw(ctx);
        }
    
    ctx.fillStyle = "gray";
    ctx.fillRect(150, 575, 175, 75);
    ctx.fillRect(canvasWidth - 350, 575, 175, 75);
    
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Health", 150, 590);
    ctx.fillText("Health",canvasWidth -350, 590);
    
    drawBar(combatState.healthOne, combatState.maxhealthOne, 160, 315);
    drawBar(combatState.healthTwo, combatState.maxhealthTwo, canvasWidth - 340, canvasWidth - 185);
        
    if(combatState.chooseMove)
    {
        // draw buttons
        drawMoves(combatState.moves);
        
        // AABB(mouseX, mouseY, bagX, bagY, bagWidth, bagHeight)
        
        if (click == true)
        {
            if (utils.AABB(coordinates[0], coordinates[1], 150, canvasHeight - 250, 250, 150))
            {
                combat.chooseAttack(0);
                // combatState.message = "Click to continue...";
                
            }        
            else if (utils.AABB(coordinates[0], coordinates[1], canvasWidth - 400, canvasHeight - 250, 250, 150))
            {
                combat.chooseAttack(1);
                // combatState.message = "Click to continue...";
            }
        }        
   }
    else
    {
        ctx.font = "40px Arial";

        wrapText(combatState.message, 50, texty + 60, canvasWidth - 100, 35, ctx);
    }
    
    ctx.restore();
}

// TRAINING HELPERS -----------

function addGraphic(graphic, bagX, bagY)
{   
    let graphicImage;
    let graphicDirection;
    let graphicX;
    let graphicY = bagY;
    
    // determine the x and y
    let coinFlip = Math.floor(Math.random()*2);
    
    if (coinFlip == 1)  { graphicX = bagX - bagHalfWidth; graphicDirection = "left";}
    else                { graphicX = bagX + bagHalfWidth; graphicDirection = "right";}
    
    // figure out what graphic
    switch (graphic)
    {
        case "sweat":

            switch (graphicDirection)
            {
                case "left":
                    graphicImage = sweatLeft;
                    break;
                case "right":
                    graphicImage = sweatRight;
                    break;
            }
            break;
        case "exclamation":
            graphicImage = exclamation;
            break;
        default:
            break;
    }
    ctx.save();
    graphics.push(new classes.TrainingGraphic(graphicX, graphicY, 60, {x:20,y:20}, 0, graphicImage));
    ctx.restore();
}

function drawGraphics()
{
    ctx.save();
    for (let i = 0; i < graphics.length; i++)
    {
        if(graphics[i].timer == 0)
        {
            graphics[i] = null;
            graphics.splice(i, 1);
        }

    }
    
    for (let i = 0; i < graphics.length; i++)
    {
        graphics[i].draw(ctx);
    }
    ctx.restore();
}

// draw punching bags to screen
function drawBags()
{   
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = "28px Arial";
    let fontBuffer = 28 + 20;
    
    // hp bag
    ctx.drawImage(
        hpBag, 
        columns[0] - bagHalfWidth, 
        rows[0] - bagHalfHeight
    );
    
    // hp label
    ctx.fillText(
        hpBag.alt, 
        columns[0],        // center aligned, so just column1
        rows[0] + bagHalfHeight + fontBuffer
    );
        
    // attack
    ctx.drawImage(attBag, columns[1] - bagHalfWidth, rows[0] - bagHalfHeight);
    ctx.fillText(attBag.alt, columns[1], rows[0] + bagHalfHeight + fontBuffer);
    
    // skill
    ctx.drawImage(sklBag, columns[2] - bagHalfWidth, rows[0] - bagHalfHeight);        
    ctx.fillText(sklBag.alt, columns[2], rows[0] + bagHalfHeight + fontBuffer);

    // defense
    ctx.drawImage(defBag, columns[0] - bagHalfWidth, rows[1] - bagHalfHeight);
    ctx.fillText(defBag.alt, columns[0], rows[1] + bagHalfHeight + fontBuffer);

    // resist
    ctx.drawImage(resBag, columns[1] - bagHalfWidth, rows[1] - bagHalfHeight);
    ctx.fillText(resBag.alt, columns[1], rows[1] + bagHalfHeight + fontBuffer);
    
    // speed
    ctx.drawImage(spdBag, columns[2] - bagHalfWidth, rows[1] - bagHalfHeight);
    ctx.fillText(spdBag.alt, columns[2], rows[1] + bagHalfHeight + fontBuffer);
    
    ctx.restore();
}

// contains code for tracking amount of times a bag has been clicked on
// + seeing if the stat has been trained enough to increase,
// and if so doing the appropriate resets
function trainStat(bag, yourDorb)
{
    for(let i = 0; i < 6; i++)
    {
        if (clicks[i][0] == bag)
        {
            clicks[i][1]++;     // Increase click count
            if (clicks[i][1] >= clicks[i][2])       // Check if threshold has been met
            {
                clicks[i][1] = 0;       // Reset counter
                yourDorb.stats[i] += 1;     // Increase stat
                // clicks[i][2] = yourDorb.stats[i] * 2 + Math.floor(Math.random() * 8 + 2);       // Assign new threshold
                return true;

            }
            else 
            {
                return false;
            }
            
        }
    }
}

// to be called before the state is shown
// make sure that thresholds are properly pre-determined 
function setThresholds(yourDorb)
{
    for(let i = 0; i < 6; i++)
    {
        clicks[i][2] = (yourDorb.stats[i] * 2) + (Math.floor(Math.random() * 3 + 2));
    }
}


// COMBAT HELPERS ---------------------

// wrap text function made using tutorial from html5canvastutorials
function wrapText(text, x, y, maxWidth, lineHeight, ctx)
{
    let words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
  
}

function drawBar(current, max, xmin, xmax)
{
    let y = 615;
    if(current < 0)
        {
            current = 0;
        }
    let barWidth = xmax-xmin;
    let pointWidth = barWidth / max;
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(xmin, y);
    ctx.lineTo(xmax, y);
    ctx.closePath();
    ctx.stroke();
    
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(xmin-1, y);
    ctx.lineTo(xmin + (current * pointWidth), y);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

// take in the names of moves from the combat state
function drawMoves(moves)
{
    // draw two rectangles at anchors along the canvas
    ctx.save();
    
    ctx.fillStyle = "#" +moves[0].type.color;
    ctx.fillRect(150, canvasHeight - 250, 250, 150);
    ctx.fillStyle = "#" +moves[1].type.color;
    ctx.fillRect(canvasWidth - 400, canvasHeight - 250, 250, 150);
    
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(moves[0].name + ", " + moves[0].power, 275, canvasHeight - 175);
    ctx.fillText(moves[1].name + ", " + moves[1].power, canvasWidth - 275, canvasHeight - 175);
    
    ctx.restore();
    
}

function setYourDorbImage(imageURL)
{
    yourDorbImage.src = imageURL;
}

function setEnemyDorbImage(imageURL)
{
    enemyDorbImage.src = imageURL;
}

function resetQuiz()
{
    let quizResults = [0,0,0,0,0,0,0];
    currentQuestion = 0;
}

export{setupCanvas, drawHomeScreen, drawTrainingScreen, drawCombatScreen, setYourDorbImage, setEnemyDorbImage, setThresholds, drawQuiz, resetQuiz};