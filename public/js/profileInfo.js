import { ProfileInfo } from "./components/profileInfo"
import { setSizeControl } from "./imgsizeControl"

export const profileRequest = async (
    placeForProfileInfo,
    method,
    editForm,
    oldProfileInfo
) => {
    try {
        const { userId } = placeForProfileInfo.dataset
        const res =
            method === "PATCH"
                ? await fetch(`/api/users/${userId}`, {
                      method,
                      mode: "same-origin",
                      body: new FormData(editForm),
                  })
                : await fetch(`api/users/${userId}`)
        const userData = await res.json()
        if (!res.ok) {
            const error = new Error()
            error.userMessage = userData.message
            throw error
        }
        const profileInfoEl = ProfileInfo(userData)
        // eslint-disable-next-line no-unused-expressions
        method === "PATCH"
            ? placeForProfileInfo.replaceChild(profileInfoEl, oldProfileInfo)
            : placeForProfileInfo.appendChild(profileInfoEl)
        const myPageAboutFormSubmit = document.querySelector(
            ".my-page__about-form-submit"
        )
        const myPageAvatarInput = document.querySelector(
            ".my-page__avatar-input"
        )
        setSizeControl(200, myPageAboutFormSubmit, myPageAvatarInput)
        // eslint-disable-next-line no-use-before-define
        setAboutEditFormListener(
            myPageAboutFormSubmit,
            placeForProfileInfo,
            profileInfoEl
        )
    } catch (e) {
        if (!e.userMessage) e.userMessage = "Произошла неизвестная ошибка"
        window.createNotification({
            closeOnClick: true,
            displayCloseButton: true,
            positionClass: "nfc-top-right",
            showDuration: "5000",
            theme: "error",
        })({
            message: e.userMessage,
        })
    }
}

export const setAboutEditFormListener = (
    myPageAboutFormSubmit,
    placeForProfileInfo,
    profileInfoEl
) => {
    const editButton = profileInfoEl.querySelector(
        ".my-page__about-edit-button"
    )
    const editForm = profileInfoEl.querySelector(".my-page__about-edit-form")
    const aboutInfo = profileInfoEl.querySelector(".my-page__about-fields")

    if (editButton) {
        editButton.onclick = () => {
            editForm.classList.toggle("my-page__about-edit-form_hidden")
            aboutInfo.classList.toggle("my-page__about-fields_hidden")
        }
    }

    if (myPageAboutFormSubmit) {
        myPageAboutFormSubmit.onclick = () => {
            profileRequest(
                placeForProfileInfo,
                "PATCH",
                editForm,
                profileInfoEl
            )
        }
    }
}

export const profileInfoInit = async () => {
    const placeForProfileInfo = document.querySelector(".my-page__js-about")

    profileRequest(placeForProfileInfo)
}
