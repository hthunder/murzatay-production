import React from "react"

export function Modal(props) {
    const { closeModal } = props

    return (
        <article className="modal" onClick={closeModal}>
            <div
                className="modal__content"
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <button
                    className="modal__close-btn"
                    type="button"
                    onClick={closeModal}
                >
                    <img
                        className="modal__close-icon"
                        src="/static/img/icons/cross.svg"
                        alt="Иконка закрытия модального окна"
                    />
                </button>
                {props.children}
            </div>
        </article>
    )
}
