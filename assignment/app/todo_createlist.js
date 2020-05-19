if(sessionStorage.getItem("email") !=null){
    console.log("showlist")

}else{
    window.location.replace('../assets/access_denied.html');
}

function validateAllfieldTOBeFilled(nameOfToDOList,creationDate,isReminder,isPublic,categorie,status,
    reminderDate){
        if(nameOfToDOList == "" || creationDate == "" || isReminder == "" || isPublic == undefined 
        || categorie == "" || status == "" || reminderDate == ""){
            alert("Please fill all the values")
            return false;
        }else{
            return true;
        }
}

function createToDoList(){
    const nameOfToDOList = document.getElementById("nameId").value
    const creationDate = document.getElementById("creationDateId").value
    const isReminderCollection = document.querySelectorAll('input[name="isReminder"]');
    let isReminder = gettingRadioButtonValue(isReminderCollection);
    const isPublicCollection = document.querySelectorAll('input[name="isPublic"]');
    let isPublic = gettingRadioButtonValue(isPublicCollection);
    const categorie = document.getElementById("categorie").value
    const status = document.getElementById("status").value
    let reminderDate;
    if(isReminder == 'yes'){
        reminderDate = document.getElementById("reminderDateId").value;
    }else{
        reminderDate = "None";
    }

    validationCheck = validateAllfieldTOBeFilled(nameOfToDOList,creationDate,isReminder,isPublic,categorie,status,
        reminderDate)

    if(validationCheck == false){
            window.location.replace('../app/todo_createlist.html')
    }else{
        if(sessionStorage.getItem("email") != null){
            let emailFromSessionStorage = sessionStorage.getItem("email");
            let userLocalData = JSON.parse(localStorage.getItem(emailFromSessionStorage));
            let flagToDescardDuplicateKey = true;
            if(userLocalData.todoList !=null){
                for(item of userLocalData.todoList){
                    if(nameOfToDOList.toLowerCase() == item.name.toLowerCase()){
                        flagToDescardDuplicateKey = false;
                        break;
                    }
                }
            }
            if(flagToDescardDuplicateKey){
                todoListObject = {
                    name: nameOfToDOList,
                    creationDate: creationDate,
                    reminderDate: reminderDate,
                    categorie: categorie,
                    status: status,
                    isPublic:isPublic
                }
        
        
                userLocalData.todoList.push(todoListObject)
                console.log(userLocalData)
                localStorage.setItem(emailFromSessionStorage,JSON.stringify(userLocalData))
                alert("Todo list created")
                window.location.replace('../app/todo_showlist.html  ');
            }else{
                alert("Todo list already exists")
                window.location.replace('../app/todo_showlist.html');
            }
        }
    }


}

function gettingRadioButtonValue(collection){
    for (const item of collection) {
        if (item.checked) {
            return item.value;
        }
    }
}

function showReminderDate(){
    const isReminderCollection = document.querySelectorAll('input[name="isReminder"]');
    let isReminder = gettingRadioButtonValue(isReminderCollection);
    if(isReminder == 'yes'){
        let htmlCodeSnippetForReminderDate = '<label>Reminder Date:</label> <input type="date" id="reminderDateId" name="reminderDate">'
        let reminderDivDate = document.getElementById("reminderDateDivId");
        reminderDivDate.innerHTML = htmlCodeSnippetForReminderDate;
    }
}

function hideRemiderDate(){
        let reminderDivDate = document.getElementById("reminderDateDivId");
        reminderDivDate.innerHTML = "";
}

function logout(){
    sessionStorage.clear();
    window.location.replace('../login_usercase/login.html');
}