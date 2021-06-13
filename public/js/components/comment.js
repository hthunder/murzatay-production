export const Comment = (
    commentData,
    avatar = "/img/icons/user-profile.svg"
) => {
    const { commentId, author, comment, date } = commentData
    const article = document.createElement("article")
    article.classList.add("comments__instance")
    article.dataset.id = commentId
    article.innerHTML = `
        <img src="${avatar}" alt="Аватарка" class="comments__instance-ava">
        <div class="comments__instance-content">
            <p class="comments__instance-author">${author}</p>
            <p class="comments__instance-text">${comment}</p>
            <time class="comments__instance-date" datetime="{{${date.toISOString()}}}">
            ${new Date(date).toLocaleString("en-GB")}
            </time>
            <form class="comments__form">
                <button type="button" class="comments__delete-button">Удалить</button>
                <button type="button" class="comments__edit-button">Редактировать</button> 
            </form>
        </div>
    `
    return article
}

export const EditForm = (paragraphText) => {
    const form = document.createElement("form")
    form.classList.add("comments__temp-form")
    form.innerHTML = `<article class="textarea textarea_medium sc-textarea comments__sc-textarea">
        <p class="sc-textarea__counter comments__symbol-counter">0/500</p>
        <textarea class="sc-textarea__textarea" maxlength="500">${paragraphText}</textarea>
        </article>
        <button class="comments__save-button button" type="button">Сохранить</button>
        <button class="comments__cancel-button button" type="button">Отменить</button>`
    const textarea = form.querySelector(".sc-textarea__textarea")
    const counter = form.querySelector(".comments__symbol-counter")
    const cancelButton = form.querySelector(".comments__cancel-button")
    const saveButton = form.querySelector(".comments__save-button")
    return { form, textarea, counter, cancelButton, saveButton }
}
