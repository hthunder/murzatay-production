export function checkCookies() {
    const cookieDate = localStorage.getItem("cookieDate")
    const cookieNotification = document.getElementById("cookie_notification")
    const cookieBtn =
        cookieNotification &&
        cookieNotification.querySelector(".cookie__button")

    // Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы
    if (!cookieDate || +cookieDate + 31536000000 < Date.now()) {
        cookieNotification.classList.add("show")
    }

    // При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX
    cookieBtn?.addEventListener("click", () => {
        localStorage.setItem("cookieDate", Date.now())
        cookieNotification.classList.remove("show")
    })
}
