$(document).ready(function () {

    const ownerName = sessionStorage.getItem("userName");

    $("#welcomeName").text(ownerName);

const ownerID = sessionStorage.getItem("userID");

loadStats();

function loadStats(){

    $.get(

        `http://localhost:3000/api/accommodation/stats/${ownerID}`,

        function(response){

            if(!response.success) return;

            $("#totalProperties").text(response.totalProperties);

            $("#pendingBookings").text(response.pendingBookings);

            $("#totalReviews").text(response.totalReviews);

        }

    );

}


});