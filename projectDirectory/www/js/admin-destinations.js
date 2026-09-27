$(document).ready(function(){


loadDestinations();



const modal = new bootstrap.Modal(
document.getElementById("destinationModal")
);



/* ======================
LOAD DESTINATIONS
====================== */


function loadDestinations(){


$.get(

"http://localhost:3000/api/destinations",

function(response){


$("#destinationContainer").html("");



response.destinations.forEach(function(destination){


$("#destinationContainer").append(`



<div class="col-lg-4 mb-4">


<div class="admin-card">


<img 

src="http://localhost:3000/uploads/destinations/${destination.image}"

class="img-fluid">



<div class="p-3">


<h4>

${destination.name}

</h4>



<p>

<i class="bi bi-geo-alt"></i>

${destination.location}

</p>



<p>

⭐ ${destination.rating}

</p>



<p>

${destination.description.substring(0,100)}...

</p>




<button

class="btn btn-warning editDestination"

data-id="${destination.id}">

<i class="bi bi-pencil"></i>

Edit

</button>




<button

class="btn btn-danger deleteDestination"

data-id="${destination.id}">

<i class="bi bi-trash"></i>

Delete

</button>



</div>


</div>


</div>



`);



});


});


}



/* ======================
OPEN ADD MODAL
====================== */


$("#addDestinationBtn").click(function(){


$("#destinationForm")[0].reset();


$("#destinationID").val("");

$("#oldImage").val("");

$(".modal-title").text("Add Destination");


modal.show();



});





/* ======================
SAVE DESTINATION
====================== */


$("#destinationForm").submit(function(e){


e.preventDefault();



const id=$("#destinationID").val();



let formData=new FormData();



formData.append("name",$("#name").val());

formData.append("location",$("#location").val());

formData.append("description",$("#description").val());

formData.append("rating",$("#rating").val());

formData.append("activities",$("#activities").val());

formData.append("best_time",$("#best_time").val());

formData.append("map",$("#map").val());



if($("#image")[0].files[0]){

formData.append(
"image",
$("#image")[0].files[0]
);

}



let url;

let method;



if(id===""){


url="http://localhost:3000/api/destinations/add";

method="POST";


}

else{


url=
`http://localhost:3000/api/destinations/${id}`;


method="PUT";


formData.append(
"oldImage",
$("#oldImage").val()
);


}



$.ajax({


url:url,

method:method,

data:formData,

processData:false,

contentType:false,



success:function(response){


if(response.success){


alert("Destination saved successfully");


modal.hide();


loadDestinations();


}



}



});



});





/* ======================
EDIT
====================== */


$(document).on(
"click",
".editDestination",
function(){



const id=$(this).data("id");



$.get(

"http://localhost:3000/api/destinations",

function(response){



const destination=
response.destinations.find(
d=>d.id==id
);



$("#destinationID").val(destination.id);

$("#oldImage").val(destination.image);

$("#name").val(destination.name);

$("#location").val(destination.location);

$("#description").val(destination.description);

$("#rating").val(destination.rating);

$("#activities").val(destination.activities);

$("#best_time").val(destination.best_time);

$("#map").val(destination.map);



$(".modal-title")
.text("Edit Destination");



modal.show();



});


});





/* ======================
DELETE
====================== */


$(document).on(
"click",
".deleteDestination",
function(){



if(!confirm("Delete this destination?")){

return;

}



const id=$(this).data("id");



$.ajax({


url:
`http://localhost:3000/api/destinations/${id}`,

method:"DELETE",



success:function(response){



if(response.success){


alert("Deleted successfully");


loadDestinations();


}


}



});



});

});