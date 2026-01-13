lucide.createIcons();

const pendingTask = [];
const completedTask = [];
const navDate = document.querySelector(".date-container");
const navDateTime = navDate.querySelector("time");
const navDateIcon = navDate.querySelector("svg");
const greetingEl = document.querySelector(".greetings-container");
const greetingHeading = greetingEl.querySelector("h1");
const greetingTaskCount = greetingEl.querySelector("span");
const addTaskInput = document.getElementById("task-input");
const addTaskForm = document.querySelector(".add-task-form");
const penTaskWrapper = document.querySelector(".pending-task");
const pendTaskCont = penTaskWrapper.querySelector(".task-list");
const pendTaskCount = penTaskWrapper.querySelector(".task-count");
const compTaskWrapper = document.querySelector(".completed-task");
const compTaskCount = compTaskWrapper.querySelector(".task-count");
const compTaskCont = compTaskWrapper.querySelector(".task-list");
const filterBtns = document.querySelectorAll(".filterbtns button");

const now = new Date();
let taskID = 1;

function setNavDate(hour = now.getHours()) {
  const dayName = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  navDateTime.textContent = dayName;
  const isNight = hour >= 18 || hour < 6;
  navDateIcon.setAttribute("data-lucide", isNight ? "moon" : "sun-medium");
  lucide.createIcons();
}

function getGreeting(hour = now.getHours()) {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Sleep Time";
}

function taskCounter(taskArr) {
  return taskArr.length;
}

function setCount() {
  greetingTaskCount.textContent = taskCounter(pendingTask);
  pendTaskCount.innerHTML = `${taskCounter(pendingTask)} Tasks`;
  compTaskCount.innerHTML = `${taskCounter(completedTask)} Tasks`;
}

function updateUI() {
  compTaskCont.innerHTML = rndrTask(completedTask);
  pendTaskCont.innerHTML = rndrTask(pendingTask);
  lucide.createIcons();
  setLocal();
}

function addTask(e) {
  e.preventDefault();
  const taskText = addTaskInput.value;
  const taskDate = now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  let isCompleted = false;
  pendingTask.push({ taskID, taskText, taskDate, isCompleted });
  this.reset();
  taskID++;
  setCount();
  updateUI();
}

function checkTask(e, listPend, listComp) {
  const chkBox = e.target;
  const task = chkBox.closest(".task");
  const dltID = Number(task.dataset.id);
  let idx = listPend.findIndex((item) => item.taskID === dltID);
  if (idx === -1) {
    idx = listComp.findIndex((item) => item.taskID === dltID);
    if (idx === -1) return;
    const ele = listComp[idx];
    ele.isCompleted = false;
    listPend.push(ele);
    listComp.splice(idx, 1);
    updateUI();
    setCount();
  } else {
    const ele = listPend[idx];
    ele.isCompleted = true;
    listComp.push(ele);
    listPend.splice(idx, 1);
    updateUI();
    setCount();
  }
}

function deleteTask(e, list) {
  const dltBtn = e.target.closest(".task-deletebtn");
  if (!dltBtn) return;
  const task = dltBtn.closest(".task");
  const dltID = Number(task.dataset.id);
  const dltIdx = list.findIndex((task) => task.taskID === dltID);
  if (dltIdx !== -1) {
    list.splice(dltIdx, 1);
    updateUI();
    setCount();
  }
}

function handlePendingTask(e) {
  if (e.target.closest(".task-deletebtn")) {
    deleteTask(e, pendingTask);
  }
  if (e.target.matches('input[type="checkbox"]')) {
    checkTask(e, pendingTask, completedTask);
  }
}

function handleCompletedTask(e) {
  if (e.target.closest(".task-deletebtn")) {
    deleteTask(e, completedTask);
  }
  if (e.target.matches('input[type="checkbox"]')) {
    checkTask(e, pendingTask, completedTask);
  }
}

function rndrTask(arr) {
  const tempArr = [];
  let temp = null;
  arr.forEach((task) => {
    const id = task.taskID;
    const text = task.taskText;
    const tskdate = task.taskDate;
    const isComplete = task.isCompleted;
    temp = `<li class="task card ${
      isComplete ? "completed" : ""
    }" data-id=${id}>
            <input type="checkbox" />
            <label>
              <div class="task-content">
                <span class="task-text">${text}</span>
                <time class="task-time"><i data-lucide="calendar-days"></i>${tskdate}</time>
              </div>
            </label>
            <button class="task-deletebtn">
              <i data-lucide="trash-2"></i>
            </button>
          </li>`;
    tempArr.push(temp);
  });
  return tempArr.join("");
}

function filterBtnActive(clckedBtn) {
  filterBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  clckedBtn.classList.add("active");
}

function handleFilter(e) {
  if (!e.target.closest(".btn-style")) return;
  const clckedBtn = e.target;
  const btnFltr = e.target.dataset.filter;
  filterBtnActive(clckedBtn);
  compTaskWrapper.classList.toggle("hidden", btnFltr === "pending");
  penTaskWrapper.classList.toggle("hidden", btnFltr === "completed");
  updateUI();
  setCount();
}

function setLocal() {
  localStorage.setItem("pendTask", JSON.stringify(pendingTask));
  localStorage.setItem("compTask", JSON.stringify(completedTask));
  localStorage.setItem("currTaskID", JSON.stringify(taskID));
}

function getLocal() {
  const pendItems = JSON.parse(localStorage.getItem("pendTask")) || [];
  const compItems = JSON.parse(localStorage.getItem("compTask")) || [];
  const itemID = Number(localStorage.getItem("currTaskID")) || 1;
  pendItems.forEach((item) => {
    pendingTask.push(item);
  });
  compItems.forEach((item) => {
    completedTask.push(item);
  });
  taskID = itemID;
}
//init
setNavDate();
greetingHeading.textContent = `${getGreeting()}! ✨`;
getLocal();
setCount();
updateUI();
addTaskForm.addEventListener("submit", addTask);
pendTaskCont.addEventListener("click", (e) => {
  handlePendingTask(e);
});
compTaskCont.addEventListener("click", (e) => {
  handleCompletedTask(e);
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", handleFilter);
});
