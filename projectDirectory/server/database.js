const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const databasePath = path.join(__dirname, "travelawi.db");

console.log("Using database:", databasePath);

const db = new sqlite3.Database(databasePath);

const bcrypt = require("bcrypt");

db.run(`
CREATE TABLE IF NOT EXISTS users (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    fullname TEXT NOT NULL,

    email TEXT UNIQUE NOT NULL,

    password TEXT NOT NULL,

    role TEXT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`, function(err){

    if(err){
        console.log("Users table error:", err);
        return;
    }

const defaultUsers = [

{
id:1,
fullname:"Nicole Kimberley Edward",
email:"n1cole3dward@gmail.com",
password:"NKE12345",
role:"Tourist"
},

{
id:2,
fullname:"Aisha Kylie Edward",
email:"missaishakylie@gmail.com",
password:"AKE12345",
role:"Tourist"
},

{
id:3,
fullname:"Ms. Coletta",
email:"coletta@gmail.com",
password:"C1234567",
role:"Accommodation Owner"
},

{
id:4,
fullname:"Mr. Tendai Bwanaissa",
email:"tendaib@gmail.com",
password:"TB123456",
role:"Accommodation Owner"
},

{
id:5,
fullname:"Mrs. Madalitso Hlongo",
email:"mhlongo@gmail.com",
password:"MH123456",
role:"Accommodation Owner"
},

{
id:6,
fullname:"Ms. Wanangwa Chirwa",
email:"wchirwa@gmail.com",
password:"WC123456",
role:"Accommodation Owner"
},

{
id:7,
fullname:"Ms. T K Kaunda",
email:"tkaunda123@gmail.com",
password:"TKK12345",
role:"Travelawi Team"
},

{
id:8,
fullname:"Mr. Hanny Yobu",
email:"trav3lawi@gmail.com",
password:"HY123456",
role:"Travelawi Team"
}

];


defaultUsers.forEach(user=>{


bcrypt.hash(user.password,10,(err,hash)=>{


if(err){
    console.log(err);
    return;
}


db.run(`

INSERT OR IGNORE INTO users

(id, fullname, email, password, role)

VALUES

(?,?,?,?,?)

`,

[
user.id,
user.fullname,
user.email,
hash,
user.role
]


);


});


});

    

});

db.run(`
CREATE TABLE IF NOT EXISTS favourites (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    item_name TEXT NOT NULL,

    item_type TEXT NOT NULL,

    image TEXT,

    UNIQUE(user_id, item_name),

    FOREIGN KEY(user_id) REFERENCES users(id)

)
`);

db.run(`
CREATE TABLE IF NOT EXISTS bookings (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    accommodation_id INTEGER,

    item_name TEXT NOT NULL,

    item_type TEXT NOT NULL,

    full_name TEXT NOT NULL,

    guests INTEGER NOT NULL,

    check_in TEXT,

    check_out TEXT,

    card_last4 TEXT,

    status TEXT DEFAULT 'Pending',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id) REFERENCES users(id)

)
`);

db.run(`
CREATE TABLE IF NOT EXISTS reviews (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    accommodation_id INTEGER,

    item_name TEXT NOT NULL,

    item_type TEXT NOT NULL,

    rating INTEGER NOT NULL,

    comment TEXT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id) REFERENCES users(id),

    FOREIGN KEY(accommodation_id) REFERENCES accommodation(id)


)
`);

db.run(`
CREATE TABLE IF NOT EXISTS accommodation (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    owner_id INTEGER NOT NULL,

    name TEXT NOT NULL,

    location TEXT NOT NULL,

    description TEXT NOT NULL,

    rating REAL DEFAULT 0,

    price TEXT NOT NULL,

    facilities TEXT,

    ideal_for TEXT,

    map TEXT,

    image TEXT,

    status TEXT DEFAULT 'Available',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(owner_id) REFERENCES users(id)

)
`, function(err){

    if(err){
        console.log("Accommodation table error:", err);
    }

db.run(`
INSERT OR IGNORE INTO accommodation
(id, owner_id, name, location, description, rating, price, facilities, ideal_for, map, image, status)
VALUES
(
1,
4,
'Sunbird Waterfront',
'Senga Bay',
'A beautiful lakeside resort offering relaxing beach experiences, water activities and luxury accommodation.',
4.7,
'250',
'Lake Views, Swimming Pool, Restaurant, Water Activities',
'Beach holidays and family vacations',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.9888090381664!2d34.45606607424917!3d-13.77954807657824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x192001000db9c871%3A0x8d187cfa181ac018!2sSunbird%20Waterfront!5e0!3m2!1sen!2smw!4v1783693131349!5m2!1sen!2smw',
'sunbird-waterfront.jpg',
'Available'
)
`);

db.run(`
INSERT OR IGNORE INTO accommodation
(id, owner_id, name, location, description, rating, price, facilities, ideal_for, map, image, status)
VALUES
(
2,
3,
'Amaryllis Hotel',
'Blantyre',
'A luxury city hotel offering elegant rooms, dining experiences, spa facilities and modern hospitality.',
4.8,
'280',
'Swimming Pool, Spa, Restaurant, Free WiFi',
'Luxury accommodation',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.3668997309373!2d35.00262399999999!3d-15.7845963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18d84576cf1e00e9%3A0xdddd262797d7c570!2sAmaryllis%20Hotels!5e0!3m2!1sen!2smw!4v1783691133136!5m2!1sen!2smw',
'amaryllis-bt.jpg',
'Available'
)
`);

db.run(`
INSERT OR IGNORE INTO accommodation
(id, owner_id, name, location, description, rating, price, facilities, ideal_for, map, image, status)
VALUES
(
3,
6,
'President Hotel, BICC',
'Lilongwe',
'A premium hotel located in Umodzi Park, ideal for business travellers, conferences and luxury stays.',
4.6,
'230',
'Conference Facilities, Restaurant, Fitness Centre, Luxury Rooms',
'Business and international travellers',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.063921589165!2d33.79157250000001!3d-13.954799600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d34e7790398f%3A0x41ca39f6610f50b3!2sPresident%20Hotel%20and%20Bingu%20wa%20Mutharika%20International%20Convention%20Centre%20at%20Umodzi%20Park%20Resort!5e0!3m2!1sen!2smw!4v1783691380236!5m2!1sen!2smw',
'bicc.jpg',
'Available'
)
`);

db.run(`
INSERT OR IGNORE INTO accommodation
(id, owner_id, name, location, description, rating, price, facilities, ideal_for, map, image, status)
VALUES
(
4,
5,
'Grand Palace Hotel',
'Mzuzu',
'A comfortable hotel option in northern Malawi offering convenient accommodation for business and leisure visitors.',
4.5,
'190',
'Restaurant, Comfortable Rooms, Conference Facilities, Free WiFi',
'Northern Malawi travellers',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.2206717641093!2d33.99621107505201!3d-11.463991788729722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x191d3b1785c63001%3A0xf6d6f6b2f1a67e9e!2sGrand%20palace%20hotel!5e0!3m2!1sen!2smw!4v1785754343861!5m2!1sen!2smw',
'grand-palace.jpg',
'Available'
)
`);

});

db.run(`
CREATE TABLE IF NOT EXISTS destinations (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    location TEXT NOT NULL,

    description TEXT NOT NULL,

    rating REAL DEFAULT 0,

    activities TEXT,

    best_time TEXT,

    map TEXT,

    image TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)
`, function(err){

    if(err){
        console.log("Destinations table error:", err);
        return;
    }

    db.run(`
    INSERT OR IGNORE INTO destinations
    (id,name,location,description,rating,activities,best_time,map,image)

    VALUES

    (
    1,
    'Lake Malawi',
    'Mangochi',
    'Relax on golden beaches, enjoy crystal-clear waters, boat cruises, snorkeling, kayaking and unforgettable sunsets.',
    4.9,
    'Boat cruises,Snorkelling,Swimming,Island visits',
    'May - October',
    'https://www.google.com/maps?q=Lake+Malawi+Malawi&output=embed',
    'lake-malawi.jpg'
    ),

    (
    2,
    'Mount Mulanje',
    'Mulanje',
    'Malawi highest mountain offering breathtaking scenery, waterfalls, hiking trails and camping adventures.',
    4.8,
    'Hiking,Waterfall Viewing,Mountain Climbing,Nature Photography',
    'April - October',
    'https://www.google.com/maps?q=Mount+Mulanje+Malawi&output=embed',
    'mount-mulanje.jpg'
    ),

    (
    3,
    'Zomba Plateau',
    'Zomba',
    'Explore cool mountain air, spectacular viewpoints, waterfalls and peaceful forest walks.',
    4.7,
    'Hiking Trails,Waterfall Viewing,Forest Walks,Mulunguzi Dam',
    'May - September',
    'https://www.google.com/maps?q=Zomba+Plateau+Malawi&output=embed',
    'zomba-dam.jpg'
    ),

    (
    4,
    'Kumbali Country Lodge',
    'Lilongwe',
    'Experience authentic Malawian culture through traditional dances, local cuisine and beautiful gardens.',
    4.6,
    'Local Cuisine,Birdwatching,Banana Farm Tour,Cultural Village Visits',
    'All year round',
    'https://www.google.com/maps?q=Kumbali+Country+Lodge+Malawi&output=embed',
    'kumbali.jpg'
    )
    `);

});

db.run(`
CREATE TABLE IF NOT EXISTS tours (

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT NOT NULL,

location TEXT NOT NULL,

description TEXT NOT NULL,

rating REAL DEFAULT 0,

activities TEXT,

duration TEXT,

price TEXT,

best_time TEXT,

map TEXT,

image TEXT,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)
`,
function(err){

    if(err){

        console.log("Tours table error:", err);
        return;

    }


    db.run(`

    INSERT OR IGNORE INTO tours

    (id,name,location,description,rating,activities,duration,price,best_time,map,image)

    VALUES

    (1,
    'Echo''s Park Adventure Day',
    'Chileka, Blantyre',
    'Enjoy a fun-filled adventure day with boat rides, quad bikes, trampolines and outdoor activities.',
    4.9,
    'Boat Ride,Quad Bikes,Trampoline Activities,Outdoor Games,Photography Spots',
    '1 Day',
    'MWK 100,000 per person',
    'All year round',
    'https://www.google.com/maps?q=Echoes+Park+Chileka+Malawi&output=embed',
    'echo-logo.jpg'),


    (2,
    'Lilongwe Fun Escape',
    'Lilongwe',
    'A two-day city adventure featuring Kukuye Amusement Park, entertainment and cultural activities.',
    4.8,
    'Kukuye Amusement Park,City Tour,Food Experience,Lilongwe Wildlife Centre Visit',
    '2 Days / 1 Night',
    'MWK 350,000',
    'All year round',
    'https://www.google.com/maps?q=Kukuye+Amusement+Park+Lilongwe+Malawi&output=embed',
    'kukuye.jpg'),


    (3,
    'Gulugufe Nature Experience',
    'Blantyre',
    'A peaceful two-day nature escape with scenic views, relaxation and cultural experiences.',
    4.7,
    'Nature Walks,Butterfly Experience,Local Cuisine,Photography',
    '2 Days / 1 Night',
    'MWK 200,000',
    'All year round',
    'https://www.google.com/maps?q=Blantyre+Malawi&output=embed',
    'gulugufe.jpg'),


    (4,
    'Nyika Plateau Adventure',
    'Rumphi',
    'Escape to Malawi''s largest national park for breathtaking landscapes, wildlife encounters and unforgettable outdoor adventures.',
    4.9,
    'Guided Game Drive,Horse Riding,Nature Hiking,Wildlife Viewing,Accommodation & Meals',
    '3 Days / 2 Nights',
    'MWK 500,000 per person',
    'May - October',
    'https://www.google.com/maps?q=Nyika+National+Park+Malawi&output=embed',
    'nyika.jpg')

    `,

    function(err){

        if(err){

            console.log("Tour insert error:", err);

        }

    });


});


module.exports = db;