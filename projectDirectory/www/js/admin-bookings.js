$(document).ready(function(){


loadBookings();



function loadBookings(){


$.get(

"http://localhost:3000/api/bookings/admin/all",

function(response){



$("#bookingContainer").html("");



if(!response.success){

return;

}



response.bookings.forEach(function(booking){



let status="";


if(booking.status==="Pending"){

status="🟡 Pending";

}

else if(booking.status==="Confirmed"){

status="🟢 Confirmed";

}

else{

status="🔴 Declined";

}



$("#bookingContainer").append(`



<tr>


<td>

${booking.customer_name}

</td>



<td>

${booking.accommodation_name}

</td>



<td>

${booking.guests}

</td>



<td>

${booking.check_in || "-"}

</td>



<td>

${booking.check_out || "-"}

</td>



<td>

${status}

</td>



<td>

${booking.created_at}

</td>



</tr>



`);



});



});


}



});