const express = require("express");

const router = express.Router();

const db = require("../database");



/*
ADD REVIEW
*/

router.post("/add",(req,res)=>{


const {

user_id,

accommodation_id,

item_name,

item_type,

rating,

comment

}=req.body;




db.run(

`

INSERT INTO reviews

(
user_id,
accommodation_id,
item_name,
item_type,
rating,
comment
)

VALUES(?,?,?,?,?,?)

`,

[

user_id,

accommodation_id,

item_name,

item_type,

rating,

comment

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

message:"Review added"

});


}



);


});


router.get("/count/:userID", (req, res) => {

    db.get(

        `SELECT COUNT(*) AS total
         FROM reviews
         WHERE user_id = ?`,

        [req.params.userID],

        (err, row) => {

            if (err) {

                return res.json({
                    success: false
                });

            }

            res.json({
                success: true,
                total: row.total
            });

        }

    );

});


/*
GET REVIEWS
*/


router.get("/",(req,res)=>{


db.all(

`

SELECT reviews.*, users.fullname

FROM reviews

JOIN users

ON reviews.user_id = users.id

ORDER BY reviews.id DESC

`,



(err,rows)=>{


if(err){

return res.json({

success:false

});

}



res.json({

success:true,

reviews:rows

});


}



);



});

router.delete("/:id", (req, res) => {

    db.run(

        `DELETE FROM reviews
        WHERE id = ?`,

        [req.params.id],

        function(err){

            if(err){

                return res.json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }

    );

});

router.get("/owner/:ownerID",(req,res)=>{


const ownerID = req.params.ownerID;



db.all(

`

SELECT
r.*,
u.fullname

FROM reviews r

JOIN accommodation a
ON r.accommodation_id = a.id

JOIN users u
ON r.user_id = u.id

WHERE a.owner_id = ?

ORDER BY r.created_at DESC

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

reviews:rows

});


});


});

router.get("/admin/all",(req,res)=>{


db.all(

`
SELECT 

reviews.*,

users.fullname

FROM reviews

JOIN users

ON reviews.user_id = users.id

ORDER BY reviews.id DESC

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

reviews:rows

});


});


});

module.exports = router;