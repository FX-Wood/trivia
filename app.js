var url = "https://opentdb.com/api.php?amount=4&type=multiple"
var scoreboard = document.getElementById("scoreboard");
var currentQuestion = 0;
var score = [0 , 0] // [right answers, wrong answers]
var questionBox = document.getElementById("question");
var labels = document.querySelectorAll('.label');
var radios = document.querySelectorAll('.radio-selection');
var nextBtn = document.getElementById('next-btn')
var yourAnswers = []
var triviaArr = [ {
    question: "In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?",
    correctAnswer: "A. William and Elizabeth",
    answers: [
        "B. Joseph and Catherine",
        "C. John and Mary",
        "D. George and Anne"
    ]
},
{
    question: "When did the Liberty Bell get its name?",
    correctAnswer: "D. none of the above",
    answers: [
        "A. when it was made, in 1701",
        "B. when it rang on July 4, 1776",
        "C. in the 19th century, when it became a symbol of the abolition of slavery"
    ]
    //rightAnswerIndex: 3
},

{
    question: "In the Roy Rogers -Dale Evans Museum, you will find Roy and Dales stuffed horses. Roy's horse was named Trigger, which was Dales horse?",
    correctAnswer: "A. Buttermilk",
    answers: [
        "B. Daisy",
        "C. Scout",
        "D. Tulip"
    ]
    //rightAnswerIndex: 0
}
]
//API: 
fetch(url)
.then(function(data){
    return data.json();
})
.then(function(data){
    return data.results
})

.then(function(results){
  triviaArr=[];
  results.forEach(function(result){
    var output = {}
    output.question = result.question
    output.correctAnswer = result.correct_answer
    output.answers = result.incorrect_answers
    triviaArr.push(output)
    console.log(output)
  })
})
// start game
.then(function(results) {
    fillQuestion()
    nextBtn.addEventListener('click', nextButtonFct);
})




//a question appears


function nextButtonFct() {
    var checked;
    radios.forEach(function(radio) {
        if (radio.checked) {
            checked = true;
        }
    })
    if (checked) {
        checkAnswer()
        fillQuestion()
    }
}

function fillQuestion() {
    //if the current question is as long as the triviaArr, then go to score page
    //if the current question is shorter then the TriviaArr, then continue to next question. 
    if (currentQuestion < triviaArr.length){
        
        questionBox.textContent = fixString(triviaArr[currentQuestion].question)
        var currentAnswers = pickRandom()
        labels.forEach(function(label, index) {
            label.textContent = currentAnswers[index]
        })
    }  else if (currentQuestion >= triviaArr.length){
        triviaArr.forEach(function(question) {

        })
        
        scoreboard.textContent = `${score}`
        yourAnswers.forEach(function(answer) {
            let debrief = document.createElement('div')

            debrief.textContent += answer.yourChoice
            debrief.textContent += answer.correctAnswer
            debrief.textContent += answer.question
            if (answer.correctAnswer === answer.yourChoice) {
                debrief.style.color = "green";
            } else if (answer.correctAnswer === answer.yourChoice) {
                debrief.style.color = "green";
            }
            scoreboard.appendChild(debrief)
        })


        scoreboard.classList.remove("hide");
    }
    }

function pickRandom() {
    // make an array with all the answers
    var unRandomAnswers = [].concat(triviaArr[currentQuestion].answers)
    unRandomAnswers.push(triviaArr[currentQuestion].correctAnswer)
    // answers will be an array with incorrect answers first and the correct one last.
    var randomAnswers = [];
    // pick a number between 0 and length of the array -1
    for (i=0; i < 4; i++) {
        var rand = Math.random() // between 0 and 1
        var selection = Math.floor(rand*unRandomAnswers.length-1)
        randomAnswers.push(fixString(unRandomAnswers.splice(selection, 1)[0]))
    }
    return randomAnswers
}

function checkAnswer () {
    var theOneTheyChose;
    radios.forEach(function(option) {
        if (option.checked) {
            option.checked = false;
            theOneTheyChose = option;
        }
    })
    var correctAnswer = triviaArr[currentQuestion].correctAnswer
    //the one they chose is linked to the id (a, b, or c etc). We want to grab the ID bc its linked to the label. 
    var theOneTheyChoseLabel = document.getElementById(theOneTheyChose.id[theOneTheyChose.id.length-1]);

    console.log("correctAnswer", correctAnswer, "theonetheychoselabel", theOneTheyChoseLabel)
    console.log(correctAnswer === theOneTheyChoseLabel.textContent)
    if (correctAnswer === theOneTheyChoseLabel.textContent) {
        score[0]++
        var yourAnswer = {}
        yourAnswer.question = triviaArr[currentQuestion].question
        yourAnswer.correctAnswer = triviaArr[currentQuestion]
        yourAnswer.yourChoice = "You chose the right one!"
        yourAnswers.push(yourAnswer)
    } else {
        score[1]++
        var yourAnswer = {}
        yourAnswer.question = triviaArr[currentQuestion].question
        yourAnswer.correctAnswer = triviaArr[currentQuestion]
        yourAnswer.yourChoice = "WRONG!  " + theOneTheyChoseLabel.textContent
        yourAnswers.push(yourAnswer)
    }
    currentQuestion++
}

function fixString(string) {
    return string.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&ouml;/, 'ö')
}