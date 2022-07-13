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
    const { userId } = placeForProfileInfo?.dataset

    const editButton = $(".my-page__about-edit-button")
    const editForm = $(".my-page__about-edit-form")
    const aboutInfo = $(".my-page__about-info")
    const submitButton = $(".my-page__about-form-submit")

    setSizeControl(200, submitButton, $(".my-page__avatar-input"))

    submitButton.onclick = async () => {
        const newData = await api.sendNewProfileData(
            userId,
            new FormData(editForm)
        )

        store.updateState({ user: newData })
        store.updateState({ isEditingMode: false })
    }

    editButton.onclick = () => {
        const snapshot = store.getStateSnapshot()
        const wasEditingMode = snapshot.isEditingMode
        store.updateState({
            isEditingMode: !wasEditingMode,
        })

        if (wasEditingMode) {
            $(".my-page__about-form-input[name='username']").value =
                snapshot.user.username
            $(".my-page__about-form-input[name='city']").value =
                snapshot.user.city
            $(".my-page__about-form-textarea").value = snapshot.user.about
        }
    }

    store.selectState("isEditingMode").subscribe((isEditingMode) => {
        if (isEditingMode) {
            editForm.append(editButton)
            editButton.textContent = "Отменить"
            $(".my-page__about-fields").classList.add("hidden")
            $(".my-page__about-edit-form").classList.remove("hidden")
            editButton.classList.add("button_secondary")
            $(".avatar").classList.add("avatar_editing-mode")
        } else {
            aboutInfo.append(editButton)
            editButton.textContent = "Редактировать"
            $(".my-page__about-fields").classList.remove("hidden")
            $(".my-page__about-edit-form").classList.add("hidden")
            editButton.classList.remove("button_secondary")
            $(".avatar").classList.remove("avatar_editing-mode")
        }
    })

    store.selectState("user").subscribe((user) => {
        if (user) {
            // костыль со статикой
            $(".avatar__img").src = `/static${
                user.avatar || "/img/icons/user-profile.svg"
            }`
            if ($(".avatar__img").classList.contains("hidden")) {
                $(".avatar__img").classList.remove("hidden")
            }
            $(".my-page__about-username").textContent = user.username
            $(".my-page__about-form-input[name='username']").value =
                user.username
            $(".my-page__about-city").textContent = user.city
            $(".my-page__about-form-input[name='city']").value = user.city
            $(".my-page__about-myself").textContent = user.about
            $(".my-page__about-form-textarea").value = user.about
        }
    })

    const profileData = await api.getProfileData(userId)
    store.updateState({ user: profileData })
}
