let bar = document.querySelector(".bar");
let menu = document.querySelector(".menu");
let btnScroll = document.querySelector(".btn-s");

bar.addEventListener("click", () => {
  menu.classList.toggle("open");
});

window.onscroll = () => {
  if (scrollY >= 600) {
    btnScroll.style.display = "block";
    btnScroll.style.animation = "fade-in 0.7s ease";
  } else {
    btnScroll.style.display = "none";
  }
};

btnScroll.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const { createClient } = supabase;
let data2;
let userName;
let apiURL = "https://zqjgdgfntxqoybwghjiq.supabase.co";
let apiKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxamdkZ2ZudHhxb3lid2doamlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzkwMjg2MiwiZXhwIjoyMDAzNDc4ODYyfQ.sBVfZx_-GiRF8tJZqAZbVDXD9WhEL77oXAWtuzo3_n0";

supabase = createClient(apiURL, apiKEY);

const form = document.querySelector("#emForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let submision = {};
  const formInput = form.querySelectorAll("input");

  formInput.forEach((el) => {
    const { name, value } = el;
    if (value) {
      submision[`${name}`] = value;
    }
  });
  localStorage.setItem("id", data2.data.length);
  const { data, error } = await supabase.from("us").insert([submision]);
});

let comDiv = document.querySelector(".commentDiv");
const comForm = document.querySelector("#commentForm");
let userNameCom;
let dataCom;
let comTime;
let hours;
let minutes;
let formattedTime;
let dateTime;
let commentC;
let realTime = new Date();
let realDate = `${realTime.getMonth() + 1} / ${realTime.getDate()}`;
let lastDate = `${realTime.getMonth() + 1} / ${realTime.getDate() - 1}`;

comForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  comTime = new Date();
  hours = comTime.getHours() - 12;
  minutes = comTime.getMinutes();
  date = `${comTime.getMonth() + 1} / ${comTime.getDate()}`;

  formattedTime = { time: `${hours + ":" + minutes}` };
  dateTime = { commentDate: `${date}` };

  let comFormInps = comForm.querySelectorAll("input");
  comDiv.innerHTML += `
  <div class="commentData">
      <div class="user-icon">
        <i class="fa-regular fa-circle-user user-icon"></i>
      </div>
    <div class="comment-content">
          <div class="username">${comFormInps[0].value}</div>
          <p>${comFormInps[1].value}</p>
          <p class="time"><i class="fa-regular fa-clock"></i> Today at ${formattedTime.time}</p>
        </div>
    </div>
`;

  let submision = {};
  let allSubmision;
  comFormInps.forEach((el) => {
    const { name, value } = el;
    if (value) {
      submision[name] = value;
      allSubmision = Object.assign({}, formattedTime, dateTime, submision);
    }
  });

  const { data, error } = await supabase.from("comment").insert([allSubmision]);
  console.log({ data, error });

  dataCom = (await supabase.from("comment").select("*")).data;

  comFormInps.forEach((e) => (e.value = ""));
});

async function fetchData() {
  dataCom = (await supabase.from("comment").select("*")).data;
  for (let obj of dataCom) {
    userNameCom = obj.username;
    commentC = obj.comment;
    comDiv.style.flexDirection = "column";
    if (obj.commentDate === realDate) {
      obj.commentDate = "Today";
    } else if (obj.commentDate === lastDate) {
      obj.commentDate = "Yesterday";
    } else {
      obj.commentDate = obj.commentDate;
    }

    comDiv.innerHTML += `
    <div class="commentData">
      <div class="user-icon">
        <i class="fa-regular fa-circle-user user-icon"></i>
      </div>
    <div class="comment-content">
          <div class="username">${userNameCom}</div>
          <p>${commentC}</p>
          <p class="time">
          <i class="fa-regular fa-clock"></i> 
          ${obj.commentDate} at ${obj.time}
          </p>
        </div>
    </div>
  `;
  }
}

fetchData();
