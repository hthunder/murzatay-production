import { ProfileInfo } from "../components/ProfileInfo"
import { setSizeControl } from "../utils/imgsizeControl"
import "awesome-notifications/dist/style.css"
import * as api from "../api/api"

const $ = document.querySelector.bind(document)

const updateProfileInfoUI = ($pi, newData) => {
    $pi(".avatar__img").src = `/static${
        newData.avatar || "/img/icons/user-profile.svg"
    }`
    $pi(".my-page__about-username").innerText = newData.username
    $pi(".my-page__about-city").innerText = newData.city
    $pi(".my-page__about-myself").innerText = newData.about
}

const initListeners = (userId, profileInfoEl) => {
    const $pi = profileInfoEl.querySelector.bind(profileInfoEl)
    const editForm = $pi(".my-page__about-edit-form")
    const editBtn = $pi(".my-page__about-edit-button")
    function toggleEditingMode() {
        $pi(".my-page__about-info").classList.toggle(
            "my-page__about-info_editing-mode"
        )
        const isEditingMode = this.innerText === "Редактировать"
        this.innerText = isEditingMode ? "Отменить" : "Редактировать"
        this.classList.toggle("button_secondary")
        $pi(".avatar").classList.toggle("avatar_editing-mode")
        if (isEditingMode) {
            editForm.appendChild(this)
        } else {
            $pi(".my-page__about-info").appendChild(this)
        }
    }
    editBtn.onclick = toggleEditingMode

    const submitBtn = $(".my-page__about-form-submit")
    setSizeControl(200, submitBtn, $(".my-page__avatar-input"))
    submitBtn.onclick = async () => {
        const newData = await api.sendNewProfileData(
            userId,
            new FormData(editForm)
        )
        toggleEditingMode.call(editBtn)
        updateProfileInfoUI($pi, newData)
    }
}

export const initProfileComponet = async () => {
    const placeForProfileInfo = $(".my-page__js-about")
    const { userId } = placeForProfileInfo?.dataset
    const profileData = await api.getProfileData(userId)

    if (profileData) {
        const profileInfoEl = ProfileInfo(profileData)
        placeForProfileInfo.appendChild(profileInfoEl)
        initListeners(userId, profileInfoEl)
    }
}
