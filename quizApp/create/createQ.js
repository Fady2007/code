import Quiz from "../create/oop_js/oop.js";

let quiz = new Quiz();

let rootCreate = document.querySelector(".root.overflow.aw");
let rootOne = document.querySelector(".root.willhid");
let cateFromCre = document.querySelector("#cateFromCre");
let removeQ;
let qform;
let addQueBtn;
let saveBtn = document.querySelector(".save-button");
let delAllBtn = document.querySelector(".deleteAll");
let modal = document.querySelector(".modal");
let moveableDiv;
let values = [];
let allInputs;

delAllBtn.onclick = function () {
  showAlert(
    modal,
    modal.querySelectorAll(".alert .choice button")[0],
    function () {
      let rootHeader = document.querySelector(".root.overflow");
      saveBtn.remove();
      rootHeader.remove();
      rootCreate.remove();
      rootOne.classList.remove("hidden");
      modal.style.display = "none";
    },
    modal.querySelectorAll(".alert .choice button")[1],
    "You will delete all questions with quiz detatils and link"
  );
};

function showAlert(
  alertDiv,
  sureBtn,
  doSomething,
  cancelBtn,
  valueContent = "Do you really want to do this operation ?"
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
}

function fadetohid(item) {
  item.classList.add("fade-out");
  setTimeout(() => {
    item.style.display = "none";
  }, 300);
}

function fadetore(item) {
  item.classList.add("fade-out");
  setTimeout(() => {
    item.remove();
  }, 300);
}

if (document.querySelector(".introCreate")) {
  document.querySelector(".introCreate").onclick = () => {
    qform.innerHTML += `
    <div class="createQ fade-in">
    <input type="text" placeholder="Question.." />
    <div class="anArea">
      <input type="text" placeholder="answer_1" />
      <input type="text" placeholder="answer_2" />
      <input type="text" placeholder="answer_3" />
      <input type="text" placeholder="answer_4" />
      <input type="text" placeholder="right_answer" class="greDesign" />
    </div>
    <div class="removeQue">
      <i class="fa-solid fa-trash-can"></i>
    </div>
  </div>
    `;
    removeQ = document.querySelectorAll(".removeQue");
    removeQ.forEach((e) => {
      e.addEventListener("click", (ev) => {
        fadetohid(ev.currentTarget.parentElement);
      });
    });
    const scrollPosition = rootCreate.scrollHeight;
    rootCreate.scrollTo(0, scrollPosition);
    document.querySelector(".introCreate").remove();
  };
}

// add and remove question function
let formInpsOnly = [];
function addQue() {
  allInputs = document.querySelectorAll("input");
  for (let i = 0; i < allInputs.length; i++) {
    if (i < 6) {
      continue;
    }
    formInpsOnly.push(allInputs[i]);
  }
  addQueBtn = document.querySelector(".addQueBtn");
  qform = document.querySelector(".qForm");
  addQueBtn.addEventListener("click", () => {
    if (document.querySelector(".introCreate")) {
      document.querySelector(".introCreate").remove();
    }
    qform.innerHTML += `
    <div class="createQ">
    <input type="text" placeholder="Question.." />
    <div class="anArea">
      <input type="text" placeholder="answer_1" />
      <input type="text" placeholder="answer_2" />
      <input type="text" placeholder="answer_3" />
      <input type="text" placeholder="answer_4" />
      <input type="text" placeholder="right_answer" class="greDesign" />
    </div>
    <div class="removeQue">
      <i class="fa-solid fa-trash-can"></i>
    </div>
  </div>
    `;
    removeQ = document.querySelectorAll(".removeQue");
    removeQ.forEach((e) => {
      e.addEventListener("click", (ev) => {
        fadetohid(ev.currentTarget.parentElement);
      });
    });
    const scrollPosition = rootCreate.scrollHeight;
    rootCreate.scrollTo(0, scrollPosition);
  });
}

removeQ = document.querySelectorAll(".removeQue");
removeQ.forEach((e) => {
  e.addEventListener("click", (ev) => {
    fadetohid(ev.currentTarget.parentElement);
  });
});

// if user didn't save save
if (!localStorage.getItem("root")) {
  addQue();
  saveBtn.addEventListener("click", () => {
    localStorage.setItem("root", rootCreate.innerHTML);
    setTimeout(() => {
      location.reload();
    }, 500);
    saveBtn.innerHTML = `Saving...`;
  });
}

// localstrorage functions
window.onload = () => {
  if (localStorage.getItem("root")) {
    rootCreate.innerHTML = localStorage.getItem("root");
    document.body.append(rootCreate);

    // add question
    addQueBtn = document.querySelector(".addQueBtn");
    qform = document.querySelector(".qForm");
    addQue();

    // save btn
    saveBtn.addEventListener("click", () => {
      localStorage.setItem("root", rootCreate.innerHTML);
      for (let i = 0; i < formInpsOnly.length; i++) {
        val = formInpsOnly[i].value;
        values.push(val);
        localStorage.setItem("val", JSON.stringify(values));
      }

      setTimeout(() => {
        location.reload();
      }, 400);
      saveBtn.innerHTML = `Saving...`;
    });
    removeQ = document.querySelectorAll(".removeQue");
    removeQ.forEach((e) => {
      e.addEventListener("click", (ev) => {
        fadetohid(ev.currentTarget.parentElement);
      });
    });

    // delete All btn
    delAllBtn = document.querySelector(".deleteAll");
    delAllBtn.onclick = function () {
      showAlert(
        modal,
        modal.querySelectorAll(".alert .choice button")[0],
        function () {
          let rootHeader = document.querySelector(".root.overflow");
          saveBtn.remove();
          rootHeader.remove();
          rootCreate.remove();
          rootOne.classList.remove("hidden");
          modal.style.display = "none";
        },
        modal.querySelectorAll(".alert .choice button")[1],
        "You will delete all questions with quiz detatils and link"
      );
    };
    selectInpsOnfocus(formInpsOnly);
  }

  if (localStorage.getItem("val")) {
    for (let i = 0; i < formInpsOnly.length; i++) {
      const val = localStorage.getItem("val");
      formInpsOnly[i].value = JSON.parse(val)[i];
    }
  }
};

// movable
moveableDiv = document.querySelectorAll(".movable");
let offsetX, offsetY;

const move = (e) => {
  moveableDiv.forEach((el) => {
    el.style.left = `${e.clientX - offsetX}px`;
    el.style.top = `${e.clientY - offsetY}px`;
  });
};

moveableDiv.forEach((el) => {
  el.addEventListener("mousedown", (e) => {
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    document.addEventListener("mousemove", move);
  });
});

document.addEventListener("mouseup", () => {
  document.removeEventListener("mousemove", move);
});

function selectInpsOnfocus(arrInps) {
  arrInps.forEach((inp) => {
    inp.onfocus = () => {
      inp.select();
    };
  });
}

const q = new Quiz();
