const userID = sessionStorage.getItem("userID");

$(document).ready(function () {

    if (!userID) {
        window.location.href = "login.html";
        return;
    }

    loadBookings();

});
    /* =========================
       OPEN BOOKING FORM
    ========================= */
$(document).on("click", ".book-btn", function(e){

    
    let name = $(this).data("name");
    
    e.preventDefault();
    e.stopPropagation();

    const button = $(this);

    $("#bookingItem").val(button.data("name"));
    $("#bookingType").val(button.data("type"));
    $("#bookingAccommodationID").val(button.data("id"));

    $("#fullName").val(sessionStorage.getItem("userName"));

    if(button.data("type") === "Tour"){

        $("#checkIn")
            .val(button.data("start"))
            .prop("readonly", true);

        $("#checkOut")
            .val(button.data("end"))
            .prop("readonly", true);

    } else {

        $("#checkIn")
            .val("")
            .prop("readonly", false);

        $("#checkOut")
            .val("")
            .prop("readonly", false);

    }

      const modalElement = document.getElementById("bookingModal");

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    modal.show();

});


    /* =========================
       LOAD BOOKINGS
    ========================= */


    loadBookings();



    function loadBookings() {


        $.get(`http://localhost:3000/api/bookings/${userID}`, function (response) {



            $("#bookingsContainer").html("");



            if (!response.success || response.bookings.length === 0) {


                $("#bookingsContainer").html(`


                    <div class="col-12 text-center mt-5">


                        <i class="bi bi-calendar-x fs-1"></i>


                        <h3>No Bookings Yet</h3>


                        <p>

                        Book a tour or accommodation to see it here.

                        </p>


                    </div>


                `);


                return;


            }




            response.bookings.forEach(function (booking) {



                $("#bookingsContainer").append(`



                <div class="col-lg-6 col-md-12 mb-4">


                    <div class="booking-card">



                        <div class="booking-top">



                            <div>


                                <span class="booking-type">

                                    ${booking.item_type}

                                </span>



                                <h3>

                                    ${booking.item_name}

                                </h3>


                            </div>




                            <span class="booking-status">

                                ${booking.status}

                            </span>



                        </div>





                        <div class="booking-details">



                            <p>

                            <i class="bi bi-person-fill"></i>

                            <strong>Name:</strong>

                            ${booking.full_name}

                            </p>




                            <p>

                            <i class="bi bi-people-fill"></i>

                            <strong>Guests:</strong>

                            ${booking.guests}

                            </p>





                            <p>

                            <i class="bi bi-calendar-event"></i>

                            <strong>From:</strong>

                            ${booking.check_in}

                            </p>





                            <p>

                            <i class="bi bi-calendar-check"></i>

                            <strong>To:</strong>

                            ${booking.check_out}

                            </p>





                            <p>

                            <i class="bi bi-credit-card"></i>

                            <strong>Card:</strong>

                            **** ${booking.card_last4}

                            </p>




                        </div>





                        <button 

                        class="cancelBooking"

                        data-id="${booking.id}">



                        <i class="bi bi-x-circle"></i>

                        Cancel Booking



                        </button>





                    </div>



                </div>



                `);



            });



        });



    }





    /* =========================
       CANCEL BOOKING
    ========================= */



    $(document).on("click", ".cancelBooking", function () {



        if (!confirm("Cancel this booking?")) {

            return;

        }




        const id = $(this).data("id");





        $.ajax({


            url:`http://localhost:3000/api/bookings/${id}`,

            method:"DELETE",




            success:function(response){



                if(response.success){


                    alert("Booking cancelled successfully");


                    loadBookings();


                }



            }




        });




    });


/* =========================
   CONFIRM BOOKING
========================= */

$(document).on("submit", "#bookingForm", function(e){

    e.preventDefault();
    e.stopPropagation();

    
// Get values safely
const fullName = ($("#fullName").val() || "").trim();

const guests = ($("#guests").val() || "").trim();

const checkIn = $("#checkIn").val() || "";

const checkOut = $("#checkOut").val() || "";

const cardNumber = ($("#cardNumber").val() || "").trim();

const expiry = $("#expiry").val() || "";

const cvv = ($("#cvv").val() || "").trim();

const bookingItem = ($("#bookingItem").val() || "").trim();

const bookingType = ($("#bookingType").val() || "").trim();

const accommodationID =
    ($("#bookingAccommodationID").val() || "").trim();


/* =========================
   CHECK REQUIRED FIELDS
========================= */

if (
    fullName === "" ||
    guests === "" ||
    checkIn === "" ||
    checkOut === "" ||
    cardNumber === "" ||
    expiry === "" ||
    cvv === ""
) {

    alert("Please complete all booking and payment details.");

    return false;
}


/* =========================
   CHECK GUESTS
========================= */

if (parseInt(guests) < 1) {

    alert("Number of guests must be at least 1.");

    return false;
}

    /* =========================
       CHECK DATES
    ========================= */

    if (checkOut < checkIn) {

        alert("Check-out/return date cannot be before the check-in/departure date.");

        return false;
    }


    /* =========================
       CHECK CARD NUMBER
    ========================= */

    const cleanCardNumber =
        cardNumber.replace(/\s/g, "");

    if (!/^\d{16}$/.test(cleanCardNumber)) {

        alert("Please enter a valid 16-digit card number.");

        return false;
    }


    /* =========================
       CHECK CVV
    ========================= */

    if (!/^\d{3}$/.test(cvv)) {

        alert("Please enter a valid 3-digit CVV.");

        return false;
    }


    /* =========================
       CHECK BOOKING ITEM
    ========================= */

    if (bookingItem === "" || bookingType === "") {

        alert("Please select a tour or accommodation first.");

        return false;
    }


    /* =========================
       PREPARE BOOKING
    ========================= */

    const bookingData = {

        user_id: sessionStorage.getItem("userID"),

        accommodation_id:
            accommodationID === ""
                ? null
                : accommodationID,

        item_name: bookingItem,

        item_type: bookingType,

        full_name: fullName,

        guests: guests,

        check_in: checkIn,

        check_out: checkOut,

        card_last4: cleanCardNumber.slice(-4)

    };


    console.log("Booking data:", bookingData);


    /* =========================
       SEND BOOKING
    ========================= */

    $.ajax({

        url: "http://localhost:3000/api/bookings/add",

        method: "POST",

        contentType: "application/json",

        data: JSON.stringify(bookingData),

        success: function(response){

            if(response.success){

                alert(
                    "Booking confirmed successfully! " +
                    "You can view your bookings in the Bookings section."
                );


                // Close modal
                const modalElement =
                    document.getElementById("bookingModal");

                const modal =
                    bootstrap.Modal.getInstance(modalElement);

                if(modal){

                    modal.hide();

                }


                // Reset form
                $("#bookingForm")[0].reset();


                // Go to bookings
                setTimeout(function(){

                    window.location.href = "bookings.html";

                }, 500);

            }

            else{

                alert(
                    response.message ||
                    "Booking failed."
                );

            }

        },

        error: function(xhr){

            console.log("Booking error:", xhr);

            alert(
                "Unable to complete booking. " +
                "Please try again."
            );

        }

    });


});