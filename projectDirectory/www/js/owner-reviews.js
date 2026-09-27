$(document).ready(function(){


const ownerID = sessionStorage.getItem("userID");


if(!ownerID){

    window.location.href="login.html";

    return;

}



loadReviews();



function loadReviews(){


$.get(

`http://localhost:3000/api/reviews/owner/${ownerID}`,

function(response){



$("#ownerReviewsContainer").html("");



if(!response.success || response.reviews.length === 0){


$("#ownerReviewsContainer").html(`


<div class="col-12 text-center mt-5">


<i class="bi bi-star fs-1"></i>


<h3>No Reviews Yet</h3>


<p>

Tourists have not reviewed your properties yet.

</p>


</div>


`);


return;


}





response.reviews.forEach(function(review){



let stars="";


for(let i=0;i<review.rating;i++){

    stars += "⭐";

}



$("#ownerReviewsContainer").append(`


<div class="col-lg-6 col-md-12 mb-4">


<div class="booking-card review-card">



<div class="booking-top">


<div>


<span class="booking-type">

${review.item_type}

</span>


<h3>

${review.item_name}

</h3>


</div>


<div>

${stars}

</div>


</div>




<div class="booking-details">



<p>

<i class="bi bi-chat-left-text-fill"></i>

<strong>Comment:</strong>

${review.comment}

</p>

<p>

<i class="bi bi-person-fill"></i>

<strong>Customer:</strong>

${review.fullname}

</p>

<p>

<i class="bi bi-calendar-event"></i>

<strong>Date:</strong>

${review.created_at}

</p>



</div>



</div>


</div>



`);



});



});


}



});