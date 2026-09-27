$(document).ready(function(){


loadAdminDashboard();



});



function loadAdminDashboard(){



$.get(

"http://localhost:3000/api/admin/dashboard",

function(response){



if(!response.success){

console.log("Dashboard error");

return;

}




$("#totalUsers").text(
response.totalUsers
);



$("#totalAccommodation").text(
response.totalAccommodation
);



$("#totalDestinations").text(
response.totalDestinations
);



$("#totalBookings").text(
response.totalBookings
);



$("#mostFavourite").text(
response.mostFavourite
);



$("#mostBooked").text(
response.mostBooked
);



$("#newUser").text(
response.newUser
);



loadActivity();



}

);



}




function loadActivity(){



$("#recentActivity").html(`


<div class="activity-card">

<i class="bi bi-person-plus-fill"></i>

<p>
New users, properties, bookings and reviews will appear here.
</p>

</div>



`);

}