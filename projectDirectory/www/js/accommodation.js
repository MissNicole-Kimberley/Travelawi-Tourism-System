$(document).ready(function(){

    loadAccommodation();

function loadAccommodation(){

    $.get(

        "http://localhost:3000/api/accommodation",

        function(response){

            if(!response.success){

                return;

            }

            $("#accommodationContainer").html("");

            response.accommodation.forEach(function(hotel){

                console.log(hotel);

                $("#accommodationContainer").append(createAccommodationCard(hotel));

            });

        }

    );

}

function createAccommodationCard(hotel){

    return `

<div class="tourz-card">

    <img
        src="http://localhost:3000/uploads/accommodation/${hotel.image}"
        alt="${hotel.name}"
        class="accommodation-image">

    <div class="accommodation-info">

        <span class="rating">
            ⭐ ${hotel.rating}
        </span>

        <h3>${hotel.name}</h3>

        <p class="location">
            <i class="bi bi-geo-alt-fill"></i>
            ${hotel.location}
        </p>

        <p>
            ${hotel.description}
        </p>

        <p class="price">
            <strong>$${hotel.price}</strong> / night
        </p>

        <div class="tourz-details">

            <h5>Facilities</h5>

            <ul>

                ${
                    hotel.facilities
                    ? hotel.facilities
                        .split(",")
                        .map(item => `<li>${item.trim()}</li>`)
                        .join("")
                    : ""
                }

            </ul>

            <h5>Ideal For</h5>

            <p>${hotel.ideal_for || ""}</p>

            ${
                hotel.map
                ? `
                <iframe
                    src="${hotel.map}"
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


    <button
        class="dashboard-btn outline-btn fav-btn"
        data-name="${hotel.name}"
        data-type="Accommodation"
        data-image="http://localhost:3000/uploads/accommodation/${hotel.image}">

        <i class="bi bi-heart"></i>
        Add to Favourites

    </button>

   <button
    class="dashboard-btn book-btn"
    data-id="${hotel.id}"
    data-name="${hotel.name}"
    data-type="Accommodation">
    
    Book Accommodation

</button>

</div>

    </div>

</div>

`;
}

$(document).on("click",".tourz-card",function(e){


if($(e.target).closest("button").length){

return;

}


$(this)
.find(".tourz-details")
.stop(true,true)
.slideToggle(400);


$(this).toggleClass("active");


});

});
