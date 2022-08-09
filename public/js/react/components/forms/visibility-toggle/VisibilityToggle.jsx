import React, { useState } from "react"
import styles from "./VisibilityToggle.module.css"

export function VisibilityToggle(props) {
    const { render } = props
    const [isPassVisible, setIsPassVisible] = useState(false)
    const iconURLs = {
        true: "/static/img/icons/open-eye.svg",
        false: "/static/img/icons/closed-eye.svg",
    }

    return (
        <div className={styles.wrapper}>
            {render(isPassVisible, { paddingRight: 30 })}
            <img
                src={iconURLs[isPassVisible]}
                alt="Иконка переключения видимости пароля"
                className={styles.icon}
                onClick={() => {
                    setIsPassVisible((prevVal) => !prevVal)
                }}
            />
        </div>
    )
}
