import escape from "lodash.escape"
import { ml } from "../utils/mark"

const ProfileInfoForm = (username, city, about) => {
    return ml(
        "form",
        {
            class: "my-page__about-edit-form my-page__about-edit-form_hidden",
        },
        [
            ml(
                "label",
                {
                    class: "my-page__avatar-label button button_light",
                },
                [
                    "Загрузить аватар",
                    ml("input", {
                        class: "my-page__avatar-input",
                        type: "file",
                        name: "avatar",
                        accept: ".jpg, .jpeg, .png",
                    }),
                ]
            ),
            ml("label", { class: "my-page__about-form-label" }, [
                "Ник:",
                ml("input", {
                    class: "my-page__about-form-input",
                    name: "username",
                    type: "text",
                    value: escape(username),
                }),
            ]),
            ml("label", { class: "my-page__about-form-label" }, [
                "Город:",
                ml("input", {
                    name: "city",
                    type: "text",
                    value: escape(city),
                    class: "my-page__about-form-input",
                }),
            ]),
            ml("label", { class: "my-page__about-form-label" }, [
                "Расскажите о себе или своих питомцах:",
                ml(
                    "textarea",
                    {
                        maxlength: "250",
                        name: "about",
                        placeholder: "Расскажите о себе или своих питомцах",
                        class: "my-page__about-form-textarea textarea",
                    },
                    about
                ),
            ]),
            ml(
                "button",
                {
                    class: "my-page__about-form-submit button button_light",
                    type: "button",
                },
                "Готово"
            ),
        ]
    )
}

export const ProfileInfo = (profileData) => {
    const {
        username = "",
        city = "",
        about = "",
        avatar = "/img/icons/user-profile.svg",
    } = profileData

    const profileInfoForm = ProfileInfoForm(username, city, about)

    return ml("section", { class: "my-page__about" }, [
        ml("img", {
            class: "my-page__about-avatar",
            src: escape(avatar),
            alt: "Ваше фото",
        }),
        ml("div", { class: "my-page__about-info" }, [
            ml(
                "button",
                {
                    class: "my-page__about-edit-button button button_light",
                    type: "button",
                },
                "Редактировать"
            ),
            ml("div", { class: "my-page__about-fields" }, [
                ml(
                    "p",
                    { class: "my-page__about-field my-page__about-username" },
                    escape(username)
                ),
                ml(
                    "p",
                    { class: "my-page__about-field my-page__about-city" },
                    escape(city)
                ),
                ml(
                    "p",
                    { class: "my-page__about-field my-page__about-me" },
                    "Расскажите о себе или о своих питомцах:"
                ),
                ml("p", { class: "my-page__about-field" }, escape(about)),
            ]),
            profileInfoForm,
        ]),
    ])
}
