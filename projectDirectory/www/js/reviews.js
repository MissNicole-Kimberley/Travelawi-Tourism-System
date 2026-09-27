$(document).ready(function () {

    const userID = sessionStorage.getItem("userID");

    if (!userID) {

        window.location.href = "login.html";
        return;

    }

    /* =========================
       PLACE LISTS
    ========================= */

    const places = {

        Destination: [

            "Lake Malawi",
            "Mount Mulanje",
            "Zomba Plateau",
            "Liwonde National Park",
            "Nyika National Park",
            "Cape Maclear"

        ],

        Accommodation: [

            "Amaryllis Hotel",
            "Grand Palace Hotel",
            "President Hotel",
            "Sunbird Waterfront"

        ],

        Tour: [

            "Nyika Adventure Tour",
            "Lake Malawi Cruise",
            "Mulanje Hiking Tour",
            "Safari Adventure"

        ],

        Experience: [

            "Liwonde Safari",
            "Boat Cruise",
            "Cultural Village Tour",
            "Sunset Kayaking"

        ]

    };

    /* =========================
       LOAD PLACE DROPDOWN
    ========================= */

    $("#reviewType").change(function () {

    const type = $(this).val();

    $("#reviewItem").html("");

    if (type === "") {

        $("#reviewItem").append(
            '<option value="">Select a category first</option>'
        );

        return;

    }

    /* =========================
       LOAD ACCOMMODATION FROM DATABASE
    ========================= */

    if (type === "Accommodation") {

        $.get(

            "http://localhost:3000/api/accommodation",

            function (response) {

                $("#reviewItem").append(
                    '<option value="">Choose accommodation...</option>'
                );

                response.accommodation.forEach(function (place) {

                    $("#reviewItem").append(

                        `<option value="${place.id}">${place.name}</option>`

                    );

                });

            }

        );

        return;

    }

    /* =========================
       LOAD OTHER CATEGORIES
    ========================= */

    $("#reviewItem").append(
        '<option value="">Choose a place...</option>'
    );

    places[type].forEach(function (place) {

        $("#reviewItem").append(

            `<option value="${place}">${place}</option>`

        );

    });

});

    /* =========================
       LOAD REVIEWS
    ========================= */

    loadReviews();

    function loadReviews() {

        $.get(

            "http://localhost:3000/api/reviews",

            function (response) {

                $("#reviewsContainer").html("");

                if (!response.success || response.reviews.length === 0) {

                    $("#reviewsContainer").html(`

                        <div class="col-12 text-center mt-5">

                            <i class="bi bi-chat-square-text fs-1"></i>

                            <h3>No Reviews Yet</h3>

                            <p>Be the first to review a destination!</p>

                        </div>

                    `);

                    return;

                }

                response.reviews.forEach(function (review) {

                    $("#reviewsContainer").append(`

                        <div class="col-lg-6 mb-4">

                            <div class="review-card">

                                <div class="review-header">

                                    <div>

                                        <h4>${review.item_name}</h4>

                                        <small>${review.item_type}</small>

                                    </div>

                                    <span class="review-stars">

                                        ${"⭐".repeat(review.rating)}

                                    </span>

                                </div>

                                <p class="review-comment">

                                    ${review.comment}

                                </p>

                                <small>

                                    <i class="bi bi-person-fill"></i>

                                    ${review.fullname}

                                </small>
                                <button
                                    class="deleteReview"
                                    data-id="${review.id}">

                                    <i class="bi bi-trash-fill"></i>

                                     Delete

                                </button>

                            </div>

                        </div>

                    `);

                });

            }

        );

    }

    /* =========================
       SUBMIT REVIEW
    ========================= */

    $("#submitReview").click(function () {

        const reviewType = $("#reviewType").val();

    const reviewData = {

    user_id: userID,

    accommodation_id:
        reviewType === "Accommodation"
            ? $("#reviewItem").val()
            : null,

    item_name:
        reviewType === "Accommodation"
            ? $("#reviewItem option:selected").text()
            : $("#reviewItem").val(),

    item_type: reviewType,

    rating: $("#rating").val(),

    comment: $("#comment").val()

    };

        if (

            reviewData.item_type === "" ||

            reviewData.item_name === "" ||

            reviewData.rating === "" ||

            reviewData.comment === ""

        ) {

            alert("Please complete all fields.");

            return;

        }

        $.ajax({

            url: "http://localhost:3000/api/reviews/add",

            method: "POST",

            contentType: "application/json",

            data: JSON.stringify(reviewData),

            success: function (response) {

                if (response.success) {

                    alert("Review submitted successfully!");

                    $("#reviewType").val("");

                    $("#reviewItem").html(

                        '<option value="">Select a category first</option>'

                    );

                    $("#rating").val("");

                    $("#comment").val("");

                    loadReviews();

                } else {

                    alert("Failed to submit review.");

                }

            }

        });

    });

    /* =========================
   DELETE REVIEW
========================= */

$(document).on("click", ".deleteReview", function(){

    if(!confirm("Delete this review?")){

        return;

    }

    const id = $(this).data("id");

    $.ajax({

        url:`http://localhost:3000/api/reviews/${id}`,

        method:"DELETE",

        success:function(response){

            if(response.success){

                alert("Review deleted successfully!");

                loadReviews();

            }

        }

    });

 });

});
