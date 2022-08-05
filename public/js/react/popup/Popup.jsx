import axios from "axios"
import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"

// export const states = {
//     loginOpened: "loginOpened",
//     signupOpened: "signupOpened",
// }

export function Popup(props) {
    return (
        <article className="pop-up">
            <div className="pop-up__overlay">{props.children}</div>
        </article>
    )
}

// export function Popup(props) {
//     const { popupState, setPopupState, enableScrolling } = props

//     return (
//         <article className="pop-up">
//             {popupState === states.loginOpened && (
//                 <div className="pop-up__overlay">
//                     <form
//                         className="pop-up__login"
//                         id="signin__form"
//                         method="POST"
//                         action="/auth/signin"
//                     >
//                         <h2 className="pop-up__title pop-up__login-elem">
//                             Войти
//                         </h2>
//                         <input
//                             className="pop-up__input pop-up__login-elem"
//                             type="text"
//                             placeholder="E-mail/Login"
//                             name="username"
//                             required
//                         />
//                         <input
//                             className="pop-up__input pop-up__login-elem"
//                             type="password"
//                             placeholder="Пароль"
//                             name="password"
//                             required
//                         />
//                         <a href="/auth/forgot-pass" className="pop-up__link">
//                             Забыли пароль?
//                         </a>
//                         <button
//                             className="pop-up__submit pop-up__login-elem"
//                             type="submit"
//                         >
//                             Войти
//                         </button>
//                         <button
//                             className="pop-up__cancel-btn"
//                             type="button"
//                             onClick={() => {
//                                 setPopupState(null)
//                                 enableScrolling()
//                             }}
//                         >
//                             Отменить
//                         </button>
//                     </form>
//                 </div>
//             )}
//             {popupState === states.signupOpened && (
//                 <div className="pop-up__overlay">
//                     <form
//                         className="pop-up__signup"
//                         id="signup__form"
//                         method="POST"
//                         action="/auth/signup"
//                     >
//                         <h2 className="pop-up__title">Регистрация</h2>
//                         <input
//                             className="pop-up__input"
//                             type="text"
//                             placeholder="Login*"
//                             name="username"
//                             required
//                         />
//                         <input
//                             className="pop-up__input"
//                             type="email"
//                             placeholder="E-mail*"
//                             name="email"
//                             required
//                         />
//                         <input
//                             className="pop-up__input"
//                             type="password"
//                             placeholder="Пароль*"
//                             name="password1"
//                             required
//                         />
//                         <input
//                             className="pop-up__input"
//                             type="password"
//                             placeholder="Повторите пароль*"
//                             name="password2"
//                             required
//                         />
//                         <input
//                             className="pop-up__input"
//                             type="text"
//                             placeholder="Город"
//                             name="city"
//                         />
//                         <button className="pop-up__submit" type="submit">
//                             Зарегистрироваться
//                         </button>
//                         <button
//                             className="pop-up__cancel-btn"
//                             type="button"
//                             onClick={() => {
//                                 setPopupState(null)
//                                 enableScrolling()
//                             }}
//                         >
//                             Отменить
//                         </button>
//                     </form>
//                 </div>
//             )}
//         </article>
//     )
// }
