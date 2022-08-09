import axios from "axios"
import React, { useState } from "react"

export function Form(props) {
    const { data, editingOff, setData, userId } = props
    const [values, setValues] = useState({
        username: data.username,
        city: data.city,
        about: data.about,
    })

    const [image, setImage] = useState(null)

    const onChange = (e) => {
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("username", values.username)
        formData.append("city", values.city)
        formData.append("about", values.about)
        if (image) {
            formData.append("avatar", image) // TODO imgSizeControl use for size limiting
        }

        axios.patch(`/api/users/${userId}`, formData).then((response) => {
            setData((prevState) => {
                return { ...prevState, ...response.data }
            })
            editingOff()
        })
    }

    return (
        <form className="my-page__about-edit-form" onSubmit={onSubmit}>
            <input
                className="my-page__avatar-input"
                id="upload-avatar"
                type="file"
                name="avatar"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                    setImage(e.target.files[0])
                }}
            />
            <label className="my-page__about-form-label">
                <span>Ник:</span>
                <input
                    className="my-page__about-form-input"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                />
            </label>
            <label className="my-page__about-form-label">
                <span>Город: </span>
                <input
                    className="my-page__about-form-input"
                    name="city"
                    value={values.city}
                    onChange={onChange}
                />
            </label>
            <label className="my-page__about-form-label">
                <span>Расскажите о себе или о своих питомцах:</span>
                <textarea
                    className="my-page__about-form-textarea textarea"
                    maxLength={250}
                    name="about"
                    value={values.about}
                    onChange={onChange}
                />
            </label>
            <input
                className="my-page__about-form-submit button button_light"
                type="submit"
                value="Готово"
            />
            <input
                className="my-page__about-edit-button button button_light"
                type="button"
                value="Отменить"
                onClick={editingOff}
            />
        </form>
    )
}
