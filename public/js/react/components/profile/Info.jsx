import React from "react"

export function Info(props) {
    const { data, editingOn } = props
    return (
        <div className="my-page__about-fields">
            <div>
                <p className="font-family-raleway mv-3">Ник:</p>
                <p className="my-page__about-field my-page__about-username mv-3">
                    {data.username}
                </p>
            </div>
            <div>
                <p className="font-family-raleway mv-3">Город:</p>
                <p className="my-page__about-field my-page__about-city mv-3">
                    {data.city}
                </p>
            </div>
            <div>
                <p className="font-family-raleway mv-3">О себе:</p>
                <p className="my-page__about-field my-page__about-myself mv-3">
                    {data.about}
                </p>
            </div>
            <button
                className="my-page__about-edit-button button button_light"
                type="button"
                onClick={editingOn}
            >
                Редактировать
            </button>
        </div>
    )
}
