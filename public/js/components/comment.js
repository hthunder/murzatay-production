export const Comment = (
    commentData,
    avatar = "/img/icons/user-profile.svg"
) => {
    const { commentId, author, comment, date } = commentData
    const div = document.createElement("div")
    div.classList.add("comments__instance-wrapper", "comments-topic-wrap")
    div.dataset.id = commentId
    div.innerHTML = `<figure class="comments-topic">
        <img src="${avatar}" alt="Аватарка" class="topic-comment-ava">
        <figcaption class="topic__comment-info">
            <p class="topic__comment-author">${author}</p>
            <p class="comments__instance-text topic__comment-text">${comment}</p>
            <p class="topic__comment-date">${new Date(date).toLocaleString(
                "en-GB"
            )}</p>
            <form class="comments__form">
                <button type="button" class="comments__delete-button">Удалить</button>
                <button type="button" class="comments__edit-button">Редактировать</button> 
            </form>
        </figcaption>
    </figure>`
    return div
}

export const EditForm = (paragraphText) => {
    const form = document.createElement("form")
    form.classList.add("comments__temp-form")
    form.innerHTML = `<p class="symbol-count">0/500</p>
        <textarea class="topic-comment" maxlength="500">${paragraphText}</textarea>
        <button type="button" class="comments__save-button">Сохранить</button>
        <button type="button" class="comments__cancel-button">Отменить</button>`
    const textarea = form.querySelector(".topic-comment")
    const counter = form.querySelector(".symbol-count")
    const cancelButton = form.querySelector(".comments__cancel-button")
    const saveButton = form.querySelector(".comments__save-button")
    return { form, textarea, counter, cancelButton, saveButton }
}
