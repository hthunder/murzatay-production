import React from "react"
import { createRoot } from "react-dom/client"

export function LikeButton() {
    return <div>
        like button

    </div>
}

const domContainer = document.querySelector("#react-like")
const root = createRoot(domContainer)
root.render(<LikeButton />)
