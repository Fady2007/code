// Test function for HTML
function test() {
  document.body.innerHTML += "ok";
}
function cl(el) {
  console.log(el);
}
// header and scroll up button functions
let header = document.querySelector("header");
let btn = document.querySelector(".btn");
window.onscroll = () => {
  scrollFunction();
  if (scrollY >= 600) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};
btn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
function scrollFunction() {
  if (document.documentElement.scrollTop > 60 /*780*/) {
    header.style.cssText = `
    background:rgba(67, 67, 67 , 0.8);
    `;
  } else {
    header.style.background = "";
  }
}

// Topics Div
let questionsDiv = document.querySelector(".Topics");
let questions = ["Javascript", "Church", "School"];
let questionH1 = document.querySelectorAll(".Topic");
for (let i = 0; i < questionH1.length; i++) {
  questionH1[i].textContent = questions[i];
}

// Contact us Div and loading function
let emailIcon = document.querySelector(".email");
let loading = document.querySelector(".loading");
function hideLoading() {
  loading.style.display = "none";
}
emailIcon.addEventListener("click", () => {
  loading.style.display = "block";
  setTimeout(hideLoading, 2000);
});

// Mobiles functions
let allSite = document.getElementById("allSite"); // window without header
let moMenu = document.querySelector(".mobileMenu");
let schDiv = document.querySelector(".school");

function appearMenu() {
  moMenu.classList.toggle("appear");
  allSite.addEventListener("click", () => {
    moMenu.classList.add("hidden");
    moMenu.classList.remove("appear");
  });
}
document.querySelector(".notes").addEventListener("click", () => {
  moMenu.classList.add("hidden");
  moMenu.classList.remove("appear");
});
schDiv.addEventListener("click", () => {
  moMenu.classList.add("hidden");
  moMenu.classList.remove("appear");
});
// don't repeat yourself functions
function headerColorToBlack() {
  header.style.cssText = `
    background:rgba(67, 67, 67 , 0.5);
    `;
}
function headerColorToBlack() {
  header.style.cssText = `
    background:rgba(67, 67, 67 , 0.5);
    `;
}
function noHeaderColor() {
  header.style.background = "";
}
// Nota page

let notes = document.querySelector(".notes");

let profileDiv = document.querySelector(".proDiv");

function openNotaPage() {
  allSite.style.display = "none";
  notes.style.display = "block";
  schDiv.style.display = "none";
  moMenu.classList.remove("appear");
  // let scHeight2 = areas[0].scrollHeight;
  // areas[0].style.height = `${scHeight2}px`;
  // header.style.backgroundColor = colorL;
  // window.addEventListener("scroll", scrollFunctionNote);
}

function openHomePage() {
  allSite.style.display = "block";
  notes.style.display = "none";
  schDiv.style.display = "none";
  profileDiv.style.display = "none";
  moMenu.classList.remove("appear");
}

function openSchoolPage() {
  allSite.style.display = "none";
  notes.style.display = "none";
  moMenu.classList.remove("appear");
  schDiv.style.display = "block";
  profileDiv.style.display = "none";
  if (localStorage.getItem("countClickL")) {
    areaWriterMain.value = txt1;
    areaWriterMain.classList.add("hidden");
  } else {
    typewriterArea(txt1, areaWriterMain);
    setTimeout(function () {
      areaWriterMain.classList.add("hidden");
    }, 20000);
  }
}

function openProfilePage() {
  allSite.style.display = "none";
  notes.style.display = "none";
  schDiv.style.display = "none";
  moMenu.classList.remove("appear");
  profileDiv.style.display = "block";
}

// user object that have all data (`)
const user = {
  theName: localStorage.nameBlur,
  title: localStorage.titleBlur,
  notesTxt: localStorage.notaArea,
  passToClear: localStorage.password,
  block: localStorage.displayDivPass,
};
const {
  theName: n,
  title: ti,
  notesTxt: nTx,
  passToClear: ptc,
  block: bl,
} = user;

// variables of form and div project
let inpName = document.querySelector("input[name='Name']");
let inpTitle = document.querySelector("input[name='Title']");
let inpPass = document.querySelector("input[name='pass']");
let con = document.querySelectorAll(".buttonB")[0];
let divProj = document.querySelector(".notaProject");
let passToClear = document.querySelector(".passToClear");
let passFormInp = document.querySelector("input[name='passForm']");
let optionBtn = document.getElementById("optionBtn");
let addBtn = document.getElementById("addBtn");

// onblur inputs it will save values
inpName.onblur = function () {
  localStorage.setItem("nameBlur", inpName.value);
};
inpTitle.onblur = function () {
  localStorage.setItem("titleBlur", inpTitle.value);
};
passFormInp.onblur = function () {
  localStorage.setItem("password", passFormInp.value);
};
// set variables
let loadingForm = document.querySelector(".loadingForm");
let form = document.getElementById("form");
let dataOfDiv = [];

con.onclick = () => {
  if (
    inpName.value !== "" &&
    inpTitle.value !== "" &&
    passFormInp.value !== ""
  ) {
    // it'll display equal none forever
    localStorage.setItem("displayDiv", "none");
    localStorage.setItem("displayDivPass", "block");
    localStorage.setItem("displayDLo", "display");
    form.style.display = "none";
    loadingForm.style.display = "flex";
    setTimeout(afterCon, 100);
  } else {
  }
};
// after clicking continue
function afterCon() {
  // user object that have all data (2)
  const user = {
    theName: localStorage.nameBlur,
    title: localStorage.titleBlur,
    notesTxt: localStorage.notaArea,
    block: localStorage.displayDivPass,
  };
  const { theName: n, title: ti } = user;
  // loading is none
  loadingForm.style.display = "none";
  // display area text , passDiv and addBtn
  txArea.style.display = "block";
  passToClear.style.display = "block";
  addBtn.style.display = "block";
  // create Elements in divProj
  let welH1 = document.createElement("h1");
  let titleValue = document.createElement("h1");
  welH1.style.cssText = `
  border: 1px solid black;
  padding: 10px;
  text-align: center;
  `;
  titleValue.style.cssText = `
  margin-top: 20px;
  margin-bottom: 0;
  background-color: rgb(164 179 255);
  padding: 7px;
  border: 1px solid black;
  width: 70%;
  display:inline-flex;
  color: revert;
  margin-left: 8px ;
  `;
  titleValue.id = "titleVal";
  // save h1 texts by input'
  welH1.innerHTML = `Welcome ${n},`;
  titleValue.innerHTML = `- Title: ${ti}`;
  // appending
  divProj.prepend(titleValue);
  divProj.prepend(welH1);
  // push div with outerHTML in dataOfDiv
  dataOfDiv.push(divProj.outerHTML);
  localStorage.setItem("divProj", JSON.stringify(dataOfDiv));
}

if (bl) {
  passToClear.style.display = bl;
  addBtn.style.display = bl;
}

// if displayDiv are exist in localStorage or user clicked continue
if (localStorage.getItem("displayDiv")) {
  form.style.display = localStorage.getItem("displayDiv");
  // dataOfDiv equal divProj that saved by JSON.stringify
  dataOfDiv[0] = JSON.parse(localStorage.getItem("divProj"));
  divProj.innerHTML = dataOfDiv[0];
}
// area saved
let txArea = document.querySelector(".area");
let passLoginDiv = document.querySelector(".passToLogin");
let logPassInp = document.querySelector("[name='logPass']");

txArea.onkeyup = function () {
  localStorage.setItem("notaArea", txArea.value);
};

// password login to show notes
let titleValue = document.getElementById("titleVal");
if (nTx && nTx !== "") {
  passLoginDiv.style.display = "block";
  titleValue.innerHTML = "1) Title: ";
  txArea.value = "Password required before adding your other notes here !";
  txArea.style.color = "orange";
  txArea.disabled = "s";

  // login input script
  logPassInp.addEventListener("keyup", () => {
    if (logPassInp.value === ptc) {
      txArea.value = nTx;
      titleValue.innerHTML = `1) Title: ${ti}`;
      passLoginDiv.remove();
      txArea.style.color = "";
      txArea.disabled = "";
    } else {
      titleValue.innerHTML = "1) Title: ";
    }
  });
} else {
  passLoginDiv.style.display = "none";
  txArea.placeholder = `Write Your Notes here..`;
}

function clearNotesOnly() {
  // Clear All Data Without Options
  localStorage.removeItem("notaArea");
  localStorage.removeItem("displayDiv");
  localStorage.removeItem("divProj");
  localStorage.removeItem("nameBlur");
  localStorage.removeItem("titleBlur");
  localStorage.removeItem("displayDivPass");
  localStorage.removeItem("password");
  localStorage.removeItem("notaDivs");
  localStorage.removeItem("txtData");
  localStorage.removeItem("titleAdd");
  location.reload();
}

// clear data
inpPass.onkeyup = () => {
  const userPass = {
    pass: localStorage.password,
  };
  if (inpPass.value === userPass.pass) {
    document.getElementById(
      "passValid"
    ).innerHTML = `<i class="fa fa-check"></i> Password is correct`;
    document.getElementById("passValid").style.color = "green";
    setTimeout(clearNotesOnly, 100);
  } else {
    document.getElementById("passValid").style.color = "red";
    document.getElementById(
      "passValid"
    ).innerHTML = `<i class="fa fa-times"></i> Password now is incorrect`;
  }
  if (inpPass.value === "") {
    document.getElementById(
      "passValid"
    ).innerHTML = `Enter password if you want to clear data`;
    document.getElementById("passValid").style.color = "";
  }
};

// modal
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");
const body = document.querySelector("body");

closeButton.addEventListener("click", function () {
  modal.style.display = "none";
  body.style.overflow = "auto";
  location.reload();
});

optionBtn.addEventListener("click", function () {
  // appear modal option that have bg : rgba(0, 0, 0, 0.5)
  modal.style.display = "flex";
  // prevent scroll
  body.style.overflow = "hidden";
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
    body.style.overflow = "auto";
    location.reload();
  }
});

let circles = document.querySelectorAll(".circle");
let colorL = localStorage.getItem("bg");
let getN = document.querySelectorAll(".get-div");
let childDiv = document.querySelectorAll(".get-divChild");
const bgChildDivs = ["#646464", "#555555"];

// school div
let xs = 0;
let speed = 50;

let queDiv = document.querySelectorAll(".que");

let txt1 = `
Welcome${
  n ? ` ${n}` : ``
} to our school, you will see all news about education in Egypt
and revision important points in your subject , There are a lot of tests for you..
Good Luck!
`;

let areaWriters = document.querySelectorAll(".areaWriter");
let areaWriterMain = document.querySelector(".areaWriterMain");
let userSchoolDivMain = document.querySelector(".userSchoolDivMain");
let userSchoolMainH1 = document.querySelector(".userSchoolMainH1");
userSchoolMainH1.innerHTML = `
<div class="avatarS">
<img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar icon">
${n ? `${n}` : `user`}: What is school ?
</div>
`;

let USH1 = document.querySelectorAll(".userSchoolH1");
let queDivs = document.querySelectorAll(".que");
let uscDivs = document.querySelectorAll(".userSchoolDiv");
let quArr = [
  "Is Nota page connect with school page ?",
  "Can I change my name ?",
  "What forms in this site do ?",
  "How inputs work ?",
  "What the system of forms in this site ?",
];
let answerArr = [
  "No, School page not connected with school page but, We use your name from nota page to improve the services",
  "Yes, You can change your name by clear all data with typing your password",
  "In this site there is an only form for notes page [name , title , password] and you'll create your own password to edit your notes and to clear all data",
  "password inputs work if the password you write in input is correct it work on key up input , and there is not an submit buttons or something..",
  "Inputs mustn't be empty, Continue and Add buttons in Nota page don't working if inputs are empty.",
];

for (let i = 0; i < USH1.length; i++) {
  USH1[i].innerHTML = `
  <div class="avatarS">
<img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar icon">
: ${quArr[i]}
</div> 
  `;
}
for (let i = 0; i < areaWriters.length; i++) {
  areaWriters[i].value = answerArr[i];
  // let scHeight = areaWriters[i].scrollHeight;
  // areaWriters[i].style.height = `${scHeight}px`;
}
for (let i = 0; i < uscDivs.length; i++) {
  uscDivs[i].onclick = () => {
    areaWriters[i].classList.toggle("hidden");
  };
}

// type speed
function typewriterArea(txt, area) {
  localStorage.setItem("countClickL", countClick);
  let countInter = setInterval(function () {
    area.value += txt[xs];
    xs++;
    if (xs === txt.length) {
      clearInterval(countInter);
    }
  }, speed);
}

function typewriterDiv(txt, div) {
  localStorage.setItem("countClickL", countClick);
  let countInter = setInterval(function () {
    div.innerHTML += txt[xs];
    xs++;
    if (xs === txt.length) {
      clearInterval(countInter);
    }
  }, speed);
}

let countClick = 0;
if (localStorage.getItem("countClickL")) {
  areaWriterMain.value = txt1;
}

userSchoolDivMain.onclick = () => {
  areaWriterMain.classList.toggle("hidden");
};

// continue bg
if (localStorage.getItem("bg")) {
  circles.forEach((li) => {
    li.classList.remove("active");
  });
  document
    .querySelector(`[data-color="${window.localStorage.getItem("bg")}"]`)
    .classList.add("active");
  getN.forEach((el) => {
    el.style.backgroundColor = colorL;
  });
  header.style.backgroundColor = colorL;
  window.addEventListener("scroll", scrollFunctionNote);
}

circles.forEach((cir) => {
  cir.addEventListener("click", (e) => {
    localStorage.setItem("bg", e.target.dataset.color);

    circles.forEach((li) => {
      li.classList.remove("active");
    });

    getN.forEach((el) => {
      el.style.backgroundColor = e.currentTarget.dataset.color;
    });

    header.style.backgroundColor = e.currentTarget.dataset.color;

    e.currentTarget.classList.add("active");

    if (e.target.dataset.color === "#333") {
      for (let i = 0; i < bgChildDivs.length; i++) {
        childDiv[i].style.backgroundColor = bgChildDivs[i];
        childDiv[i].style.color = "white";
        uscDivs[i].style.backgroundColor = "#333";
      }
    } else {
      for (let i = 0; i < bgChildDivs.length; i++) {
        childDiv[i].style.backgroundColor = "";
        childDiv[i].style.color = "";
      }
    }
  });
});

function scrollFunctionNote() {
  if (document.documentElement.scrollTop > 60 /*780*/) {
    header.style.cssText = `
    background:rgba(67, 67, 67 , 0.8);
    `;
  } else {
    header.style.background = colorL;
  }
}

if (localStorage.bg === "#333") {
  for (let i = 0; i < bgChildDivs.length; i++) {
    childDiv[i].style.backgroundColor = bgChildDivs[i];
    childDiv[i].style.color = "white";
  }
  for (let i = 0; i < uscDivs.length; i++) {
    uscDivs[i].style.backgroundColor = "#333";
    uscDivs[i].style.color = "white";
    areaWriters[i].style.backgroundColor = "#414141";
    areaWriters[i].style.color = "white";
    areaWriterMain.style.backgroundColor = "#414141";
    areaWriterMain.style.color = "white";
    schDiv.style.backgroundColor = "rgb(78, 78, 78)";
    schDiv.style.color = "white";
    userSchoolDivMain.style.color = "white";
    userSchoolDivMain.style.backgroundColor = "#181818";
  }
}

// add future

let formToAddDiv = document.querySelector(".formToAdd");
let addDivBtn = document.getElementById("addDivBtn");
let titleAddInp = document.getElementById("titleAddInp");
let arrayOfDivs = [];
let arrayOfArea = [];
let notaProj2 = document.querySelector(".notaProj2");

addBtn.onclick = function () {
  formToAddDiv.classList.toggle("hidden");
  titleAddInp.focus();
};
titleAddInp.onblur = () => {
  localStorage.setItem("titleAdd", titleAddInp.value);
};

addDivBtn.onclick = function () {
  if (localStorage.getItem("titleAdd")) {
    let NotaDiv = document.createElement("div");
    let titleValue = document.createElement("h1");
    let areaAdd = document.createElement("textarea");
    // let deleteBtn = document.createElement("button");
    let paddingDiv = document.createElement("div");

    areaAdd.placeholder = "Write your notes here..";
    areaAdd.className = "clone";
    // deleteBtn.className = "buttonD";

    titleValue.style.cssText = `
    margin-top: 20px;
    margin-bottom: 0;
    background-color: rgb(164 179 255);
    padding: 7px;
    border: 1px solid black;
    width: 70%;
    display:inline-block;
    color: revert;
    margin-left: 8px ;
    `;

    paddingDiv.style.padding = "10px";

    titleValue.innerHTML = `- Title ${titleAddInp.value}`;
    // deleteBtn.innerHTML = `<i class="fa fa-trash"></i> Delete`;

    NotaDiv.appendChild(titleValue);
    NotaDiv.appendChild(areaAdd);
    // paddingDiv.appendChild(deleteBtn);
    NotaDiv.appendChild(paddingDiv);
    notaProj2.appendChild(NotaDiv);
    arrayOfDivs.push(notaProj2.outerHTML);
    localStorage.setItem("notaDivs", JSON.stringify(arrayOfDivs));
    titleAddInp.value = "";
    /* 
    <div class="notaProj2">
        <div> --> NotaDiv
            <h1>Title</h1>
            <textarea></textarea>
            <button>Delete</button>
        </div>
    </div>
    */
  } else {
  }
};
if (localStorage.getItem("notaDivs")) {
  arrayOfDivs = JSON.parse(localStorage.getItem("notaDivs"));
  for (let i = 0; i < arrayOfDivs.length; i++) {
    notaProj2.innerHTML = arrayOfDivs[i];
  }
}
let areas = document.querySelectorAll(".clone");

areas.forEach((li) => {
  // any textarea user add it it'll push in array as one string
  li.onkeyup = () => {
    for (let i = 0; i < arrayOfDivs.length; i++) {
      arrayOfArea[i] = areas[i].value;
    }

    // add array to local Storage
    localStorage.setItem("txtData", JSON.stringify(arrayOfArea));
  };

  // if txtData (array) is exist arrayOfArea = data of txtData that equal stringify of array
  if (localStorage.getItem("txtData")) {
    arrayOfArea = JSON.parse(localStorage.getItem("txtData"));
    for (let i = 0; i < arrayOfDivs.length; i++) {
      areas[i].value = arrayOfArea[i];
    }
  } else {
  }

  // prevent undefined value if area empty
  window.addEventListener("load", function () {
    if (li.value === "undefined") {
      li.value = "";
    } else {
      arrayOfArea.push(li.value);
    }
  });
});

// Profile Page

let avatarName = document.querySelector(".username");

avatarName.innerHTML = `${n ? n : "Anonymous"}`;
