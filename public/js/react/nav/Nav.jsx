import axios from "axios"
import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { links, states } from "./constants.js"
import { Modal } from "../modal/Modal.jsx"
import { LoginForm } from "../forms/LoginForm.jsx"
import { SignupForm } from "../forms/SignupForm.jsx"
import { ForgotPasswordForm } from "../forms/ForgotPasswordForm.jsx"

const disableScrolling = () => {
    document.body.classList.add("stop-scrolling")
}

const enableScrolling = () => {
    document.body.classList.remove("stop-scrolling")
}

function Nav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [modalState, setModalState] = useState(null)
    useEffect(() => {
        axios.get("/api/logged_in").then((response) => {
            setIsLoggedIn(response.data.userId)
        })
    }, [])

    const closeModal = () => {
        setModalState(null)
        enableScrolling()
    }

    const openLoginModal = () => {
        setModalState(states.loginOpened)
        disableScrolling()
    }

    const openSignupModal = () => {
        setModalState(states.signupOpened)
        disableScrolling()
    }

    const openForgotPassModal = () => {
        setModalState(states.forgotPassOpened)
        disableScrolling()
    }

    return (
        <>
            {links.map(({ text, href, auth }) => {
                const shouldRender = !auth || (auth && isLoggedIn)
                return (
                    <React.Fragment key={href}>
                        {shouldRender && (
                            <li className="nav__item">
                                <a href={href} className="nav__link">
                                    {text}
                                </a>
                            </li>
                        )}
                    </React.Fragment>
                )
            })}
            {!isLoggedIn && (
                <>
                    <li className="nav__item">
                        <button
                            className="nav__button nav__button_login"
                            onClick={() => {
                                openLoginModal()
                            }}
                        >
                            Войти
                        </button>
                    </li>
                    <li className="nav__item">
                        <button
                            className="nav__button nav__button_signup"
                            onClick={() => {
                                openSignupModal()
                            }}
                        >
                            Зарегистрироваться
                        </button>
                    </li>
                </>
            )}
            {modalState && (
                <Modal closeModal={closeModal}>
                    {modalState === states.loginOpened && (
                        <LoginForm
                            openSignupModal={openSignupModal}
                            openForgotPassModal={openForgotPassModal}
                        />
                    )}
                    {modalState === states.signupOpened && (
                        <SignupForm openLoginModal={openLoginModal} />
                    )}
                    {modalState === states.forgotPassOpened && (
                        <ForgotPasswordForm openLoginModal={openLoginModal} />
                    )}
                </Modal>
            )}
        </>
    )
}

const domContainer = document.querySelector("#react-nav")
const root = createRoot(domContainer)
root.render(<Nav />)
