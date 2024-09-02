const inputbar =document.getElementById("input")
const btn =document.querySelector("#button");
const container =document.getElementById("container");
let taskArray=[];
  let oldertask=localStorage.getItem("tasks");
  console.log("old",oldertask)
  if(oldertask){
   
    let parsedarray=JSON.parse(oldertask);
    taskArray=[...parsedarray];
    taskaddertoui(taskArray);
  }
  
 
btn.addEventListener("click" ,function(){
 
  

  const value = inputbar.value;
  inputbar.value=" ";
  if(value.length==0)return;
     

      const taskobj={
        id:Date.now(),
        task:value
      }
      taskArray.push(taskobj);
      taskaddertoui(taskArray);
      localStorage.setItem("tasks",JSON.stringify(taskArray));
     
    }) 
      function taskaddertoui(arr){
        container.innerHTML="";
        arr.forEach(function(taskobj) {
          let id=taskobj.id;
          const taskcontainer = document.createElement("div");
      
          taskcontainer.innerHTML=`<div class="task">
              <p>${taskobj.task}</p>
              <div class="dlt">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
              <div>
           </div>`
           
           let dlticon =taskcontainer.querySelector(".dlt");
          console.log(dlticon);
           
           dlticon.addEventListener("click", function(){
               container.removeChild(taskcontainer);
              let filteredarray=taskArray.filter(function(taskobj){
                return taskobj.id!=id;
              })
              taskArray=filteredarray;
              localStorage.setItem("tasks",JSON.stringify(taskArray))
           })
           container.appendChild(taskcontainer);
      
      });
        
     
     
   
}
