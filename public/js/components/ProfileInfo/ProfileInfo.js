import escape from "lodash.escape"
import { ml } from "../../utils/mark"
import { FieldInput } from "./FieldInput/FieldInput"
import { FieldLabel } from "./FieldLabel/FieldLabel"

const Span = (props) => {
    const span = document.createElement("span")
    span.textContent = props.text
    return span
}

const ProfileInfoForm = (username, city, about) => {
    const form = document.createElement("form")
    form.classList.add("my-page__about-edit-form", "hidden")
    form.append(
        FieldInput({
            class: "my-page__avatar-input",
            type: "file",
            name: "avatar",
            accept: ".jpg, .jpeg, .png",
            id: "upload-avatar",
        }),
        FieldLabel({
            children: [
                Span({
                    text: "Ник: ",
                }),
                FieldInput({
                    name: "username",
                    value: escape(username),
                }),
            ],
        }),
        FieldLabel({
            children: [
                Span({
                    text: "Город: ",
                }),
                FieldInput({
                    name: "city",
                    value: escape(city),
                }),
            ],
        }),
        FieldLabel({
            children: [
                "Расскажите о себе или о своих питомцах:",
                FieldInput({
                    class: "my-page__about-form-textarea textarea",
                    maxlength: "250",
                    name: "about",
                    placeholder: "Расскажите о себе или своих питомцах",
                    children: about,
                    isTextarea: true,
                }),
            ],
        }),
        FieldInput({
            class: "my-page__about-form-submit button button_light",
            value: "Готово",
            type: "button",
        })
    )
    return form
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
        ml(
            "label",
            {
                class: "avatar",
                type: "file",
                name: "avatar",
                accept: ".jpg, .jpeg, .png",
                for: "upload-avatar",
            },
            ml("img", {
                class: "avatar__img",
                src: `/static${escape(avatar)}`,
                alt: "Ваше фото",
            })
        ),
        ml("div", { class: "my-page__about-info" }, [
            // ml(
            //     "button",
            //     {
            //         class: "my-page__about-edit-button button button_light",
            //         type: "button",
            //     },
            //     "Редактировать"
            // ),
            ml("div", { class: "my-page__about-fields" }, [
                ml("p", {}, [
                    ml("p", { class: "font-family-raleway mv-3" }, "Ник:"),
                    ml(
                        "p",
                        {
                            class: "my-page__about-field my-page__about-username mv-3",
                        },
                        escape(username)
                    ),
                ]),
                ml("p", {}, [
                    ml("p", { class: "font-family-raleway mv-3" }, "Город:"),
                    ml(
                        "p",
                        {
                            class: "my-page__about-field my-page__about-city mv-3",
                        },
                        escape(city)
                    ),
                ]),
                ml("p", { class: "font-family-raleway mv-3" }, "О себе:"),
                ml(
                    "p",
                    { class: "my-page__about-field my-page__about-myself" },
                    escape(about)
                ),
                ml(
                    "button",
                    {
                        class: "my-page__about-edit-button button button_light",
                        type: "button",
                    },
                    "Редактировать"
                ),
            ]),
            profileInfoForm,
        ]),
    ])
}
