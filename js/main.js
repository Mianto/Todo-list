
const tasks = document.querySelector('#task');
const display = document.querySelector('#alltask');
const number = document.querySelector('.number');
const complete = document.querySelector('#completed');
const all = document.querySelector('#all');
const incomplete = document.querySelector('#incomplete');


const completedTasks = [];
const allTasks = [];
const incompleteTasks = [];
let actualDisplay = "";

function taskHandler(e) {
  if (e.keyCode == 13) {
    if (tasks.value != "") {
      const taskAdded = tasks.value;
      tasks.value = "";
      display.innerHTML += `
        <div class="difftask">
          <input type="checkbox" class="checktask">
            <span> ${taskAdded}</span>
        </div>`;
      incompleteTasks.push(taskAdded);
      allTasks.push(taskAdded);
      number.innerHTML = allTasks.length - completedTasks.length;
    }
  }
}

function handleCheck(e) {
  if(e.target && e.target.className == "checktask"){
    if(e.target.checked) {
      const valueFrom = e.target.nextElementSibling.innerHTML;
      completedTasks.push(valueFrom);
      e.target.nextElementSibling.classList.add('disabled');
      let completedIndex = incompleteTasks.indexOf(valueFrom);
      incompleteTasks.splice(completedIndex, 1);
      number.innerHTML = incompleteTasks.length;
    }
  }
}

function clickOnComplete() {
  tasks.disabled = true;
  incomplete.classList.remove('active');
  all.classList.remove('active');
  this.classList.add('active');
  if (actualDisplay == "")
    actualDisplay = display.innerHTML;
  display.innerHTML = "";
  completedTasks.forEach(task => {
    display.innerHTML += `
    <div class="difftask">
        <span> ${task}</span>
    </div>`;
  });
  document.querySelector('#number').innerHTML = `${completedTasks.length} tasks completed`;
}

function clickOnIncomplete() {
  tasks.disabled = true;
  complete.classList.remove('active');
  all.classList.remove('active');
  this.classList.add('active');
  if (actualDisplay == "")
    actualDisplay = display.innerHTML;
  display.innerHTML = "";
  incompleteTasks.forEach(task => {
    display.innerHTML += `
    <div class="difftask">
        <span> ${task}</span>
    </div>`;
  });
  document.querySelector('#number').innerHTML = `${incompleteTasks.length} tasks left`;
}

function clickOnAll() {
  tasks.disabled = false;
  complete.classList.remove('active');
  incomplete.classList.remove('active');
  this.classList.add('active');
  display.innerHTML = actualDisplay;
  document.querySelector('#number').innerHTML = `${incompleteTasks.length} tasks left`;
}




tasks.addEventListener('keydown', taskHandler);
document.addEventListener('click', handleCheck);
complete.addEventListener('click', clickOnComplete);
incomplete.addEventListener('click', clickOnIncomplete);
all.addEventListener('click', clickOnAll);
