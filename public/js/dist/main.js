/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/addFavourite.js":
/*!***********************************!*\
  !*** ./public/js/addFavourite.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addFavourite\": () => (/* binding */ addFavourite)\n/* harmony export */ });\nconst addFavourite = () => {\n    const favouriteBtn = document.querySelector(\".topic__add-favourite\")\n\n    async function fetchRequest() {\n        const { articleId } = favouriteBtn.dataset\n        const { userId } = favouriteBtn.dataset\n        try {\n            const res = await fetch(`/api/users/${userId}`, {\n                method: \"PUT\",\n                headers: { \"Content-Type\": \"application/json\" },\n                body: JSON.stringify({ favourites: `${articleId}` }),\n            })\n            const data = await res.json()\n            if (\n                (data.favourites &&\n                    !favouriteBtn.classList.contains(\n                        \"topic__add-favourite_active\"\n                    )) ||\n                (!data.favourites &&\n                    favouriteBtn.classList.contains(\n                        \"topic__add-favourite_active\"\n                    ))\n            ) {\n                favouriteBtn.classList.toggle(\"topic__add-favourite_active\")\n            }\n        } catch (e) {\n            console.log(e)\n        }\n    }\n    if (favouriteBtn) {\n        favouriteBtn.onclick = fetchRequest\n    }\n}\n\n\n//# sourceURL=webpack://blog/./public/js/addFavourite.js?");

/***/ }),

/***/ "./public/js/animations.js":
/*!*********************************!*\
  !*** ./public/js/animations.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"slideUp\": () => (/* binding */ slideUp),\n/* harmony export */   \"slideDown\": () => (/* binding */ slideDown),\n/* harmony export */   \"slideToggle\": () => (/* binding */ slideToggle),\n/* harmony export */   \"fadeOut\": () => (/* binding */ fadeOut),\n/* harmony export */   \"fadeIn\": () => (/* binding */ fadeIn)\n/* harmony export */ });\nconst slideUp = (target, duration) => {\n    /* Sliding-up logic */\n    target.style.transitionProperty = \"height, margin, padding\"\n    target.style.transitionDuration = `${duration}ms`\n    target.style.boxSizing = \"border-box\"\n    target.style.height = `${target.offsetHeight}px`\n    target.style.height = 0\n    target.style.paddingTop = 0\n    target.style.paddingBottom = 0\n    target.style.marginTop = 0\n    target.style.marginBottom = 0\n    target.style.overflow = \"hidden\"\n    window.setTimeout(() => {\n        target.style.display = \"none\"\n        target.style.removeProperty(\"height\")\n        target.style.removeProperty(\"padding-top\")\n        target.style.removeProperty(\"padding-bottom\")\n        target.style.removeProperty(\"margin-top\")\n        target.style.removeProperty(\"margin-bottom\")\n        target.style.removeProperty(\"overflow\")\n        target.style.removeProperty(\"transition-duration\")\n        target.style.removeProperty(\"transition-property\")\n    }, duration)\n}\n\nconst slideDown = (target, duration) => {\n    /* Sliding-down logic */\n    target.style.removeProperty(\"display\")\n    let { display } = window.getComputedStyle(target)\n    if (display === \"none\") {\n        display = \"block\"\n    }\n    target.style.display = display\n    const height = target.offsetHeight\n    target.style.height = 0\n    target.style.paddingTop = 0\n    target.style.paddingBottom = 0\n    target.style.marginTop = 0\n    target.style.marginBottom = 0\n    target.style.overflow = \"hidden\"\n    target.style.boxSizing = \"border-box\"\n    target.style.transitionProperty = \"height, margin, padding\"\n    target.style.transitionDuration = `${duration}ms`\n    target.style.height = `${height}px`\n    target.style.removeProperty(\"padding-top\")\n    target.style.removeProperty(\"padding-bottom\")\n    target.style.removeProperty(\"margin-top\")\n    target.style.removeProperty(\"margin-bottom\")\n    window.setTimeout(() => {\n        target.style.removeProperty(\"height\")\n        target.style.removeProperty(\"overflow\")\n        target.style.removeProperty(\"transition-duration\")\n        target.style.removeProperty(\"transition-property\")\n    }, duration)\n}\n\nconst slideToggle = (target, duration = 500) => {\n    if (window.getComputedStyle(target).display === \"none\") {\n        return slideDown(target, duration)\n    }\n    return slideUp(target, duration)\n}\n\nfunction fadeOut(el) {\n    el.style.opacity = 1\n    ;(function fade() {\n        el.style.opacity -= 0.1\n        if (el.style.opacity <= 0) {\n            el.style.display = \"none\"\n            el.style.opacity = null\n        } else {\n            requestAnimationFrame(fade)\n        }\n    })()\n}\n\nfunction fadeIn(el, display) {\n    el.style.opacity = 0\n    el.style.display = display || \"block\"\n    ;(function fade() {\n        let val = parseFloat(el.style.opacity)\n        val += 0.1\n        if (!(val > 1)) {\n            el.style.opacity = val\n            requestAnimationFrame(fade)\n        }\n    })()\n}\n\n\n//# sourceURL=webpack://blog/./public/js/animations.js?");

/***/ }),

/***/ "./public/js/areYouSure.js":
/*!*********************************!*\
  !*** ./public/js/areYouSure.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"areYouSurePrompt\": () => (/* binding */ areYouSurePrompt)\n/* harmony export */ });\nconst areYouSurePrompt = (element, message, callback) => {\n    if (element) {\n        element.onclick = () => {\n            const confirmation = window.confirm(message)\n            if (confirmation) {\n                callback()\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://blog/./public/js/areYouSure.js?");

/***/ }),

/***/ "./public/js/comments.js":
/*!*******************************!*\
  !*** ./public/js/comments.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"deleteCommentRequest\": () => (/* binding */ deleteCommentRequest),\n/* harmony export */   \"saveCommentRequest\": () => (/* binding */ saveCommentRequest),\n/* harmony export */   \"editComment\": () => (/* binding */ editComment),\n/* harmony export */   \"addCommentRequest\": () => (/* binding */ addCommentRequest),\n/* harmony export */   \"commentsInit\": () => (/* binding */ commentsInit)\n/* harmony export */ });\n/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./counter */ \"./public/js/counter.js\");\n/* harmony import */ var _components_comment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/comment */ \"./public/js/components/comment.js\");\n\n\n\nconst deleteCommentRequest = async (commentEl) => {\n    const res = await fetch(`/api/comments/${commentEl.dataset.id}`, {\n        method: \"DELETE\",\n    })\n    if (res.status === 200) {\n        commentEl.parentNode.removeChild(commentEl)\n    }\n}\n\nconst saveCommentRequest = async (commentNode, text, id) => {\n    const paragraphComment = commentNode\n    const res = await fetch(`/api/comments/${id}`, {\n        method: \"PUT\",\n        headers: {\n            \"Content-Type\": \"application/json\",\n        },\n        body: JSON.stringify({ text }),\n    })\n    if (res.status === 200) {\n        const newText = await res.json()\n        paragraphComment.textContent = newText.text\n    }\n}\n\nconst cancelEditing = (comment, editingForm) => {\n    comment.classList.toggle(\"comments__instance-content_hidden\")\n    editingForm.classList.toggle(\"comments__temp-form_hidden\")\n}\n\nconst saveEditing = async (commentContent, formEl, commentEl, textareaEl) => {\n    await saveCommentRequest(\n        commentContent.querySelector(\".comments__instance-text\"),\n        textareaEl.value,\n        commentEl.dataset.id\n    )\n    commentContent.classList.toggle(\"comments__instance-content_hidden\")\n    formEl.classList.toggle(\"comments__temp-form_hidden\")\n}\n\nconst createTempForm = (commentText, commentEl, commentContentEl) => {\n    const formEl = (0,_components_comment__WEBPACK_IMPORTED_MODULE_1__.EditForm)(commentText, commentEl.dataset.id)\n    const textareaEl = formEl.querySelector(\".sc-textarea__textarea\")\n    const counterEl = formEl.querySelector(\".comments__symbol-counter\")\n    const cancelButtonEl = formEl.querySelector(\".comments__cancel-button\")\n    const saveButtonEl = formEl.querySelector(\".comments__save-button\")\n\n    commentEl.appendChild(formEl)\n    saveButtonEl.onclick = () => {\n        saveEditing(commentContentEl, formEl, commentEl, textareaEl)\n    }\n    cancelButtonEl.onclick = () => {\n        cancelEditing(commentContentEl, formEl)\n    }\n    ;(0,_counter__WEBPACK_IMPORTED_MODULE_0__.countSymbols)(counterEl, textareaEl)\n}\n\nconst editComment = (commentEl) => {\n    const commentText = commentEl.querySelector(\".comments__instance-text\")\n        .textContent\n    const commentContentEl = commentEl.querySelector(\n        \".comments__instance-content\"\n    )\n    const tempFormEl = document.querySelector(\n        `.comments__temp-form[data-id='${commentEl.dataset.id}']`\n    )\n\n    commentContentEl.classList.toggle(\"comments__instance-content_hidden\")\n    if (!tempFormEl) {\n        createTempForm(commentText, commentEl, commentContentEl)\n    } else {\n        tempFormEl.classList.toggle(\"comments__temp-form_hidden\")\n        tempFormEl.querySelector(\".sc-textarea__textarea\").value = commentText\n        tempFormEl.querySelector(\n            \".comments__symbol-counter\"\n        ).innerHTML = `${commentText.length}/500`\n    }\n\n    // Санитайзим пользовательский ввод\n    // Если запрос неуспешен, то возвращаем параграф и кнопку редактировать и убираем кнопку сохранить\n    // Добавляем всплывающий алерт(неблокирующий), который говорит, что произошла ошибка\n}\n\nconst addCommentRequest = async (articleId, textarea) => {\n    const textareaPtr = textarea\n    const data = {\n        articleId,\n        text: textarea.value,\n    }\n    const res = await fetch(`/api/comments`, {\n        method: \"POST\",\n        headers: {\n            \"Content-Type\": \"application/json\",\n        },\n        body: JSON.stringify(data),\n    })\n    if (res.status === 200) {\n        const commentData = await res.json()\n        textareaPtr.value = \"\"\n        const event = new Event(\"input\")\n        textareaPtr.dispatchEvent(event)\n        const commentEl = (0,_components_comment__WEBPACK_IMPORTED_MODULE_1__.CommentJS)(commentData)\n        document.querySelector(\".comments__add-form\").after(commentEl)\n\n        const deleteButton = commentEl.querySelector(\".comments__delete-button\")\n        const editButton = commentEl.querySelector(\".comments__edit-button\")\n\n        deleteButton.onclick = () => {\n            deleteCommentRequest(commentEl)\n        }\n        editButton.onclick = () => {\n            editComment(commentEl)\n        }\n    }\n}\n\nconst getComments = async () => {\n    const addCommentPlace = document.querySelector(\".topic__js-add-comment\")\n    const allCommentsPlace = document.querySelector(\".topic__js-comments\")\n    const articleId = allCommentsPlace.dataset.id\n    if (addCommentPlace) {\n        const formEl = (0,_components_comment__WEBPACK_IMPORTED_MODULE_1__.CommentTextarea)()\n        addCommentPlace.appendChild(formEl)\n        const addButton = formEl.querySelector(\".comments__add-button\")\n        const textarea = formEl.querySelector(\".sc-textarea__textarea\")\n        addButton.onclick = () => {\n            addCommentRequest(articleId, textarea)\n        }\n    }\n\n    const res = await fetch(`/api/articles/${articleId}/comments`)\n    if (res.status === 200) {\n        const commentsData = await res.json()\n        const commentsArray = commentsData.map((commentData) =>\n            (0,_components_comment__WEBPACK_IMPORTED_MODULE_1__.CommentJS)(commentData)\n        )\n        commentsArray.forEach((el) => {\n            allCommentsPlace.appendChild(el)\n        })\n    }\n}\n\nconst commentsInit = async () => {\n    await getComments()\n    const commentsNodeList = document.querySelectorAll(\".comments__instance\")\n    commentsNodeList.forEach((commentEl) => {\n        const deleteButtonEl = commentEl.querySelector(\n            \".comments__delete-button\"\n        )\n        const editButtonEl = commentEl.querySelector(\".comments__edit-button\")\n\n        if (deleteButtonEl) {\n            deleteButtonEl.onclick = () => {\n                deleteCommentRequest(commentEl)\n            }\n        }\n\n        if (editButtonEl) {\n            editButtonEl.onclick = () => {\n                editComment(commentEl)\n            }\n        }\n    })\n}\n\n;(0,_counter__WEBPACK_IMPORTED_MODULE_0__.countSymbols)()\n\n\n//# sourceURL=webpack://blog/./public/js/comments.js?");

/***/ }),

/***/ "./public/js/components/comment.js":
/*!*****************************************!*\
  !*** ./public/js/components/comment.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CommentJS\": () => (/* binding */ CommentJS),\n/* harmony export */   \"EditForm\": () => (/* binding */ EditForm),\n/* harmony export */   \"CommentTextarea\": () => (/* binding */ CommentTextarea)\n/* harmony export */ });\nconst CommentJS = (commentData) => {\n    const {\n        _id,\n        user: { username, avatar = \"/img/icons/user-profile.svg\" },\n        text,\n        date,\n        isEditable,\n    } = commentData\n    const article = document.createElement(\"article\")\n    article.classList.add(\"comments__instance\")\n    article.dataset.id = _id\n    article.innerHTML = `\n        <img class=\"comments__instance-ava\" src=\"${avatar}\" alt=\"Аватарка\">\n        <div class=\"comments__instance-content\">\n            <p class=\"comments__instance-author\">${username}</p>\n            <p class=\"comments__instance-text\">${text}</p>\n            <time class=\"comments__instance-date\" datetime=\"${new Date(\n                date\n            ).toISOString()}\">\n            ${new Date(date).toLocaleString(\"en-GB\")}\n            </time>\n            ${\n                isEditable\n                    ? `<form class=\"comments__form\">\n                <button class=\"button comments__delete-button\" type=\"button\">Удалить</button>\n                <button class=\"button comments__edit-button\" type=\"button\">Редактировать</button> \n            </form>`\n                    : \"\"\n            }\n        </div>\n    `\n    return article\n}\n\nconst EditForm = (paragraphText, commentId) => {\n    const form = document.createElement(\"form\")\n    form.dataset.id = commentId\n    form.classList.add(\"comments__temp-form\")\n    form.innerHTML = `<article class=\"textarea textarea_medium sc-textarea comments__sc-textarea\">\n        <p class=\"sc-textarea__counter comments__symbol-counter\">0/500</p>\n        <textarea class=\"sc-textarea__textarea\" maxlength=\"500\">${paragraphText}</textarea>\n        </article>\n        <button class=\"comments__save-button button\" type=\"button\">Сохранить</button>\n        <button class=\"comments__cancel-button button\" type=\"button\">Отменить</button>`\n    return form\n}\n\nconst CommentTextarea = () => {\n    const form = document.createElement(\"form\")\n    form.classList.add(\"comments__add-form\")\n    form.innerHTML = `\n    <article class=\"textarea textarea_medium sc-textarea comments__sc-textarea\">\n        <p class=\"sc-textarea__counter comments__symbol-counter\">0/500</p>\n        <textarea class=\"sc-textarea__textarea\" name=\"text\" maxlength=\"500\"></textarea>    \n    </article>\n    <button class=\"comments__add-button comments__send-button button\" type=\"button\"  data-id=\"\">Отправить</button>\n    `\n    return form\n}\n\n\n//# sourceURL=webpack://blog/./public/js/components/comment.js?");

/***/ }),

/***/ "./public/js/components/profile-info.js":
/*!**********************************************!*\
  !*** ./public/js/components/profile-info.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ProfileInfo\": () => (/* binding */ ProfileInfo)\n/* harmony export */ });\nconst ProfileInfo = (profileData) => {\n    const {\n        username = \"\",\n        city = \"\",\n        about = \"\",\n        avatar = \"/img/icons/user-profile.svg\",\n    } = profileData\n    const section = document.createElement(\"section\")\n\n    section.classList.add(\"my-page__about\")\n    section.innerHTML = `\n        <img class=\"my-page__about-avatar\" src=\"${avatar}\" alt=\"Ваше фото\">\n        <div class=\"my-page__about-info\">\n            <button class=\"my-page__about-edit-button button button_light\" type=\"button\">Редактировать</button>\n            <div class=\"my-page__about-fields\">\n                <p class=\"my-page__about-field my-page__about-username\">Ник: ${username}</p>\n                <p class=\"my-page__about-field my-page__about-city\">Город: ${city}</p>\n                <p class=\"my-page__about-field my-page__about-me\">Расскажите о себе или о своих питомцах:</p>\n                <p class=\"my-page__about-field\">${about}</p>\n            </div>\n            <form class=\"my-page__about-edit-form my-page__about-edit-form_hidden\">\n                <label class=\"my-page__avatar-label button button_light\">\n                    Загрузить аватар\n                    <input class=\"my-page__avatar-input\" type=\"file\" name=\"avatar\" accept=\".jpg, .jpeg, .png\">   \n                </label>\n                <label class=\"my-page__about-form-label\">\n                    Ник:\n                    <input class=\"my-page__about-form-input\" name=\"username\" type=\"text\" value=\"${username}\">\n                </label>\n                <label class=\"my-page__about-form-label\">\n                    Город:\n                    <input name=\"city\" type=\"text\" value=\"${city}\" class=\"my-page__about-form-input\">\n                </label>\n                <label class=\"my-page__about-form-label\">\n                        Расскажите о себе или своих питомцах:\n                    <textarea maxlength=\"250\" name=\"about\" placeholder=\"Расскажите о себе или своих питомцах\"\n                        class=\"my-page__about-form-textarea textarea\">${about}</textarea>\n                </label>\n                <button class=\"my-page__about-form-submit button button_light\" type=\"button\">Готово</button>\n            </form>\n        </div>\n    `\n    return section\n}\n\n\n//# sourceURL=webpack://blog/./public/js/components/profile-info.js?");

/***/ }),

/***/ "./public/js/counter.js":
/*!******************************!*\
  !*** ./public/js/counter.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"countSymbols\": () => (/* binding */ countSymbols)\n/* harmony export */ });\nconst countSymbols = (counter, textarea) => {\n    let counterNode = counter\n    let textareaNode = textarea\n    if (!counterNode)\n        counterNode = document.querySelector(\".comments__symbol-counter\")\n    if (!textareaNode)\n        textareaNode = document.querySelector(\".sc-textarea__textarea\")\n    if (counterNode && textareaNode) {\n        counterNode.innerHTML = `${textareaNode.value.length}/500`\n        textareaNode.addEventListener(\"input\", (event) => {\n            const target = event.currentTarget\n            counterNode.innerHTML = `${target.value.length}/500`\n        })\n    }\n}\n\n\n//# sourceURL=webpack://blog/./public/js/counter.js?");

/***/ }),

/***/ "./public/js/imgsize_control.js":
/*!**************************************!*\
  !*** ./public/js/imgsize_control.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setSizeControl\": () => (/* binding */ setSizeControl)\n/* harmony export */ });\nconst imgSizeControl = (size, trigger, { files }) => {\n    if (files[0].size > size * 1024) {\n        const unit = size >= 1024 ? \"мб\" : \"кб\"\n        const unitSize = size >= 1024 ? size / 1024 : size\n        alert(`Размер файла превышает допустимые ${unitSize} ${unit}`)\n        trigger.disabled = true\n    } else {\n        trigger.disabled = false\n    }\n}\n\nconst setSizeControl = (sizeKb, trigger, file) => {\n    if (trigger && file) {\n        file.onchange = () => imgSizeControl(sizeKb, trigger, file)\n    }\n}\n\n\n//# sourceURL=webpack://blog/./public/js/imgsize_control.js?");

/***/ }),

/***/ "./public/js/instagram_widget.js":
/*!***************************************!*\
  !*** ./public/js/instagram_widget.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showMore\": () => (/* binding */ showMore)\n/* harmony export */ });\nfunction showMore() {\n    const photos = document.querySelector(\".instagram-widget__hidden-photos\")\n    const button = document.querySelector(\".instagram-widget__hide-button\")\n    photos.classList.remove(\"hidden\")\n    button.remove()\n}\n\n\n//# sourceURL=webpack://blog/./public/js/instagram_widget.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _addFavourite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addFavourite */ \"./public/js/addFavourite.js\");\n/* harmony import */ var _sendFormData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sendFormData */ \"./public/js/sendFormData.js\");\n/* harmony import */ var _instagram_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instagram_widget */ \"./public/js/instagram_widget.js\");\n/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animations */ \"./public/js/animations.js\");\n/* harmony import */ var _areYouSure__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./areYouSure */ \"./public/js/areYouSure.js\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./router */ \"./public/js/router.js\");\n/* harmony import */ var _imgsize_control__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./imgsize_control */ \"./public/js/imgsize_control.js\");\n\n\n\n\n\n\n\n\nconst imgInput = document.getElementById(\"image\")\nconst submitBtn = document.querySelector(\".edit__submit\")\n\n;(0,_imgsize_control__WEBPACK_IMPORTED_MODULE_6__.setSizeControl)(200, submitBtn, imgInput)\n\nconst deleteArticleButton = document.querySelector(\".articles__delete-button\")\nconst deleteArticleForm = document.querySelector(\".articles__delete-form\")\n;(0,_areYouSure__WEBPACK_IMPORTED_MODULE_4__.areYouSurePrompt)(\n    deleteArticleButton,\n    \"Вы уверены, что хотите удалить эту статью?\",\n    () => {\n        deleteArticleForm.submit()\n    }\n)\n\nconst login = document.querySelector(\".nav__button_login\")\nconst popupLogin = document.querySelector(\".pop-up__login\")\nconst cancelLogin = document.querySelector(\".pop-up__login .pop-up__cancel-btn\")\nconst overlay = document.querySelector(\".pop-up__overlay\")\nconst signup = document.querySelector(\".nav__button_signup\")\nconst popupSignup = document.querySelector(\".pop-up__signup\")\nconst cancelSignup = document.querySelector(\n    \".pop-up__signup .pop-up__cancel-btn\"\n)\n\nif (login) {\n    login.onclick = () => {\n        (0,_animations__WEBPACK_IMPORTED_MODULE_3__.slideToggle)(popupLogin)\n        ;(0,_animations__WEBPACK_IMPORTED_MODULE_3__.fadeIn)(overlay)\n    }\n}\n\nif (cancelLogin) {\n    cancelLogin.addEventListener(\"click\", () => {\n        (0,_animations__WEBPACK_IMPORTED_MODULE_3__.slideToggle)(popupLogin)\n        ;(0,_animations__WEBPACK_IMPORTED_MODULE_3__.fadeOut)(overlay)\n    })\n}\n\nif (overlay) {\n    overlay.addEventListener(\"click\", () => {\n        (0,_animations__WEBPACK_IMPORTED_MODULE_3__.fadeOut)(popupLogin)\n        ;(0,_animations__WEBPACK_IMPORTED_MODULE_3__.fadeOut)(overlay)\n        ;(0,_animations__WEBPACK_IMPORTED_MODULE_3__.fadeOut)(popupSignup)\n    })\n}\n\nif (signup) {\n    signup.onclick = () => {\n        (0,_animations__WEBPACK_IMPORTED_MODULE_3__.slideToggle)(popupSignup)\n        ;(0,_animations__WEBPACK_IMPORTED_MODULE_3__.fadeIn)(overlay)\n    }\n}\n\nif (cancelSignup) {\n    cancelSignup.addEventListener(\"click\", () => {\n        (0,_animations__WEBPACK_IMPORTED_MODULE_3__.slideToggle)(popupSignup)\n        ;(0,_animations__WEBPACK_IMPORTED_MODULE_3__.fadeOut)(overlay)\n    })\n}\n\n/* Не закрываются выпадающие элементы при повторном клике */\n\nconst burger = document.querySelector(\".nav__burger\")\nconst menu = document.querySelector(\".nav__list\")\n\nburger.onclick = () => {\n    menu.classList.toggle(\"nav__list_opened\")\n}\n\nconst search = document.querySelector(\".nav__search\")\nconst searchField = document.querySelector(\".nav__search-form\")\n\nsearch.onclick = () => {\n    searchField.classList.toggle(\"nav__search-form_opened\")\n}\n\nconst rubricBtn = document.querySelector(\".header__rubrics-btn\")\nconst rubrics = document.querySelector(\".rubrics\")\n\nrubricBtn.onclick = () => {\n    rubrics.classList.toggle(\"rubrics_opened\")\n}\n\n;(0,_addFavourite__WEBPACK_IMPORTED_MODULE_0__.addFavourite)()\n;(0,_sendFormData__WEBPACK_IMPORTED_MODULE_1__.sendForm)(\"signup__form\", \"/api/auth/signup\")\n;(0,_sendFormData__WEBPACK_IMPORTED_MODULE_1__.sendForm)(\"signin__form\", \"/api/auth/signin\")\n\nconst widget = document.querySelector(\".instagram-widget__hide-button\")\nwidget.onclick = _instagram_widget__WEBPACK_IMPORTED_MODULE_2__.showMore\n\nfunction checkCookies() {\n    const cookieDate = localStorage.getItem(\"cookieDate\")\n    const cookieNotification = document.getElementById(\"cookie_notification\")\n    const cookieBtn = cookieNotification.querySelector(\".cookie__button\")\n\n    // Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы\n    if (!cookieDate || +cookieDate + 31536000000 < Date.now()) {\n        cookieNotification.classList.add(\"show\")\n    }\n\n    // При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX\n    cookieBtn.addEventListener(\"click\", () => {\n        localStorage.setItem(\"cookieDate\", Date.now())\n        cookieNotification.classList.remove(\"show\")\n    })\n}\ncheckCookies()\n\n;(0,_router__WEBPACK_IMPORTED_MODULE_5__.router)(window.location.pathname)\n\n\n//# sourceURL=webpack://blog/./public/js/main.js?");

/***/ }),

/***/ "./public/js/profile-info.js":
/*!***********************************!*\
  !*** ./public/js/profile-info.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"profileRequest\": () => (/* binding */ profileRequest),\n/* harmony export */   \"setAboutEditFormListener\": () => (/* binding */ setAboutEditFormListener),\n/* harmony export */   \"profileInfoInit\": () => (/* binding */ profileInfoInit)\n/* harmony export */ });\n/* harmony import */ var _components_profile_info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/profile-info */ \"./public/js/components/profile-info.js\");\n/* harmony import */ var _imgsize_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imgsize_control */ \"./public/js/imgsize_control.js\");\n\n\n\nconst profileRequest = async (\n    placeForProfileInfo,\n    method,\n    editForm,\n    oldProfileInfo\n) => {\n    const { userId } = placeForProfileInfo.dataset\n    const res =\n        method === \"PATCH\"\n            ? await fetch(`/api/users/${userId}`, {\n                  method,\n                  mode: \"same-origin\",\n                  body: new FormData(editForm),\n              })\n            : await fetch(`api/users/${userId}`)\n    const userData = await res.json()\n    const profileInfoEl = (0,_components_profile_info__WEBPACK_IMPORTED_MODULE_0__.ProfileInfo)(userData)\n    // eslint-disable-next-line no-unused-expressions\n    method === \"PATCH\"\n        ? placeForProfileInfo.replaceChild(profileInfoEl, oldProfileInfo)\n        : placeForProfileInfo.appendChild(profileInfoEl)\n    const myPageAboutFormSubmit = document.querySelector(\n        \".my-page__about-form-submit\"\n    )\n    const myPageAvatarInput = document.querySelector(\".my-page__avatar-input\")\n    ;(0,_imgsize_control__WEBPACK_IMPORTED_MODULE_1__.setSizeControl)(200, myPageAboutFormSubmit, myPageAvatarInput)\n    // eslint-disable-next-line no-use-before-define\n    setAboutEditFormListener(\n        myPageAboutFormSubmit,\n        placeForProfileInfo,\n        profileInfoEl\n    )\n}\n\nconst setAboutEditFormListener = (\n    myPageAboutFormSubmit,\n    placeForProfileInfo,\n    profileInfoEl\n) => {\n    const editButton = profileInfoEl.querySelector(\".my-page__about-edit-button\")\n    const editForm = profileInfoEl.querySelector(\".my-page__about-edit-form\")\n    const aboutInfo = profileInfoEl.querySelector(\".my-page__about-fields\")\n\n    if (editButton) {\n        editButton.onclick = () => {\n            editForm.classList.toggle(\"my-page__about-edit-form_hidden\")\n            aboutInfo.classList.toggle(\"my-page__about-fields_hidden\")\n        }\n    }\n\n    if (myPageAboutFormSubmit) {\n        myPageAboutFormSubmit.onclick = () => {\n            profileRequest(\n                placeForProfileInfo,\n                \"PATCH\",\n                editForm,\n                profileInfoEl\n            )\n        }\n    }\n}\n\nconst profileInfoInit = async () => {\n    const placeForProfileInfo = document.querySelector(\".my-page__js-about\")\n\n    profileRequest(placeForProfileInfo)\n}\n\n\n//# sourceURL=webpack://blog/./public/js/profile-info.js?");

/***/ }),

/***/ "./public/js/router.js":
/*!*****************************!*\
  !*** ./public/js/router.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"router\": () => (/* binding */ router)\n/* harmony export */ });\n/* harmony import */ var _comments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comments */ \"./public/js/comments.js\");\n/* harmony import */ var _profile_info__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-info */ \"./public/js/profile-info.js\");\n\n\n\nconst router = (url) => {\n    ;(async () => {\n        switch (url) {\n            case (url.match(/^\\/articles\\/\\w+/) || {}).input:\n                await (0,_comments__WEBPACK_IMPORTED_MODULE_0__.commentsInit)()\n                break\n            case (url.match(/^\\/my-page$/) || {}).input:\n                await (0,_profile_info__WEBPACK_IMPORTED_MODULE_1__.profileInfoInit)()\n                break\n            default:\n        }\n    })(url)\n}\n\n\n//# sourceURL=webpack://blog/./public/js/router.js?");

/***/ }),

/***/ "./public/js/sendFormData.js":
/*!***********************************!*\
  !*** ./public/js/sendFormData.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sendForm\": () => (/* binding */ sendForm)\n/* harmony export */ });\nconst sendForm = (formId, url) => {\n    const myForm = document.getElementById(formId)\n\n    if (myForm) {\n        myForm.addEventListener(\"submit\", function fetchFormDataRequest(e) {\n            e.preventDefault()\n\n            const formData = new FormData(this)\n            fetch(url, {\n                method: \"post\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                },\n                body: JSON.stringify(Object.fromEntries(formData)),\n            })\n                .then((res) => res.json())\n                .then((resJson) => {\n                    if (resJson.redirected) {\n                        window.location.href = resJson.redirectUrl\n                    } else {\n                        throw new Error(resJson.error)\n                    }\n                })\n                .catch((err) => {\n                    let errors\n                    if (url === \"/api/auth/signup\") {\n                        errors = document.querySelector(\n                            \".pop-up__signup .pop-up__errors\"\n                        )\n                    } else if (url === \"/api/auth/signin\") {\n                        errors = document.querySelector(\n                            \".pop-up__login .pop-up__errors\"\n                        )\n                    }\n                    if (errors) {\n                        const strErr = err.toString()\n                        errors.innerText = strErr.slice(7, strErr.length)\n                        setTimeout(() => {\n                            errors.innerText = \"\"\n                        }, 5000)\n                    }\n                })\n        })\n    }\n}\n\n\n//# sourceURL=webpack://blog/./public/js/sendFormData.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/main.js");
/******/ 	
/******/ })()
;