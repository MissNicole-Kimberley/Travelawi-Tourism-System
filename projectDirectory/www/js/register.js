function register(event){

    event.preventDefault();


    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let role = document.getElementById("role").value;



    // Check passwords

    if(password !== confirmPassword){

        alert("Passwords do not match.");
        return;

    }



    fetch("http://localhost:3000/api/auth/register",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },


        body:JSON.stringify({

            fullname: fullname,

            email: email,

            password: password,

            role: role

        })


    })


    .then(res => res.json())


    .then(data=>{

        console.log(data);

        alert("Registered successfully! You can now login.");

        window.location.href = "login.html";

    })

    .catch(error=>{

        console.log(error);

        alert("Registration failed. Please try again.");

    });


}