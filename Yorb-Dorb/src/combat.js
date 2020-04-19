const turnState {
    roundStart: 0,
    chooseMoves: 1,
    resolveMoves: 2,
    resolveEffects: 3,
    fightOver: 4
}

Object.freeze(turnState);

let currentState = turnState.roundStart;

function loop()
{
    switch(currentState)
        {
                case turnState.roundStart:
                break;
                case turnState.chooseMoves:
                break;
                case turnState.resolveMoves:
                break;
                case turnState.resolveEffects:
                break;
                case turnState.fightOver:
                break;
        }
}