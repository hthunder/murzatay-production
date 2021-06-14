export const sendForm = (formId, url) => {
    const myForm = document.getElementById(formId)

    if (myForm) {
        myForm.addEventListener("submit", function fetchFormDataRequest(e) {
            e.preventDefault()

            const formData = new FormData(this)
            fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            })
                .then((res) => res.json())
                .then((resJson) => {
                    if (resJson.redirected) {
                        window.location.href = resJson.redirectUrl
                    } else {
                        throw new Error(resJson.error)
                    }
                })
                .catch((err) => {
                    let errors
                    if (url === "/api/auth/signup") {
                        errors = document.querySelector(
                            ".pop-up__signup .pop-up__errors"
                        )
                    } else if (url === "/api/auth/signin") {
                        errors = document.querySelector(
                            ".pop-up__login .pop-up__errors"
                        )
                    }
                    if (errors) {
                        const strErr = err.toString()
                        errors.innerText = strErr.slice(7, strErr.length)
                        setTimeout(() => {
                            errors.innerText = ""
                        }, 5000)
                    }
                })
        })
    }
}
