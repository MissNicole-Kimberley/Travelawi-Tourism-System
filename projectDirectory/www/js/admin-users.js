$(document).ready(function(){


loadUsers();



function loadUsers(){


$.get(

"http://localhost:3000/api/users",

function(response){


$("#usersContainer").html("");



if(!response.success){

return;

}




response.users.forEach(function(user){



$("#usersContainer").append(`



<tr>


<td>

<i class="bi bi-person-circle"></i>

${user.fullname}

</td>



<td>

${user.email}

</td>



<td>

<span class="badge bg-success">

${user.role}

</span>

</td>



<td>

${user.created_at}

</td>



<td>



<button

class="dashboard-btn deleteUser"

data-id="${user.id}">


<i class="bi bi-trash"></i>

Delete


</button>



</td>



</tr>



`);




});



}



);



}





$(document).on("click",".deleteUser",function(){



let id=$(this).data("id");



if(!confirm("Delete this user?")){

return;

}



$.ajax({


url:

`http://localhost:3000/api/users/${id}`,

method:"DELETE",



success:function(response){



if(response.success){


alert("User deleted successfully");


loadUsers();


}



}



});



});

$("#addUserBtn").click(function(){

$("#userModal").modal("show");

});




$("#userForm").submit(function(e){


e.preventDefault();



let user={


fullname:$("#fullname").val(),

email:$("#email").val(),

password:$("#password").val(),

role:$("#role").val()


};



$.ajax({


url:"http://localhost:3000/api/users/add",

method:"POST",

contentType:"application/json",

data:JSON.stringify(user),



success:function(response){



if(response.success){


alert("User added successfully");


$("#userModal").modal("hide");


$("#userForm")[0].reset();


loadUsers();


}

else{


alert(response.message);

}



}



});



});

});