export const ProfileInfo = (profileData) => {
    const {
        username = "",
        city = "",
        about = "",
        avatar = "/img/icons/user-profile.svg",
    } = profileData
    const section = document.createElement("section")

    section.classList.add("my-page__about")
    section.innerHTML = `
        <img class="my-page__about-avatar" src="${avatar}" alt="Ваше фото">
        <div class="my-page__about-info">
            <button class="my-page__about-edit-button button button_light" type="button">Редактировать</button>
            <div class="my-page__about-fields">
                <p class="my-page__about-field my-page__about-username">Ник: ${username}</p>
                <p class="my-page__about-field my-page__about-city">Город: ${city}</p>
                <p class="my-page__about-field my-page__about-me">Расскажите о себе или о своих питомцах:</p>
                <p class="my-page__about-field">${about}</p>
            </div>
            <form class="my-page__about-edit-form my-page__about-edit-form_hidden">
                <label class="my-page__avatar-label button button_light">
                    Загрузить аватар
                    <input class="my-page__avatar-input" type="file" name="avatar" accept=".jpg, .jpeg, .png">   
                </label>
                <label class="my-page__about-form-label">
                    Ник:
                    <input class="my-page__about-form-input" name="username" type="text" value="${username}">
                </label>
                <label class="my-page__about-form-label">
                    Город:
                    <input name="city" type="text" value="${city}" class="my-page__about-form-input">
                </label>
                <label class="my-page__about-form-label">
                        Расскажите о себе или своих питомцах:
                    <textarea maxlength="250" name="about" placeholder="Расскажите о себе или своих питомцах"
                        class="my-page__about-form-textarea textarea">${about}</textarea>
                </label>
                <button class="my-page__about-form-submit button button_light" type="button">Готово</button>
            </form>
        </div>
    `
    return section
}
