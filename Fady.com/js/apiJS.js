let videoUrlInp = document.getElementById("video-url");
function getVideoInfo() {
  let titleY = document.querySelector("#titleOfYT");
  let ytImg = document.querySelector(".ytImg2");
  let videoUrl = document.getElementById("video-url").value;
  let linkOfY = document.querySelector("#linkOfY");
  let apiUrl =
    "https://www.youtube.com/oembed?url=" +
    encodeURIComponent(videoUrl) +
    "&format=json";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let title = data.title;
      let thumbnailUrl = data.thumbnail_url;
      let videoInfo = '<img src="' + thumbnailUrl + '" class="ytImg">';

      titleY.innerHTML = `${title}`;

      linkOfY.innerHTML = `<a style="font-size: 18px;padding:12px;background:#cacaca;" class="bg-d8" target="_blank" href="${videoUrl}">Watch Video</a>`;
      ytImg.innerHTML = videoInfo;
    });
  if (videoUrl === "") {
    ytImg.innerHTML = `<div class="ytImg"></div>`;
    titleY.innerHTML = `Title`;
    linkOfY.innerHTML = `<a style="font-size: 18px;padding:12px;" class="bg-d8">Youtube URL</a>`;
  }
}
videoUrlInp.onblur = getVideoInfo;

let msg2 = document.querySelector("#message2");
// let xml = new XMLHttpRequest();
// xml.open("GET", "https://api.github.com/users/fady2007/repos", true);
// xml.send();
// console.log(xml);

function checkApi(apiReq) {
  apiReq.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      msg2.classList.remove("hidden");
      msg2.innerHTML = "No errors with your API";
      msg2.style.background = "#3b3b3b";
      let jsData = JSON.parse(this.responseText);
      console.log(jsData);
      function loopData() {
        for (let i = 0; i < jsData.length; i++) {
          let div = document.createElement("div");
          let repoName = document.createTextNode(jsData[i].full_name);
          div.appendChild(repoName);
          document.body.appendChild(div);
        }
      }
    } else if (this.status == 404) {
      msg2.classList.remove("hidden");
      msg2.innerHTML = `API Not found "StatusCode: ${this.status}"`;
      msg2.style.background = "#ff5252";
    } else {
      msg2.classList.remove("hidden");
      msg2.innerHTML = "There was an error in your api URL";
      msg2.style.background = "#ff5252";
    }
  };
}

// let myPr = new Promise((resolve, reject) => {
//   let connect = true;
//   if (connect) {
//     resolve("Connection Successfull");
//   } else {
//     reject(Error("Connection Failed"));
//   }
// });

// myPr.then(
//   (resoVal) => {
//     console.log(resoVal);
//   },
//   (rejVal) => {
//     console.log(rejVal);
//   }
// );

// fetch
// fetch("https://api.github.com/users/fady2007/repos")
//   .then((result) => {
//     console.log(result);
//     const myData = result.json();
//     return myData;
//   })
//   .then((full) => {
//     full.length = 2;
//     return full;
//   })
//   .then((data) => {
//     console.log(data[0].name);
//   })
//   .catch((rej) => {
//     console.log(Error(rej));
//   });

// // Promise
// const getData = (apiLink) => {
//   return new Promise((resolve, reject) => {
//     let apiReq = new XMLHttpRequest();
//     apiReq.onload = function () {
//       if (this.readyState === 4 && this.status === 200) {
//         resolve(JSON.parse(this.responseText));
//       } else {
//         reject(Error("API Error"));
//       }
//     };

//     apiReq.open("GET", apiLink, true);
//     apiReq.send();
//   });
// };
// getData("https://api.github.com/users/fady2007/repos")
//   .then((res) => {
//     res.length = 2;
//     return res;
//   })
//   .then((res) => {
//     console.log(res[0].name);
//   })
//   .catch((rej) => console.log(rej))
//   .finally(console.log("done"));

// let prom1 = new Promise((res, rej) => {
//   setTimeout(() => {
//     res("Iam prom1");
//   }, 1000);
// });

// let prom2 = new Promise((res, rej) => {
//   setTimeout(() => {
//     res("Iam prom2");
//   }, 2000);
// });

// let prom3 = new Promise((res, rej) => {
//   setTimeout(() => {
//     res("Iam prom3");
//   }, 3000);
// });

// Promise.allSettled([prom1, prom2, prom3]).then(
//   (resVal) => {
//     console.log(resVal);
//   },
//   (rejVal) => {
//     console.log(rejVal);
//   }
// );

async function fetchData() {
  console.log("Before Fetch");
  try {
    let myData = await fetch(
      "https://api.github.com/users/elzerowebschool/repos"
    );
    let full_name = await myData.json();
    console.log(full_name[0]["full_name"].slice(0, -5));
  } catch (reason) {
    console.log(`Reason: ${reason}`);
  } finally {
    console.log("After Fetch");
  }
}

fetchData();

// let div = document.createElement("div");
// let h1 = document.createElement("h1");
// let txInH = document.createTextNode(`${questionData}`);
// h1.appendChild(txInH);
// div.appendChild(h1);
// document.body.appendChild(div);

fetch("../../html_questions.json")
  .then((resp) => resp.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const ti = data[i].title;
      const an1 = data[i].answer_1;
      const an2 = data[i].answer_2;
      const an3 = data[i].answer_3;
      const an4 = data[i].answer_4;
      const rightAn = data[i].right_answer;

      let div = document.createElement("div");
      let h1 = document.createElement("h1");
      let txInH = document.createTextNode(`${ti} ?`);
      let button1 = document.createElement("button");
      let txInL1 = document.createTextNode(`${an1}`);
      let button2 = document.createElement("button");
      let txInL2 = document.createTextNode(`${an2}`);
      let button3 = document.createElement("button");
      let txInL3 = document.createTextNode(`${an3}`);
      let button4 = document.createElement("button");
      let txInL4 = document.createTextNode(`${an4}`);

      button1.className = "Qu buttonBl";
      button2.className = "Qu buttonBl";
      button3.className = "Qu buttonBl";
      button4.className = "Qu buttonBl";

      button1.addEventListener("click", (e) => {
        checkAnswer(e);
      });
      button2.addEventListener("click", (e) => {
        checkAnswer(e);
      });
      button3.addEventListener("click", (e) => {
        checkAnswer(e);
      });
      button4.addEventListener("click", (e) => {
        checkAnswer(e);
      });

      function checkAnswer(e) {
        if (e.target.innerText == rightAn) {
          console.log("correct");
        } else {
          {
            console.log("wrong");
          }
        }
      }

      h1.appendChild(txInH);
      button1.appendChild(txInL1);
      button2.appendChild(txInL2);
      button3.appendChild(txInL3);
      button4.appendChild(txInL4);
      div.appendChild(h1);
      div.appendChild(button1);
      div.appendChild(button2);
      div.appendChild(button3);
      div.appendChild(button4);
      quizDiv.appendChild(div);
      apiDiv.appendChild(quizDiv);
    }
    let qu = document.querySelectorAll(".Qu");
    qu.forEach((el) => {
      el.addEventListener("click", (e) => {
        qu.forEach((el2) => {
          el2.classList.remove("select");
        });
        e.currentTarget.classList.add("select");
      });
    });
  });
