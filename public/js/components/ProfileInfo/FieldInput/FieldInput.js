const setAttributes = (el, attrs) => {
    Object.entries(attrs).forEach(([attrName, attrValue]) => {
        el.setAttribute(attrName, attrValue)
    })
}

export const FieldInput = ({ isTextarea, ...props }) => {
    const propsWithDefault = {
        type: "text",
        class: "my-page__about-form-input",
        ...props,
    }
    const inputEl = document.createElement(isTextarea ? "textarea" : "input")
    setAttributes(inputEl, propsWithDefault)
    if (Array.isArray(props.children)) {
        inputEl.append(...props.children)
    } else if (props.children) {
        inputEl.append(props.children)
    }
    return inputEl
}
