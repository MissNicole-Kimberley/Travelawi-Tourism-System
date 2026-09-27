$(document).ready(function(){


loadAccommodation();



function loadAccommodation(){


$.get(

"http://localhost:3000/api/accommodation",

function(response){


$("#accommodationContainer").html("");



if(!response.success){

return;

}



response.accommodation.forEach(function(item){


$("#accommodationContainer")
.append(`


<div class="destination-card">


<img

src="http://localhost:3000/uploads/accommodation/${item.image}"

class="destination-image">


<div class="destination-info">



<span class="rating">

⭐ ${item.rating}

</span>



<h3>

${item.name}

</h3>



<p>

<i class="bi bi-person-fill"></i>

Owner: ${item.owner_name || "Unknown"}

</p>



<p class="location">

<i class="bi bi-geo-alt-fill"></i>

${item.location}

</p>



<p>

${item.description}

</p>



<p>

<strong>$${item.price}</strong> / night

</p>



<div class="card-buttons">


<button

class="dashboard-btn editAccommodation"

data-id="${item.id}"

data-name="${item.name}"

data-location="${item.location}"

data-description="${item.description}"

data-rating="${item.rating}"

data-price="${item.price}"

data-facilities="${item.facilities}"

data-ideal="${item.ideal_for}"

data-map="${item.map}"

data-image="${item.image}">


<i class="bi bi-pencil"></i>

Edit

</button>



<button

class="dashboard-btn deleteAccommodation"

data-id="${item.id}">


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





// OPEN EDIT


$(document).on("click",".editAccommodation",function(){


$("#accommodationID").val($(this).data("id"));

$("#oldImage").val($(this).data("image"));

$("#name").val($(this).data("name"));

$("#location").val($(this).data("location"));

$("#description").val($(this).data("description"));

$("#rating").val($(this).data("rating"));

$("#price").val($(this).data("price"));

$("#facilities").val($(this).data("facilities"));

$("#ideal_for").val($(this).data("ideal"));

$("#map").val($(this).data("map"));



$("#editAccommodationModal").modal("show");


});





// SAVE EDIT


$("#editAccommodationForm").submit(function(e){


e.preventDefault();



let formData = new FormData();



formData.append("name",$("#name").val());

formData.append("location",$("#location").val());

formData.append("description",$("#description").val());

formData.append("rating",$("#rating").val());

formData.append("price",$("#price").val());

formData.append("facilities",$("#facilities").val());

formData.append("ideal_for",$("#ideal_for").val());

formData.append("map",$("#map").val());

formData.append("oldImage",$("#oldImage").val());



if($("#image")[0].files[0]){

formData.append(

"image",

$("#image")[0].files[0]

);

}



$.ajax({


url:

`http://localhost:3000/api/accommodation/${$("#accommodationID").val()}`,

method:"PUT",

data:formData,

processData:false,

contentType:false,


success:function(response){


if(response.success){


alert("Accommodation updated");


$("#editAccommodationModal").modal("hide");


loadAccommodation();


}


}



});



});






// DELETE


$(document).on("click",".deleteAccommodation",function(){


if(!confirm("Delete this accommodation?")){

return;

}


let id=$(this).data("id");



$.ajax({


url:

`http://localhost:3000/api/accommodation/${id}`,


method:"DELETE",



success:function(response){


if(response.success){


alert("Accommodation deleted");


loadAccommodation();


}


}


});



});



});
