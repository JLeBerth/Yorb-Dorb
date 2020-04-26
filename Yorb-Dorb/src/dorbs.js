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

// associating personality to face attributes
personality[0].mouth = "mouth7";
personality[1].mouth = "mouth10";
personality[2].mouth = "mouth6";
personality[3].mouth = "mouth1";
personality[4].mouth = "mouth3";
personality[5].mouth = "mouth11";
personality[6].mouth = "mouth5";
personality[7].mouth = "mouth9";

personality[0].nose = "nose8";
personality[1].nose = "nose7";
personality[2].nose = "nose2";
personality[3].nose = "nose4";
personality[4].nose = "nose9";
personality[5].nose = "nose3";
personality[6].nose = "nose6";
personality[7].nose = "nose5";

personality[0].eyes = "eyes7";
personality[1].eyes = "eyes10";
personality[2].eyes = "eyes6";
personality[3].eyes = "eyes9";
personality[4].eyes = "eyes4";
personality[5].eyes = "eyes3";
personality[6].eyes = "eyes7";
personality[7].eyes = "eyes5";

type[0].color = "EAD8EA";
type[1].color = "EF5E20";
type[2].color = "FCFF56";
type[3].color = "B79E77";
type[4].color = "97FF8B";
type[5].color = "3A93D4";

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
    constructor(name, description, dorbtype, nstats, personalitytype) {
        this.name = name;
        this.description = description;
        this.type = dorbtype;
        this.personality = personalitytype;
        this.stats = nstats;
        this.moves = [];
        this.imgURL = getImageURL(this.personality, this.type);
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

function getImageURL(personality, type)
{
    return "https://api.adorable.io/avatars/face/" + personality.eyes + "/" + personality.nose + "/" + personality.mouth + "/" + type.color;
}

export{Dorb, Move, type, personality, statDefinitions};