
$(document).ready(function () {


    loadTours();


    // ==========================================
    // LOAD TOURS
    // ==========================================

    function loadTours() {

        $.get(
            "http://localhost:3000/api/tours",
            function (response) {

                console.log(response);

                if (!response.success) {
                    console.log("Failed to load tours");
                    return;
                }

                $("#tourContainer").html("");


                response.tours.forEach(function (tour) {

                    $("#tourContainer").append(`

                        <div class="tourz-card">

                            <img
                                src="http://localhost:3000/uploads/tours/${tour.image}"
                                class="destination-image"
                                alt="${tour.name}">


                            <div class="tourz-info">

                                <span class="rating">
                                    ⭐ ${tour.rating}
                                </span>


                                <h3>
                                    ${tour.name}
                                </h3>


                                <p class="location">
                                    <i class="bi bi-geo-alt-fill"></i>
                                    ${tour.location}
                                </p>


                                <p>
                                    ${tour.description}
                                </p>


                                <div class="tourz-details">

                                    <h5>
                                        Tour Includes
                                    </h5>

                                    <ul>

                                        ${
                                            tour.activities
                                            ? tour.activities
                                                .split(",")
                                                .map(function (item) {
                                                    return `<li>${item.trim()}</li>`;
                                                })
                                                .join("")
                                            : ""
                                        }

                                    </ul>


                                    <h5>
                                        Duration
                                    </h5>

                                    <p>
                                        ${tour.duration || ""}
                                    </p>


                                    <h5>
                                        Price
                                    </h5>

                                    <p>
                                        ${tour.price || ""}
                                    </p>


                                    ${
                                        tour.map
                                        ? `
                                            <iframe
                                                src="${tour.map}"
                                                width="100%"
                                                height="250"
                                                style="border:0;border-radius:15px;"
                                                loading="lazy">
                                            </iframe>
                                        `
                                        : ""
                                    }

                                </div>


                                <div class="card-buttons">


                                    <!-- FAVOURITE -->

                                    <button
                                        type="button"
                                        class="fav-btn"
                                        data-name="${tour.name}"
                                        data-type="Tour"
                                        data-image="http://localhost:3000/uploads/tours/${tour.image}">

                                        <i class="bi bi-heart"></i>

                                        Add to Favourites

                                    </button>


<button

type="button"

class="dashboard-btn book-btn"

data-type="Tour"

data-name="${tour.name}">


Book Tour


</button>


                                </div>

                            </div>

                        </div>

                    `);

                });

            }
        );

    }


    // ==========================================
    // CLICK TOUR CARD TO SHOW DETAILS
    // ==========================================

    $(document).on("click", ".tourz-card", function (e) {

        // Don't open/close details when clicking buttons
        if ($(e.target).closest("button").length) {
            return;
        }

        $(this)
            .find(".tourz-details")
            .stop(true, true)
            .slideToggle(400);

        $(this).toggleClass("active");

    });


    // ==========================================
    // OPEN BOOKING MODAL
    // ==========================================

  $(document).on("click", ".book-btn", function(e) {

    e.preventDefault();
    e.stopPropagation();

    const button = $(this);

    const name = button.data("name");
    const type = button.data("type");

    $("#bookingItem").val(name);
    $("#bookingType").val(type);

    // IMPORTANT: Tours do NOT have accommodation IDs
    $("#bookingAccommodationID").val("");

    $("#fullName").val(
        sessionStorage.getItem("userName") || ""
    );

    $("#checkIn").val("");
    $("#checkOut").val("");

    $("#checkIn")
        .prop("disabled", false)
        .prop("readonly", false)
        .prop("required", true);

    $("#checkOut")
        .prop("disabled", false)
        .prop("readonly", false)
        .prop("required", true);

    $("label[for='checkIn']").text("Departure Date");
    $("label[for='checkOut']").text("Return Date");

    const modalElement =
        document.getElementById("bookingModal");

    const modal =
        bootstrap.Modal.getOrCreateInstance(modalElement);

    modal.show();

});

});
