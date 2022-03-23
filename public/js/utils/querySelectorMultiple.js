export const querySelectorMultiple = (...selectors) =>
    selectors.reduce(
        (selectedElements, selector) => [
            ...selectedElements,
            document.querySelector(selector),
        ],
        []
    )
