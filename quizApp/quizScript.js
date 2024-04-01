let quizApp = document.querySelectorAll(".quiz-app");
let quizInfoDiv = document.querySelector(".quiz-info");
let countSpan = document.querySelectorAll(".quiz-info .count span");
let progressBar = document.querySelector(".progress");
let progressDiv = document.querySelector(".progress-bar");
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
let loading = document.querySelector(".load");
let modalDiv = document.querySelector(".modal1");
let startBtn = document.querySelector(".startQ");
let errmsg = document.querySelector(".err");
let btnQ = document.querySelector(".btnQ");
let modal = document.querySelector(".modal");
let leaveBtn = document.querySelector(".leave-button");
let settingBtn = document.querySelector(".setting-button");

// set options
let currentIndex = 0;
let rightAnswerScore = 0;
let countDownInterval;
let progressPercentage;
let duration = 10;
let qCount;
let questionsObj;
let rightAnswer;
let answers = document.getElementsByName("question");
let selectedAnswers = [];
let selectedAnswersBar = [];
let jF;
let typeQ;
let chooseQ;
let lenOfData;
let quizInfos;
let dataTxt;
// supabase
let apiURL = "https://zqjgdgfntxqoybwghjiq.supabase.co";
let apiKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxamdkZ2ZudHhxb3lid2doamlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzkwMjg2MiwiZXhwIjoyMDAzNDc4ODYyfQ.sBVfZx_-GiRF8tJZqAZbVDXD9WhEL77oXAWtuzo3_n0";
const { createClient } = supabase;
try {
  supabase = createClient(apiURL, apiKEY);

  let res = await supabase.from("quiz").select("*");
  if (res.status === 200) {
    dataTxt = (await supabase.from("quiz").select("*"))["data"];
  } else {
    dataTxt = {
      quizInfo: {
        data: {
          icon: "",
          jsonFile: "",
          category: "",
          owner: "",
        },
      },
    };
  }

  quizInfos = Object.keys(dataTxt);
  lenOfData = Object.keys(dataTxt).length;

  console.log(lenOfData);
  // Object.keys(dataTxt);
} catch (error) {}

if (lenOfData === 0) {
  cenApp.innerHTML += `
  <h2><i class="fa-regular fa-face-frown"></i> No quizes Found</h2>
  <p>If you created a quiz and wasn't showed here , Please contact us! </p>
  `;
} else {
}

if (dataTxt) {
  for (const quizInfo of quizInfos) {
    let obj = dataTxt[quizInfo].data;
    let objId = dataTxt[quizInfo].id;
    if (obj.category == "") {
      cenApp.innerHTML += "";
    } else {
      cenApp.innerHTML += `
      <div class="transbg_dark mg1r-b flex mg10p pointer bo-rad6 ${
        obj.visibility == "hidden" ? obj.visibility : ""
      }">
          <div class="pd40p cen">
            <i class="${obj.icon} bigIcon co-w"></i>
          </div>
          <div class="pd20p gradient-tr">
            <h3 class="cen purple bo-rad6 pd10p">${obj.category} quiz</h3>
            <p class="bold">Created By ${
              obj.owner == "Admin"
                ? `<span class="co-blu">Admin</span>`
                : obj.owner || `User`
            }</p>
            <p class="bold fmar"><i class="fa fa-clock"></i> Timer: ${
              Number(obj.timer) ? `${obj.timer} min` : ` Optional`
            }</p>
          </div>
        </div>
  `;
    }

    chooseQ = document.querySelectorAll(".pointer");
  }
  document.querySelector(".load.page").classList.add("hidden");
  quizApp[0].classList.remove("hidden");
} else {
  console.log(dataTxt);
}

if (chooseQ) {
  chooseQ.forEach((e, i) => {
    e.addEventListener("click", async (e) => {
      jF = dataTxt[i].data.jsonFile;
      for (const quizInfo of quizInfos) {
        let obj = dataTxt[quizInfo].data;
        obj.timer = Number(obj.timer);
        console.log(typeof obj.timer);
        if (obj.timer) {
          console.log(typeof obj.timer);
          if (typeof obj.timer == "number") {
            let jsonData = await fetch(jF);
            let jsonDataObj = await jsonData.json();
            questionsObj = jsonDataObj;
            qCount = questionsObj.length;
            duration = obj.timer;
            countDown(duration, qCount);
            location.hash = "";
            setTimeout(() => {
              document.body.style.overflow = "auto";
              modalDiv.classList.add("hidden");
            }, 20);
            document.querySelector(".first").remove();
          } else {
            duration = duration;
          }
          category.innerHTML = dataTxt[quizInfo].data.category;
        }
      }

      loading.classList.remove("hidden");
      quizApp[0].classList.add("hidden");
      getQuestions(jF);
      btnQ.remove();
      leaveBtn.classList.remove("hidden");
      settingBtn.remove();
      progressDiv.classList.remove("hidden");
    });
  });
}

// choose Timer
clockBtn.forEach((e) => {
  e.onclick = function (ev) {
    clockBtn.forEach((el) => {
      el.style.background = "";
      el.style.color = "";
    });

    ev.currentTarget.style.background = "#131c42";
    ev.currentTarget.style.color = "white";

    if (ev.currentTarget.innerText === " No Timer") {
      countDownDiv.remove();
    } else {
      duration = ev.currentTarget.innerText;
      quizApp[1].prepend(countDownDiv);
    }
  };
});

// chosen quiz
let loadFast = 0;

// main question
document.querySelector(".pointerMain").addEventListener("click", () => {
  jF = "html_questions.json";
  category.innerHTML = "HTML";
  loading.classList.remove("hidden");
  quizApp[0].classList.add("hidden");
  getQuestions(jF);
  modalDiv.classList.add("hidden");
  btnQ.remove();
  leaveBtn.classList.remove("hidden");
  settingBtn.remove();
  progressDiv.classList.remove("hidden");
});

// get file
async function getQuestions(jsonFile) {
  setTimeout(() => {
    loading.remove();
    quizApp[1].classList.remove("hidden");
    showModal();
    document.body.style.overflow = "hidden";
  }, 30);

  try {
    let jsonData = await fetch(jsonFile);
    let jsonDataObj = await jsonData.json();

    questionsObj = jsonDataObj;
    qCount = questionsObj.length;

    // Shuffle the questionsObj array
    // questionsObj = shuffleArray(questionsObj);

    // create Bullets + Set qu count
    createBullets(qCount);

    // add question data
    if (!questionsObj[currentIndex].title) {
      showErrorMsg(jsonFile);
    } else {
      addQuestionData(questionsObj[currentIndex], qCount);
    }
    // countDown
    // countDown(duration, qCount);
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
      selectedAnswers[currentIndex] = theChosenAns;

      selectedAnswersBar[currentIndex] = theChosenAns;

      if (qCount > currentIndex) {
        progressPercentage = (selectedAnswersBar.length / qCount) * 100;
        progressBar.style.width = `${progressPercentage}%`;
      } else {
        progressPercentage = (rightAnswerScore / qCount) * 100;
        progressBar.style.width = `${progressPercentage}%`;
      }
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
    showErrorMsg(jsonFile);
    throw Error(reason);
  }
}

async function showErrorMsg(jsonFile) {
  loading.remove();
  errmsg.querySelector("h1").innerHTML += ` (${(await fetch(jsonFile)).status}) 
  `;
  errmsg.innerHTML += `
  <button class="purpBtn" onclick="window.location.reload()">
  <i class="fa fa-refresh"></i>
  Refresh
  </button>
  `;
  errmsg.classList.remove("hidden");
  progressBar.style.width += "100%";
  progressBar.style.transition = "0.8s ease";
  progressBar.style.backgroundColor = "red";
  modalDiv.remove();
  quizApp[1].remove();
}

function showModal() {
  modalDiv.querySelector(".loadDiv").classList.remove("hidden");
  modalDiv.classList.remove("hidden");

  startBtn.addEventListener("click", () => {
    countDown(duration, qCount);
    modalDiv.querySelector(".first .loadDiv").style.display = "flex";
    startBtn.classList.add("hidden");
    location.hash = "";
    setTimeout(() => {
      document.body.style.overflow = "auto";
      modalDiv.classList.add("hidden");
    }, 20);
  });
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
  countSpan[1].innerHTML = num;
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

    countSpan[0].innerHTML = currentIndex + 1;

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
// grand js / unit testing
let theChosenAns;

// Function for checking answer validity and updating score
function checkAnswer(rAnswer, count) {
  let answerFound = false;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChosenAns = answers[i].dataset.answer;
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

  // console.log(selectedAnswers);

  // Check if the chosen answer already exists in the selectedAnswers array

  let div = document.createElement("div");
  let txt = `${currentIndex}- ${theChosenAns}`;
  div.textContent = txt;
  div.className = "cDiv";
  chosenAnsDiv.appendChild(div);

  if (rAnswer === theChosenAns) {
    div.style.backgroundColor = "#0053006e";
  } else {
    div.style.backgroundColor = "#8d000066";
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

// Function to check answers and show results
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
    leaveBtn.remove();
    clearInterval(countDownInterval);

    resultsDiv.classList.remove("hidden");

    if (rightAnswerScore > count / 2 && rightAnswerScore < count) {
      theResult = `
      <span class="good">Good</span> 
      <p>You got ${rightAnswerScore} / ${count}</p>
      `;
      progressBar.style.background = "green";
    } else if (rightAnswerScore === count) {
      progressBar.style.background = "aqua";
      theResult = `<span class="perfect">Perfect</span> 
      <p>You got ${rightAnswerScore} / ${count}</p>`;
    } else {
      progressBar.style.background = "red";
      theResult = `
      <span class="bad">Bad</span> 
      <p>You got ${rightAnswerScore} / ${count}</p>
      `;
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

      divA.className = "rightADiv";
      divP.className = "passages";

      pT.style.cssText = `
        padding: 12px;
        background-color: #a0adff29;
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
let qrCode;

let noSpace = /\w+\s?/i;

input.addEventListener("keyup", () => {
  console.log(noSpace.test(input.value));
});

genBtn.addEventListener("click", () => {
  if (!noSpace.test(input.value)) {
    let div = document.createElement("div");
    div.className = "modal";
    document.body.prepend(div);
  } else {
    qrCode = `
    https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${input.value}
    `;
    qrImg.style.cssText = `
    width: 100px;
    height: 100px;
    margin: 30px 250px 0px 0px;
    `;
    qrImg.src = qrCode;
  }
});

downBtn.addEventListener("click", async () => {
  const response = await fetch(qrImg);
  const blob = await response.blob();
  const downLink = document.createElement("a");
  downLink.href = URL.createObjectURL(blob);
  downLink.download = "qrCode.jpg";
  downLink.click();
});

for (let i = 0; i < lenOfData; i++) {
  if (location.hash == `#${dataTxt[i].data.flink}`) {
    chooseQ[i].click();
  }
}

function fadetohid(item) {
  item.classList.add("fade-out");
  setTimeout(() => {
    item.style.display = "none";
  }, 300);
}

function showAlert(
  alertDiv,
  sureBtn,
  doSomething,
  cancelBtn,
  valueContent = "Do you really want to do this operation ?",
  cancleOnclickModel = true
) {
  alertDiv.style.display = "flex";
  alertDiv.classList.add("fade-in");
  alertDiv.classList.remove("fade-out");
  cancelBtn.onclick = () => {
    fadetohid(alertDiv);
    alertDiv.classList.remove("fade-in");
  };
  sureBtn.addEventListener("click", doSomething);
  document.querySelector("#alertReason").textContent = valueContent;
  if (cancleOnclickModel) {
    alertDiv.addEventListener("click", () => {
      fadetohid(alertDiv);
      alertDiv.classList.remove("fade-in");
    });
  } else {
    return;
  }
}

leaveBtn.addEventListener("click", () => {
  let yes = modal.querySelectorAll(".alert .choice button")[0];
  let cancle = modal.querySelectorAll(".alert .choice button")[1];
  let content = "Do you want to leave this quiz ?";
  const doFunc = () => {
    location.reload();
  };
  showAlert(modal, yes, doFunc, cancle, content, false);
});
