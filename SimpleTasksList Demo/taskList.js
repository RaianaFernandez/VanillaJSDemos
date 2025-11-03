let taskCounter = 1;
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const addTaskBtn = document.querySelector("#add-task-btn");

addTaskBtn.addEventListener("click", () => {
  //create constants and variables
  const newTask = document.createElement("li");
  const taskNumber = document.createElement("strong");
  const taskContent = document.createElement("p");
  const actionContent = document.createElement("div");
  const taskChecker = document.createElement("input");
  const deleteTask = document.createElement("button");
  let taskText = taskInput.value;

  //input content verification
  if (taskText == "") {
    alert("Please, fill in the Task field");
  } else {
    //determine attributes
    taskChecker.type = "checkbox";
    newTask.id = "task-" + taskCounter;

    //insert text and contents
    deleteTask.textContent = "🗑";
    taskNumber.textContent = `${taskCounter} - `;
    taskContent.append(taskNumber, taskText);
    actionContent.append(taskChecker, deleteTask);
    newTask.append(taskContent, actionContent);
    taskList.append(newTask);

    //clear input fields and increment taskCounter
    taskInput.value = "";
    taskCounter++;

    //create checkbox action
    taskChecker.addEventListener("change", (e) => {
      const taskToChange = e.target.closest("li");
      taskToChange.classList.toggle("completed-task");
    });

    //create the deleteButton action
    deleteTask.addEventListener("click", (e) => {
      const taskToRemove = e.target.closest("li");
      taskToRemove.remove();
    });
  }
});
