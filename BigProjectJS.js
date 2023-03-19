// Test function
function test() {
  document.body.innerHTML += "ok";
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
function appearMenu() {
  let moMenu = document.querySelector(".mobileMenu");
  moMenu.classList.toggle("appear");
  allSite.addEventListener("click", () => {
    moMenu.classList.add("hidden");
    moMenu.classList.remove("appear");
  });
}
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
function openNotaPage() {
  allSite.style.display = "none";
  notes.style.display = "block";
  inpName.focus();
}
function openHomePage() {
  allSite.style.display = "block";
  notes.style.display = "none";
}

let inpName = document.querySelector("input[name='Name']");
let inpTitle = document.querySelector("input[name='Title']");
let con = document.querySelector(".buttonB");
let divProj = document.querySelector(".notaProject");
// onblur inputs it will save values
inpName.onblur = function () {
  localStorage.setItem("nameBlur", inpName.value);
};
inpTitle.onblur = function () {
  localStorage.setItem("titleBlur", inpTitle.value);
};
// if there is a name or title value it'll save
if (
  localStorage.getItem("nameBlur") ||
  (localStorage.getItem("titleBlur") &&
    inpName.value !== "" &&
    inpTitle.value !== "")
) {
  inpName.value = localStorage.nameBlur;
  inpTitle.value = localStorage.titleBlur;
}

// set variables
let loadingForm = document.querySelector(".loadingForm");
let form = document.getElementById("form");
let dataOfDiv = [];

con.onclick = () => {
  if (inpName.value !== "" && inpTitle.value !== "") {
    // it'll display equal none forever
    localStorage.setItem("displayDiv", "none");
    form.style.display = "none";
    loadingForm.style.display = "flex";
    setTimeout(afterCon, 1000);
  } else {
    return;
  }
};
// after clicking continue
function afterCon() {
  // loading is none
  loadingForm.style.display = "none";
  // create Elements in divProj
  let welH1 = document.createElement("h1");
  let titleValue = document.createElement("h1");
  welH1.style.cssText = `
  border: 1px solid black;
  padding: 10px;
  text-align: center;
  `;
  titleValue.style.cssText = `
  margin-top: 50px;
  `;
  // save h1 texts by input'
  welH1.innerHTML = `Welcome ${localStorage.nameBlur},`;
  titleValue.innerHTML = `Title: ${localStorage.titleBlur}`;
  // appending
  divProj.appendChild(welH1);
  divProj.appendChild(titleValue);
  // push div with outerHTML in dataOfDiv
  dataOfDiv.push(divProj.outerHTML);
  localStorage.setItem("divProj", JSON.stringify(dataOfDiv));
}
// if displayDiv are exist in localStorage or user clicked continue
if (localStorage.getItem("displayDiv")) {
  form.style.display = localStorage.getItem("displayDiv");
  // dataOfDiv equal divProj that saved by JSON.stringify
  dataOfDiv = JSON.parse(localStorage.getItem("divProj"));
  divProj.innerHTML = dataOfDiv;
}
