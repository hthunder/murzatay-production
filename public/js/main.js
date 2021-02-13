import { addFavourite } from './addFavourite.js';
import { sendForm } from './sendFormData.js';

$('.log-in').on('click', function () {
    $('.pop-up__login').slideToggle();
    $('.overlay').fadeIn();
});

$('.cancel-login').on('click', function () {
    $('.pop-up__login').slideToggle();
    $('.overlay').fadeOut();
});

$('.cancel-login').on('click', function (e) {
    e.preventDefault();
});

$('.overlay').on('click', function () {
    $('.pop-up__login').fadeOut();
    $('.overlay').fadeOut();
});

$('.sign-up').on('click', function () {
    $('.pop-up__signup').slideToggle();
    $('.overlay').fadeIn();
});

$('.cancel-signup').on('click', function () {
    $('.pop-up__signup').slideToggle();
    $('.overlay').fadeOut();
});

$('.cancel-signup').on('click', function (e) {
    e.preventDefault();
});

$('.overlay').on('click', function () {
    $('.pop-up__signup').fadeOut();
    $('.overlay').fadeOut();
});

$('.log-in-mbl').on('click', function () {
    $('.pop-up__login').slideToggle();
    $('.overlay').fadeIn();
});

$('.overlay').on('click', function () {
    $('.pop-up__login').fadeOut();
    $('.overlay').fadeOut();
});

$('.sign-up-mbl').on('click', function () {
    $('.pop-up__signup').slideToggle();
    $('.overlay').fadeIn();
});

$('.overlay').on('click', function () {
    $('.pop-up__signup').fadeOut();
    $('.overlay').fadeOut();
});

/*Не закрываются выпадающие элементы при повторном клике*/

let burger = document.querySelector('.mobile-menu');
let mbMenu = document.querySelector('.menu-list');

burger.onclick = function () {
    if (mbMenu.classList.contains('open')) {
        mbMenu.classList.remove('open');
    } else {
        mbMenu.classList.add('open');
    }
};

let search = document.querySelector('.search-icon');
let searchField = document.querySelector('.search-wrap');

search.onclick = function () {
    if (searchField.classList.contains('open')) {
        searchField.classList.remove('open');
    } else {
        searchField.classList.add('open');
    }
};

let rubrickBtn = document.querySelector('.mobile-rubrics-btn-wrap');
let rubricks = document.querySelector('.rubrics-mbl-container');

rubrickBtn.onclick = function () {
    if (rubricks.classList.contains('open-rubric')) {
        rubricks.classList.remove('open-rubric');
    } else {
        rubricks.classList.add('open-rubric');
    }
};

addFavourite();
sendForm('signup__form', '/api/auth/signup');
sendForm('signin__form', '/api/auth/signin');
