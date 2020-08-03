# Tech Quiz V.2
This version is written using the <b>jQuery</b> library.

## MVC (Model View Controller)
The code in this app is organized using the <strong>Model-View-Controller.</strong> We are using this convention so we have <br>
a separation of concerns in our functions and data. It makes the code more modular and reusable. <br>
<br>
<strong>Modal:</strong> Model code reflects real-world things. This code holds the raw data, <br>
or it will define the essential components of this app. Below is an example of modal code. <br>
```JavaScript
const DATA = {
    questions: [
      {
        prompt: "Which company invented the first smartphone?",
        options: [
          "Apple",
          "Nokia",
          "IBM",
          "Motorola"
        ],
        answer:  "IBM"
      },
```
The global *DATA* array holds the raw data of the questions that will be asked of the user. <br>
<br>
<strong>View:</strong> View code is made up of all the functions that directly interact with the user. It defines how the user sees and interacts with it.<br>
Below is a view function in this application.
```JavaScript
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
```
This function is defining the HTML content to be viewed. It does not contain any of the business logic <br>
as to *how* it will be displayed. It just defines what is to be seen by the user.<br>
<br>
<strong>Controller:</strong> Controller code acts as a liaison between the Model and the View, receiving <br> user input and deciding what to do with it. It’s the brains of the application, and ties together the model and the view. <br>
Below is a controller function in this application. <br>
```JavaScript
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
```
This function directly plays off our previous *View* function <b>makeMainHtml()</b>. Since we have defined what is to be displayed, <br>
We now write this <b>displayMain()</b> to perform the to take the data given to us through the Model and View <br>
and performs the business logic on those elements.
