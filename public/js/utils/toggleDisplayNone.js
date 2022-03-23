export const toggleDisplayNone = (...elements) =>
    elements.forEach((element) => {
        if (element) {
            element.style.display =
                element.style.display === "none" ? "" : "none"
        }
    })
