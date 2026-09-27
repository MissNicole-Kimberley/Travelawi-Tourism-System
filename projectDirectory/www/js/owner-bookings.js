$(document).ready(function () {

    const ownerID = sessionStorage.getItem("userID");

    if (!ownerID) {

        window.location.href = "login.html";
        return;

    }

    loadBookings();

    function loadBookings() {

        $.get(

            `http://localhost:3000/api/bookings/owner/${ownerID}`,

            function (response) {

                $("#ownerBookingsContainer").html("");

                if (!response.success || response.bookings.length === 0) {

                    $("#ownerBookingsContainer").html(`

                        <div class="col-12 text-center mt-5">

                            <i class="bi bi-calendar-x fs-1"></i>

                            <h3>No Booking Requests</h3>

                            <p>No tourists have booked your properties yet.</p>

                        </div>

                    `);

                    return;

                }

                response.bookings.forEach(function (booking) {

                    $("#ownerBookingsContainer").append(`

                        <div class="col-lg-6 mb-4">

                            <div class="booking-card">

                                <div class="booking-top">

                                    <div>

                                        <span class="booking-type">
                                            ${booking.item_type}
                                        </span>

                                        <h3>${booking.item_name}</h3>

                                    </div>

                                    <span class="booking-status">

                                        ${booking.status}

                                    </span>

                                </div>

                                <div class="booking-details">

                                    <p>

                                        <i class="bi bi-person-fill"></i>

                                        <strong>Guest:</strong>

                                        ${booking.full_name}

                                    </p>

                                    <p>

                                        <i class="bi bi-people-fill"></i>

                                        <strong>Guests:</strong>

                                        ${booking.guests}

                                    </p>

                                    <p>

                                        <i class="bi bi-calendar-event"></i>

                                        <strong>Check In:</strong>

                                        ${booking.check_in}

                                    </p>

                                    <p>

                                        <i class="bi bi-calendar-check"></i>

                                        <strong>Check Out:</strong>

                                        ${booking.check_out}

                                    </p>

                                    <p>

                                        <i class="bi bi-credit-card"></i>

                                        <strong>Card:</strong>

                                        **** ${booking.card_last4}

                                    </p>

                                </div>

                                <div class="d-flex gap-2 mt-3">

                                    <button

                                    class="btn btn-success acceptBooking"

                                    data-id="${booking.id}">

                                    Accept

                                    </button>

                                    <button

                                    class="btn btn-danger declineBooking"

                                    data-id="${booking.id}">

                                    Decline

                                    </button>

                                </div>

                            </div>

                        </div>

                    `);

                });

            }

        );

    }

    $(document).on("click", ".acceptBooking", function () {

        const id = $(this).data("id");

        $.ajax({

            url: `http://localhost:3000/api/bookings/status/${id}`,

            method: "PUT",

            contentType: "application/json",

            data: JSON.stringify({

                status: "Confirmed"

            }),

            success: function () {

                loadBookings();

            }

        });

    });

    $(document).on("click", ".declineBooking", function () {

        const id = $(this).data("id");

        $.ajax({

            url: `http://localhost:3000/api/bookings/status/${id}`,

            method: "PUT",

            contentType: "application/json",

            data: JSON.stringify({

                status: "Declined"

            }),

            success: function () {

                loadBookings();

            }

        });

    });

});