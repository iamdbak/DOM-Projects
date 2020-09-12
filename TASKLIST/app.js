// Define UI Variables 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listners 
loadEventListeners();

// Load all event listeners
function loadEventListeners() 
{
   //DOM Load Event
   document.addEventListener('DOMContentLoaded', getTasks);
   //Add task Events 
   form.addEventListener('submit', addTask);
   // remove task events
   taskList.addEventListener('click', removeTask);

   // Clear Task Event
   clearBtn.addEventListener('click', clearTasks);

   // Filter task event
   filter.addEventListener('keyup', filterTasks);
}


//Get the Tasks from LS(local Storage)
function getTasks()
{
   let tasks;
   if(localStorage.getItem('tasks')=== null)
   {
      tasks = [];
   }
   else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task)
   {
      // Create li element 
   const li = document.createElement('li');
   // Add a class 
   li.className = 'collection-item';
   // Create Text node and apppend to the li 
   li.appendChild(document.createTextNode(task));
   // Create a New Link element
   const link = document.createElement('a');
   // Add Class 
   link.className = 'delete-item secondary-content';
   // add icon html
   link.innerHTML = '<i class="fa fa-remove"></i>';
   // Append the link to li 
   li.appendChild(link);
    // Append li to ul 
   taskList.appendChild(li);


   });
}

// Add Task 
function addTask(e){
   if(taskInput.value === ''){
      alert('Add a Task');
   }
   // Create li element 
   const li = document.createElement('li');
   // Add a class 
   li.className = 'collection-item';
   // Create Text node and apppend to the li 
   li.appendChild(document.createTextNode(taskInput.value));
   // Create a New Link element
   const link = document.createElement('a');
   // Add Class 
   link.className = 'delete-item secondary-content';
   // add icon html
   link.innerHTML = '<i class="fa fa-remove"></i>';
   // Append the link to li 
   li.appendChild(link);
   // Append li to ul 
   taskList.appendChild(li);

   // Store in Ls even after deletion 
   storeTaskInLocalStorage(taskInput.value);

   // clearing Input
   taskInput.value = '';

   e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task)
{
   let tasks;
   if(localStorage.getItem('tasks')=== null)
   {
      tasks = [];
   }
   else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.push(task);
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e)
{
   if(e.target.parentElement.classList.contains('delete-item'))
   {
      if(confirm('Nahi karna yaa Done Che; ?'))
      {
         e.target.parentElement.parentElement.remove();

         //Remove from LS
         removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
          
   }

}

//Remove from LS 
function removeTaskFromLocalStorage(taskItem)
{
   let tasks;
   if(localStorage.getItem('tasks')=== null)
   {
      tasks = [];
   }
   else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task)
   {
      if(taskItem.textContent === task)
      {
         tasks.splice(index,1);
      }
   });

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task 

function clearTasks()
{
   // Simply defining it to null
   //taskList.innerHTML ='';
   // or do it the other way which is faster by looping in a while loop and removing first child 
   while(taskList.firstChild)
   {
      taskList.removeChild(taskList.firstChild);
   }

   //Declaring a function to Clear from ls (final Deletion)
   clearTasksFromLocalStorage();

}

// Clear from LS final deletion 
function clearTasksFromLocalStorage()
{
   localStorage.clear();
}

// Filter Tasks

function filterTasks(e)
{
   const text = e.target.value.toLowerCase();

   document.querySelectorAll('.collection-item').forEach(function(task)
   {
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1)
      {
         task.style.display = 'block';
      }
      else{
         task.style.display = 'none';
      }

   });


   console.log(text);
}