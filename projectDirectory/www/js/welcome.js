$(document).ready(function(){

    $(".hero").hide().fadeIn(1500);

    $(".service-card").click(function(){
        $(this).toggleClass("clicked");
    });

    $(".team-card").click(function(){
        $(this).toggleClass("clicked");
    });

    $(".cta-btn").click(function(){
        $(this).toggleClass("clicked");
    });

    $(".explore-btn").click(function(){
        $(this).toggleClass("clicked");
    });

    $(".login-btn").click(function(){
        $(this).toggleClass("clicked");
    });

    $(".contact-btn").click(function(){
        $(this).toggleClass("clicked");
    });

    $(".register-link").click(function(){
        $(this).toggleClass("clicked");
    });

    $(".nav-link").click(function(){
        $(".nav-link").removeClass("clicked");
        $(this).addClass("clicked");
    });

    $(".footer-links a, .footer-social a").click(function(){
        $(this).toggleClass("clicked");
    });

    $(document).on("mobileinit", function(){

    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.pushStateEnabled = false;

});

});