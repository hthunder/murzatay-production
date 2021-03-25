const editButton = document.querySelector(".information-button")
const aboutFormInputs = document.querySelectorAll(".about-form__input")
const aboutFormTexts = document.querySelectorAll(".about-form__text")

function editForm() {
    for (let i = 0; i < aboutFormInputs.length; i += 1) {
        if (aboutFormInputs[i])
            aboutFormInputs[i].classList.toggle("about-form__input_shown")
        if (aboutFormTexts[i])
            aboutFormTexts[i].classList.toggle("about-form__text_hidden")
    }
}

editButton.onclick = editForm
