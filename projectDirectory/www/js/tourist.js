$(document).ready(function () {

    /* =========================
       CHECK LOGIN
    ========================= */

    const userName = sessionStorage.getItem("userName");

$("#welcomeName").text(userName);

    /* =========================
       CHECK tIME OF DAY
    ========================= */

const hour = new Date().getHours();

let greeting = "Evening";

if(hour < 12){

    greeting = "Morning";

}

else if(hour < 17){

    greeting = "Afternoon";

}

$("#greeting").text(greeting);

/* =========================
       SUMMARY CARDS
    ========================= */

    const userID = sessionStorage.getItem("userID");

$.get(
    `http://localhost:3000/api/favourites/count/${userID}`,
    function(response){

        if(response.success){

            $("#favCount").text(response.total);

        }

    }
);

$.get(
    `http://localhost:3000/api/bookings/count/${userID}`,
    function(response){

        if(response.success){

            $("#bookingCount").text(response.total);

        }

    }
);

$.get(
    `http://localhost:3000/api/reviews/count/${userID}`,
    function(response){

        if(response.success){

            $("#reviewCount").text(response.total);

        }

    }
);

/* =========================
   DASHBOARD FAVOURITES
========================= */

$.get(

`http://localhost:3000/api/favourites/${userID}`,

function(response){

    if(!response.success) return;

    $("#dashboardFavourites").html("");

    response.favourites.slice(0,3).forEach(function(item){

        $("#dashboardFavourites").append(`

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="mini-card">

                <img src="${item.image}" class="mini-image">

                <div class="mini-body">

                    <span class="mini-type">

                        ${item.item_type}

                    </span>

                    <h5>

                        ${item.item_name}

                    </h5>

                </div>

            </div>

        </div>

        `);

    });

});

/* =========================
   DASHBOARD BOOKINGS
========================= */

$.get(

`http://localhost:3000/api/bookings/${userID}`,

function(response){

    if(!response.success) return;

    $("#dashboardBookings").html("");

    response.bookings.slice(0,3).forEach(function(item){

        $("#dashboardBookings").append(`

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="booking-mini-card">

                <span class="booking-status">

                    ${item.status}

                </span>

                <h5>

                    ${item.item_name}

                </h5>

                <p>

                    ${item.check_in}

                </p>

            </div>

        </div>

        `);

    });

});

    /* =========================
       SIDEBAR TOGGLE
    ========================= */

    $("#menuToggle").click(function () {

        if (window.innerWidth <= 768) {

            $(".dashboard-sidebar").toggleClass("active");
            $(".sidebar-overlay").toggleClass("active");

        }

        else {

            $(".dashboard-sidebar").toggleClass("closed");
            $(".dashboard-main").toggleClass("full");

        }

    });

    $(".sidebar-overlay").click(function () {

        $(".dashboard-sidebar").removeClass("active");
        $(".sidebar-overlay").removeClass("active");

    });


    /* =========================
       VIEW DETAILS
    ========================= */

    $(".details-btn").click(function (e) {

        e.preventDefault();
        e.stopPropagation();

        $(this)
            .closest(".destination-card, .accommodation-card, .experience-card, .tour-card")
            .not(".book-btn")
            .toggleClass("clicked");

    });


    /* =========================
       SEARCH
    ========================= */

    $("#destinationSearch, #accommodationSearch, #experienceSearch, #tourSearch").on("keyup", function () {

        let value = $(this).val().toLowerCase();

        $(".destination-card, .accommodation-card, .experience-card, .tour-card").filter(function () {

            $(this).toggle(

                $(this).text().toLowerCase().indexOf(value) > -1

            );

        });

    });


    /* =========================
       BUTTON ANIMATION
    ========================= */

    $(".dashboard-btn").click(function () {

        $(this).addClass("clicked");

    });

  const travelTips=[

"Visit Lake Malawi between May and October for the best weather.",

"Carry cash when visiting rural attractions.",

"Book accommodation early during holiday seasons.",

"Don't forget sunscreen for lake activities.",

"Support local communities by buying locally made crafts.",

"Pack a light jacket for evenings on Nyika Plateau.",

"Always carry drinking water on hiking adventures.",

"Remember your camera—Malawi's sunsets are unforgettable."

];

$("#travelTip").text(

travelTips[Math.floor(Math.random()*travelTips.length)]

);  

});