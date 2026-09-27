const express = require("express");

const router = express.Router();

const db = require("../database");





router.get("/", (req, res) => {
  let report = {};

  db.get("SELECT COUNT(*) AS count FROM users", [], (err, user) => {
    if (err) return res.json({ success: false, error: err.message });
    report.totalUsers = user.count;

    db.get("SELECT COUNT(*) AS count FROM destinations", [], (err, dest) => {
      if (err) return res.json({ success: false, error: err.message });
      report.totalDestinations = dest.count;

      db.get("SELECT COUNT(*) AS count FROM accommodation", [], (err, acc) => {
        if (err) return res.json({ success: false, error: err.message });
        report.totalAccommodation = acc.count;

        db.get("SELECT COUNT(*) AS count FROM tours", [], (err, tours) => {
          if (err) return res.json({ success: false, error: err.message });
          report.totalTours = tours.count;

          db.get("SELECT COUNT(*) AS count FROM bookings", [], (err, bookings) => {
            if (err) return res.json({ success: false, error: err.message });
            report.totalBookings = bookings.count;

            db.all(`
              SELECT 
              item_name,
              COUNT(*) AS total
              FROM favourites
              GROUP BY item_name
              ORDER BY total DESC
              LIMIT 5
            `, [], (err, favourites) => {
              if (err) return res.json({ success: false, error: err.message });

              db.all(`
                SELECT 
                item_name,
                COUNT(*) AS total
                FROM bookings
                GROUP BY item_name
                ORDER BY total DESC
                LIMIT 5
              `, [], (err, booked) => {
                if (err) return res.json({ success: false, error: err.message });

                res.json({
                  success: true,
                  report: report,
                  favourites: favourites || [],
                  booked: booked || []
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