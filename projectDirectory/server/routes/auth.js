const express = require("express");

const bcrypt = require("bcrypt");

const db=require("../database");


const router=express.Router();



router.post("/register",async(req,res)=>{


const {
fullname,
email,
password,
role

}=req.body;



const hashedPassword =
await bcrypt.hash(password,10);



db.run(

`
INSERT INTO users
(fullname,email,password,role)

VALUES(?,?,?,?)

`,

[
fullname,
email,
hashedPassword,
role
],

function(err){


if(err){

return res.json({
message:"Email already exists"
});

}


res.json({

message:"Account created successfully"

});


}


);


});

router.post("/login", async(req,res)=>{


const {
email,
password

}=req.body;



// Find user by email

db.get(

`
SELECT * FROM users 
WHERE email=?
`,

[email],

async function(err,user){


if(err){

return res.json({
success:false,
message:"Database error"
});

}



if(!user){

return res.json({

success:false,

message:"Email or password incorrect"

});

}




// Compare password with hashed password

const passwordMatch = await bcrypt.compare(
password,
user.password
);



if(!passwordMatch){

return res.json({

success:false,

message:"Email or password incorrect"

});

}




// Successful login

res.json({

success:true,

message:"Login successful",

fullName:user.fullname,

role:user.role,

userID:user.id


});



});


});

module.exports=router;