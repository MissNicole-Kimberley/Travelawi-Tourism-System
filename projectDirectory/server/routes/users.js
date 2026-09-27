const express=require("express");

const router=express.Router();

const db=require("../database");

const bcrypt=require("bcrypt");


// GET USERS

router.get("/",(req,res)=>{


db.all(

`
SELECT id, fullname, email, role, created_at

FROM users

ORDER BY id DESC
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

users:rows

});


});


});




// ADD USER

router.post("/add",(req,res)=>{


const {

fullname,

email,

password,

role

}=req.body;



bcrypt.hash(password,10,(err,hash)=>{


if(err){

return res.json({
success:false
});

}



db.run(

`
INSERT INTO users

(fullname,email,password,role)

VALUES(?,?,?,?)

`,

[

fullname,

email,

hash,

role

],


function(err){



if(err){

console.log(err);

return res.json({

success:false,

message:"Email already exists"

});

}



res.json({

success:true

});



}


);



});


});




// DELETE USER


router.delete("/:id",(req,res)=>{


db.run(

`
DELETE FROM users

WHERE id=?

`,

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



module.exports=router;