$(document).ready(function(){


$("#reportDate").text(
new Date().toLocaleDateString()
);



loadReports();



function loadReports(){


$.get(
"http://localhost:3000/api/reports",

function(response){


console.log(response);



if(!response.success){
return;
}



let r=response.report;



$("#totalUsers").text(r.totalUsers);

$("#totalDestinations").text(r.totalDestinations);

$("#totalAccommodation").text(r.totalAccommodation);

$("#totalTours").text(r.totalTours);

$("#totalBookings").text(r.totalBookings);





$("#favouriteList").html("");



response.favourites.forEach(item=>{


$("#favouriteList").append(`

<li>
❤️ ${item.item_name}
(${item.total} favourites)
</li>

`);


});





$("#bookedList").html("");



response.booked.forEach(item=>{


$("#bookedList").append(`

<li>

🔥 ${item.item_name}
(${item.total} bookings)

</li>

`);


});



loadUsers();

loadBookings();

loadAccommodation();


});


}






function loadUsers(){


$.get(

"http://localhost:3000/api/admin/users",

function(response){


$("#usersReport tbody").html("");



response.users.forEach(user=>{


$("#usersReport tbody").append(`

<tr>

<td>${user.fullname}</td>

<td>${user.email}</td>

<td>${user.role}</td>

</tr>

`);


});


});


}






function loadBookings(){


$.get(

"http://localhost:3000/api/admin/bookings",

function(response){


$("#bookingReport tbody").html("");



response.bookings.forEach(book=>{


$("#bookingReport tbody").append(`

<tr>

<td>${book.full_name}</td>

<td>${book.item_name}</td>

<td>${book.status}</td>


</tr>

`);


});


});


}






function loadAccommodation(){


$.get(

"http://localhost:3000/api/accommodation",

function(response){


$("#accommodationReport tbody").html("");



response.accommodation.forEach(acc=>{


$("#accommodationReport tbody").append(`

<tr>

<td>${acc.name}</td>

<td>${acc.location}</td>

<td>${acc.owner_name}</td>


</tr>


`);


});


});


}


});