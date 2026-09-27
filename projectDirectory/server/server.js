
const express = require("express");
const cors = require("cors");
const path = require("path");


const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.static(path.join(__dirname, "../www")));


const authRoutes=require("./routes/auth");
const favouriteRoutes = require("./routes/favourites");
const bookingRoutes = require("./routes/bookings");
const reviewRoutes = require("./routes/reviews");
const accommodationRoutes = require("./routes/accommodation");
const adminRoutes = require("./routes/admin");
const destinationsRoutes = require("./routes/destinations");
const usersRoutes = require("./routes/users");
const toursRoutes = require("./routes/routes");
const reportsRoute = require("./routes/reports");
const adminUsersRoutes = require("./routes/admin-users");


app.use("/api/auth",authRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/accommodation", accommodationRoutes);
app.use("/api/admin", require("./routes/admin"));
app.use("/api/destinations", require("./routes/destinations"));
app.use("/api/users", require("./routes/users"));
app.use("/api/tours", require("./routes/routes"));
app.use("/api/reports", reportsRoute);
app.use("/api/admin/users", adminUsersRoutes);

app.listen(3000, "0.0.0.0", () => {

    console.log("TRAVELAWI Server running on port 3000");

});