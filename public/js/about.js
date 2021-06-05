export function setAboutEditFormListener() {
    const editButton = document.querySelector(".my-page__about-edit-button")
    const editForm = document.querySelector(".my-page__about-edit-form")
    const aboutInfo = document.querySelector(".my-page__about-fields")

    if (editButton) {
        editButton.onclick = () => {
            editForm.classList.toggle("my-page__about-edit-form_hidden")
            aboutInfo.classList.toggle("my-page__about-fields_hidden")
        }
    }
}
