const type = {
    Normal: 'Normal',
    Fire: 'Fire',
    Lightning: 'Lightning',
    Earth: 'Earth',
    Wind: 'Wind',
    Water: 'Water'
}
const personality = {
    Mimic: 'Mimic'
}

const statDefinitions = [
    "Health",
    "Attack",
    "Skill",
    "Defence",
    "Resist",
    "Speed"
]

Object.freeze(type);
Object.freeze(personality);

class Dorb {
    constructor(name, description, dorbtype, nstats, personalitytype, dorbImageURL) {
        this.name = name;
        this.description = description;
        this.dorbImage = dorbImageURL;
        this.type = dorbtype;
        this.personality = personalitytype;
        this.stats = nstats;
        this.moves = [];
    }

    addMove(newMove) {
        this.moves.push(newMove);
    }

    removeMove(moveReference)
{
    for(let i = moveReference; i < moves.length - 1; i++)
        {
            this.moves[i] = this.moves[i+1];
        }
    this.moves[moves.length - 1] = null;
}

    getStat(statReference)
{
    return stats[statReference];
}



}

class Move {
    constructor(name, description, movetype, power) {
        this.name = name;
        this.description = description;
        this.type = movetype;
        this.power = power;
    }
}

export{Dorb, Move, type, personality, statDefinitions};