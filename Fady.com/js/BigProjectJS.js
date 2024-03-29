function cl(el) {
  console.log(el);
}
let allSite = document.querySelector(".allSite");
let logoImg = document.querySelector(".logoImg");
// header and scroll up button functions
let header = document.querySelector("header");
let btn = document.querySelector(".btn");
window.onscroll = () => {
  scrollFunction();
  if (scrollY >= 600) {
    btn.style.display = "block";
    btn.style.animation = "fade-in 0.7s ease";
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
// document.addEventListener("contextmenu", (e) => {
//   e.preventDefault();
// });
function scrollFunction() {
  if (document.documentElement.scrollTop > 60 /*780*/) {
    header.style.cssText = `
    background:rgba(67, 67, 67 , 0.8);
    `;
  } else {
    header.style.backgroundColor = "";
  }
}

let footer = document.querySelector("#footer");

// Topics Div
let questionsDiv = document.querySelector(".Topics");
let questions = ["Javascript", "English", "School"];
let questionH1 = document.querySelectorAll(".Topic");
for (let i = 0; i < questionH1.length; i++) {
  questionH1[i].textContent = questions[i];
}
// form
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
// window without header
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
function noHeaderColor() {
  header.style.backgroundColor = "transparent";
}
// Nota page

let notes = document.querySelector(".notes");

let profileDiv = document.querySelector(".proDiv");

window.addEventListener("scroll", function () {
  if (window.scrollX === 0 && window.scrollY === 0) {
  }
});

function openNotaPage() {
  closeAllPages();
  notes.style.display = "block";
  moMenu.classList.remove("appear");
  document.body.style.overflow = "visible";
  footer.style.display = "none";
  let passTxtToShow = document.querySelector("#passTxtToShow");
  let countInterNota;
  typewriterDiv(
    "Enter password to show your last Notes",
    passTxtToShow,
    60,
    countInterNota
  );
  // let scHeight2 = areas[0].scrollHeight;
  // areas[0].style.height = `${scHeight2}px`;
  // header.style.backgroundColor = colorL;
  // window.addEventListener("scroll", scrollFunctionNote);
}

function closeAllPages() {
  notes.style.display = "none";
  schDiv.style.display = "none";
  profileDiv.style.display = "none";
  footer.style.display = "none";
  schDiv.style.display = "none";
  allSite.style.display = "none";
  gotDiv.style.display = "none";
  apiDiv.style.display = "none";
  header.classList.remove("hidden");
  rotateLogo();
}

function openHomePage() {
  closeAllPages();
  allSite.style.display = "block";
  moMenu.classList.remove("appear");
  document.body.style.overflowY = "visible";
  footer.style.display = "block";
}

function openSchoolPage() {
  closeAllPages();
  moMenu.classList.remove("appear");
  schDiv.style.display = "block";
  let countInterSchool;
  if (localStorage.getItem("countClickL")) {
    areaWriterMain.value = txt1;
    areaWriterMain.classList.add("hidden");
  } else {
    typewriterArea(txt1, areaWriterMain, 50, countInterSchool);
    setTimeout(function () {
      areaWriterMain.classList.add("hidden");
    }, 30000);
  }
  document.body.style.overflowY = "visible";
}

let clicked = 0;

function openProfilePage() {
  closeAllPages();
  moMenu.classList.remove("appear");
  profileDiv.style.display = "block";
  document.body.style.overflow = "hidden";
  scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  noHeaderColor();
  let crTx = document.querySelector("#createTxt");
  // let countInterPro;
  // typewriterDiv("Create an account", crTx, 100, countInterPro);
  if (clicked === 0) {
    clicked = 1;
    setTimeout(() => {
      crTx.style.border = "0";
    }, 5000);
  } else {
    crTx.style.borderRight = "3px solid";
    setTimeout(() => {
      crTx.style.border = "0";
    }, 4000);
  }
}
function rotateLogo() {
  logoImg.classList.add("rotate2");
  setTimeout(() => {
    logoImg.classList.remove("rotate2");
  }, 1000);
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
let optionBtnMo = document.getElementById("optionBtnMo");
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

addE(inpName, "keyup", () => {
  inpName.value =
    inpName.value.charAt(0).toUpperCase() + inpName.value.slice(1);
  inpName.value = inpName.value.replace(/\s/gi, "_");
});

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
    setTimeout(afterCon, 3000);
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
    setTimeout(clearNotesOnly, 200);
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

optionBtnMo.addEventListener("click", function () {
  // appear modal option that have bg : rgba(0, 0, 0, 0.5)
  modal.style.display = "flex";
  // prevent scroll
  body.style.overflow = "hidden";
  moMenu.classList.remove("appear");
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
and revision important points in your subject , There are a lot of tests for you.
You will also see important videos with the best teachers without payment or code..
I hope that you will be enjoy..
create an account and enjoy
thank you ! and have a nice day!
Good Luck !
`;

let areaWriters = document.querySelectorAll(".areaWriter");
let areaWriterMain = document.querySelector(".areaWriterMain");
let userSchoolDivMain = document.querySelector(".userSchoolDivMain");
let userSchoolMainH1 = document.querySelector(".userSchoolMainH1");
userSchoolMainH1.innerHTML = `
<div class="logo bg-Green">${n ? n.charAt(0).toUpperCase() : `U`}</div>
${n ? `${n}` : `user`}: What is school ?
`;

let USH1 = document.querySelectorAll(".userSchoolH1");
let queDivs = document.querySelectorAll(".que");
let uscDivs = document.querySelectorAll(".userSchoolDiv");
let quArr = [
  "Is Note page connect with school page ?",
  "Can I change my name ?",
  "What forms in this site do ?",
  "How inputs work ?",
  "What the system of forms in this site ?",
  "What about security in this site ?",
  "Where data of user go ?",
];
let answerArr = [
  "No, School page not connected with school page but, We use your name from nota page to improve the services",
  "Yes, You can change your name by clear all data with typing your password",
  "In this site there is an only form for notes page [name , title , password] and you'll create your own password to edit your notes and to clear all data",
  "password inputs work if the password you write in input is correct it work on key up input , and there is not an submit buttons or something..",
  "Inputs mustn't be empty, Continue and Add buttons in Nota page don't working if inputs are empty.",
  "Security in this site weak So, You shouldn't write any sensitive information, But don't worry, Soon we will build a secure system and will build sign in system to make site more useful for you.",
  "user's data save in local storage in site in your device So, It maybe unsecure",
];

for (let i = 0; i < USH1.length; i++) {
  USH1[i].innerHTML = `
  <div class="avatarS">
<img src="../../Fady.com/img/img_avatar.png" alt="Avatar icon">
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
function typewriterArea(txt, area, speed, countInter) {
  localStorage.setItem("countClickL", countClick);
  countInter = setInterval(function () {
    area.value += txt[xs];
    xs++;
    if (xs >= txt.length) {
      clearInterval(countInter);
      area.value = area.value.replace("undefined", "");
    }
  }, speed);
}

function typewriterDiv(txt, div, speed, countInter) {
  countInter = setInterval(function () {
    div.innerHTML += txt[xs];
    xs++;
    if (xs >= txt.length) {
      clearInterval(countInter);
      div.innerHTML = div.innerHTML.replace("undefined", "");
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
  noHeaderColor();
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
    header.style.background = "";
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

let logPassDiv = document.getElementById("logPassDiv");

if (window.innerWidth >= 576) {
  logPassDiv.classList.add("passInputNoteP");
}

// Profile Page
let usInpPro = document.querySelector("[name=usernamePro]");
let e_InpPro = document.querySelector("[name=emailPro]");
let psInpPro = document.querySelector("[name=passPro]");
let subBtn = document.querySelector("#submit");
let errMsgName = document.querySelector("#errorName");
let errMsgNum = document.querySelector("#errorNum");
let errMsgEmail = document.querySelector("#errorEmail");
let errMsgPass = document.querySelector("#errorPass");
let phoneInp = document.querySelector("[name=phone]");
let conBoolObj = {
  conBoolU: false,
  conBoolE: false,
  conBoolPh: false,
  conBoolPs: false,
};
let rexEmpty = /\w+\s?/i;
let rexNameUnder_ = /\w+\s+/i;
let rexNameNumber = /^(?![a-zA-Z]|\s[a-zA-Z])/gi;
let rexNumber = /^01\d{9}$/;

// function for userName Input
function userNameValid() {
  if (rexEmpty.test(usInpPro.value) === false || usInpPro.value === "") {
    errMsgName.style.display = "block";
    errMsgName.innerHTML = `Username mustn't be empty`;
    usInpPro.style.borderColor = "red";
  } else if (rexNameNumber.test(usInpPro.value)) {
    errMsgName.style.display = "block";
    errMsgName.innerHTML = `Username mustn't start with number`;
    usInpPro.style.borderColor = "red";
  } else if (usInpPro.value.length <= 3) {
    errMsgName.style.display = "block";
    errMsgName.innerHTML = `Username characters must be bigger than 3`;
    usInpPro.style.borderColor = "red";
  } else {
    errMsgName.style.display = "none";
    usInpPro.style.borderColor = "";
    usInpPro.value =
      usInpPro.value.charAt(0).toUpperCase() + usInpPro.value.slice(1);
    conBoolObj.conBoolU = true;
  }
}

function phoneNumValid() {
  if (!rexEmpty.test(phoneInp.value) || phoneInp.value === "") {
    errMsgNum.style.display = "block";
    errMsgNum.innerHTML = `Phone number mustn't be empty`;
    phoneInp.style.borderColor = "red";
  } else if (!/\d/.test(phoneInp.value)) {
    errMsgNum.style.display = "block";
    errMsgNum.innerHTML = "This input for phone number so please enter numbers";
    phoneInp.style.borderColor = "red";
  } else if (!rexNumber.test(phoneInp.value)) {
    errMsgNum.style.display = "block";
    errMsgNum.innerHTML = "Must be 11 Numbers and an Egyptian number";
    phoneInp.style.borderColor = "red";
  } else {
    phoneInp.style.borderColor = "";
    errMsgNum.style.display = "none";
    conBoolObj.conBoolPh = true;
  }
}

function emailValid() {
  if (!rexEmpty.test(e_InpPro.value) || e_InpPro.value === "") {
    errMsgEmail.style.display = "block";
    errMsgEmail.innerHTML = `Email mustn't be empty`;
    e_InpPro.style.borderColor = "red";
  } else if (!/\w{3,}@\w{1,10}\.\w+/i.test(e_InpPro.value)) {
    errMsgEmail.style.display = "block";
    errMsgEmail.innerHTML = `Invalid Email`;
    e_InpPro.style.borderColor = "red";
  } else {
    e_InpPro.style.borderColor = "";
    errMsgEmail.style.display = "none";
    conBoolObj.conBoolE = true;
  }
}

function passValid() {
  if (!rexEmpty.test(psInpPro.value) || psInpPro.value === "") {
    errMsgPass.style.display = "block";
    errMsgPass.innerHTML = `Password mustn't be empty`;
    psInpPro.style.borderColor = "red";
  } else if (psInpPro.value.length <= 5) {
    errMsgPass.style.display = "block";
    errMsgPass.innerHTML = `Username characters must be bigger than 5`;
    psInpPro.style.borderColor = "red";
  } else {
    errMsgPass.style.display = "none";
    psInpPro.style.borderColor = "";
    conBoolObj.conBoolPs = true;
  }
}

usInpPro.addEventListener("keyup", () => {
  if (rexNameUnder_.test(usInpPro.value)) {
    errMsgName.style.display = "none";
    usInpPro.style.borderColor = "";
    usInpPro.value = usInpPro.value.replace(/\s/gi, "_");
  }
});
usInpPro.addEventListener("keyup", () => {
  usInpPro.value =
    usInpPro.value.charAt(0).toUpperCase() + usInpPro.value.slice(1);
});

function goodBoy(obj, event) {
  Array.from(Object.values(obj), (el) => {
    el === true ? "" : event.preventDefault();
  });
}

function addE(listener, event, fun) {
  listener.addEventListener(event, fun);
}

document.querySelector(".formPro").onsubmit = (e) => {
  goodBoy(conBoolObj, e);
  userNameValid();
  phoneNumValid();
  emailValid();
  passValid();
  addE(usInpPro, "blur", userNameValid);
  addE(phoneInp, "blur", phoneNumValid);
  addE(e_InpPro, "blur", emailValid);
  addE(psInpPro, "blur", passValid);
};

// for github
btn.addEventListener("click", () => {
  localStorage.clear();
});

// school menu
let sH = document.querySelectorAll(".sH");
let aboutS_btn = document.querySelector("#AboutSchoolBtn");
let videoS_btn = document.querySelector("#VideosSchoolBtn");
let EduS_btn = document.querySelector("#EducationSchoolBtn");
let aboutSchoolDiv = document.querySelector("#aboutSchoolDiv");
let videosSchoolDiv = document.querySelector("#videosSchoolDiv");
let topicSchoolDiv = document.querySelector("#topicSchoolDiv");
let privatePage = document.querySelector("#privatePage");
let downBtn = document.querySelector(".down");
let topicS_Btn = document.querySelector("#TopicSchoolBtn");

sH.forEach((el) => {
  el.addEventListener("click", (e) => {
    sH.forEach((el2) => {
      el2.classList.remove("active2");
    });
    e.currentTarget.classList.add("active2");
  });
});

function openAboutSchoolDiv() {
  videosSchoolDiv.style.display = "none";
  topicSchoolDiv.style.display = "none";
  privatePage.style.display = "none";
  aboutSchoolDiv.style.display = "block";
}
function openVideoSchoolDiv() {
  aboutSchoolDiv.style.display = "none";
  topicSchoolDiv.style.display = "none";
  privatePage.style.display = "none";
  videosSchoolDiv.style.display = "block";
}
function openTopicSchoolDiv() {
  aboutSchoolDiv.style.display = "none";
  videosSchoolDiv.style.display = "none";
  privatePage.style.display = "none";
  topicSchoolDiv.style.display = "block";
}

function openPrivateSchoolDiv() {
  aboutSchoolDiv.style.display = "none";
  videosSchoolDiv.style.display = "none";
  privatePage.style.display = "block";
  topicSchoolDiv.style.display = "none";
}

addE(aboutS_btn, "click", openAboutSchoolDiv);

addE(videoS_btn, "click", openVideoSchoolDiv);

addE(topicS_Btn, "click", openTopicSchoolDiv);

addE(EduS_btn, "click", openPrivateSchoolDiv);

downBtn.addEventListener("click", () => {
  let a = document.createElement("a");
  a.href = "../../Fady.com/img/img_avatar.png";
  a.download = "../../Fady.com/img/img_avatar.png";
  a.click();
});

// chatGPT Codes for more security videos future code
// get random text
function generateRandomText(length) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const numC = "123456789";
  for (let i = 0; i < length; i++) {
    result +=
      characters.charAt(Math.floor(Math.random() * characters.length)) +
      numC.charAt(Math.floor(Math.random() * numC.length));
  }
  cl(Math.floor(Math.random() * characters.length));
  return result;
}
const randomText = generateRandomText(5);

//  createTxt
let dataNow = new Date();
let birthday = new Date("Sep 17, 07");
let dateDiff = dataNow - birthday;
cl("####");
console.log(Math.floor(dateDiff / 1000 / 60 / 60 / 24 / 365));

let yearTxt = document.querySelector("#yearTxt");
yearTxt.innerHTML = new Date().getFullYear();

let chevronR = document.querySelector(".chevron");
let videoScDivs = document.querySelectorAll(".videoScDiv1");
chevronR.style.cursor = "pointer";
chevronR.onclick = () => {
  setTimeout(function () {
    videoScDivs[0].style.display = "none";
  }, 50);
  videoScDivs[3].style.display = "";
  videoScDivs[3].style.animation = "fade-in 0.7s ease";
  chevronR.style.display = "none";
};

function moveDiv() {
  let currentRight = parseInt(videoScDivs[0].style.right) || 0;
  for (let i = 0; i < videoScDivs.length; i++) {
    videoScDivs[i].style.right = currentRight + 10 + "px";
    videoScDivs[i].style.transition = "right 0.2s ease-in-out";
    document.body.style.overflowX = "hidden";
    setTimeout(function () {
      videoScDivs[i].remove();
    }, 9000);
  }
}

let logoPro = document.querySelector(".logo");
logoPro.textContent = `${n ? n.charAt(0).toUpperCase() : logoPro.remove()}`;

// Define your secret code here
const secretCode = "mySecretCode2";
let loadingCode = document.querySelector(".loadingCode");
let clashLockDiv = document.querySelector(".clashLockDiv");
let afterClashDiv = document.querySelector(".afterClashDiv");

// Define an obfuscation function
function obfuscateCode(code) {
  let obfuscated = "";
  for (let i = 0; i < code.length; i++) {
    obfuscated += String.fromCharCode(code.charCodeAt(i) + 1);
  }
  cl(obfuscated);
  return obfuscated;
}

// Obfuscate your secret code
const obfuscatedCode = obfuscateCode(secretCode);

// Use the obfuscated code in your program
const codeInp = document.getElementById("codeToCon");
codeInp.addEventListener("keyup", function () {
  if (codeInp.value === obfuscatedCode) {
    localStorage.setItem("blockDiv", "block");
    localStorage.setItem("noneDiv", "none");
    loadingCode.style.display = "block";
    clashLockDiv.style.display = "none";
    setTimeout(() => {
      loadingCode.style.display = "none";
      afterClashDiv.style.display = "block";
    }, 4000);
  } else {
    console.log("Incorrect code entered!");
  }
});

if (localStorage.getItem("noneDiv") && localStorage.getItem("blockDiv")) {
  clashLockDiv.style.display = localStorage.getItem("noneDiv");
  afterClashDiv.style.display = localStorage.getItem("blockDiv");
}

window.addEventListener("scroll", () => {
  setTimeout(() => {
    let introInterval;
    let introTxt = `search in google: What is hybrid vehicle ? `;
    let inpTxtIntro = document.querySelector("#inpTxtIntro");
    typewriterArea(introTxt, inpTxtIntro, 100, introInterval);
  }, 2000);

  setTimeout(() => {
    if (inpTxtIntro.value.includes("search")) {
      inpTxtIntro.style.color = "#240087";
    } else {
      cl("not");
    }
  }, 3000);
});

let getBtn = document.getElementById("getInp");
let gotDiv = document.querySelector(".gotSmartInputDiv");
const smartInp = document.querySelector("#smartInp");
let output = document.querySelector("#output");
let reComTxt = document.querySelector("#reComTxt");

getBtn.onclick = () => {
  closeAllPages();
  gotDiv.style.display = "block";
  smartInp.focus();
};

function smartInpOnkeyUp() {
  function normalColor() {
    smartInp.style.color = "rgb(0, 68, 255)";
  }

  function changeColorInp() {
    function underScore() {
      smartInp.value = smartInp.value.replace(/\s/gi, "_");
    }

    smartInp.value.includes("open") === true
      ? (smartInp.style.color = "red") +
        underScore() +
        (reComTxt.innerHTML = `
        <a>Home</a> <br> <a>Profile</a> <br> <a>School</a>
        `)
      : normalColor() + (reComTxt.innerHTML = "");
  }

  smartInp.value === "open_home" ? openHomePage() + cl("fady") : "";
  changeColorInp();
}

addE(smartInp, "keyup", smartInpOnkeyUp);

document.body.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  var contextMenu = document.querySelector("#context-menu");
  contextMenu.style.left = e.pageX + "px";
  contextMenu.style.top = e.pageY + "px";
  contextMenu.style.display = "block";
});

document.body.addEventListener("click", function () {
  var contextMenu = document.querySelector("#context-menu");
  contextMenu.style.display = "none";
});

window.addEventListener("scroll", function () {
  var contextMenu = document.querySelector("#context-menu");
  contextMenu.style.display = "none";
});

let circBtn = document.querySelector("#circBtn");
let apiDiv = document.querySelector(".apiDiv");
let quizDiv = document.querySelector(".quizAppDiv");
circBtn.onclick = () => {
  closeAllPages();
  removeHeader();
  apiDiv.style.display = "block";
};
// forEach
let highImg = document.querySelector(".shapeDiv");
let shapeT = document.querySelector(".shD2");
let loadCirc = document.querySelector(".loadCirc");
let fot = document.querySelector(".fot");

window.addEventListener("load", checkConnection);

function checkConnection() {
  var message = document.getElementById("message");

  if (navigator.onLine) {
    var connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    var effectiveType = connection.effectiveType;

    // Check the effectiveType value to determine the connection quality
    if (
      effectiveType === "slow-2g" ||
      effectiveType === "2g" ||
      effectiveType === "3g"
    ) {
      // User has a bad internet connection, hide the message by adding the 'hidden' class
      message.classList.remove("hidden");
      message.innerHTML = `<i class="fa-solid fa-signal"></i> Bad Connection`;
      message.style.background = "#ff5252";
    } else {
      message.classList.remove("hidden");
      message.innerHTML = `<i class="fa-solid fa-wifi"></i> You are online`;
      message.style.background = "green";
      setTimeout(() => {
        message.style.animation = "fade-out 1s forwards";
      }, 1000);
    }
  } else {
    // User is offline, hide the message by adding the 'hidden' class
    message.classList.remove("hidden");
    message.innerHTML = `<i class="fa-solid fa-globe"></i> You're offline`;
    message.style.background = "#ff5252";
    message.style.animation = "none";
    btn.classList.add("hidden");
  }
}

window.addEventListener("online", checkConnection);
window.addEventListener("offline", checkConnection);

// closeAllPages();
// apiDiv.style.display = "block";
// removeHeader();

function removeHeader() {
  header.classList.add("hidden");
}
