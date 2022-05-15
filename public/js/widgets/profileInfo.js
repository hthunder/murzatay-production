import { ProfileInfo } from "../components/profileInfo"
import { setSizeControl } from "../utils/imgsizeControl"
import "awesome-notifications/dist/style.css"
import * as api from "../api/api"

const bindSelectorContext = (context) => (selector) =>
    context.querySelector(selector)

const updateProfileInfoUI = (profileInfoEl, newData) => {
    const boundSelector = bindSelectorContext(profileInfoEl)
    const avatarWithFallback = newData.avatar || "/img/icons/user-profile.svg"
    boundSelector(".my-page__about-avatar").src = avatarWithFallback
    boundSelector(".my-page__about-username").innerText = newData.username
    boundSelector(".my-page__about-city").innerText = newData.city
    boundSelector(".my-page__about-myself").innerText = newData.about
}

const initListeners = (userId, profileInfoEl) => {
    const submitBtn = document.querySelector(".my-page__about-form-submit")
    const uploadAvatarBtn = document.querySelector(".my-page__avatar-input")
    setSizeControl(200, submitBtn, uploadAvatarBtn)

    const editForm = profileInfoEl.querySelector(".my-page__about-edit-form")
    const profileInfo = profileInfoEl.querySelector(".my-page__about-fields")
    const toggleEditingMode = () => {
        editForm.classList.toggle("hidden")
        profileInfo.classList.toggle("hidden")
    }

    const editBtn = profileInfoEl.querySelector(".my-page__about-edit-button")
    editBtn.onclick = toggleEditingMode

    submitBtn.onclick = async () => {
        const newData = await api.sendNewProfileData(
            userId,
            new FormData(editForm)
        )
        toggleEditingMode()
        updateProfileInfoUI(profileInfoEl, newData)
    }
}

export const initProfileComponet = async () => {
    const placeForProfileInfo = document.querySelector(".my-page__js-about")
    const { userId } = placeForProfileInfo.dataset
    const profileData = await api.getProfileData(userId)

    if (profileData) {
        const profileInfoEl = ProfileInfo(profileData)
        placeForProfileInfo.appendChild(profileInfoEl)
        initListeners(userId, profileInfoEl)
    }
}
