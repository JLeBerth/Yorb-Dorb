// POS Guide
/*

const POS = {
	"cc":"Coordinating conjunction",
	"dt":"Determiner",
	"jj":"Adjective",
	"nn":"Noun, singular or mass",
	"prp":"Personal pronoun",
	"vbd":"Verb, past tense"
}; 

*/   

// being used
const dorbDesc = [
    "This <adj1> lil' bugger is quite the raskal!",  
    "The Yorb stands no chance against this <noun1>",
    "They've got so much personality! Look at all that <noun2>"
];

// being used
const moveDesc = [
    "A powerful force of <type> power <rb> released!",  
    "Uses the power of <type> to <verb> the enemy!",
    "Unleash the full might of <type> in a <jj> <nn>!"
];

// unused at the moment
const move = [
    "<verb>",
    "<noun>",
    "<noun> <verb>",
    "<personality> <verb>"
];

// generates very random name + a preset description
// randomly generates type and personality indexes (need to refine that)
// returns an array of all that information
function generateDorb()
{
    let dorb = ["", "", 0, 0];
    // name, description, type index, personality index
    
    // name
    let length = Math.floor(Math.random() * 3) + 1
    let name = RiTa.randomWord("nn", length) + RiTa.randomWord("nn", length);
    name = name.split('').sort(function(){return 0.5-Math.random()}).join('');
    dorb[0] = name.slice(0, name.length/2);
    
    // description
    let descriptionGrammar = {
        "<start>" : [dorbDesc[Math.floor(Math.random() * 3)]],
        "<adj1>" : ["fiesty","spunky","happy","snarky","adorable"],
        "<noun1>" : ["monster","beast","superstar","legend","rising star","baby"],
        "<noun2>" : ["spunk","snark","moxie","fight","bite"]
    }
    let grammar = new RiGrammar(descriptionGrammar);
    dorb[1] = grammar.expand();
    
    // type
    dorb[2] = randomNumber(dorb[0], 't');
    
    // personality
    dorb[3] = randomNumber(dorb[0], 'p');
    
    return dorb;
}

// accepts the type because that can't be accessed outside the class atm
// generates a name and description based on presets + type itself
// returns an array of that information
function generateMove(type)
{
    let move = ["", ""];
    // move name, description, type index
    
    // name
    let moveGrammar = {
	"<start>" : ["<type> <verb>"],
	"<verb>" : [RiTa.randomWord("vb"), RiTa.randomWord("vb"), RiTa.randomWord("vb"), RiTa.randomWord("vb")],
    "<type>" : [type]
    };
    
    //"<personality>" : [RiTa.similarBySoundAndLetter(personality), RiTa.similarBySoundAndLetter(personality), RiTa.similarBySoundAndLetter(personality), RiTa.similarBySoundAndLetter(personality)],
	//"<noun>" : [RiTa.randomWord("nn"), RiTa.randomWord("nn"), RiTa.randomWord("nn"), RiTa.randomWord("nn")]
   
    let grammar = new RiGrammar(moveGrammar);
    let moveName = grammar.expand();
    move[0] = moveName;
    
    // description
    let moveDescGrammar = {
	"<start>" : [moveDesc[Math.floor(Math.random() * 3)]],
    "<type>" : [type],
	"<rb>" : [RiTa.randomWord("rb"), RiTa.randomWord("rb"), RiTa.randomWord("rb"), RiTa.randomWord("rb")],
    "<verb>" : [RiTa.randomWord("vb"), RiTa.randomWord("vb"), RiTa.randomWord("vb"), RiTa.randomWord("vb")],
    "<jj>" : [RiTa.randomWord("jj"), RiTa.randomWord("jj"), RiTa.randomWord("jj"), RiTa.randomWord("jj")],
    "<nn>" : [RiTa.randomWord("nn"), RiTa.randomWord("nn"), RiTa.randomWord("nn"), RiTa.randomWord("nn")]
    };
    
    let descGrammar = new RiGrammar(moveDescGrammar);
    let newMoveDesc = descGrammar.expand();
    move[1] = newMoveDesc;
    
    // type - currently void
    // move[2] = randomNumber(move[0], 't');
    
    return move;
}

// Takes a string and char; 't' for Type or 'p' for Personality
// Generates number based on word
// Returns remainder depending on type
// 13 personalities (0-12), 6 types (0-5)
function randomNumber(word, type)
{
    let value = 0;
    for (let i = 0; i < word.length; i++)
    {
        value += word.charCodeAt(i);
    }
    if (type == 'p')
        return value % 13
    else if (type == 't')
        return value % 6
}

export {generateDorb, generateMove, randomNumber}