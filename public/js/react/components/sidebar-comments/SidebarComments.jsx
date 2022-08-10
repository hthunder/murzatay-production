import React, { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import { getSidebarComments } from "../../api/comments"

function SidebarComments() {
    const [data, setData] = useState([])

    useEffect(() => {
        getSidebarComments().then((response) => {
            setData(response.data)
        })
    }, [])

    return (
        <article className="sidebar__js-last-comments sidebar__comments">
            <h3 className="sidebar__title">Комментарии</h3>
            {data.map((commentData) => {
                return (
                    <figure
                        className="sidebar__comments-item"
                        key={commentData._id}
                    >
                        <img
                            className="sidebar__comments-img"
                            width="38"
                            height="38"
                            alt="Аватарка"
                            src={`/static${commentData.user.avatar}`}
                        />
                        <figcaption>
                            <p className="sidebar__comments-text">
                                {commentData.text}
                            </p>
                            <p className="sidebar__comments-author">
                                {commentData.user.username}
                            </p>
                        </figcaption>
                    </figure>
                )
            })}
        </article>
    )
}

const domContainer = document.querySelector("#react-sidebar-comments")
const root = createRoot(domContainer)
root.render(<SidebarComments />)
