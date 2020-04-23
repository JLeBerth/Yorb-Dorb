import * as dorb from "./dorbs.js";

const turnState = {
    roundStart: 0,
    chooseMoves: 1,
    resolveMoves: 2,
    resolveEffects: 3,
    fightOver: 4
}

let dorbOne, dorbTwo;

let dorbOneMove, dorbTwoMove;

Object.freeze(turnState);

let currentState = turnState.roundStart;

function loop()
{
    switch(currentState)
        {
                case turnState.roundStart:
                //start of round effects
                
                //set dorb moves to null
                dorbOneMove = null;
                dorbTwoMove = null;
                loop();
                break;
                
                case turnState.chooseMoves:
                if(dorbOneMove != null && dorbTwoMove != null)
                    {
                        currentState = turnState.resolveMoves;
                        loop;
                    }
                else
                    {
                        //code to allow players to choose moves with button inputs, for now moves default to the first move
                        loop();
                    }
                break;
                
                case turnState.resolveMoves:
                dorbsFighting();
                loop();
                break;
                
                case turnState.resolveEffects:
                //code to allow end of round effects
                currentState = turnState.roundStart;
                loop();
                break;
                
                case turnState.fightOver:
                console.log("fight over");
                //implement code for breaking out of fight screen and giving rewards
                break;
        }
}

//tells combat which dorbs are fighting
function assignDorbs(one, two)
{
    dorbOne = one;
    dorbTwo = two;
}

function dorbsFighting()
{
    if(dorbOne.stats[5] > dorbTwo.stats[5])
                    {
                        //first dorb attacks second, if returns true ends fight, then second attacks first
                        if(attack(dorbOne, dorbTwo, dorbOneMove))
                            {
                                currentState = turnState.fightOver;
                            }
                        else if(attack(dorbTwo, dorbOne, dorbTwoMove))
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
                         if(attack(dorbTwo, dorbOne, dorbTwoMove))
                            {
                                currentState = turnState.fightOver;
                            }
                        else if(attack(dorbOne, dorbTwo, dorbOneMove))
                            {
                                currentState = turnState.fightOver;
                            }
                        
                        //if fight not over set turnstate to resolve effects
                        if(currentState != turnState.fightOver)
                            {
                                currentState = turnState.resolveEffects;
                            }
                        
                    }
}

//attack function calculates damage
function attack(one, two, attackID)
{
    let move = one.moves[attackID];
    
    //calculate damage as power% of the dorbs attack stat / the defenders defensive stat
    let damage = (move.power / 100) * (one.stats[move.skillID] / two.stats[move.skillDID]);
    
    //alter damage by type dependencies
    if(effective(two, move))
        {
            damage *= 2;
        }
    if(resist(two, move))
        {
            damage /= 2;
        }
    
    //round up
    math.ceil(damage);
    
    //deal the damage
    two.stats[0] -= damage;
    
    console.log(one.name + " attacks " + two.name + " with the move: " + move.name + " dealing " + damage + " damage and setting health to " + two.stats[0]);
    
    //if the attack sets health to 0 or less return true
    if(two.stats[0] <= 0)
        {
            return true;
        }
    return false;
}

function effective(dorb, move)
{
    for(let i = 0; dorb.type.weakVS.length; i++)
        {
            if (move.type.name == type[dorb.type.weakVS[i]].name)
                {
                    return true;
                }
        }
    return false;
}
function resist(dorb, move)
{
    for(let i = 0; dorb.type.strongVS.length; i++)
        {
            if (move.type.name == type[dorb.type.strongVS[i]].name)
                {
                    return true;
                }
        }
    return false;
}

export {loop, assignDorbs};