// import * as all from "../quizScript.js";

let categoryInp = document.querySelector("[name=category]");
let iconInp = document.querySelector("[name=icon]");
let linkInp = document.querySelector("[name=link]");
let ownerInp = document.querySelector("[name=owner]");
let subtn = document.querySelector("[type=submit]");
let form = document.querySelector("#form");
let err = document.querySelector(".errMsg");
let data;
let to;

let apiURL = "https://zqjgdgfntxqoybwghjiq.supabase.co";
let apiKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxamdkZ2ZudHhxb3lid2doamlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzkwMjg2MiwiZXhwIjoyMDAzNDc4ODYyfQ.sBVfZx_-GiRF8tJZqAZbVDXD9WhEL77oXAWtuzo3_n0";

const { createClient } = supabase;
supabase = createClient(apiURL, apiKEY);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let reg = /(https:\/\/)?\w+/gi;
  let adReg = /admin/gi;
  if (categoryInp.value.trim() == "") {
    showError("Category required!", categoryInp);
  } else if (linkInp.value.trim() == "") {
    showError("Please Enter API Link", linkInp);
  } else if (!reg.test(linkInp.value)) {
    showError("Api Link must be a valid link", linkInp);
  } else if (adReg.test(ownerInp.value)) {
    showError("Admin name not allowed!", ownerInp);
  } else {
    clearInps(categoryInp, linkInp, iconInp, ownerInp);
    removeError(categoryInp, linkInp);

    subtn.disabled = true;

    let submison = {
      data: {
        jsonFile: linkInp.value,
        category: categoryInp.value,
        icon: iconInp.value || "fa-regular fa-circle-question",
        owner: ownerInp.value || "User",
      },
    };

    setTimeout(async () => {
      try {
        await supabase.from("quiz").insert(submison);
      } catch (reason) {
        showError(
          "There was an Error while recieving data try again!",
          linkInp
        );
        console.log(reason);
        clearTimeout(to);
      }
    }, 1000);

    setTimeout(() => {
      location.href = "../quiz.html";
    }, 2000);
  }
});

function showError(msg, input) {
  err.style.border = "1px solid red";
  err.style.color = "red";
  err.classList.remove("hidden");
  err.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> ${msg}`;
  input.focus();
  input.style.border = "1px solid orangered";
}

function removeError(...inputs) {
  err.style.border = "1px solid green";
  err.style.color = "green";
  err.innerHTML = "Good! Let's Create your quiz";
  err.classList.remove("hidden");
  to = setTimeout(() => {
    err.classList.add("hidden");
  }, 2000);
  inputs.forEach((e) => (e.style.border = ""));
}

function clearInps(...inputs) {
  setTimeout(() => {
    inputs.forEach((e) => (e.value = ""));
  }, 1000);
}
