export const links = [
    { text: "Главная", href: "/" },
    { text: "Об авторе", href: "/about" },
    { text: "Блог", href: "/articles" },
    { text: "Профиль", href: "/my-page", auth: true },
    { text: "Выйти", href: "/auth/logout", auth: true },
]

export const states = {
    loginOpened: "loginOpened",
    signupOpened: "signupOpened",
}