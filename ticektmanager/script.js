let deleteBtn = document.querySelector(".delete");
let addBtn = document.querySelector(".add");
let allTicketsBtn = document.querySelector(".all");
let ticketAdder = document.querySelector(".ticketadder");
let ticketPriorityBox = document.querySelector(".ticketpriority");
let ticketContainer = document.querySelector(".ticketcontainer");
let priorityColor = document.querySelector(".prioritycolor");
let ticketadderTextPart = document.querySelector(".textPart");
let allbox = document.querySelectorAll(".ticketpriority .box")

let taskcolor = "red";
let activedelete = false;
let taskArray = [];
let olddata = localStorage.getItem("taskmanager");
if (olddata) {
    taskArray = [...JSON.parse(olddata)]
    // ticketAdderfn(taskArray)
}
let colorsArray = ["red", "green", "blue", "yellow"];

deleteBtn.addEventListener("click", function () {
    activedelete = !activedelete;
    deleteBtn.classList.toggle("red")
});
addBtn.addEventListener("click", function () {
    ticketAdder.classList.toggle("noDisplay")
});
ticketPriorityBox.addEventListener("click", function (event) {
    let clickedbox = event.target;
    if (clickedbox.classList[0] == "box") {
        allbox.forEach(function (box) {
            box.classList.remove("border")
        });
        taskcolor = clickedbox.classList[1];
        clickedbox.classList.add('border');
    }


});
ticketadderTextPart.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        let taskObj = {
            task: ticketadderTextPart.value,
            color: taskcolor,
            id: Date.now()
        }
        taskArray.push(taskObj);
        ticketadderTextPart.value = " ";
        localStorage.setItem("taskmanager", JSON.stringify(taskArray));
         ticketAdderfn(taskArray);
         console.log("new task" ,taskArray)
        addBtn.click();
    }
});
function ticketAdderfn(arr) {
    ticketContainer.innerHTML = " ";
    for (let i = 0; i < arr.length; i++) {
        let ticket = document.createElement("div");
        ticket.classList.add("ticket");
        let { task, color, id } = arr[i];
        
        ticket.innerHTML = `
        <div class="ticket">
            <div class="taskColor ${color}"></div>
            <p class="editTask">${task}</p>
            
            <span class="lock"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg></span>
        </div> 
   
   `;
   
   let lockBtn = ticket.querySelector(".lock");
let editTask = ticket.querySelector(".editTask");

   
   let lock=true;
   
   lockBtn.addEventListener("click",function(){
    if(lock==true){
        editTask.setAttribute("contenteditable","true")
        lockBtn.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM10 15V17H14V15H10Z"></path></svg>';
      
    }
    else{
        editTask.setAttribute("contenteditable", "false");
        let updatedtask=editTask.innerHTML
         arr[i].task=updatedtask
         localStorage.setItem("taskmanager", JSON.stringify(taskArray));
         lockBtn.innerHTML =
         '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg>';
     }
     lock = !lock;
     

    
   });


       ticket.addEventListener("dblclick", function () {
        if (activedelete == true) {
          
          ticketContainer.removeChild(ticket);
  
          let filtertedArray = taskArray.filter(function (taskObj) {
            return taskObj.id != id;
          });
          taskArray = [...filtertedArray];
  
          localStorage.setItem("taskmanager", JSON.stringify(taskArray));
  
        
        }
      });

 

    

    let colorStrip= ticket.querySelector(".taskColor");
colorStrip.addEventListener("click",function(){
    let prevcolor= arr[i].color;
    let preindex= colorsArray.findIndex(function(color){
        return color==prevcolor; 
    })  
    let nextcoloridx=(preindex+1)%4;
     colorStrip.classList.remove(prevcolor);
     colorStrip.classList.add(colorsArray[nextcoloridx]);
     arr[i].color=colorsArray[nextcoloridx];
     localStorage.setItem("taskmanager", JSON.stringify(taskArray));
     
   

});
    
ticketContainer.appendChild(ticket);}}
priorityColor.addEventListener("click",function(event){
    let clickedEle=event.target;
    if(clickedEle.classList[0] =="box"){
     let color=clickedEle.classList[1];
     let filteredArray= taskArray.filter(function(taskObj){
        return taskObj.color== color

     })
     ticketAdderfn(filteredArray);
    }
});
allTicketsBtn.addEventListener("click", function (event) {
    ticketAdderfn(taskArray);
  });

