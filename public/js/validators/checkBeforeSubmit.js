import AWN from "awesome-notifications"
import "awesome-notifications/dist/style.css"

export const checkBeforeSubmit = (validator, formElem, warningMsg) => {
    formElem.onsubmit = (e) => {
        e.preventDefault()
        if (!validator()) {
            new AWN().alert(warningMsg, {
                durations: { alert: 0 },
            })
        }
        return e.currentTarget.submit()
    }
}
