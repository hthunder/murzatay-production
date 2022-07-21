import x from "hyperaxe"
import { fromEvent, BehaviorSubject } from "rxjs"
import { exhaustMap, map, mergeAll } from "rxjs/operators"
import { $ } from "../../utils/$"
import { remove, saveEdited } from "./api"

const handleEditing = (el, isEditing$, value) => {
    fromEvent(el, "click").subscribe(() => {
        isEditing$.next(value)
    })
}

const initRemoveHandler = (el, clone, commentId) => {
    fromEvent(el, "click")
        .pipe(exhaustMap(() => remove(commentId)))
        .subscribe((response) => {
            if (response.status === 200) {
                clone.remove()
            }
        })
}

const initSaveHandler = ($ctx, commentId, isEditing$) => {
    fromEvent($ctx(".comments__save-button"), "click")
        .pipe(
            exhaustMap(() =>
                saveEdited(commentId, $ctx(".sc-textarea__textarea").value)
            )
        )
        .subscribe((response) => {
            if (response.status === 200) {
                $ctx(".comments__instance-text").innerText =
                    response.response.text
                isEditing$.next(false)
            }
        })
}

const appendEditButtons = ($ctx) => {
    const editBtn = x("button.button.comments__edit-button")(
        { type: "button" },
        "Редактировать"
    )
    const saveBtn = x("button.button.comments__save-button")(
        { type: "button" },
        "Сохранить"
    )
    const cancelBtn = x("button.button.comments__cancel-button")(
        { type: "button" },
        "Отменить"
    )

    $ctx(".comments__actions").append(editBtn)
    $ctx(".comments__form").append(saveBtn, cancelBtn)
}

const appendDeleteButtons = ($ctx) => {
    const deleteBtn = x(
        "button.button.button_secondary.comments__delete-button"
    )({ type: "button" }, "Удалить")
    $ctx(".comments__actions").append(deleteBtn)
}

const fillEl = ($ctx, data) => {
    $ctx(".comments__instance-author").innerText = data.user.username
    $ctx(".comments__instance-text").innerText = data.text
    const dateEl = $ctx(".comments__instance-date")
    dateEl.innerText = new Date(data.date).toLocaleString("en-GB")
    dateEl.setAttribute("datetime", data.date)
}

const makeElEditable = ($ctx, data) => {
    appendEditButtons($ctx)

    const symbolCounterEl = $ctx(".comments__symbol-counter")
    const textareaEl = $ctx(".sc-textarea__textarea")
    const isEditing$ = new BehaviorSubject(false)

    handleEditing($ctx(".comments__edit-button"), isEditing$, true)
    handleEditing($ctx(".comments__cancel-button"), isEditing$, false)
    initSaveHandler($ctx, data._id, isEditing$)

    const textarea$ = fromEvent(textareaEl, "input")
    textarea$.subscribe((e) => {
        symbolCounterEl.innerText = `${e.target.value.length}/500`
        textareaEl.value = e.target.value
    })
    isEditing$.subscribe((isEditing) => {
        if (isEditing) {
            $ctx(".comments__content").classList.add("hidden")
            $ctx(".comments__form").classList.remove("hidden")

            textareaEl.value = $ctx(".comments__instance-text").innerText
            symbolCounterEl.innerText = `${
                $ctx(".comments__instance-text").innerText.length
            }/500`
            return
        }
        $ctx(".comments__content").classList.remove("hidden")
        $ctx(".comments__form").classList.add("hidden")
    })
}

const makeElDelitable = ($ctx, clone, commentId) => {
    appendDeleteButtons($ctx)
    initRemoveHandler($ctx(".comments__delete-button"), clone, commentId)
}

export const makeEl = (response$) => {
    return response$.pipe(
        map((res) =>
            Array.isArray(res.response) ? res.response : [res.response]
        ),
        mergeAll(),
        map((data) => {
            const clone =
                $("#comment-template").content.firstElementChild.cloneNode(true)
            const $ctx = clone.querySelector.bind(clone)

            fillEl($ctx, data)
            if (data.isEditable) makeElEditable($ctx, data)
            if (data.isDeletable) makeElDelitable($ctx, clone, data._id)
            return clone
        })
    )
}
