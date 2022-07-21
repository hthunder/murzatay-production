import { fromEvent, mergeWith, of } from "rxjs"
import { exhaustMap } from "rxjs/operators"
import { $ } from "../../utils/$"
import { makeEl } from "./makeEl"
import { send, getInitial } from "./api"

const canAddNewComments = (el) => Boolean(el)

const getNewComments = (articleId) => {
    const addFormEl = $(".comments__add-form")

    if (canAddNewComments(addFormEl)) {
        const $ctx = addFormEl.querySelector.bind(addFormEl)
        const textareaEl = $ctx(".sc-textarea__textarea")
        const symbolCounter = $ctx(".comments__symbol-counter")

        const sendClick$ = fromEvent($ctx(".comments__send-button"), "click")
        const textarea$ = fromEvent(textareaEl, "input")

        textarea$.subscribe(({ target: { value } }) => {
            symbolCounter.innerText = `${value.length}/500`
        })

        const newComment$ = sendClick$.pipe(
            exhaustMap(() => send(articleId, textareaEl.value))
        )

        newComment$.subscribe(() => {
            symbolCounter.innerText = "0/500"
            textareaEl.value = ""
        })

        return newComment$
    }
    return null
}

export const init = async () => {
    const commentsInnerEl = $(".comments__inner")
    const articleId = commentsInnerEl?.dataset?.id

    const initialComments$ = getInitial(articleId)
    const newComments$ = getNewComments(articleId)

    initialComments$
        .pipe(mergeWith(newComments$ || of()), makeEl)
        .subscribe((commentEl) => {
            commentsInnerEl.append(commentEl)
        })
}
