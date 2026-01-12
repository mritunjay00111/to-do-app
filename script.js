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
const pendTaskCont = document.querySelector(".pending-task .task-list");
const compTaskCont = document.querySelector(".completed-task .task-list");
const pendTaskCount = document.querySelector(".pending-task .task-count");
const compTaskCount = document.querySelector(".completed-task .task-count");

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
  pendTaskCont.innerHTML = rndrTask(pendingTask);
  compTaskCont.innerHTML = rndrTask(completedTask);
  lucide.createIcons();
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
                <span class="tast-text">${text}</span>
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

setNavDate();
greetingHeading.textContent = `${getGreeting()}! ✨`;
setCount();
updateUI();

addTaskForm.addEventListener("submit", addTask);
pendTaskCont.addEventListener("click", (e) => {
  handlePendingTask(e);
});
compTaskCont.addEventListener("click", (e) => {
  handleCompletedTask(e);
});
