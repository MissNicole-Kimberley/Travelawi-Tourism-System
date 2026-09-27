$(document).ready(function () {

    // Check login
    const userName = sessionStorage.getItem("userName");

    if (!userName) {
        window.location.href = "login.html";
        return;
    }

    // Display logged-in user's name
    $("#welcomeName").text(userName);

    // =========================
    // SIDEBAR TOGGLE
    // =========================

    $("#menuToggle").click(function () {

        $(".dashboard-sidebar").toggleClass("collapsed");
        $(".dashboard-main").toggleClass("expanded");

    });

// =========================
    // LOGOUT
    // =========================
    $("#logoutBtn").click(function(e){

    e.preventDefault();

    sessionStorage.clear();
    localStorage.clear();

    window.location.href = "welcome.html";

});


});