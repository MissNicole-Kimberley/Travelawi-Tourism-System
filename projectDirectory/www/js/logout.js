$(document).ready(function () {

    $("#logoutBtn").click(function (e) {

        e.preventDefault();

        if (confirm("Are you sure you want to logout?")) {

            sessionStorage.clear();
            localStorage.clear();

            window.location.href = "login.html";

        }

    });

});