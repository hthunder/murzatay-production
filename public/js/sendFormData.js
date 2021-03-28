export const sendForm = (formId, url) => {
    const myForm = document.getElementById(formId)

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
            .then((res) => {
                console.log(res)
                if (res.redirected) window.location.href = res.url
                return res.json()
            })
            .then((resJson) => {
                let errors
                if (url === '/api/auth/signup') {
                     errors = document.querySelector('.pop-up__signup .pop-up__errors')
                } else if (url === '/api/auth/signin') {
                     errors = document.querySelector('.pop-up__login .pop-up__errors')
                }
                if (errors) {
                    errors.innerText = resJson.error
                    setTimeout(() => {
                        errors.innerText = ''
                    }, 5000)
                }
            })
            .catch((err) => {
                console.error(err)
            })
    })
}
