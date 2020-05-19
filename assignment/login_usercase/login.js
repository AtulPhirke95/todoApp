if(sessionStorage.getItem("email") !=null){
    window.location.replace('../assets/access_denied.html');
}

function formValidations(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("pwd").value;

    //if fields are empty then flash a message
    if(email == "" || password == ""){
            document.getElementById("flash_message").innerHTML="Please fill all the fields in order to proceed."
            return false;
        }
    
    
    if(validateEmail(email) && validatePassword(password)){
            //checking validation for the fields
        if(localStorage.getItem(email)!=null){
            userStorage = JSON.parse(localStorage.getItem(email))
            if(userStorage.password == password){
                //console.log("Logged in");
                sessionStorage.setItem("email", email);
                window.location.replace('../app/todo_showlist.html');
            }else{
                document.getElementById("passwordPatternErrorId").innerHTML="Password is not matching"
            }
        }else{
            document.getElementById("flash_message").innerHTML="It seems you are not a valid user. Please register."
        }
    }  
}


function validateEmail(email){
    pattern = /^\w+([-\.]?\w)*@\w+([-\.]?\w)*\.\w{2,3}$/
    if(pattern.test(email) == true){
        return true;
    }
    document.getElementById("emailErrorId").innerHTML="Please enter valid email format."
    return false;
}

function validatePassword(password){
    if(password.length >= 8){
        
        return true;
    }
    document.getElementById("passwordPatternErrorId").innerHTML="Please follow password guidelines"
    return false;
}