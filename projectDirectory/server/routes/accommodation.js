const express = require("express");

const router = express.Router();

const db = require("../database");

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({

    destination: function(req, file, cb){

          cb(null, path.join(__dirname, "../../uploads/accommodation"));

    },

    filename: function(req, file, cb){

        const uniqueName = Date.now() + "-" + file.originalname;

        cb(null, uniqueName);

    }

});

const upload = multer({

    storage: storage

});

router.get("/", (req, res) => {

    db.all(

        `
        SELECT 
        accommodation.*,
        users.fullname AS owner_name

        FROM accommodation

        JOIN users

        ON accommodation.owner_id = users.id

        ORDER BY accommodation.id DESC
        `,

        [],

        (err, rows) => {

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            res.json({

                success:true,

                accommodation:rows

            });

        }

    );

});

/* =========================
   GET OWNER PROPERTIES
========================= */

router.get("/owner/:ownerID", (req, res) => {

    db.all(

        `SELECT * FROM accommodation WHERE owner_id=?`,

        [req.params.ownerID],

        (err, rows) => {

            if (err) {

                return res.json({

                    success: false

                });

            }

            res.json({

                success: true,

                accommodation: rows

            });

        }

    );

});


/* =========================
   ADD PROPERTY
========================= */

router.post("/add", upload.single("image"), (req, res) => {

    const {

        owner_id,

        name,

        location,

        description,

        price,

        facilities

    } = req.body;

    const image = req.file ? req.file.filename : null;

    db.run(

        `INSERT INTO accommodation
        (owner_id,name,location,description,price,facilities,image)
        VALUES(?,?,?,?,?,?,?)`,

        [

            owner_id,

            name,

            location,

            description,

            price,

            facilities,

            image

        ],

        function(err){

            if(err){

                console.log(err);

                return res.json({

                    success:false,

                    message:"Failed to save property."

                });

            }

            res.json({

                success:true

            });

        }

    );

});

/* =========================
   DELETE PROPERTY
========================= */

router.delete("/:id",(req,res)=>{

    db.run(

        `DELETE FROM accommodation WHERE id=?`,

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

router.get("/owner/:ownerID", (req, res) => {

    const ownerID = req.params.ownerID;

    db.all(

        "SELECT * FROM accommodation WHERE owner_id = ?",

        [ownerID],

        (err, rows) => {

            if (err) {

                return res.json({

                    success: false

                });

            }

            res.json({

                success: true,

                accommodation: rows

            });

        }

    );

});

router.delete("/:id",(req,res)=>{

    db.run(

        "DELETE FROM accommodation WHERE id=?",

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

router.put("/:id", upload.single("image"), (req,res)=>{

    const image=req.file ? req.file.filename : req.body.oldImage;

    db.run(

`UPDATE accommodation

SET

name=?,

location=?,

description=?,

rating=?,

price=?,

facilities=?,

ideal_for=?,

map=?,

image=?,

status=?

WHERE id=?`,

[

req.body.name,

req.body.location,

req.body.description,

req.body.rating,

req.body.price,

req.body.facilities,

req.body.ideal_for,

req.body.map,

image,

req.body.status,

req.params.id

],

function(err){

if(err){

return res.json({

success:false

});

}

res.json({

success:true

});

});

});

router.get("/stats/:ownerID", (req, res) => {

    const ownerID = req.params.ownerID;

    db.get(

        `
        SELECT

        COUNT(*) AS totalProperties,

        SUM(CASE WHEN status='Available' THEN 1 ELSE 0 END) AS availableProperties

        FROM accommodation

        WHERE owner_id = ?
        `,

        [ownerID],

        (err, propertyStats) => {

            if (err) {

                return res.json({

                    success: false

                });

            }

            db.get(

                `
                SELECT COUNT(*) AS pendingBookings

                FROM bookings b

                INNER JOIN accommodation a

                ON a.name = b.item_name

                WHERE

                a.owner_id = ?

                AND b.status='Pending'
                `,

                [ownerID],

                (err, bookingStats) => {

                    if (err) {

                        return res.json({

                            success: false

                        });

                    }

                    db.get(

                        `
                        SELECT COUNT(*) AS totalReviews

                        FROM reviews r

                        INNER JOIN accommodation a

                        ON a.name = r.item_name

                        WHERE a.owner_id = ?
                        `,

                        [ownerID],

                        (err, reviewStats) => {

                            if (err) {

                                return res.json({

                                    success: false

                                });

                            }

                            res.json({

                                success: true,

                                totalProperties: propertyStats.totalProperties,

                                pendingBookings: bookingStats.pendingBookings,

                                totalReviews: reviewStats.totalReviews

                            });

                        }

                    );

                }

            );

        }

    );

});

router.put("/status/:id", (req, res) => {

    const { status } = req.body;

    db.run(
        "UPDATE bookings SET status=? WHERE id=?",
        [status, req.params.id],
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

module.exports = router;