const editButton = document.querySelector('.information-button');
const aboutForm = document.querySelector('.about-form');

editButton.onclick = function () {
    aboutForm.classList.toggle("about-form__shown");
}