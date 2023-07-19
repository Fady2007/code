// import * as all from "../quizScript.js";

let categoryInp = document.querySelector("[name=category]");
let iconInp = document.querySelector("[name=icon]");
let linkInp = document.querySelector("[name=link]");
let ownerInp = document.querySelector("[name=owner]");
let subtn = document.querySelector("[type=submit]");
let form = document.querySelector("#form");
let ico = document.querySelector("#showIcon");
let checkInp = document.querySelector(".flex .cntr #cbx");
let flinkInp = document.querySelector("[name=flink]");
let copyi = document.querySelector("#copyi");
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
  } else if ((await fetch(linkInp.value)).status === 404) {
    showError(
      `Quiz is not found ${(await fetch(linkInp.value)).status}`,
      linkInp
    );
  } else {
    clearInps(600, categoryInp, linkInp, iconInp, ownerInp);
    removeError(categoryInp, linkInp);

    subtn.disabled = true;

    let submison = {
      data: {
        jsonFile: linkInp.value,
        category: categoryInp.value.toLowerCase(),
        icon: iconInp.value || "fa-regular fa-circle-question",
        owner: ownerInp.value || "User",
        flink: flinkInp.value.slice(flinkInp.value.length - 7) || "",
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
      location.href = "../";
    }, 2000);
  }
});

iconInp.addEventListener("keyup", () => {
  ico.innerHTML = `<i class="${iconInp.value} iconIs"></i>`;
});

checkInp.onchange = () => {
  if (checkInp.checked) {
    generateLink(flinkInp, "https://fady2007.github.io/code/quizApp/#");
    document.querySelector("#des").style.color = "#287eff";
  } else {
    clearInps(0, flinkInp);
    document.querySelector("#des").style.color = "";
  }
};

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
  err.innerHTML = `<i class="${
    iconInp.value.trim() == "" ? "fa-regular fa-circle-question" : iconInp.value
  }"></i> Good! Let's Create your quiz`;
  err.classList.remove("hidden");
  to = setTimeout(() => {
    err.classList.add("hidden");
  }, 2000);
  inputs.forEach((e) => (e.style.border = ""));
}

function clearInps(t, ...inputs) {
  setTimeout(() => {
    inputs.forEach((e) => (e.value = ""));
  }, t);
}

function generateLink(inp, str = "") {
  let abc = "a2bcdefghijk9lmnopq5rstu3vwxyz0123456789";
  let randomL = "";
  for (let i = 0; i < 7; i++) {
    randomL += abc[Math.floor(Math.random() * abc.length)];
    inp.value = str + randomL;
  }
}

function copyText(btn, inp) {
  btn.addEventListener("click", function () {
    let copied;
    copied = navigator.clipboard.writeText(inp.value);
    if (copied) {
      btn.innerHTML = `<i class="fa-solid fa-check iconIs fade-in pointerEv"></i>`;
      setTimeout(() => {
        btn.innerHTML = `<i class="fa-solid fa-copy iconIs fade-in pointer"></i>`;
      }, 2000);
    } else {
      alert("There was an error");
    }
  });
}

linkInp.onblur = async () => {
  if ((await (await fetch(linkInp.value)).json())[0]["title"]) {
    console.log("ok");
  }
};

copyText(copyi, flinkInp);
