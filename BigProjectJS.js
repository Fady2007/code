function test() {
  document.body.innerHTML += "ok";
}
let header = document.querySelector("header");

window.onscroll = () => {
  scrollFunction();
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
let questionsDiv = document.querySelector(".Topics");
let questions = ["Javascript", "Church", "School"];
let questionH1 = document.querySelectorAll(".Topic");
for (let i = 0; i < questionH1.length; i++) {
  questionH1[i].textContent = questions[i];
}

let emailIcon = document.querySelector(".email");
let loading = document.querySelector(".loading");
function hideLoading() {
  loading.style.display = "none";
}
emailIcon.addEventListener("click", () => {
  loading.style.display = "block";
  setTimeout(hideLoading, 2000);
});
let allSite = document.getElementById("allSite");
function appearMenu() {
  let moMenu = document.querySelector(".mobileMenu");
  moMenu.classList.toggle("appear");
  allSite.addEventListener("click", () => {
    moMenu.classList.add("hidden");
    moMenu.classList.remove("appear");
  });
}
