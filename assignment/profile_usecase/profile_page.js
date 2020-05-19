if(sessionStorage.getItem("email") !=null){
    let emailFromSessionStorage = sessionStorage.getItem("email");
    let userLocalData = JSON.parse(localStorage.getItem(emailFromSessionStorage))
    document.getElementById("table_email").innerHTML=userLocalData.email;
    document.getElementById("table_first_name").innerHTML=userLocalData.firstName;
    document.getElementById("table_last_name").innerHTML=userLocalData.lastName;
    document.getElementById("table_gender").innerHTML=userLocalData.gender;
    document.getElementById("table_address").innerHTML=userLocalData.address;
    document.getElementById("profile_img").src=userLocalData.profile_img;
    //document.getElementById("table_password").innerHTML=userLocalData.password;

}else{
    window.location.replace('../assets/access_denied.html');
}

function updatingUser(){
    var firstName = document.getElementById("first_name").value;
    var lastName = document.getElementById("last_name").value;
    var address = document.getElementById("address").value;
    var gender = document.getElementById("gender").value;

    
    //if fields are empty then flash a message
    if(firstName == "" || lastName == "" || address == "" || gender == ""){
        document.getElementById("flash_message").innerHTML="Please fill all the fields in order to proceed."
    }
    else{
        let emailFromSessionStorage = sessionStorage.getItem("email");
        let userLocalData = JSON.parse(localStorage.getItem(emailFromSessionStorage))
        try{
            let profilePicImage = document.getElementById("profile_pic").files[0];
            let fileReader = new FileReader();
            fileReader.readAsDataURL(profilePicImage);
            fileReader.onload = function () {
            fileData = fileReader.result;
                userDetailsObject = {
                    email: userLocalData.email,
                    firstName: firstName,
                    lastName:lastName,
                    password:userLocalData.password,
                    address: address,
                    gender: gender,
                    profile_img: fileData
                }
                
                localStorage.setItem(userDetailsObject.email, JSON.stringify(userDetailsObject));
                window.location.replace('../profile_usecase/profile_page.html');
            }
        }catch(error){
            console.log("Error occurred while trying to save user details"+error.message);
        }
    }
    
}

function logout(){
    sessionStorage.clear();
    window.location.replace('../login_usercase/login.html');
}