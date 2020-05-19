if(sessionStorage.getItem("email") !=null){
    let emailFromSessionStorage = sessionStorage.getItem("email");
    let userLocalData = JSON.parse(localStorage.getItem(emailFromSessionStorage));
    console.log(userLocalData.todoList)
    if(userLocalData.todoList.length == 0){
        let searchBox = document.getElementById("searchTextId")
        searchBox.parentNode.removeChild(searchBox);
        let toDoListTable = document.getElementById("showListTableId")

        toDoListTable.parentNode.removeChild(toDoListTable);
        document.getElementById("tableInfoId").innerHTML="ToDo list is empty. In order to create one press create list from the navigation bar"

        let actionBtn = document.getElementById("actionBtnId")
        actionBtn.parentNode.removeChild(actionBtn)
        
    }
    //this block deals with inserting rows on the basis of todolist
    let counter = 1
    var table = document.getElementById("showListTableId");
    for(item of userLocalData.todoList){
        let row = table.insertRow(counter);
        let name = row.insertCell(0)
        let creationDate = row.insertCell(1)
        let Reminder = row.insertCell(2)
        let categorie = row.insertCell(3)
        let status = row.insertCell(4)
        let isPublic = row.insertCell(5)

        name.innerHTML = item.name;
        creationDate.innerHTML = item.creationDate;
        Reminder.innerHTML = item.reminderDate;
        categorie.innerHTML = item.categorie;
        status.innerHTML = item.status;
        isPublic.innerHTML = item.isPublic;
        counter = counter + 1
    }

    

}else{
    //if user is not logged in then navigate to access denied page
    window.location.replace('../assets/access_denied.html');
}

//this function deals with getting values of radio button
function gettingRadioButtonValue(collection){
    for (const item of collection) {
        if (item.checked) {
            return item.value;
        }
    }
}

//when user clicks on yes radio button then show him remider date
function showReminderDate(){
    const isReminderCollection = document.querySelectorAll('input[name="isReminder"]');
    let isReminder = gettingRadioButtonValue(isReminderCollection);
    if(isReminder == 'yes'){
        let htmlCodeSnippetForReminderDate = '<label>Reminder Date:</label> <input type="date" id="reminderDateId" name="reminderDate">'
        let reminderDivDate = document.getElementById("reminderDateDivId");
        reminderDivDate.innerHTML = htmlCodeSnippetForReminderDate;
    }
}

//when user clicks on no radio button of reminder then if reminder date is there then hide it
function hideRemiderDate(){
        let reminderDivDate = document.getElementById("reminderDateDivId");
        reminderDivDate.innerHTML = "";
}

//when user clicks on delete button he has to select todo list name and then that list gets deleted
function deleteAToDoList(){
    let emailFromSessionStorage = sessionStorage.getItem("email");
    let userLocalData = JSON.parse(localStorage.getItem(emailFromSessionStorage))
    let listToDelete = document.getElementById("showListNamesToDeleteID").value;
    if(listToDelete==""){
        document.getElementById("flash_message_delete").innerHTML="Please select name of todo list to delete"
    }else{
        let temp_array = new Array();
        //create a new array which does not contain the selected list to be deleted
        for(item of userLocalData.todoList){
            if(item.name.toLowerCase() != listToDelete.toLowerCase()){
                temp_array.push(item)
            }
        }
    
        //let updatedToDoList=userLocalData.todoList.filter(item => item.nametoLowerCase() != listToDelete.toLowerCase())
        //alert(updatedToDoList)
        delete userLocalData.todoList
        userLocalData.todoList=temp_array
        localStorage.setItem(emailFromSessionStorage,JSON.stringify(userLocalData))
        alert("Todo list: " + listToDelete + " is deleted")
        window.location.replace('../app/todo_showlist.html  ');
    }

}

//when user clicks on update button the select to do list dropdown gets updated with to do list names
function showPredifinedvaluesInUpdateModal(){
    let emailFromSessionStorage = sessionStorage.getItem("email");
    let userLocalData = JSON.parse(localStorage.getItem(emailFromSessionStorage))
    let selectListToUpdateItem = document.getElementById("showListNamesToUpdateID");
    //if dropdown contains some values then re initialised them
    selectListToUpdateItem.innerHTML=""
    let items = document.createElement("option")
    items.value=""
    selectListToUpdateItem.appendChild(items);
    for(item of userLocalData.todoList){
        items = document.createElement("option")
        items.value=item.name
        items.innerHTML=item.name
        selectListToUpdateItem.appendChild(items);
    }
}

//when user clicks on delete button dropdown gets auto initialised
function showDropDownListForDelete(){
    let emailFromSessionStorage = sessionStorage.getItem("email");
    let userLocalData = JSON.parse(localStorage.getItem(emailFromSessionStorage))
    let selectListToDeleteItem = document.getElementById("showListNamesToDeleteID");
    selectListToDeleteItem.innerHTML=""
    let items = document.createElement("option")
    items.value=""
    selectListToDeleteItem.appendChild(items);
    for(item of userLocalData.todoList){
        items = document.createElement("option")
        items.value=item.name
        items.innerHTML=item.name
        selectListToDeleteItem.appendChild(items);
    }
}

//when user selects list from update modal then all the data related to that list gets displayed
function showUpdateDetailData(){
    let emailFromSessionStorage = sessionStorage.getItem("email");
    let userLocalData = JSON.parse(localStorage.getItem(emailFromSessionStorage))
    let listToUpdate = document.getElementById("showListNamesToUpdateID").value;;
    for(item of userLocalData.todoList){
        if(item.name.toLowerCase() == listToUpdate.toLowerCase()){
            document.getElementById("creationDateId").value= item.creationDate
            document.getElementById("status").value= item.status

            //reminder value
            if(item.reminderDate != 'None'){
                document.getElementById("yesRemiderId").checked=true;
                let htmlCodeSnippetForReminderDate = '<label>Reminder Date:</label> <input type="date" id="reminderDateId" name="reminderDate">'
                let reminderDivDate = document.getElementById("reminderDateDivId");
                reminderDivDate.innerHTML = htmlCodeSnippetForReminderDate
                document.getElementById("reminderDateId").value = item.reminderDate   
            }else{
                document.getElementById("noRemiderId").checked=true;
            }

            //categorie
            document.getElementById("categorie").value = item.categorie;

            //is public
            if(item.isPublic == 'yes'){
                document.getElementById("yesPublicId").checked=true;
            }else{
                document.getElementById("noPublicId").checked=true;
            }
        }
    }
}

//if some value or all values are kept blank
function validateAllfieldTOBeFilled(selectaValue,creationDate,isReminder,isPublic,categorie,status,
    reminderDate){
        if(selectaValue == "" || creationDate == "" || isReminder == "" || isPublic == undefined
        || categorie == "" || status == "" || reminderDate==""){
            document.getElementById("flash_message").innerHTML="Please fill all fields"
            return false;
        }else{
            return true;
        }
}

//updating selected todolist with values
function updatingToDoList(){
    let emailFromSessionStorage = sessionStorage.getItem("email");
    let userLocalData = JSON.parse(localStorage.getItem(emailFromSessionStorage))
    let listToDelete = document.getElementById("showListNamesToUpdateID").value;
    if(listToDelete == ""){
        document.getElementById("flash_message").innerHTML="Please select todo list from the dropdown or fill all values"
    }else{
        let temp_array = new Array();
        let updatedObjectForToDoList = {}
        let counter = 0
        for(item of userLocalData.todoList){
            if(item.name.toLowerCase() == listToDelete.toLowerCase()){
                //const nameOfToDOList = document.getElementById("nameId").value
                const creationDate = document.getElementById("creationDateId").value
                const isReminderCollection = document.querySelectorAll('input[name="isReminder"]');
                let isReminder = gettingRadioButtonValue(isReminderCollection);
                const isPublicCollection = document.querySelectorAll('input[name="isPublic"]');
                let isPublic = gettingRadioButtonValue(isPublicCollection);
                const categorie = document.getElementById("categorie").value
                const status = document.getElementById("status").value
                let selectaValue = document.getElementById("showListNamesToUpdateID").value;
                let reminderDate;
                if(isReminder == 'yes'){
                    reminderDate = document.getElementById("reminderDateId").value;

                }else{
                    reminderDate = "None";
                }
    
                validationCheck = validateAllfieldTOBeFilled(listToDelete,creationDate,isReminder,isPublic,categorie,status,
                    reminderDate)
                
                if(validationCheck == false){
                    document.getElementById("flash_message").innerHTML="Please fill all the fields"
                    
                }
                else{
                    //create new object of new values
                    updatedObjectForToDoList = {
                        name: listToDelete,
                        creationDate: creationDate,
                        reminderDate: reminderDate,
                        categorie: categorie,
                        status: status,
                        isPublic:isPublic
                    }
                    //delete selected list
                    userLocalData.todoList.splice(counter,1)
                            //replace new list
                    userLocalData.todoList.push(updatedObjectForToDoList)
                
                    localStorage.setItem(emailFromSessionStorage,JSON.stringify(userLocalData))
                    //alert("Todo list updated")
                    window.location.replace('../app/todo_showlist.html')
                    break;
                }
    
            }
            counter = counter + 1   
        }
    

    }

}

//get table head 
th = document.getElementsByTagName('th');

//loop in to table columns
for(let columnNumber=0; columnNumber < th.length; columnNumber++){
    //sends column numbers for sorting
    th[columnNumber].addEventListener('click',sortTableItemFunction(columnNumber))
}

//sort table based on column numbers
function sortTableItemFunction(columnNumber){

    return function(){
      //console.log(columnNumber) 
      sortTable(columnNumber)
    }
}

function sortTable(columnNumber) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("showListTableId");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[columnNumber];
        y = rows[i + 1].getElementsByTagName("TD")[columnNumber];
        //check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
        }
        }
        if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        }
    }
}

//when user type something in search text box then search it from the table
function SearchItems(val) {
    var inputText, filter, found, table, tr, td, i, j;
    inputText = document.getElementById("myInput");
    //filter = inputText.value.toUpperCase();
    filter = val.toUpperCase();
    table = document.getElementById("showListTableId");
    tr = table.getElementsByTagName("tr");
    //alert(tr.length)
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        }
        else if (!tr[i].id.match('^tableHeader')) {
            tr[i].style.display = "none";
        }
    }

}

//when user pressed logout
function logout(){
    sessionStorage.clear();
    window.location.replace('../login_usercase/login.html');
}

