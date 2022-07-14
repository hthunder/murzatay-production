import { setSizeControl } from "../utils/imgsizeControl"
import "awesome-notifications/dist/style.css"
import * as api from "../api/api"
import { ObservableStore } from "../store"

const store = new ObservableStore({
    isEditingMode: false,
})

export const initProfileComponet = async () => {
    const $ = document.querySelector.bind(document)

    const placeForProfileInfo = $(".my-page__js-about")
    const editButton = $(".my-page__about-edit-button")
    const submitButton = $(".my-page__about-form-submit")
    const editForm = $(".my-page__about-edit-form")
    const usernameInput = $(".my-page__about-form-input[name='username']")
    const cityInput = $(".my-page__about-form-input[name='city']")
    const aboutMeTextarea = $(".my-page__about-form-textarea")
    const fieldsContainer = $(".my-page__about-fields")
    const usernameField = $(".my-page__about-username")
    const cityField = $(".my-page__about-city")
    const aboutMeField = $(".my-page__about-myself")
    const aboutInfo = $(".my-page__about-info")
    const { userId } = placeForProfileInfo?.dataset

    setSizeControl(200, submitButton, $(".my-page__avatar-input"))

    submitButton.onclick = async () => {
        const newData = await api.sendNewProfileData(
            userId,
            new FormData(editForm)
        )
        store.updateState({ user: newData, isEditingMode: false })
    }

    editButton.onclick = () => {
        const snapshot = store.getStateSnapshot()
        const wasEditingMode = snapshot.isEditingMode
        store.updateState({
            isEditingMode: !wasEditingMode,
        })

        if (wasEditingMode) {
            store.updateState({
                user: { ...snapshot.user },
            })
            $(".my-page__avatar-input").value = ""
        }
    }

    store.selectState("isEditingMode", 1).subscribe((isEditingMode) => {
        editForm.classList.toggle("hidden")
        editButton.classList.toggle("button_secondary")
        $(".avatar").classList.toggle("avatar_editing-mode")
        fieldsContainer.classList.toggle("hidden")
        const appendTo = isEditingMode ? editForm : aboutInfo
        editButton.textContent = isEditingMode ? "Отменить" : "Редактировать"
        appendTo.append(editButton)
    })

    store.selectState("user").subscribe((user) => {
        if (user) {
            // костыль со статикой
            $(".avatar__img").src = `/static${
                user.avatar || "/img/icons/user-profile.svg"
            }`
            ;[
                [usernameInput, usernameField],
                [cityInput, cityField],
                [aboutMeTextarea, aboutMeField],
            ].forEach(([input, field]) => {
                input.value = user[input.name]
                field.textContent = user[input.name]
            })
        }
    })

    const profileData = await api.getProfileData(userId)
    store.updateState({ user: profileData })
}
