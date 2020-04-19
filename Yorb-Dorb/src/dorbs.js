const type = {
    Normal: 0,
    Fire: 1,
    Lightning: 2,
    Earth: 3,
    Wind: 4,
    Water: 5
}
const personality = {
    Mimic: 0
}

Object.freeze(type);
Object.freeze(personality);
class Dorb {
    constructor(name, description, dorbtype, stats, personalitytype) {
        this.name = name;
        this.description = description;
        type = dorbtype;
        personality = personalitytype;
        for (let i = 0; i < 6; i++) {
            this.stats[i] = stats[i];
        }
    }
    let name = "";
    let description = "";
    let type = type.Normal;
    let stats = [];
    let personality = personality.Mimic;
    let moves = [];

    function addMove(newMove) {
        moves.push(newMove);
    }

    function removeMove(moveReference)
{
    for(let i = moveReference; i < moves.length - 1; i++)
        {
            moves[i] = moves[i+1];
        }
    moves[moves.length - 1] = null;
}

    function getStat(statReference)
{
    return stats[statReference];
}



}

class Move {
    constructor(name, description, movetype, power) {
        this.name = name;
        this.description = description;
        type = movetype;
        this.power = power;
    }
    let name = "";
    let description = "";
    let type = type.Normal;
    let power;
}