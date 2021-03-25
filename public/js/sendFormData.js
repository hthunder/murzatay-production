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
                if (res.redirected) window.location.href = res.url
            })
            .catch((err) => {
                console.error(err)
            })
    })
}
