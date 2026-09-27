$(document).ready(function () {


    /* =========================
       SAVE FAVOURITE
    ========================= */

   $(document).on("click", ".fav-btn", function(e){

        e.preventDefault();
        e.stopPropagation();


        const button = $(this);

        $.ajax({

            url:"http://localhost:3000/api/favourites/add",

            method:"POST",

            contentType:"application/json",

            data:JSON.stringify({

                user_id:sessionStorage.getItem("userID"),

                item_name:button.data("name"),

                item_type:button.data("type"),

                image:button.data("image")

            }),


            success:function(response){


                if(response.success){


                    button

                    .addClass("saved")

                    .html('<i class="bi bi-heart-fill"></i> Saved');


                }


            }


        });


    });




    /* =========================
       LOAD FAVOURITES
    ========================= */


    if($("#favouritesContainer").length){


        const userID=sessionStorage.getItem("userID");



        $.get(

            `http://localhost:3000/api/favourites/${userID}`,

            function(response){



                $("#favouritesContainer").html("");



                if(!response.success || response.favourites.length===0){



                    $("#favouritesContainer").html(`


                    <div class="empty-favourites">


                        <i class="bi bi-heart"></i>


                        <h3>No Favourites Yet</h3>


                        <p>

                        Save destinations, tours, accommodation and experiences you love.

                        </p>


                    </div>


                    `);



                    return;


                }




                response.favourites.forEach(function(item){



                    $("#favouritesContainer").append(`


                    <div class="col-lg-4 col-md-6 mb-4">


                        <div class="favourite-card">



                            <img src="${item.image}"

                            alt="${item.item_name}"

                            class="favourite-image">



                            <div class="favourite-content">


                                <span class="favourite-type">

                                    ${item.item_type}

                                </span>



                                <h3>

                                    ${item.item_name}

                                </h3>



                                <p>

                                <i class="bi bi-heart-fill"></i>

                                Saved to favourites

                                </p>




                                <button 

                                class="removeFavourite"

                                data-id="${item.id}">


                                <i class="bi bi-trash"></i>

                                Remove


                                </button>



                            </div>



                        </div>


                    </div>


                    `);



                });



            }


        );


    }






    /* =========================
       REMOVE FAVOURITE
    ========================= */


    $(document).on("click",".removeFavourite",function(){



        const button=$(this);

        const id=button.data("id");



        $.ajax({


            url:`http://localhost:3000/api/favourites/${id}`,


            method:"DELETE",



            success:function(response){


                if(response.success){


                    button.closest(".col-lg-4")

                    .fadeOut(300,function(){

                        $(this).remove();

                    });


                }


            }



        });



    });



});