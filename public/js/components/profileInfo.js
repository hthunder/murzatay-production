import escape from "lodash.escape"
import { ml } from "../utils/mark"

const setAttributes = (el, attrs) => {
    Object.entries(attrs).forEach(([attrName, attrValue]) => {
        el.setAttribute(attrName, attrValue)
    })
}

const FieldLabel = (props) => {
    const labelEl = document.createElement("label")
    labelEl.setAttribute(
        "class",
        props.class ? props.class : "my-page__about-form-label"
    )
    if (Array.isArray(props.children)) {
        labelEl.append(...props.children)
    } else {
        labelEl.append(props.children)
    }
    return labelEl
}

const FieldInput = ({ isTextarea, ...props }) => {
    const propsWithDefault = {
        type: "text",
        class: "my-page__about-form-input",
        ...props,
    }
    const inputEl = document.createElement(isTextarea ? "textarea" : "input")
    setAttributes(inputEl, propsWithDefault)
    if (Array.isArray(props.children)) {
        inputEl.append(...props.children)
    } else if (props.children) {
        inputEl.append(props.children)
    }
    return inputEl
}

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
            "div",
            {
                class: "my-page__about-avatar-container",
            },
            [
                ml("img", {
                    class: "my-page__about-avatar",
                    src: `/static${escape(avatar)}`,
                    alt: "Ваше фото",
                }),
                ml(
                    "label",
                    {
                        class: "my-page__avatar-label button button_secondary hidden",
                        type: "file",
                        name: "avatar",
                        accept: ".jpg, .jpeg, .png",
                        for: "upload-avatar",
                    },
                    "Загрузить аватар"
                ),
            ]
        ),
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
                ml("p", { class: "font-family-raleway" }, "Ник:"),
                ml(
                    "p",
                    { class: "my-page__about-field my-page__about-username" },
                    escape(username)
                ),
                ml("p", { class: "font-family-raleway" }, "Город:"),
                ml(
                    "p",
                    { class: "my-page__about-field my-page__about-city" },
                    escape(city)
                ),
                ml("p", { class: "font-family-raleway" }, "О себе:"),
                ml(
                    "p",
                    { class: "my-page__about-field my-page__about-myself" },
                    escape(about)
                ),
            ]),
            profileInfoForm,
        ]),
    ])
}
