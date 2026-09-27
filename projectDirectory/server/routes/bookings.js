const express = require("express");

const router = express.Router();

const db = require("../database");



/*
=================================
ADD BOOKING (TOURIST)
=================================
*/
router.post("/add", (req, res) => {

    const {
        user_id,
        accommodation_id,
        item_name,
        item_type,
        full_name,
        guests,
        check_in,
        check_out,
        card_last4
    } = req.body;


    // =========================
    // VALIDATE REQUIRED FIELDS
    // =========================

    if (
        !user_id ||
        !item_name ||
        !item_type ||
        !full_name ||
        !guests ||
        !check_in ||
        !check_out ||
        !card_last4
    ) {

        return res.json({

            success: false,

            message:
                "Please complete all booking details."

        });

    }


    // =========================
    // VALIDATE GUESTS
    // =========================

    if (parseInt(guests) < 1) {

        return res.json({

            success: false,

            message:
                "Number of guests must be at least 1."

        });

    }


    // =========================
    // VALIDATE DATES
    // =========================

    if (check_out < check_in) {

        return res.json({

            success: false,

            message:
                "Check-out date cannot be before check-in date."

        });

    }


    // =========================
    // VALIDATE CARD
    // =========================

    if (!/^\d{4}$/.test(card_last4)) {

        return res.json({

            success: false,

            message:
                "Invalid payment details."

        });

    }


    // =========================
    // SAVE BOOKING
    // =========================

    db.run(

        `

        INSERT INTO bookings

        (
            user_id,
            accommodation_id,
            item_name,
            item_type,
            full_name,
            guests,
            check_in,
            check_out,
            card_last4
        )

        VALUES(?,?,?,?,?,?,?,?,?)

        `,

        [

            user_id,
            accommodation_id || null,
            item_name,
            item_type,
            full_name,
            guests,
            check_in,
            check_out,
            card_last4

        ],

        function(err){

            if(err){

                console.log(err);

                return res.json({

                    success: false,

                    message:
                        "Booking failed."

                });

            }


            res.json({

                success: true,

                message:
                    "Booking saved successfully."

            });

        }

    );

});



/*
=================================
COUNT TOURIST BOOKINGS
=================================
*/


router.get("/count/:userID",(req,res)=>{


db.get(

`

SELECT COUNT(*) AS total

FROM bookings

WHERE user_id=?

`,

[req.params.userID],


(err,row)=>{


if(err){

return res.json({

success:false

});

}



res.json({

success:true,

total:row.total

});


});


});






/*
=================================
GET TOURIST BOOKINGS
=================================
*/


router.get("/:userID",(req,res)=>{


db.all(

`

SELECT *

FROM bookings

WHERE user_id=?

ORDER BY id DESC

`,

[req.params.userID],


(err,rows)=>{


if(err){

console.log(err);


return res.json({

success:false

});


}



res.json({

success:true,

bookings:rows

});


});


});







/*
=================================
GET OWNER BOOKINGS
=================================

Shows bookings for properties
belonging to logged in owner

=================================
*/


router.get("/owner/:ownerID",(req,res)=>{


const ownerID=req.params.ownerID;



db.all(

`

SELECT *

FROM bookings

WHERE item_name IN

(

SELECT name

FROM accommodation

WHERE owner_id=?

)

ORDER BY id DESC

`,

[ownerID],


(err,rows)=>{


if(err){

console.log(err);


return res.json({

success:false

});


}



res.json({

success:true,

bookings:rows

});


});


});







/*
=================================
OWNER ACCEPT / DECLINE BOOKING
=================================
*/


router.put("/status/:id",(req,res)=>{


const bookingID=req.params.id;


const {status}=req.body;



db.run(

`

UPDATE bookings

SET status=?

WHERE id=?

`,

[

status,

bookingID

],


function(err){


if(err){

console.log(err);


return res.json({

success:false

});


}



res.json({

success:true,

message:"Booking status updated"

});


});


});






/*
=================================
DELETE BOOKING
=================================
*/


router.delete("/:id",(req,res)=>{


db.run(

`

DELETE FROM bookings

WHERE id=?

`,

[req.params.id],


function(err){


if(err){

console.log(err);


return res.json({

success:false

});

}



res.json({

success:true,

message:"Booking deleted"

});


});


});

router.get("/admin/all",(req,res)=>{


db.all(

`

SELECT 

bookings.*,

users.fullname AS customer_name,

accommodation.name AS accommodation_name


FROM bookings


JOIN users

ON bookings.user_id = users.id


JOIN accommodation

ON bookings.accommodation_id = accommodation.id


ORDER BY bookings.id DESC


`,

[],

(err,rows)=>{


if(err){

console.log(err);

return res.json({

success:false

});

}


res.json({

success:true,

bookings:rows

});


});


});

module.exports = router;