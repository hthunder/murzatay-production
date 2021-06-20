export const CommentJS = (commentData) => {
    const {
        _id,
        user: { username },
        text,
        date,
        avatar = "/img/icons/user-profile.svg",
        isEditable,
    } = commentData
    const article = document.createElement("article")
    article.classList.add("comments__instance")
    article.dataset.id = _id
    article.innerHTML = `
        <img class="comments__instance-ava" src="${avatar}" alt="Аватарка">
        <div class="comments__instance-content">
            <p class="comments__instance-author">${username}</p>
            <p class="comments__instance-text">${text}</p>
            <time class="comments__instance-date" datetime="${new Date(
                date
            ).toISOString()}">
            ${new Date(date).toLocaleString("en-GB")}
            </time>
            ${
                isEditable
                    ? `<form class="comments__form">
                <button class="button comments__delete-button" type="button">Удалить</button>
                <button class="button comments__edit-button" type="button">Редактировать</button> 
            </form>`
                    : ""
            }
        </div>
    `
    return article
}

export const EditForm = (paragraphText, commentId) => {
    const form = document.createElement("form")
    form.dataset.id = commentId
    form.classList.add("comments__temp-form")
    form.innerHTML = `<article class="textarea textarea_medium sc-textarea comments__sc-textarea">
        <p class="sc-textarea__counter comments__symbol-counter">0/500</p>
        <textarea class="sc-textarea__textarea" maxlength="500">${paragraphText}</textarea>
        </article>
        <button class="comments__save-button button" type="button">Сохранить</button>
        <button class="comments__cancel-button button" type="button">Отменить</button>`
    return form
}

export const CommentTextarea = () => {
    const form = document.createElement("form")
    form.classList.add("comments__add-form")
    form.innerHTML = `
    <article class="textarea textarea_medium sc-textarea comments__sc-textarea">
        <p class="sc-textarea__counter comments__symbol-counter">0/500</p>
        <textarea class="sc-textarea__textarea" name="text" maxlength="500"></textarea>    
    </article>
    <button class="comments__add-button comments__send-button button" type="button"  data-id="">Отправить</button>
    `
    return form
}
