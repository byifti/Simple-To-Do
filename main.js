let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let todoWindow = document.getElementById("todoWindow");
let doneWindow = document.getElementById("doneWindow");
let leftCountText = document.getElementById("leftCountText");
let doneCountText = document.getElementById("doneCountText");
let leftTask;
let doneTask;
let id = 0;
let allTasks = [];

class Task
{
   constructor(label, id, isChecked=false)
   {
      this.label = label,
      this.id = id,
      this.isChecked = isChecked
   }
}

taskInput.addEventListener("keydown", handleEnter)
function handleEnter(event)
{
   if(event.key === "Enter")
   {
      event.preventDefault()
      createTask()
   }
} // so user can press enter to enter a task

addTaskBtn.addEventListener("click", createTask)

function createTask()
{
   let label = taskInput.value.trim();
   if (label == false)
   {
      warnText.textContent = "You cannot add an empty Task"
      return;
   }
   else 
   {
      warnText.textContent = '';
   }

   id += 1;

   let newTask = new Task(label, id)
   allTasks.push(newTask)

   countLeftTasks()
   renderTask(newTask);

   // console.log(allTasks);
}

function countLeftTasks() 
{

   let uncheckedTask = allTasks.filter(task => task.isChecked === false);
   leftTask = uncheckedTask.length;
   // console.log(`There are ${uncheckedTask.length} unchecked tasks`)
   
}

function countDoneTasks() 
{

   let checkedTask = allTasks.filter(task => task.isChecked === true);
   doneTask = checkedTask.length;
   // console.log(`There are ${checkedTask.length} checked tasks`)
   
}

function renderTask(taskObject) 
{

   taskInput.value = "";

   let taskContainer = document.createElement(`div`)
   taskContainer.setAttribute(`class`, `taskContainer`)

   let newCheckbox = document.createElement(`input`);
   newCheckbox.setAttribute(`type`, `checkbox`);
   newCheckbox.setAttribute(`id`, `${taskObject.id}`);

   let newLabel = document.createElement(`label`);
   newLabel.setAttribute(`for`, `${taskObject.id}`);
   newLabel.textContent = taskObject.label;

   let deleteBtn = document.createElement(`button`);
   deleteBtn.setAttribute(`class`, `deleteButton`)
   deleteBtn.textContent = `Delete`;

   taskContainer.append(newCheckbox)
   taskContainer.append(newLabel)
   taskContainer.append(deleteBtn)
   todoWindow.append(taskContainer)

   leftCountText.textContent = `(${leftTask})`;

   newCheckbox.onclick = function()
   {
      if(taskObject.isChecked === false)
      {
         taskObject.isChecked = newCheckbox.checked; // makes it true, since .checked will return true
         newLabel.style.textDecoration = "line-through";
         doneWindow.append(taskContainer);
         countDoneTasks()
         countLeftTasks()
         leftCountText.textContent = `(${leftTask})`;
         doneCountText.textContent = `(${doneTask})`;
         // console.log(`The #${taskObject.id} checkbox is ${taskObject.isChecked}`)
         //console.log(allTasks)
      }
      else
      {
         taskObject.isChecked = newCheckbox.checked;
         newLabel.style.textDecoration = "none";
         todoWindow.append(taskContainer)
         countDoneTasks()
         countLeftTasks()
         leftCountText.textContent = `(${leftTask})`;
         doneCountText.textContent = `(${doneTask})`;
         // console.log(`The #${taskObject.id} checkbox is ${taskObject.isChecked}`)
         // console.log(allTasks)
      }
   };

   deleteBtn.addEventListener("click", deleteAnimation)

   function deleteAnimation()
   {
      taskContainer.setAttribute("class", "deleteTaskContainer")
      taskContainer.addEventListener("animationend", deleteTask)
      //console.log("deleteAnimation ran");

      function deleteTask()
      {
         // console.log("animation ended");
         let indexOfTask = allTasks.indexOf(taskObject);
         allTasks.splice(indexOfTask, 1)
         // console.log(allTasks)
         taskContainer.remove()
         countDoneTasks()
         countLeftTasks()
         leftCountText.textContent = `(${leftTask})`;
         doneCountText.textContent = `(${doneTask})`;
      }

   };

}