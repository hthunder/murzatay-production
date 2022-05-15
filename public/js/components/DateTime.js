import { ml } from "../utils/mark"

export function DateTime(date) {
    const isoDate = new Date(date).toISOString()
    const localeDate = new Date(date).toLocaleString("en-GB")

    return ml(
        "time",
        { class: "comments__instance-date", datetime: isoDate },
        localeDate
    )
}
