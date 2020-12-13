$('.log-in').on('click', function() {
    $('.pop-up__login').slideToggle()
    $('.overlay').fadeIn()
})

$('.cansel-login').on('click', function() {
    $('.pop-up__login').slideToggle()
    $('.overlay').fadeOut()
})

$('.cansel-login').on('click', function(e) {
    e.preventDefault()
})

$('.overlay').on('click', function(){
    $('.pop-up__login').fadeOut()
    $('.overlay').fadeOut()
})

$('.sign-up').on('click', function(){
    $('.pop-up__signup').slideToggle()
    $('.overlay').fadeIn()
})

$('.cansel-signup').on('click', function() {
    $('.pop-up__signup').slideToggle()
    $('.overlay').fadeOut()
})

$('.cansel-signup').on('click', function(e) {
    e.preventDefault()
})

$('.overlay').on('click', function(){
    $('.pop-up__signup').fadeOut()
    $('.overlay').fadeOut()
})


/*Не закрываются выпадающие элементы при повторном клике*/

let burger = document.querySelector('.mobile-menu');
let mbMenu = document.querySelector('.menu-list');


burger.onclick = function(){
    if (mbMenu.style.display = 'none'){
        mbMenu.style.display = 'block'
    } else {
        mbMenu.classList.add('.hide');
    }
}

let search = document.querySelector('.search-icon');
let searchField = document.querySelector('.search-wrap');

search.onclick = function(){
    if (searchField.style.display = 'none'){
        searchField.style.display = 'block'
    } else {
        searchField.style.display = 'none';
    }
}

let rubrickBtn = document.querySelector('.mobile-rubrics-btn-wrap');
let rubricks = document.querySelector('.rubrics-mbl-container');

rubrickBtn.onclick = function(){
    if (rubricks.style.display = 'none'){
        rubricks.style.display = 'flex'
    } else {
        rubricks.style.display = 'none';
    }
}