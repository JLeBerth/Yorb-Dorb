let  type = {
    0: {name: 'Normal'},
    1: {name: 'Fire'},
    2: {name: 'Lightning'},
    3: {name: 'Earth'},
    4: {name: 'Wind'},
    5: {name: 'Water'}
}

let personality = {
    0: {name: 'Sassy'},
    1: {name: 'Hasty'},
    2: {name: 'Brave'},
    3: {name: 'Docile'},
    4: {name: 'Timid'},
    5: {name: 'Quirky'},
    6: {name: 'Jolly'},
    7: {name: 'Relaxed'},
}

//define strengths and weaknesses
type[0].strongVS = [];
type[0].weakVS = [];

type[1].strongVS = [3, 4];
type[1].weakVS = [2,5];

type[2].strongVS = [1, 5];
type[2].weakVS = [3, 4];

type[3].strongVS = [1, 2];
type[3].weakVS = [5, 4];

type[4].strongVS = [1, 5];
type[4].weakVS = [2,3];

type[5].strongVS = [1, 3];
type[5].weakVS = [2, 4];


const statDefinitions = [
    "Health",
    "Attack",
    "Skill",
    "Defense",
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
    constructor(name, description, movetype, power, skillUsedID, skillDefenseID) {
        this.name = name;
        this.description = description;
        this.type = movetype;
        this.power = power;
        //relates to the used statistic of the move, following above stat definitions
        this.skillID = skillUsedID;
        //relates to the used statistic to defend the move, following above stat definitions
        this.skillDID = skillDefenseID;
    }
}

export{Dorb, Move, type, personality, statDefinitions};