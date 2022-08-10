let myName = document.querySelector(`#name`);
let myAddress = document.querySelector(`#address`);
let myEmail = document.querySelector(`#email`);
let btn = document.querySelector(".btn");

let result = document.querySelector(".result");

let tasks = JSON.parse(localStorage.getItem("task")) || [];

//////add cards from local storage
if (tasks) {
  for (i = 0; i < tasks.length; i++) {
    addtask(tasks[i].name, tasks[i].address, tasks[i].email, i);
  }
}

////////////////add cards in local storage and page
btn.addEventListener("click", function () {
  if (myName.value && myAddress.value && myEmail.value) {
    tasks.push({
      name: myName.value,
      address: myAddress.value,
      email: myEmail.value,
    });

    addtask(myName.value, myAddress.value, myEmail.value, tasks.length - 1);
    localStorage.setItem("task", JSON.stringify(tasks));
  }
  (myName.value = ""), (myAddress.value = ""), (myEmail.value = "");
});

//////////to adding card
function addtask(name, address, email, num) {
  ///////////////////////////////////////////////////////////make a div contaner
  let DIv = document.createElement("div");
  DIv.classList.add("task");
  result.append(DIv);

  //make a name to apepended to div
  let divTwo = document.createElement("div");
  DIv.append(divTwo);
  divTwo.textContent = name;
  divTwo.className = "data";
  divTwo.setAttribute(`data-name`, name);

  //make a address to apepended to div
  let divThree = document.createElement("div");
  DIv.append(divThree);
  divThree.textContent = address;
  divThree.className = "data";
  divThree.setAttribute(`data-address`, address);

  //make a email to apepended to div
  let divfour = document.createElement("div");
  DIv.append(divfour);
  divfour.textContent = email;
  divfour.className = "data";
  divfour.setAttribute(`data-email`, email);

  //make a btn to apepended to div
  let divfive = document.createElement("div");
  divfive.className = "btn-contain";

  let btnDelete = document.createElement("button");
  btnDelete.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  btnDelete.setAttribute("data-num", num);
  btnDelete.className = "btn-delete";

  let btnEdite = document.createElement("button");
  btnEdite.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  btnEdite.className = "btn-edite";

  let btn = document.createElement("button");
  btn.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
  btn.setAttribute("data-num", num);
  btn.className = "btn-finish";
  divfive.append(btnDelete);
  divfive.append(btnEdite);
  divfive.append(btn);
  DIv.append(divfive);

  /////////////////////////////////////////////////////////////////////////////////////////////////

  ///BTN TO DELETE ELEMENT
}

let btnDelete = document.querySelectorAll(".btn-delete");

btnDelete.forEach((el) =>
  el.addEventListener("click", function () {
    let elem = this;

    //remove from page
    this.parentElement.parentElement.classList.add("task-delete");
    let timer = setInterval(
      function () {
        elem.parentElement.parentElement.remove();
        clearInterval(timer);
      },
      550,
      elem
    );

    let num = this.dataset.num;
    ///remove from local storage
    console.log(tasks.splice(num, 1));
    localStorage.setItem("task", JSON.stringify(tasks));
  })
);
/////BTN TO EDITE
let btnEdite = document.querySelectorAll(".btn-edite");

btnEdite.forEach(function (el) {
  el.addEventListener("click", function () {
    this.style.display = "none";
    this.parentElement.children[2].style.display = "block";
    this.parentElement.className = "btn-change";

    for (let i = 0; i < 3; i++) {
      this.parentElement.parentElement.children[i].setAttribute(
        "contenteditable",
        "true"
      );
    }
  });
});

///////btn to finish
let btnFinish = document.querySelectorAll(".btn-finish");

btnFinish.forEach(function (el) {
  el.addEventListener("click", function () {
    this.style.display = "none";
    this.parentElement.children[1].style.display = "block";
    this.parentElement.className = "btn-contain";
    for (let i = 0; i < 3; i++) {
      this.parentElement.parentElement.children[i].removeAttribute(
        "contenteditable"
      );
    }

    let num = this.dataset.num;
    let name = this.parentElement.parentElement.children[0].textContent;
    let address = this.parentElement.parentElement.children[1].textContent;
    let email = this.parentElement.parentElement.children[2].textContent;

    tasks[+num].name = name;
    tasks[+num].address = address;
    tasks[+num].email = email;
    localStorage.setItem("task", JSON.stringify(tasks));
  });
});
