let addBtn = document.getElementById("addBtn")
let todoWindow = document.getElementById("todoWindow")
let doneWindow = document.getElementById("doneWindow")
let idNum = 0; // Setting ID at 0 initially
let checkboxName = "checkbox"; // Setting checkbox name initially, got idea myself
let warnText = document.getElementById("warnText")
let taskInputBox = document.getElementById("taskInputBox");

calcLeft()
calcDone()

addBtn.addEventListener("click", createNewTask);
taskInputBox.addEventListener("keydown", handleEnter)

function handleEnter(event)
{
   if(event.key === "Enter")
   {
      event.preventDefault()
      createNewTask()
   }
}

function createNewTask() 
{
   idNum += 1; 
   let checkboxID;
   let checkbox;
   let containerID;
   let taskName = taskInputBox.value.trim();

   if (taskName == false)
   {
      warnText.textContent = "You cannot add an empty Task"
      return;
   }
   else 
   {
      warnText.textContent = '';
   }

   let checkboxContainer = document.createElement(`div`);
   checkboxContainer.setAttribute(`class`,  `checkboxContainer`);
   
   let newCheckbox = document.createElement(`input`)
   newCheckbox.setAttribute(`type`, `checkbox`)
   newCheckbox.setAttribute(`id`, `${checkboxName}${idNum}`)
   
   let newLabel = document.createElement("label")
   newLabel.setAttribute(`for`, `${checkboxName}${idNum}`)
   newLabel.setAttribute(`class`, `taskName`);
   newLabel.setAttribute(`id`, `taskName${idNum}`)
   newLabel.textContent = `${taskName}`;

   let deleteButton = document.createElement(`button`)
   deleteButton.setAttribute(`class`, `deleteButton`)
   deleteButton.textContent = `Delete`

   checkboxID = `${checkboxName}${idNum}`;
   
  // console.log(checkboxID)

   checkboxContainer.append(newCheckbox)
   checkboxContainer.append(newLabel) 
   checkboxContainer.append(deleteButton)
   todoWindow.append(checkboxContainer)

   checkbox = document.getElementById(`${checkboxID}`);

   calcLeft()

   taskInputBox.value = ``;

   // console.log(checkbox);

   checkbox.onclick = function() 
   {
      if(checkbox.checked) {
         doneWindow.append(checkboxContainer)
         newLabel.style.textDecoration = "line-through";
         calcDone()
         calcLeft()
      }
      else {
         newLabel.style.textDecoration = "none"
         todoWindow.append(checkboxContainer)
         calcDone()
         calcLeft()
      };
   } 

   deleteButton.addEventListener("click", deleteAnimation)

   function deleteAnimation()
   {
      checkboxContainer.setAttribute("class", "deleteCheckboxContainer")
      checkboxContainer.addEventListener("animationend", deleteTask)
      
      function deleteTask()
      {
         checkboxContainer.remove()
         calcLeft()
         calcDone()
      }

   };

};

function calcLeft() 
{
   let todoWindow = document.getElementById("todoWindow");
   let taskCountText = document.getElementById("taskCountText");
   let totalContainers = todoWindow.getElementsByClassName("checkboxContainer");
   let taskNum = totalContainers.length;

   taskCountText.textContent = `(${taskNum})`
}

function calcDone() 
{
   let doneWindow = document.getElementById("doneWindow");
   let doneCountText = document.getElementById("doneCountText");
   let totalContainers = doneWindow.getElementsByClassName("checkboxContainer");
   let taskNum = totalContainers.length;

   doneCountText.textContent = `(${taskNum})`
}