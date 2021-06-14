const imgInput = document.getElementById("image")
const submitBtn = document.querySelector(".edit__submit")

const imgsizeControlClosure = (sizeKb) =>
    function imgsizeControl() {
        if (this.files[0].size > sizeKb * 1024) {
            alert("Размер файла превышает допустимые 20кб")
            submitBtn.disabled = true
        } else {
            submitBtn.disabled = false
        }
    }

imgInput.onchange = imgsizeControlClosure(20)
