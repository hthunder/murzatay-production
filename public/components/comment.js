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
