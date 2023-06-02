let quizApp = document.querySelectorAll(".quiz-app");
let chooseQ = document.querySelectorAll(".pointer");
let countSpan = document.querySelector(".quiz-info .count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let bulletsDiv = document.querySelector(".bullets");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitBtn = document.querySelector(".submit-button");
let resultsDiv = document.querySelector(".results");
let countDownDiv = document.querySelector(".countdown");
let category = document.querySelector(".quiz-info .category span");
let cenApp = document.querySelector("#centerApp");
let clockBtn = document.querySelectorAll(".clock-button");
// set options
let currentIndex = 0;
let rightAnswerScore = 0;
let countDownInterval;
let duration = 30;
let jF;
let dataTxt = {
  quizInfo_0: {
    jsonFile: "html_questions.json",
    category: "HTML",
  },
  quizInfo_1: {
    jsonFile: "grammar.json",
    category: "Grammar",
  },
};

// choose Timer
clockBtn.forEach((e) => {
  e.onclick = function (ev) {
    clockBtn.forEach((el) => {
      el.style.background = "#f1f1f1";
      el.style.color = "#333";
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
    let questionsObj = jsonDataObj;
    let qCount = questionsObj.length;
    console.log(qCount);

    // Shuffle the questionsObj array
    questionsObj = shuffleArray(questionsObj);

    // create Bullets + Set qu count
    createBullets(qCount);

    // add question data
    addQuestionData(questionsObj[currentIndex], qCount);

    // countDown
    countDown(duration, qCount);

    submitBtn.onclick = () => {
      let rightAnswer = questionsObj[currentIndex].right_answer;

      currentIndex++;

      checkAnswer(rightAnswer, qCount);

      quizArea.innerHTML = "";
      answersArea.innerHTML = "";

      // Next question depend on currentIndex
      addQuestionData(questionsObj[currentIndex], qCount);

      // bullets function
      handelBullets();

      // countDown in all questions
      clearInterval(countDownInterval);
      countDown(duration, qCount);

      // show results
      showResult(qCount);
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

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // question
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(obj["title"]);
    questionTitle.appendChild(questionText);
    quizArea.appendChild(questionTitle);

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
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChosenAns;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChosenAns = answers[i].dataset.answer;
    }
  }

  if (rAnswer === theChosenAns) {
    rightAnswerScore++;
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
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitBtn.remove();
    bulletsDiv.remove();

    if (rightAnswerScore > count / 2 && rightAnswerScore < count) {
      theResult = `<span class="good">Good</span> You got ${rightAnswerScore} From ${count}`;
    } else if (rightAnswerScore === count) {
      theResult = `<span class="perfect">Perfect</span> You got ${rightAnswerScore} From ${count}`;
    } else {
      theResult = `<span class="bad">Bad</span> You got ${rightAnswerScore} From ${count}`;
    }

    resultsDiv.innerHTML = theResult;
  }
}

function countDown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countDownInterval = setInterval(() => {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countDownDiv.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countDownInterval);
        submitBtn.click();
      }
    }, 1000);
  }
}
