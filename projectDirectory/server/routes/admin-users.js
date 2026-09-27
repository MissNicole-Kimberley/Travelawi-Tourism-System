const express = require("express");

const router = express.Router();

const db = require("../database");



router.get("/", (req,res)=>{


db.all(

`
SELECT 
id,
fullname,
email,
role

FROM users

ORDER BY id DESC

`,

[],

(err,rows)=>{


if(err){

console.log(err);

return res.json({

success:false,

message:err.message

});

}



res.json({

success:true,

users:rows

});



});


});



module.exports = router;