// Displays question number and score obtained.
function updateHud(props) {
  const HUD = $(`<ul>
      <li id="js-answered">Questions ${props.answered}/${props.totalQuestions}</li>
      <li id="js-score">Score ${props.score}/${props.totalQuestions}</li>
    </ul>`);
  $(".question-and-score").html(HUD);
};

// Displays the choices for the current question.
function updateOptions(options)
{
  for(let i=0; i<options.length; i++)
  {
    $('.js-options').append(`
        <input type = "radio" name="options" id="option${i+1}" 
        value= "${options[i]}" subindex ="${i+1}"> 
        <label for="option${i+1}"> ${options[i]}</label> <br/>
        <span id="js-r${i+1}"></span>
    `);
  };
  
};

// Makes HTML question content to be appended to the DOM.
function makeMainHtml(questionText){
  const questionHtml = `
  <div>
    <form id="js-questions" class="question-form">
      
      <fieldset>
        <div class="row question">
          <div class="col-12">
            <legend> ${questionText}</legend>
          </div>
        </div>

        <div class="row options">
          <div class="col-12">
            <div class="js-options"> </div>
        </div>
      </div>
    

      <div class="row">
        <div class="col-12">
          <button type = "submit" id="answer" subindex="5">Submit</button>
          <button type = "button" id="next-question" subindex="6"> Next</button>
        </div>
      </div>
    </fieldset>
    </form>
  </div>`;

  return questionHtml;
};
// Displays the question and options to the DOM.
function displayMain(questionText, options) {
  let props = {
    answered: DATA.currentQuestionIndex + 1,
    score: DATA.score,
    totalQuestions: DATA.questions.length
  };

  updateHud(props);
  $("main").html(makeMainHtml(questionText));
  updateOptions(options);
  $("#next-question").hide();
};

// Displays users score and gives the user the option to restart the quiz.
function displayResults(score, questionsLength) {
  let resultHtml =
    `<div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="col-12">
              <legend>Your Score is: ${score}/${questionsLength}</legend>
            </div>
          </div>
        
          <div class="row">
            <div class="col-12">
              <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>`;
  $("main").html(resultHtml);
}

// Checks whether the app has reached the end of questions list.
function handleDataQuestions() {
  $('body').on('click','#next-question', (event) => {
    if(DATA.currentQuestionIndex === DATA.questions.length) {
      displayResults(DATA.score, DATA.questions.length);
      DATA.score = 0;
      DATA.currentQuestionIndex = 0;
    } else {
      displayMain(getCurrentPrompt(), getCurrentOptions());
    }
  });
};


// Checks whether the option the user selected is right or wrong and applies respective class.
function handleSelectOption() {
  $('body').on("submit",'#js-questions', function(event) {
    event.preventDefault();
    let currentQues = DATA.questions[DATA.currentQuestionIndex];
    let selectedOption = $("input[name=options]:checked").val();
    if (!selectedOption) {
      alert("Choose an option");
      return;
    } 
    let id_num = currentQues.options.findIndex(i => i === selectedOption);
    let id = "#js-r" + ++id_num;
    $('span').removeClass("right-answer wrong-answer");
    if(selectedOption === currentQues.answer) {
      DATA.score++; 
      $(`${id}`).append(`CORRECT<br/>`);
      $(`${id}`).addClass("right-answer");
    }
    else {
      $(`${id}`).append(`INCORRECT <br/> The answer is "${currentQues.answer}"<br/>`);
      $(`${id}`).addClass("wrong-answer");
    }

    DATA.currentQuestionIndex++;
    $("#js-score").text(`Score: ${DATA.score}/${DATA.questions.length}`);
    $('#answer').hide();
    $("input[type=radio]").attr('disabled', true);
    $('#next-question').show();
  });
};

function getCurrentOptions(){
  return DATA.questions[DATA.currentQuestionIndex].options;
};

function getCurrentPrompt(){
  return DATA.questions[DATA.currentQuestionIndex].prompt;
};

// 
function handleStartQuiz() {
  $('#start').on('click', function(event){
    displayMain(getCurrentPrompt(), getCurrentOptions());
  });
};

function handleRestartQuiz() {
  $('body').on('click','#restart', (event) => {
    displayMain(getCurrentPrompt(), getCurrentOptions());
  });
};

function runQuizApp() {
  handleStartQuiz(); // Initial Render.
  handleDataQuestions(); // Checks and sees if the user has reached the end of the quiz.
  handleSelectOption(); // Gives and checks the options the user has selected.
  handleRestartQuiz(); // Render quiz again if the user selects restart quiz.
}

$(runQuizApp);
