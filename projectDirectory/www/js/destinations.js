$(document).ready(function(){

    loadDestinations();



function loadDestinations(){


    $.get(

        "http://localhost:3000/api/destinations",

        function(response){


            if(!response.success){

                return;

            }


            $("#destinationContainer").html("");



            response.destinations.forEach(function(destination){


                $("#destinationContainer").append(

                    createDestinationCard(destination)

                );


            });


        }


    );


}



function createDestinationCard(destination){


return `


<div class="tourz-card">


    <img 

    src="http://localhost:3000/uploads/destinations/${destination.image}"

    alt="${destination.name}"

    class="destination-image">



    <div class="destination-info">


        <span class="rating">

            ⭐ ${destination.rating}

        </span>



        <h3>

            ${destination.name}

        </h3>



        <p class="location">

            <i class="bi bi-geo-alt-fill"></i>

            ${destination.location}

        </p>



        <p>

            ${destination.description}

        </p>




        <div class="tourz-details">


            <h5>
                Things to do
            </h5>


            <ul>

            ${
                destination.activities

                ? destination.activities
                .split(",")
                .map(item=>`<li>${item}</li>`)
                .join("")

                : ""

            }

            </ul>



            <h5>
                Best time to visit
            </h5>


            <p>

            ${destination.best_time || ""}

            </p>



            ${
                destination.map

                ?

                `

                <iframe

                src="${destination.map}"

                width="100%"

                height="250"

                style="border:0;border-radius:15px;"

                loading="lazy">

                </iframe>

                `

                :

                ""

            }



        </div>


        <button

        class="fav-btn"

        data-name="${destination.name}"

        data-type="Destination"

        data-image="http://localhost:3000/uploads/destinations/${destination.image}">


        <i class="bi bi-heart"></i>

        Add to Favourites


        </button>



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