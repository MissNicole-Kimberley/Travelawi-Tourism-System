const express = require("express");

const router = express.Router();

const db = require("../database");

const multer = require("multer");

const path = require("path");



const storage = multer.diskStorage({

destination:function(req,file,cb){

cb(null,path.join(__dirname,"../../uploads/tours"));

},


filename:function(req,file,cb){

cb(null,Date.now()+"-"+file.originalname);

}


});


const upload = multer({

storage:storage

});




// GET ALL TOURS

router.get("/",(req,res)=>{


db.all(

"SELECT * FROM tours ORDER BY id DESC",

[],

(err,rows)=>{


if(err){

return res.json({

success:false

});

}


res.json({

success:true,

tours:rows

});


});


});




// ADD TOUR

router.post("/add",upload.single("image"),(req,res)=>{


const image=req.file ? req.file.filename : null;


db.run(

`

INSERT INTO tours

(name,location,description,price,duration,activities,image)

VALUES(?,?,?,?,?,?,?)

`,

[

req.body.name,

req.body.location,

req.body.description,

req.body.price,

req.body.duration,

req.body.activities,

image

],


function(err){


if(err){

console.log(err);

return res.json({

success:false

});

}


res.json({

success:true

});


});


});





// EDIT TOUR

router.put("/:id",upload.single("image"),(req,res)=>{


const image=req.file

? req.file.filename

: req.body.oldImage;



db.run(

`

UPDATE tours SET

name=?,

location=?,

description=?,

price=?,

duration=?,

activities=?,

image=?

WHERE id=?

`,

[

req.body.name,

req.body.location,

req.body.description,

req.body.price,

req.body.duration,

req.body.activities,

image,

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





// DELETE TOUR

router.delete("/:id",(req,res)=>{


db.run(

"DELETE FROM tours WHERE id=?",

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



module.exports=router;