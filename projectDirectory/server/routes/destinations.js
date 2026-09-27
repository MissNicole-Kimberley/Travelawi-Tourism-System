const express=require("express");

const router=express.Router();

const db=require("../database");


router.get("/",(req,res)=>{


db.all(

"SELECT * FROM destinations ORDER BY id DESC",

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

destinations:rows

});


});


});

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: function(req,file,cb){

        cb(null,path.join(__dirname,"../../uploads/destinations"));

    },

    filename:function(req,file,cb){

        cb(null,Date.now()+"-"+file.originalname);

    }

});

const upload = multer({storage});

router.post("/add", upload.single("image"), (req,res)=>{

    const image = req.file ? req.file.filename : "";

    db.run(

`INSERT INTO destinations

(name,location,description,rating,activities,best_time,map,image)

VALUES(?,?,?,?,?,?,?,?)`,

[
req.body.name,
req.body.location,
req.body.description,
req.body.rating,
req.body.activities,
req.body.best_time,
req.body.map,
image
],

function(err){

if(err){

console.log(err);

return res.json({success:false});

}

res.json({success:true});

});

});

router.put("/:id", upload.single("image"), (req,res)=>{

const image = req.file ? req.file.filename : req.body.oldImage;

db.run(

`UPDATE destinations

SET

name=?,
location=?,
description=?,
rating=?,
activities=?,
best_time=?,
map=?,
image=?

WHERE id=?`,

[
req.body.name,
req.body.location,
req.body.description,
req.body.rating,
req.body.activities,
req.body.best_time,
req.body.map,
image,
req.params.id
],

function(err){

if(err){

console.log(err);

return res.json({success:false});

}

res.json({success:true});

});

});

router.delete("/:id",(req,res)=>{

db.run(

"DELETE FROM destinations WHERE id=?",

[req.params.id],

function(err){

if(err){

return res.json({success:false});

}

res.json({success:true});

});

});

module.exports=router;