class question
    {
        constructor(questionText, answers)
        {
            this.text = questionText;
            this.answers = answers;
        }
    }

class answer
    {
        constructor(answerText, personalityScore)
        {
            this.text = answerText;
            this.score = personalityScore;
        }
    }

class personalityScore
{
    constructor(personalityID, increase)
    {
        this.ID = personalityID;
        this.increase = increase;
    }
}

let quiz = 
[
    new question("It’s the summer festival! But do you even like carnivals?",
                 [new answer("Love them!", [new personalityScore(6,2)]), 
                  new answer("Not My Thing", [new personalityScore(0,1),new personalityScore(5,1)])]),
    
    new question("A human hand extends out of a toilet! What do you do?",
                [new answer('Scream and run', [new personalityScore(4,2)]),
                 new answer('Close the lid without a word',[new personalityScore(7, 1),new personalityScore(3,1)]),
                new answer("Shake hands with it",[new personalityScore(2,2),new personalityScore(0,1)])]),
    
    new question("Do you like to noisily enjoy yourself with others?",
                 [new answer('Yes', [new personalityScore(6,2)]),
                  new answer('No', [new personalityScore(4,1)])]),
    
    new question("You are offered a choice of two gifts. Which one will you take?",
                 [new answer('Small Box',[new personalityScore(4,2)]),
                 new answer('Big Box', [new personalityScore(3,2)])]),
    
    new question("The road forks to the right and left. You are told there is a treasure on the right side. What do you do?",
                 [new answer('Instantly go right',[new personalityScore(3,2)]),
                 new answer('Its a trap! Go Left',[new personalityScore(0,2)]),
                 new answer('Choose either side',[new personalityScore(5,2)])]),
    
    new question("Your friend fails to show up for a meeting at the promised time. What do you do?",
                [new answer('Become irritated',[new personalityScore(3, 1),new personalityScore(1,2)]),
                new answer('Wait patiently',[new personalityScore(7,2)]),
                new answer('Get angry and bail',[new personalityScore(1,3)])]),
    
    new question("Do you like pranks?",
                [new answer('Yes',[new personalityScore(0,2)]),
                new answer('No',[new personalityScore(3,1), new personalityScore(7, 1)])]),
    
    new question("How quickly do you respond to an email?",
                [new answer('Reply right away',[new personalityScore(1,1), new personalityScore(1, 1)]),
                new answer('May reply, may not',[new personalityScore(5,2)]),
                new answer('Too much trouble',[new personalityScore(0,2)])]),
    
    new question("Are you often late for school or meetings?",
                [new answer('Yes',[new personalityScore(7,2), new personalityScore(0, 1)]),
                new answer('No',[new personalityScore(1,2), [new personalityScore(1,1)]])]),
    
    new question("Do you think you are cool? Be honest.",
                [new answer('Yes',[new personalityScore(0,2)]),
                new answer('No',[new personalityScore(7,2)])]),
    
    new question("You come across a treasure chest! What do you do?",
                [new answer('Open it right away!',[new personalityScore(1,2)]),
                new answer('No... it could be a trap',[new personalityScore(4,2)]),
                new answer('Its going to be empty', [new personalityScore(0,2)])]),
    
    new question("You receive a gift! But you don't know what's in it. You're curious, so what do you do?",
                [new answer('Open it now',[new personalityScore(1,2)]),
                new answer('Open it later',[new personalityScore(7,2)]),
                new answer('Get someone to open it',[new personalityScore(4,2)])]),
    
    new question("Can you go into a haunted house?",
                [new answer('No problem!',[new personalityScore(2,2)]),
                new answer('Uh... N-no',[new personalityScore(4,2)]),
                new answer('With someone I like',[new personalityScore(0,2)])]),
    
    new question("When the going gets tough, do you get going?",
                [new answer('Yes',[new personalityScore(1,2), new personalityScore(2, 2)]),
                new answer('No',[new personalityScore(0,2), new personalityScore(5, 2)])]),
    
    new question("A friend brought over something you'd forgotten. How do you thank your friend?",
                [new answer('Say thank you regularly',[new personalityScore(3,2)]),
                new answer('Say thanks, but be cool',[new personalityScore(0,2)])]),
    
    new question("You valiantly fight the aliens… But, you are defeated… An alien says to you: 'YOU HAVE IMPRESSED US. IT WAS A PLEASURE TO SEE. JOIN US, AND TOGETHER WE SHALL RULE THE WORLD.' What will you do?",
                [new answer('Rule with the aliens',[new personalityScore(0,1), new personalityScore(7, 1)]),
                new answer('Refuse', [new personalityScore(2,4)])])
    
];


export {quiz};