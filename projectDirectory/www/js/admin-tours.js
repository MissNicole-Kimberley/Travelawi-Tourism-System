$(document).ready(function(){


loadTours();



$("#addTourBtn").click(function(){


$("#tourForm")[0].reset();

$("#tourID").val("");

$("#tourModal").modal("show");


});





function loadTours(){


$.get(

"http://localhost:3000/api/tours",

function(response){


$("#tourContainer").html("");



response.tours.forEach(function(tour){



$("#tourContainer").append(`



<div class="col-lg-4 mb-4">


<div class="destination-card">



<img 

src="http://localhost:3000/uploads/tours/${tour.image}"

class="destination-image">



<div class="destination-info">


<h3>

${tour.name}

</h3>


<p>

📍 ${tour.location}

</p>


<p>

${tour.description}

</p>



<p>

⭐ ${tour.rating}

</p>


<button

class="dashboard-btn editTour"

data-id="${tour.id}">

<i class="bi bi-pencil"></i>

Edit

</button>



<button

class="dashboard-btn deleteTour"

data-id="${tour.id}">


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







$("#tourForm").submit(function(e){


e.preventDefault();



let formData=new FormData();



formData.append("name",$("#name").val());

formData.append("location",$("#location").val());

formData.append("description",$("#description").val());

formData.append("rating",$("#rating").val());

formData.append("duration",$("#duration").val());

formData.append("price",$("#price").val());

formData.append("activities",$("#activities").val());

formData.append("best_time",$("#best_time").val());

formData.append("map",$("#map").val());


if($("#image")[0].files[0]){

formData.append(

"image",

$("#image")[0].files[0]

);

}


let id=$("#tourID").val();


let url=id

? `http://localhost:3000/api/tours/${id}`

: 

"http://localhost:3000/api/tours/add";



$.ajax({

url:url,

method:id?"PUT":"POST",

data:formData,

processData:false,

contentType:false,


success:function(){

$("#tourModal").modal("hide");

loadTours();

}


});



});






$(document).on("click",".deleteTour",function(){


let id=$(this).data("id");



if(confirm("Delete this tour?")){


$.ajax({

url:`http://localhost:3000/api/tours/${id}`,

method:"DELETE",


success:function(){

loadTours();

}


});


}


});






$(document).on("click",".editTour",function(){


let id=$(this).data("id");



$.get(

"http://localhost:3000/api/tours",

function(response){



let tour=response.tours.find(t=>t.id==id);



$("#tourID").val(tour.id);

$("#name").val(tour.name);

$("#location").val(tour.location);

$("#description").val(tour.description);

$("#rating").val(tour.rating);

$("#duration").val(tour.duration);

$("#price").val(tour.price);

$("#activities").val(tour.activities);

$("#best_time").val(tour.best_time);

$("#map").val(tour.map);


$("#tourModal").modal("show");



});


});




});