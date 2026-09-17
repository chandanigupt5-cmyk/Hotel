
// =========================
// HOTEL MANAGEMENT JS
// =========================

"use strict";
// =========================
// GET STARTED BUTTON
// =========================

function showMessage() {

    alert(
        "Welcome to Hotel Management System!\n\n" +
        "Your hotel management journey starts here."
    );

}


// =========================
// PAGE LOAD
// =========================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Hotel Management System loaded successfully.");

});


// =========================
// NAVIGATION ACTIVE LINK
// =========================

const navLinks = document.querySelectorAll(".header nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


// =========================
// CURRENT YEAR
// =========================

const footerYear = document.querySelector(".footer p");

if (footerYear) {

    const currentYear = new Date().getFullYear();

    footerYear.innerHTML =
        "© " + currentYear + " Hotel Management System";

}
