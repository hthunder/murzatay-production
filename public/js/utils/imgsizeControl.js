const imgSizeControl = (size, trigger, { files }) => {
    if (files[0].size > size * 1024) {
        const unit = size >= 1024 ? "мб" : "кб"
        const unitSize = size >= 1024 ? size / 1024 : size
        alert(`Размер файла превышает допустимые ${unitSize} ${unit}`)
        trigger.disabled = true
    } else {
        trigger.disabled = false
    }
}

export const setSizeControl = (sizeLimitKb, submitEl, fileInputEl) => {
    if (submitEl && fileInputEl) {
        fileInputEl.onchange = () =>
            imgSizeControl(sizeLimitKb, submitEl, fileInputEl)
    }
}
