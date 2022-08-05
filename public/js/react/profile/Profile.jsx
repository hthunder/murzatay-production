import axios from "axios"
import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { Form } from "./Form.jsx"
import { Info } from "./Info.jsx"

export function Profile() {
    const [data, setData] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [userId, setUserId] = useState(null)

    const editingOn = () => {
        setIsEditing(true)
    }

    const editingOff = () => {
        setIsEditing(false)
    }

    useEffect(() => {
        axios
            .get("/api/logged_in")
            .then((response) => {
                return response.data.userId
            })
            .then((userId) => {
                setUserId(userId)
                return axios.get(`/api/users/${userId}`)
            })
            .then((response) => {
                setData(response.data)
            })
    }, [])

    return (
        <>
            {data && (
                <div className="my-page__js-about">
                    <section className="my-page__about">
                        <label
                            className={`avatar ${
                                isEditing ? "avatar_editing-mode" : ""
                            }`}
                            htmlFor="upload-avatar"
                        >
                            <img
                                className="avatar__img "
                                alt="Ваше фото"
                                src={`/static${data.avatar}`}
                            />
                        </label>
                        <div className="my-page__about-info">
                            {isEditing ? (
                                <Form
                                    data={data}
                                    editingOff={editingOff}
                                    setData={setData}
                                    userId={userId}
                                />
                            ) : (
                                <Info data={data} editingOn={editingOn} />
                            )}
                        </div>
                    </section>
                </div>
            )}
        </>
    )
}

const domContainer = document.querySelector("#react-profile")
const root = createRoot(domContainer)
root.render(<Profile />)
