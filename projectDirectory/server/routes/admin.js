const express = require("express");
const router = express.Router();

const db = require("../database");


// ==========================
// ADMIN DASHBOARD DATA
// ==========================

router.get("/dashboard", (req,res)=>{


// TOTAL USERS

db.get(
"SELECT COUNT(*) AS total FROM users",
[],
(err,userResult)=>{


if(err){
return res.json({success:false});
}



// TOTAL DESTINATIONS

db.get(
"SELECT COUNT(*) AS total FROM destinations",
[],
(err,destResult)=>{


if(err){
return res.json({success:false});
}



// TOTAL ACCOMMODATION

db.get(
"SELECT COUNT(*) AS total FROM accommodation",
[],
(err,accResult)=>{


if(err){
return res.json({success:false});
}



// TOTAL BOOKINGS

db.get(
"SELECT COUNT(*) AS total FROM bookings",
[],
(err,bookResult)=>{


if(err){
return res.json({success:false});
}




// MOST FAVOURITED

db.get(

`
SELECT item_name, COUNT(*) AS total

FROM favourites

GROUP BY item_name

ORDER BY total DESC

LIMIT 1
`

,

[],
(err,favResult)=>{



// MOST BOOKED

db.get(

`
SELECT item_name, COUNT(*) AS total

FROM bookings

GROUP BY item_name

ORDER BY total DESC

LIMIT 1

`,
[],
(err,bookFav)=>{



// NEW USER

db.get(

`
SELECT fullname

FROM users

ORDER BY id DESC

LIMIT 1

`,
[],
(err,newUser)=>{



res.json({

success:true,

totalUsers:userResult.total,

totalDestinations:destResult.total,

totalAccommodation:accResult.total,

totalBookings:bookResult.total,


mostFavourite:

favResult 
? favResult.item_name
: "None",


mostBooked:

bookFav
? bookFav.item_name
: "None",


newUser:

newUser
? newUser.fullname
: "None"



});



});



});


});


});


});


});


});


});



module.exports = router;