// Access elements from our play.html file and assign them to variables.
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progress-text');
const progressBarFull = document.getElementById('progress-bar-full');
const scoreText = document.getElementById('score');

// Declare game variables.
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let openQuestions = [];

let questions = [
    {
        question: "Which company invented the first smartphone?",
        choice1: "Apple",
        choice2: "Nokia",
        choice3: "IBM",
        choice4: "Motorola",
        answer:  3
    },
    {
        question: "Which prestigious university did Microsoft founder Bill Gates drop out of?",
        choice1: "Yale University",
        choice2: "Harvard University",
        choice3: "Stanford University",
        choice4: "Columbia University",
        answer:  2
    },
    {
        question: "What does LG stand for in LG Electronics?",
        choice1: "Little Giants",
        choice2: "Light Goods",
        choice3: "Logical Gaming",
        choice4: "Lucky Goldstar",
        answer:  4
    },
    {
        question: "What does CPU stand for?",
        choice1: "Central Processing Unit",
        choice2: "Computer Process Unit",
        choice3: "Call Packets User-Interface",
        choice4: "Cold Punch Utilities",
        answer:  1
    },
    {
        question: "What year did the first Apple iPhone launch?",
        choice1: "2000",
        choice2: "2006",
        choice3: "2007",
        choice4: "2005",
        answer:  3
    },
    {
        question: "What is the name of Elon Musk’s aerospace company?",
        choice1: "Tesla",
        choice2: "Starlink",
        choice3: "SpaceX",
        choice4: "Hyperloop",
        answer:  3
    },
    {
        question: "Created in 1990, what was the name of the first internet search engine?",
        choice1: "Internet Explorer",
        choice2: "Google",
        choice3: "Archie",
        choice4: "Yahoo",
        answer:  3
    },
    {
        question: "Originally Amazon only sold which product?",
        choice1: "Packing materials",
        choice2: "Books",
        choice3: "School supplies",
        choice4: "Appliances",
        answer:  2
    },
    {
        question: "Given the rise of search engines, what does SEO stand for?",
        choice1: "Style Each Optimization",
        choice2: "Search Engine Operation",
        choice3: "Signal Engine Operations",
        choice4: "Search Engine Optimization",
        answer:  4
    },
    {
        question: "Facebook co-founder Sean Parker was also the co-founder of which company?",
        choice1: "Instagram",
        choice2: "Napster",
        choice3: "MySpace",
        choice4: "Twitter",
        answer:  2
    },
    {
        question: "Asus and Acer announced that they would stop making what products in 2013?",
        choice1: "Smart phones",
        choice2: "Microwaves",
        choice3: "Tablets",
        choice4: "Netbooks",
        answer:  4
    },
    {
        question: "Introduced in 1993, what was Apple's first tablet computer?",
        choice1: "Newton MessagePad",
        choice2: "Apple Pad",
        choice3: "Idea pad",
        choice4: "iPad",
        answer:  1
    },
    {
        question: "What company did the founders of YouTube work for before starting up YouTube?",
        choice1: "McDonalds",
        choice2: "Ebay",
        choice3: "PayPal",
        choice4: "Google",
        answer:  3
    },
    {
        question: "Where is Microsoft's headquarters?",
        choice1: "Silicon Valley, California",
        choice2: "Redmond, Washington",
        choice3: "Portland, Oregon",
        choice4: "Seattle, Washington",
        answer:  2
    },
    {
        question: "What is an employee who works for Google called?",
        choice1: "Employee",
        choice2: "Pixalators",
        choice3: "Googler",
        choice4: "Googles",
        answer:  3
    },
];


// CONSTANTS
const MAX_QUESTIONS = 15;
const CORRECT_BONUS = 25;

// GAME FUNCTIONS
function startQuiz() {
    //Make sure variable values are assigned to 0 to start.
    questionCounter = 0;
    score = 0;
    openQuestions = [... questions]; // Use the spread operator to pass in our questions array into openQuestions.
    acquireNewQuestion();
};

// It's in the name. Obtains new question for the user.
function acquireNewQuestion() {
    // Check and see if we've reached the end of the our questions. If so send the user to the end.html file.
    if(openQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        // Call the saveScore function to save the user's accumulated score. 
        saveScore();
        return window.location.assign('end.html')
    }
    
    // Increment questions counter and update question counter text.
    questionCounter++;
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;

    // Update the progress bar.
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // Using the Math.random() to pick a random question number in conjunction with openQuestions length.
    // The Math.floor() insures that it is an integer.
    const questionIndex = Math.floor(Math.random() * openQuestions.length);
    currentQuestion = openQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // Checks the number property on the choice to compare it against the correct answer number in our questions array.
    choices.forEach( choice => {
        const number = choice.dataset['number'];

        // CHANGE THIS
        choice.innerText = currentQuestion['choice' + number];
    });

    // Takes remaining questions in the array and cuts out the previous question.
    openQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

// 1. This function adds an event listener to see if the selected answer is correct.
// 2. Stores the users selected choice and answer.
// 3. Checks and sees if the selected choice's answer matches the correct answer.
// 4. Applies either the .correct or the .incorrect CSS class based on the users selection.
// 5. Calls the setTimeout() function to slow the transition to the next question. 
choices.forEach(choice => {
    choice.addEventListener('click', event => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = event.target;
        const SELECTED_ANSWER = selectedChoice.dataset['number'];

        // Check to see if the answer the user selected matches the one found in currentQuestion.
        // If so apply CSS classes.
        const classToApply = SELECTED_ANSWER == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        // Use the Java Script setTimeout function to briefly pause before the user moves onto the next question.
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            acquireNewQuestion();
        }, 1600);
    }); 
});

// This function increments the score integer and updates the score text to the incremented score.
function incrementScore(number){
    score += number;
    scoreText.innerText = score;
}

// This function saves the score to display on the end.html screen.
function saveScore(){
    localStorage.setItem('endScore', score);
};


$(startQuiz);
