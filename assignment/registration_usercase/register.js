if(sessionStorage.getItem("email") !=null){
    window.location.replace('../assets/access_denied.html');
}

function formValidations(){
    var email = document.getElementById("email").value;
    var firstName = document.getElementById("first_name").value;
    var lastName = document.getElementById("last_name").value;
    var password = document.getElementById("pwd").value;
    var cnfPassword = document.getElementById("cnf_pwd").value;
    var address = document.getElementById("address").value;
    var gender = document.getElementById("gender").value;

    //if fields are empty then flash a message
    if(email == "" || firstName == "" || lastName == "" || password == "" 
        || cnfPassword == "" || address == "" || gender == ""){
            document.getElementById("flash_message").innerHTML="Please fill all the fields in order to proceed."
            return false;
        }
    
    //checking validation for the fields
    if(validateEmail(email) && validateName(firstName,"firstName") && validateName(lastName,"lastName") &&
        validatePassword(password) && validatePassword(cnfPassword) && validateAddress(address)
        && checkingPasswordMatch(password,cnfPassword)){
            profile_pic = document.getElementById('profile_pic');
            if(localStorage.getItem(email) == null){
                if(profile_pic.files.length == 0){
                    document.getElementById("flash_message").innerHTML="Image not found"
                    return false;
                }else if(profile_pic.files[0].name){
                    var imageName = profile_pic.files[0].name.toLowerCase();
                    console.log(imageName)
                    var extensionsArray = ['jpg','jpeg','png']
                    for(var i=0;i<extensionsArray.length ;i++){
                        if(imageName.includes(extensionsArray[i]) == false){
                            if(i == extensionsArray.length-1){
                                document.getElementById("uploadFormErrorId").innerHTML="Please use jpg,jpeg or png format."
                                return false;
                            }
                        }else if(imageName.includes(extensionsArray[i]) == true){
                            getUserDetails(email,firstName,lastName,password,address,gender)
                            return true;
                        }
                    }
                }
                    
                
            }else{
                document.getElementById("flash_message").innerHTML="User already exists"
                return false;
            }
    }
    
}


function getUserDetails(email,firstName,lastName,password,address,gender){
    try{
        let profilePicImage = document.getElementById("profile_pic").files[0];
        let fileReader = new FileReader();
        fileReader.readAsDataURL(profilePicImage);
        fileReader.onload = function () {
            fileData = fileReader.result;

            userDetailsObject = {
                email: email,
                firstName: firstName,
                lastName:lastName,
                password:password,
                address: address,
                gender: gender,
                todoList:new Array(),
                profile_img: fileData
            }
            
            localStorage.setItem(userDetailsObject.email, JSON.stringify(userDetailsObject));
            window.location.replace('../login_usercase/login.html');
        }
    }catch(error){
        console.log("Error occurred while trying to save user details"+error.message);
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

function validateName(name,field){
    pattern = /^[a-zA-Z]+$/
    if(pattern.test(name)==true){
        return true;
    }
    if(field == "lastName"){
        document.getElementById("lastNameErrorId").innerHTML="Please enter valid name"
    }else if(field == "firstName"){
        document.getElementById("firstNameErrorId").innerHTML="Please enter valid name"
    }
    return false;
}

function validatePassword(password){
    if(password.length >= 8){
        
        return true;
    }
    document.getElementById("passwordPatternErrorId").innerHTML="Please follow password guidelines"
    return false;
}

function validateAddress(address){
    return true;
}

function checkingPasswordMatch(password,cnfPassword){
    if(password == cnfPassword){
        return true
    }
    else{
        document.getElementById("passwordMatchErrorId").innerHTML="Password is not matching"
        return false;
    }
}