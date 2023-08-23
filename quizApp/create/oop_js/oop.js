export default class Quiz {
  static count = 0;

  constructor() {
    this.arr = [];
    Quiz.count++;
  }

  inloadDots_todiv(div) {
    let load = document.createElement("div");
    load.classList.add("loadDiv");

    load.style.display = "flex";
    load.innerHTML = `
      <div></div>
      <div class="wait3"></div>
      <div class="wait6"></div>
      `;
    div.append(load);
  }

  // name of methods
  info() {
    const proto = Object.getPrototypeOf(this);
    const methodNames = Object.getOwnPropertyNames(proto);
    for (const name of methodNames) {
      if (typeof proto[name] === "function") {
        this.arr.push(name);
      }
    }
    return this.arr.slice(1);
  }

  // SelectInpOnfocus
  selectInpsOnfocus(arrInps) {
    arrInps.forEach((inp) => {
      inp.onfocus = () => {
        inp.select();
      };
    });
  }

  // alert to do operation
  showAlert(
    alertDiv,
    sureBtn,
    doSomething,
    cancelBtn,
    valueContent = "Do you really want to do this operation ?",
    fadeInClass = "fade-in",
    fadeOutClass = "fade-out"
  ) {
    alertDiv.style.display = "flex";
    alertDiv.classList.add(fadeInClass);
    alertDiv.classList.remove(fadeOutClass);
    cancelBtn.onclick = () => {
      fadetohid(alertDiv);
      alertDiv.classList.remove(fadeInClass);
    };
    sureBtn.addEventListener("click", doSomething);
    document.querySelector("#alertReason").textContent = valueContent;
  }

  numOfQuizes() {
    return Quiz.count;
  }
}
