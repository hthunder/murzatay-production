export const FieldLabel = (props) => {
    const labelEl = document.createElement("label")
    labelEl.setAttribute(
        "class",
        props.class ? props.class : "my-page__about-form-label"
    )
    if (Array.isArray(props.children)) {
        labelEl.append(...props.children)
    } else {
        labelEl.append(props.children)
    }
    return labelEl
}
