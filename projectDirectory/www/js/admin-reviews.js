$(document).ready(function(){


loadReviews();



function loadReviews(){


$.get(

"http://localhost:3000/api/reviews/admin/all",

function(response){



$("#reviewsContainer").html("");



if(!response.success || response.reviews.length===0){


$("#reviewsContainer").html(`

<div class="text-center">

<h3>No Reviews Found</h3>

</div>

`);


return;


}



response.reviews.forEach(function(review){



$("#reviewsContainer").append(`


<div class="destination-card">


<div class="destination-info">


<h3>

${review.item_name}

</h3>


<span>

${review.item_type}

</span>



<h5>

⭐ ${review.rating}

</h5>



<p>

${review.comment}

</p>



<p>

<i class="bi bi-person-fill"></i>

${review.fullname}

</p>



<small>

${review.created_at}

</small>



<br><br>


<button

class="dashboard-btn deleteReview"

data-id="${review.id}">


<i class="bi bi-trash"></i>

Remove Review


</button>



</div>


</div>



`);



});



});


}





$(document).on("click",".deleteReview",function(){



if(!confirm("Remove this review?")){

return;

}



let id=$(this).data("id");



$.ajax({


url:

`http://localhost:3000/api/reviews/${id}`,


method:"DELETE",



success:function(response){


if(response.success){


alert("Review removed");


loadReviews();


}



}



});



});



});