// Firstly, I want my form inputs to be returned when I click the Add Item button
// This code will be displayed in the console only

// document.querySelector (".btn").addEventListener ("click", function () {
//     const name = document.getElementById("name").value;
//     const description = document.getElementById("description").value;
//     const assignedTo = document.getElementById("assignedTo").value;
//     const dueDate = document.getElementById("dueDate").value;
//     const status = document.getElementById("status").value;

//     // console.log (name, description, assignedTo, dueDate, status);
//     formObject (name, description, assignedTo, dueDate, status);
//     console.log (taskCard);
// })

// Next bit dictates that if the requirements are not fulfilled, there will be a popup
// When I changed the button from "submit" to "button", I had to invoke the function differently - before it was with the form and was onsubmit, but now it's invoked in the button as onclick

function validateForm() {
    var name = document.forms["Form"]["name"].value;
    var description = document.forms["Form"]["description"].value;
    var assignedTo = document.forms["Form"]["assignedTo"].value;
    var dueDate = document.forms["Form"]["dueDate"].value;

    if ((name == "") || (name.length > 20)) {
      alert("Name must be filled out and be less than 20 characters");
      return false;
    } else if ((description == "") || (description.length > 20)) {
        alert("Description must be filled out and be less than 20 characters");
        return false;
    } else if ((assignedTo == "") || (assignedTo.length > 20)) {
        alert("AssignedTo must be filled out and be less than 20 characters");
        return false;
    } else if (dueDate == "") {
        alert ("Date must be filled in");
        return false;
    }
    return true
}

class TaskManager {
    constructor () {
        this.taskCard = []        
    }

    updateStorage () {
        localStorage.setItem ("yourtasks: ", JSON.stringify (this.taskCard))
        location.reload ()
    }

    loadStorage () {
        const taskCard = JSON.parse(localStorage.getItem ("yourtasks: "))
        if (taskCard) {
            this.taskCard = taskCard
        } 
        for (let item in this.taskCard) {
            taskVisible ()
        }
    }
    
    getTasks () {
        // returns the list of ALL tasks
        return this.taskCard
    }
    
    addTasks (task) {
        this.taskCard.push (task);
        this.updateStorage ();
        // adds a tasks to the existing list when the button is clicked. Card is created and array is updated and it's given an ID number

    }
    
    deleteTask () {
        let event = window.event.target
        console.log (event)
        let taskID = event.parentNode.parentNode.parentNode.attributes.id.value
        console.log (taskID) 
        
        for (item in this.taskCard) {
            console.log (this.taskCard[item].ID)
            if (this.taskCard [item].ID == taskID) {
                this.taskCard.splice (item, 1)
                console.log (this.taskCard)
            }
        }
        let deletedCard = document.getElementById (taskID)
        deletedCard.remove ()
        this.updateStorage ();
        // deletes selected task or tasks. Identify + select task and then delete from the array and the page
        // function needs to be invoked either in delete button through an onclick or here
    }

    updateTask () {
        //updates status or other inputs of the task. Edit the info on the card, then save and update the array
        
        var updatedTasks = {}
        let event = window.event.target
        let updatedID = event.parentNode.parentNode.parentNode.attributes.id.value
        for (item = 0; item < this.taskCard.length; item++) {
            if (this.taskCard [item].ID == updatedID) {
                updatedTasks = this.taskCard[item]
            }
        } 
        document.querySelector ("#name").value = updatedTasks.name
        document.querySelector ("#description").value = updatedTasks.description
        document.querySelector ("#assignedTo").value = updatedTasks.assignedTo
        document.querySelector ("#dueDate").value = updatedTasks.dueDate
        document.querySelector ("#status").value = updatedTasks.status

        document.querySelector ("#addTask").outerHTML = `<button onclick="validateForm()" type="button" value="Save item" class="btn btn-primary" id="saveTask"> Save </button> `

        document.querySelector ("#saveTask").addEventListener ("click", function () {
            var name = document.querySelector ("#name").value
            var description = document.querySelector ("#description").value
            var assignedTo = document.querySelector ("#assignedTo").value
            var dueDate = document.querySelector ("#dueDate").value
            var status = document.querySelector ("#status").value

            if (validateForm () == true) {
                updatedTasks.name = name
                updatedTasks.description = description
                updatedTasks.assignedTo = assignedTo
                updatedTasks.dueDate = dueDate
                updatedTasks.status = status

                tm.updateStorage ()
            }

        })
        
    }
}

let tm = new TaskManager ()
tm.loadStorage ()
document.querySelector("#addTask").addEventListener("click", function() {
    if (validateForm () == true) {
        var name = document.querySelector ("#name").value
        var description = document.querySelector ("#description").value
        var assignedTo = document.querySelector ("#assignedTo").value
        var dueDate = document.querySelector ("#dueDate").value
        var status = document.querySelector ("#status").value
        let newTask = formObject (name, description, assignedTo, dueDate, status)
        tm.addTasks (newTask)
        console.log ("tasks: " , tm.getTasks())
        taskVisible ();
    }   
})



// 1 - write a function that takes the data from the form and makes an object
// console.log that object
// 2. create an empty array and update the function to that it creates the object AND adds it to the array at the same time
// console.log that array
// test adding several items, and making sure the array keeps growing with each object
// either a) create a task manager class with the methods listed in task 4 (creating the shell of each methods, do not add code yet!!!!)



function formObject (name, description, assignedTo, dueDate, status) {
    var id = 0
    if (tm.taskCard.length == 0) {
        id = 1
    } else {
        var lastID = tm.taskCard [tm.taskCard.length - 1].ID 
        id = lastID +1
    }

    let newTask = {
        "name": name,
        "description": description,
        "assignedTo": assignedTo,
        "dueDate": dueDate,
        "status": status,
        "ID" : id
    }
    return newTask 
    // console.log (newTask);
}


// This shall put the tasks on the webpage

function taskVisible () {
    let displayedTask = document.querySelector ("#displayedTask");
    displayedTask.innerHTML = ""

    for (item in tm.taskCard) {
        let newCard = 
        `<div class="col-sm-3" id = "${tm.taskCard[item]["ID"]}"> 
        <div class="card">
            <div class="card-header">
              Task 
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Assigned to: ${tm.taskCard[item]["assignedTo"]}</li>
              <li class="list-group-item">Assigned by: ${tm.taskCard[item]["name"]}</li>
              <li class="list-group-item">Due Date: ${tm.taskCard[item]["dueDate"]}</li>
              <li class="list-group-item">Status: ${tm.taskCard[item]["status"]}</li>
              <li class="list-group-item">Description: ${tm.taskCard[item]["description"]}</li>
              <button class="updateTask btn-primary" id="button2" onclick = "tm.updateTask ()"> Update Task </button>
              <button class="deleteTask" id="button1" onclick = "tm.deleteTask ()"> Delete Task </button>
            </ul>
        </div>
        </div>`
        displayedTask.innerHTML += newCard;

        let displaySummary = document.querySelector ("#taskSummary");
        displaySummary.innerHTML = ""
        
        for (item in tm.taskCard) {
            let newSummary = 
            `<a href="#" class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"> ${tm.taskCard[item]["status"]}</h5>
              <small>${tm.taskCard[item]["dueDate"]}</small>
            </div>
            <p class="mb-1"> ${tm.taskCard[item]["description"]}</p>
            <small></small>
            </a>`
            displaySummary.innerHTML+= newSummary
        }
        
    }

}

    

// let myArray = []
// myArray = createNewTaskObj

// function createNewTaskObj(taskName, taskDescription, taskAssignedTo, taskStatus, taskDueDate, taskArray) {
//     theTaskManager.alltasks.push({
//         "name": taskName,
//         "Description": taskDescription,
//         "assignedTo": taskAssignedTo,
//         "DueDate": taskDueDate,
//         "Status": taskStatus,
//         "ID": `${taskArray.length < 1 ? 1 : taskArray.length+1}`
//     })

//     localStorage.setItem("localStorageTaskArray", JSON.stringify(theTaskManager.taskManArray));
//     return theTaskManager.taskManArray;
// }

// }
// console.log(myArray)

// document.querySelector("#addTask").addEventListener("click", function(){
//     if (validateForm()==true){
//         let id = tm.tasks.length + 1
//         let assignedBy = document.querySelector("#name").value;
//         let description = document.querySelector("#description").value;
//         let assignedTo = document.querySelector("#assignedto").value;
//         let dueDate = document.querySelector("#datepicker").value;
//         let status = document.querySelector("#status").value;

//         let newTask = createTask(id, assignedBy, description, assignedTo, dueDate, status)
//         tm.addTask(newTask)
//         console.log('current tasks:', tm.getTasks())

        
//         display()

//     }
