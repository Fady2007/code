let quizApp = document.querySelectorAll(".quiz-app");
let quizInfoDiv = document.querySelector(".quiz-info");
let chooseQ = document.querySelectorAll(".pointer");
let countSpan = document.querySelector(".quiz-info .count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let bulletsDiv = document.querySelector(".bullets");
let passageArea = document.querySelector(".passages");
let passageDiv = document.querySelector(".passages div");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitBtn = document.querySelector("#submit-button");
let backBtn = document.querySelector("#back");
let resultsDiv = document.querySelector(".results");
let countDownDiv = document.querySelector(".countdown");
let category = document.querySelector(".quiz-info .category span");
let cenApp = document.querySelector("#centerApp");
let clockBtn = document.querySelectorAll(".clock-button");
let rightAnsDiv = document.querySelector(".rightAnswers");
let chosenAnsDiv = document.querySelector(".chosenAns");
// set options
let currentIndex = 0;
let rightAnswerScore = 0;
let countDownInterval;
let duration = 10;
let qCount;
let questionsObj;
let rightAnswer;
let answers = document.getElementsByName("question");
let selectedAnswers = [];
let jF;
let dataTxt = {
  quizInfo_0: {
    jsonFile: "html_questions.json",
    category: "HTML",
  },
  quizInfo_1: {
    jsonFile: "grammar.json",
    category: "Italiano",
  },
};

// choose Timer
clockBtn.forEach((e) => {
  e.onclick = function (ev) {
    clockBtn.forEach((el) => {
      el.style.background = "#131c42";
      el.style.color = "white";
    });

    ev.currentTarget.style.background = "#3e2aff";
    ev.currentTarget.style.color = "white";

    if (ev.currentTarget.innerText === " No Timer") {
      clearInterval(countDownInterval);
      countDownDiv.classList.add("hidden");
    } else {
      duration = ev.currentTarget.innerText;
      countDownDiv.classList.remove("hidden");
    }
  };
});

// chosen quiz
chooseQ.forEach((e, i) => {
  e.addEventListener("click", () => {
    jF = dataTxt[`quizInfo_${i}`].jsonFile;
    category.innerHTML = dataTxt[`quizInfo_${i}`].category;
    getQuestions(jF);
    quizApp[1].classList.remove("hidden");
    quizApp[0].classList.add("hidden");
  });
});

// get file
async function getQuestions(jsonFile) {
  let jsonData = await fetch(jsonFile);
  let jsonDataObj = await jsonData.json();

  try {
    questionsObj = jsonDataObj;
    qCount = questionsObj.length;

    // Shuffle the questionsObj array
    // questionsObj = shuffleArray(questionsObj);

    // create Bullets + Set qu count
    createBullets(qCount);

    // add question data
    addQuestionData(questionsObj[currentIndex], qCount);

    // countDown
    countDown(duration, qCount);

    submitBtn.onclick = () => {
      rightAnswer = questionsObj[currentIndex].right_answer;

      currentIndex++;

      checkAnswer(rightAnswer, qCount);

      addRightAns(questionsObj, qCount);

      quizArea.innerHTML = "";
      answersArea.innerHTML = "";

      // Next question depend on currentIndex
      addQuestionData(questionsObj[currentIndex], qCount);

      // bullets function
      handelBullets();

      // show results
      showResult(qCount);
    };

    backBtn.onclick = () => {
      if (currentIndex > 0) {
        currentIndex--;
        addQuestionData(questionsObj[currentIndex], qCount);
        if (rightAnswerScore >= 1) {
          rightAnswerScore--;
        }
        // in click back remove the duplicated div
        if (theChosenAns !== undefined) {
          let chosenAnsDivs = chosenAnsDiv.getElementsByClassName("cDiv");
          let currentDiv = chosenAnsDivs[currentIndex];
          chosenAnsDiv.removeChild(currentDiv);
        }
      }
    };
  } catch (reason) {
    console.log(`${reason}`);
  }
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function selectCategory(obj) {
  console.log(obj[0]["category"]);
}

function createBullets(num) {
  countSpan.innerHTML = num;
  for (let i = 0; i < num; i++) {
    let theBullet = document.createElement("span");

    if (i === 0) {
      theBullet.className = "on";
    }

    bulletsSpanContainer.appendChild(theBullet);
  }
}

// Get Question , Answers and add it in the page , Save the answer when back
function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // Clear existing question and answer areas
    quizArea.innerHTML = "";
    answersArea.innerHTML = "";

    // question
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(
      `${currentIndex + 1}- ${obj["title"]}`
    );
    questionTitle.appendChild(questionText);
    quizArea.appendChild(questionTitle);

    // passage
    let passage = obj["passage"];
    passageDiv.innerHTML = passage;

    if (passageDiv.innerHTML === "undefined") {
      passageArea.classList.add("hidden");
    } else {
      passageArea.classList.remove("hidden");
    }

    // answers
    for (let i = 1; i <= 4; i++) {
      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";

      let radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "question";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      let label = document.createElement("label");
      label.htmlFor = `answer_${i}`;

      let labelText = document.createTextNode(obj[`answer_${i}`]);
      label.appendChild(labelText);

      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(label);

      answersArea.appendChild(mainDiv);
    }

    // save the answer in question
    for (let i = 0; i < answers.length; i++) {
      for (let j = 0; j < selectedAnswers.length; j++) {
        if (answers[i].dataset.answer === selectedAnswers[j]) {
          answers[i].checked = true;
        }
      }
    }
  }
}

let theChosenAns;

let answerFound = false;
function checkAnswer(rAnswer, count) {
  console.log("###");
  console.log(theChosenAns);
  console.log("###");
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChosenAns = answers[i].dataset.answer;
      selectedAnswers[currentIndex] = theChosenAns;
      answerFound = true;
    }
  }
  if (!answerFound) {
    theChosenAns = undefined; // No answer is selected
  }

  // Update the selected answer in the array or push it as a new item

  if (rAnswer === theChosenAns) {
    rightAnswerScore++;
  }

  if (theChosenAns === undefined) {
    theChosenAns = `No Answer`;
  }
  console.log(selectedAnswers);

  // Check if the chosen answer already exists in the selectedAnswers array

  let div = document.createElement("div");
  let txt = `${currentIndex}- ${theChosenAns}`;
  div.textContent = txt;
  div.className = "cDiv";
  chosenAnsDiv.appendChild(div);

  if (rAnswer === theChosenAns) {
    div.style.backgroundColor = "#005300";
  } else {
    div.style.backgroundColor = "#8d0000";
  }
}

function handelBullets() {
  let bullets = document.querySelectorAll(".bullets .spans span");
  Array.from(bullets, (span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}
function showResult(count) {
  let theResult;
  if (currentIndex === count || countDownDiv.textContent === "00:00") {
    quizArea.remove();
    answersArea.remove();
    submitBtn.remove();
    bulletsDiv.remove();
    quizInfoDiv.remove();
    countDownDiv.remove();
    passageArea.remove();
    backBtn.remove();
    clearInterval(countDownInterval);

    resultsDiv.classList.remove("hidden");

    if (rightAnswerScore > count / 2 && rightAnswerScore < count) {
      theResult = `<span class="good">Good</span> <p>You got ${rightAnswerScore} / ${count}</p>`;
    } else if (rightAnswerScore === count) {
      theResult = `<span class="perfect">Perfect</span> <p>You got ${rightAnswerScore} / ${count}</p>`;
    } else {
      theResult = `<span class="bad">Bad</span> <p>You got ${rightAnswerScore} / ${count}</p>`;
    }

    resultsDiv.innerHTML += theResult;

    chosenAnsDiv.classList.remove("hidden");
  }
}

function addRightAns(obj, count) {
  if (currentIndex === count || countDownDiv.textContent === "00:00") {
    // Right answers Div Intro
    let h2 = document.createElement("h2");
    let txtIntro = document.createTextNode("Right answers: ");
    h2.appendChild(txtIntro);
    rightAnsDiv.appendChild(h2);

    // Right answers Div
    for (let i = 0; i < count; i++) {
      let divA = document.createElement("div");
      let divP = document.createElement("div");
      let pA = document.createElement("p");
      let pT = document.createElement("p");
      let txtT = document.createTextNode(`${i + 1}- ${obj[i]["title"]}`);
      let txtA = document.createTextNode(`${obj[i]["right_answer"]}`);
      let passageD = document.createElement("div");
      let txtPassage = document.createTextNode(`${obj[i]["passage"]}`);
      let br = document.createElement("br");

      divA.className = "rightADiv";
      divP.className = "passages";

      pT.style.cssText = `
        padding: 10px;
        background-color: #3d19ff;
        margin: 0;
      `;
      pA.style.cssText = `
        padding-left: 10px;
        text-align: center;
      `;

      if (obj[i].hasOwnProperty("passage")) {
        passageD.appendChild(txtPassage);
        divP.appendChild(passageD);
        rightAnsDiv.appendChild(divP);
      }

      pA.appendChild(txtA);
      pT.appendChild(txtT);
      divA.appendChild(pT);
      divA.appendChild(pA);
      rightAnsDiv.appendChild(divA);
    }
  }
}

// counDown on all questions not per question
function countDown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    duration *= 60;
    countDownInterval = setInterval(() => {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countDownDiv.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countDownInterval);
        showResult(qCount);
        addRightAns(questionsObj, qCount);
        let div = document.createElement("div");
        let txt = `<i class="fa-regular fa-clock"></i> Time out !`;
        div.innerHTML = txt;
        div.style.width = "100%";
        chosenAnsDiv.appendChild(div);
      }
    }, 1000);
  }
}

/* 
block of code QR
*/
// QR Code
let input = document.querySelector("#input");
let genBtn = document.querySelector("#gen");
let downBtn = document.querySelector("#down");
let qrImg = document.querySelector("#img");

genBtn.addEventListener("click", () => {
  qrCode = `
  https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${input.value}
  `;
  qrImg.style.cssText = `
  width: 100px;
  height: 100px;
  margin: 30px 250px 0px 0px;
  `;
  qrImg.src = qrCode;
});

downBtn.addEventListener("click", async () => {
  const response = await fetch(qrImg);
  const blob = await response.blob();
  const downLink = document.createElement("a");
  downLink.href = URL.createObjectURL(blob);
  downLink.download = "qrCode.jpg";
  downLink.click();
});
