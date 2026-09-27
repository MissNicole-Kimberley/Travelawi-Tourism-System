const express = require("express");

const router = express.Router();

const db = require("../database");

router.post("/add",(req,res)=>{

const{

user_id,

item_name,

item_type,

image

}=req.body;

db.run(

`INSERT OR IGNORE INTO favourites
(user_id,item_name,item_type,image)
VALUES(?,?,?,?)`,

[user_id,item_name,item_type,image],

function(err){

if(err){

return res.json({

success:false,

message:"Failed to save favourite"

});

}

res.json({

success:true,

message:"Added to favourites"

});

});

});

router.get("/count/:userID", (req, res) => {

    db.get(

        `SELECT COUNT(*) AS total
         FROM favourites
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

router.get("/:userID",(req,res)=>{

db.all(

`SELECT * FROM favourites
WHERE user_id=?`,

[req.params.userID],

(err,rows)=>{

if(err){

return res.json({

success:false

});

}

res.json({

success:true,

favourites:rows

});

});

});

router.delete("/:id",(req,res)=>{

db.run(

`DELETE FROM favourites
WHERE id=?`,

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

});

});

module.exports = router;