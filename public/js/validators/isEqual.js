export const isEqual = (inputElement1, inputElement2) => {
    if (inputElement1 && inputElement2) {
        return inputElement1.value === inputElement2.value
    }
    return false
}
