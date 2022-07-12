import escape from "lodash.escape"
import x from "hyperaxe"

const AboutEditForm = (username, city, about) => {
    return x("form.my-page__about-edit-form")(
        x("input.my-page__avatar-input#upload-avatar")({
            type: "file",
            name: "avatar",
            accept: ".jpg, .jpeg, .png",
        }),
        x("label.my-page__about-form-label")(
            x("span")("Ник: "),
            x("input.my-page__about-form-input")({
                name: "username",
                value: escape(username),
            })
        ),
        x("label.my-page__about-form-label")(
            x("span")("Город: "),
            x("input.my-page__about-form-input")({
                name: "city",
                value: escape(city),
            })
        ),
        x("label.my-page__about-form-label")(
            x("span")("Расскажите о себе или о своих питомцах:"),
            x("textarea.my-page__about-form-textarea.textarea")(
                {
                    maxLength: "250",
                    name: "about",
                    placeholder: "Расскажите о себе или своих питомцах",
                },
                about
            )
        ),
        x("input.my-page__about-form-submit.button.button_light")({
            value: "Готово",
            type: "button",
        })
    )
}

const AboutFields = (username, city, about) => {
    const staticProfileData = [
        {
            rowName: "Ник:",
            rowValue: username,
            classKey: "username",
        },
        {
            rowName: "Город:",
            rowValue: city,
            classKey: "city",
        },
        {
            rowName: "О себе:",
            rowValue: about,
            classKey: "myself",
        },
    ]

    return x("div.my-page__about-fields")([
        staticProfileData.map(({ rowName, rowValue, classKey }) => {
            return x("p")(
                x("p.font-family-raleway.mv-3")(rowName),
                x(`p.my-page__about-field.my-page__about-${classKey}.mv-3`)(
                    escape(rowValue)
                )
            )
        }),
        x("button.my-page__about-edit-button.button.button_light")(
            {
                type: "button",
            },
            "Редактировать"
        ),
    ])
}

export const ProfileInfo = (profileData) => {
    const {
        username = "",
        city = "",
        about = "",
        avatar = "/img/icons/user-profile.svg",
    } = profileData

    return x("section.my-page__about")(
        x("label.avatar")(
            {
                htmlFor: "upload-avatar",
            },
            x("img.avatar__img")({
                src: `/static${escape(avatar)}`,
                alt: "Ваше фото",
            })
        ),
        x("div.my-page__about-info")(
            AboutFields(username, city, about),
            AboutEditForm(username, city, about)
        )
    )
}
