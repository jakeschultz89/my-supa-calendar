let serverUrl= "https://fsdiapi.azurewebsites.net/";
let important=true;
let form=false;
let task=true;
function toggleImportant(){
    console.log("clicked");
    if(important){
        $("#iImportant").removeClass("fas").addClass("far");
        important=false;
    }else{
        $("#iImportant").removeClass("far").addClass("fas");
        important=true;
    }  
}
function toggleForm(){
    if(form){
        $("form").slideUp(1500);
        $("#btnAdd").text("Add task");
        form=false;
    }else{
        $("form").slideDown(1500);
        $("#btnAdd").text("Hide the form");
        form=true;
    }
}
function toggleTask(){
    $(".taskInfo").toggle();
}
function save(){
    console.log("Saving task");
    // get the values from the inputs
    let title=$("#txtTitle").val();
    let date=$("#selDate").val();
    let location=$("#txtLocation").val();
    let priority=$("#selPriority").val();
    let color=$("#selColor").val();
    let collaborator=$("#txtCollaborator").val();
    let description=$("#txtDescription").val();
    // create a new Task object
    let task = new Task(title,important,date,location,priority,color, collaborator, description);
    
    $.ajax({
        type:"POST",
        url:serverUrl+"api/tasks",
        data:JSON.stringify(task),
        contentType:"application/json",
        success:function(res){
            console.log("Server says", res);
            alert("The task was register successfully!");
            let t=JSON.parse(res);
            displayTask(t);
        },
        error:function(error){
            console.log("Error saving task",error);
        }
    });
    clearForm();
}
function displayTask(task){
    //display obj information
    syntax=`
    <div class="task">
        <div class="title">
            <h6>${task.title}</h6>
            <button id="minTask" onclick="toggleTask();"><i id="minTask" class="fas fa-window-minimize"></i></button>
        </div>
        <div class="taskInfo">
            <label><i class="fas fa-thumbtack"></i>${task.location}</lable>
            <label><i class="fas fa-users"></i>${task.collaborator}</label>
            <label><i class="fas fa-pencil-alt"></i>${task.description}</label>
            <label><i class="fas fa-exclamation"></i>${task.priority}</label>
            <label><i class="fas fa-calendar-day"></i>${task.date}</label>
        </div>
    </div>`;
    $(".pending-tasks").append(syntax);
}
function getTask(){
    $.ajax({
        type:"GET",
        url:serverUrl+"api/tasks",
        success:function(res){
            let t=JSON.parse(res);
            for(let i=0;i<t.length;i++){
                if(t[i].name==="Jake"){
                    console.log(t[i]);
                    displayTask(t[i]);
                }
            }
            console.log("Server says: "+t);
        },
        error:function(err){
            console.log("Error getting tasks: ", err);
        }
    });
}
function clearForm(){
    $("#txtTitle").val("");
    $("#txtLocation").val("");
    $("#txtCollaborator").val("");
    $("#txtDescription").val("");
}
function clearTaskAll(){
    console.log("Button pressed");
    $.ajax({
        type:"DELETE",
        url: serverUrl + "api/tasks/clear/Jake",
        success:function(res){
            let t = JSON.parse(res);
            console.log("All the tasks have been cleared",t);
            location.reload(true);
        },
        error: function(err){
            console.log("Something went wrong",err);
        }
    });
}
function init(){
    console.log("Calendar System");
    $("form").hide();
    getTask();
    //hook event
    $("#btnAdd").click(toggleForm);
    $("#iImportant").click(toggleImportant);
    $("#btnSave").click(save);
    $("#btnClear").click(clearTaskAll);
}

window.onload=init;