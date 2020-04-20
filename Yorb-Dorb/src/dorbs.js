const type = {
    0: 'Normal',
    1: 'Fire',
    2: 'Lightning',
    3: 'Earth',
    4: 'Wind',
    5: 'Water'
}
const personality = {
    0: 'Hardy',
    1: 'Docile',
    2: 'Brave',
    3: 'Jolly',
    4: 'Impish',
    5: 'Naive',
    6: 'Timid',
    7: 'Hasty',
    8: 'Sassy',
    9: 'Calm',
    10: 'Relaxed',
    11: 'Lonely',
    12: 'Quirky'
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