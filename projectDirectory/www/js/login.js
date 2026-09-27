function login(event){

console.log("LOGIN BUTTON CLICKED");


event.preventDefault();


fetch("http://localhost:3000/api/auth/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

email:
document.getElementById("email").value,


password:
document.getElementById("password").value

})


})


.then(res=>res.json())


.then(data=>{


console.log(data);


if(data.success){


alert("Login successful!");


// Save user details first

sessionStorage.setItem("userName", data.fullName);

sessionStorage.setItem("userRole", data.role);

sessionStorage.setItem("userID", data.userID);



// Redirect based on database role

if(data.role==="Tourist"){

window.location.href="tourist-dashboard.html";

}


else if(data.role==="Accommodation Owner"){

window.location.href="owner-dashboard.html";

}


else if(data.role==="Travelawi Team"){

window.location.href="admin-dashboard.html";

}


}


else{

alert(data.message);

}


})


.catch(error=>{


console.log(error);

alert("Login failed. Please try again.");


});


}