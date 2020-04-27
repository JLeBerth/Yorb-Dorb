import * as dorb from "./dorbs.js";

let types = dorb.type;

const turnState = {
    roundStart: 0,
    chooseMoves: 1,
    resolveMoves: 2,
    resolveEffects: 3,
    fightOver: 4
}

let dorbOne, dorbTwo, oneHealth, twoHealth, oneMaxHealth, twoMaxHealth;

let dorbOneMove, dorbTwoMove;

let canProgress = true;
let message = "";

Object.freeze(turnState);

let currentState = turnState.roundStart;

function loop(clicked)
{
    setTimeout(loop);

    if(canProgress)
        {
            message = "";
    switch(currentState)
        {
                case turnState.roundStart:
                //start of round effects
                
                //set dorb moves to null
                dorbOneMove = -1;
                dorbTwoMove = -1;
                
                currentState = turnState.chooseMoves;
                
                break;
                
                case turnState.chooseMoves:
                    if(dorbOneMove != -1 && dorbTwoMove != -1)
                    {

                        currentState = turnState.resolveMoves;
                        canProgress = false;
                    }
                    else
                    {
                        // code to allow players to choose moves with button inputs, for now moves default to the first move
                        console.log("moves not chosen");
                        message = "Moves Not Chosen"
                        dorbOneMove = 0;    // this is where an input is necessary
                        dorbTwoMove = 0;
                        return {healthOne: oneHealth, maxhealthOne: oneMaxHealth, healthTwo: twoHealth, maxhealthTwo: twoMaxHealth, chooseMove: true, message: message}
                    }
                    break;
                
                case turnState.resolveMoves:
                console.log("resolving moves");
                dorbsFighting();
                canProgress = false;
                break;
                
                case turnState.resolveEffects:
                //code to allow end of round effects
                currentState = turnState.roundStart;
                break;
                
                case turnState.fightOver:
                //implement code for breaking out of fight screen and giving rewards
                message = "Fight Complete, Click on another menu, or click Fight to start a new Fight";
                break;
        }
        }
    else
        {
            if(clicked)
                {
                    canProgress = true;
                }
        }
    
    return {healthOne: oneHealth, maxhealthOne: oneMaxHealth, healthTwo: twoHealth, maxhealthTwo: twoMaxHealth, chooseMove: false, message: message};
}

//tells combat which dorbs are fighting
function assignDorbs(one, two)
{
    dorbOne = one;
    dorbTwo = two;
    oneHealth = dorbOne.stats[0];
    twoHealth = dorbTwo.stats[0];
    oneMaxHealth = dorbOne.stats[0];
    twoMaxHealth = dorbTwo.stats[0];
}

function dorbsFighting()
{
    if(dorbOne.stats[5] > dorbTwo.stats[5])
                    {
                        //first dorb attacks second, if returns true ends fight, then second attacks first
                        if(attack(dorbOne, dorbTwo, dorbOneMove, true))
                            {
                                currentState = turnState.fightOver;
                            }
                        else if(attack(dorbTwo, dorbOne, dorbTwoMove, false))
                            {
                                currentState = turnState.fightOver;
                            }
                        
                        //if fight not over set turnstate to resolve effects
                        if(currentState != turnState.fightOver)
                            {
                                currentState = turnState.resolveEffects;
                            }
                        
                        loop();
                        
                    }
                else
                    {
                         if(attack(dorbTwo, dorbOne, dorbTwoMove, false))
                            {
                                currentState = turnState.fightOver;
                            }
                        else if(attack(dorbOne, dorbTwo, dorbOneMove, true))
                            {
                                currentState = turnState.fightOver;
                            }
                        
                        //if fight not over set turnstate to resolve effects
                        if(currentState != turnState.fightOver)
                            {
                                currentState = turnState.resolveEffects;
                            }
                        
                    }
    
    message += "Click to Continue";
}

//attack function calculates damage
function attack(one, two, attackID, playerOneAttackBool)
{
    let move = one.moves[attackID];
    //calculate damage as power% of the dorbs attack stat / the defenders defensive stat
    let damage = (move.power / 50) * (one.stats[move.skillID] * 1.5 / two.stats[move.skillDID]);
    
    //alter damage by type dependencies
    if(effective(two, move))
        {
            damage *= 2;
            message += "Super Effective! ";
        }
    if(resist(two, move))
        {
            damage /= 2;
            message += "Not Very Effective! ";
        }
    if(one.type == move.type)
        {
            damage *= 1.5;
        }
    
    //round up
    damage = Math.ceil(damage);
    
    //deal the damage
    if(playerOneAttackBool)
        {
            twoHealth -= damage;
             message += (one.name + " attacks " + two.name + " with the move: " + move.name + " dealing " + damage + " damage and setting health to " + twoHealth + "... ");
            if(twoHealth <= 0)
            {
                return true;
            }
        }
    else
        {
            oneHealth -= damage;
             message += (one.name + " attacks " + two.name + " with the move: " + move.name + " dealing " + damage + " damage and setting health to " + oneHealth + "... ");
            if(oneHealth <= 0)
            {
                return true;
            }
        }
    
   
    
    //if the attack sets health to 0 or less return true
    
    return false;
}

function effective(dorb, move)
{
    for(let i = 0; i < dorb.type.weakVS.length; i++)
        {
            if (move.type.name == types[dorb.type.weakVS[i]].name)
                {
                    return true;
                }
        }
    return false;
}
function resist(dorb, move)
{
    for(let i = 0; i < dorb.type.strongVS.length; i++)
        {
            if (move.type.name == types[dorb.type.strongVS[i]].name)
                {
                    return true;
                }
        }
    return false;
}

function reset()
{
    currentState = turnState.roundStart;
}

export {loop, assignDorbs, reset};