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

/***/ "./public/js/authHandler.js":
/*!**********************************!*\
  !*** ./public/js/authHandler.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authHandlerModule\": () => (/* binding */ authHandlerModule)\n/* harmony export */ });\n/* harmony import */ var _getCookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCookie */ \"./public/js/getCookie.js\");\n\n\nconst handleAuthErrors = (target, errorText) => {\n    const btn = document.querySelector(`.nav__button_${target}`)\n    if (btn) {\n        const errorsElement = document.createElement(\"p\")\n        const referenceElement = document.querySelector(\n            `.pop-up__${target} .pop-up__submit`\n        )\n        const { parentElement } = referenceElement\n\n        errorsElement.classList.add(\"pop-up__errors\")\n        parentElement.insertBefore(errorsElement, referenceElement)\n        errorsElement.innerText = errorText\n        ;(0,_getCookie__WEBPACK_IMPORTED_MODULE_0__.deleteCookie)(\"murzatay-error\")\n        ;(0,_getCookie__WEBPACK_IMPORTED_MODULE_0__.deleteCookie)(`call-${target}`)\n        setTimeout(() => {\n            parentElement.removeChild(errorsElement)\n        }, 10000)\n        btn.click()\n    }\n}\n\nconst authHandlerModule = async () => {\n    const murzatayError = (0,_getCookie__WEBPACK_IMPORTED_MODULE_0__.getCookie)(\"murzatay-error\")\n    const murzatayMessage = (0,_getCookie__WEBPACK_IMPORTED_MODULE_0__.getCookie)(\"murzatay-message\")\n    const authLogin = (0,_getCookie__WEBPACK_IMPORTED_MODULE_0__.getCookie)(\"call-login\")\n    const authSignup = (0,_getCookie__WEBPACK_IMPORTED_MODULE_0__.getCookie)(\"call-signup\")\n\n    if (murzatayError) {\n        if (authLogin) {\n            handleAuthErrors(\"login\", murzatayError)\n        } else if (authSignup) {\n            handleAuthErrors(\"signup\", murzatayError)\n        } else {\n            (0,_getCookie__WEBPACK_IMPORTED_MODULE_0__.deleteCookie)(\"murzatay-error\")\n            window.createNotification({\n                closeOnClick: true,\n                displayCloseButton: true,\n                positionClass: \"nfc-top-right\",\n                showDuration: \"5000\",\n                theme: \"error\",\n            })({\n                message: murzatayError,\n            })\n        }\n    }\n\n    if (murzatayMessage) {\n        (0,_getCookie__WEBPACK_IMPORTED_MODULE_0__.deleteCookie)(\"murzatay-message\")\n        window.createNotification({\n            closeOnClick: true,\n            displayCloseButton: true,\n            positionClass: \"nfc-top-right\",\n            showDuration: \"5000\",\n            theme: \"success\",\n        })({\n            message: murzatayMessage,\n        })\n    }\n}\n\n\n//# sourceURL=webpack://blog/./public/js/authHandler.js?");

/***/ }),

/***/ "./public/js/checkCookies.js":
/*!***********************************!*\
  !*** ./public/js/checkCookies.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkCookies\": () => (/* binding */ checkCookies)\n/* harmony export */ });\nfunction checkCookies() {\n    const cookieDate = localStorage.getItem(\"cookieDate\")\n    const cookieNotification = document.getElementById(\"cookie_notification\")\n    const cookieBtn = cookieNotification.querySelector(\".cookie__button\")\n\n    // Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы\n    if (!cookieDate || +cookieDate + 31536000000 < Date.now()) {\n        cookieNotification.classList.add(\"show\")\n    }\n\n    // При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX\n    cookieBtn.addEventListener(\"click\", () => {\n        localStorage.setItem(\"cookieDate\", Date.now())\n        cookieNotification.classList.remove(\"show\")\n    })\n}\n\n//# sourceURL=webpack://blog/./public/js/checkCookies.js?");

/***/ }),

/***/ "./public/js/comments.js":
/*!*******************************!*\
  !*** ./public/js/comments.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"deleteCommentRequest\": () => (/* binding */ deleteCommentRequest),\n/* harmony export */   \"saveCommentRequest\": () => (/* binding */ saveCommentRequest),\n/* harmony export */   \"editComment\": () => (/* binding */ editComment),\n/* harmony export */   \"addCommentRequest\": () => (/* binding */ addCommentRequest),\n/* harmony export */   \"commentsInit\": () => (/* binding */ commentsInit)\n/* harmony export */ });\n/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./counter */ \"./public/js/counter.js\");\n/* harmony import */ var _components_comment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/comment */ \"./public/js/components/comment.js\");\n\n\n\nconst deleteCommentRequest = async (commentEl) => {\n    const res = await fetch(`/api/comments/${commentEl.dataset.id}`, {\n        method: \"DELETE\",\n    })\n    if (res.status === 200) {\n        commentEl.parentNode.removeChild(commentEl)\n    }\n}\n\nconst saveCommentRequest = async (commentNode, text, id) => {\n    const paragraphComment = commentNode\n    const res = await fetch(`/api/comments/${id}`, {\n        method: \"PUT\",\n        headers: {\n            \"Content-Type\": \"application/json\",\n        },\n        body: JSON.stringify({ text }),\n    })\n    if (res.status === 200) {\n        const newText = await res.json()\n        paragraphComment.textContent = newText.text\n    }\n}\n\nconst cancelEditing = (comment, editingForm) => {\n    comment.classList.toggle(\"comments__instance-content_hidden\")\n    editingForm.classList.toggle(\"comments__temp-form_hidden\")\n}\n\nconst saveEditing = async (commentContent, formEl, commentEl, textareaEl) => {\n    await saveCommentRequest(\n        commentContent.querySelector(\".comments__instance-text\"),\n        textareaEl.value,\n        commentEl.dataset.id\n    )\n    commentContent.classList.toggle(\"comments__instance-content_hidden\")\n    formEl.classList.toggle(\"comments__temp-form_hidden\")\n}\n\nconst createTempForm = (commentText, commentEl, commentContentEl) => {\n    const formEl = (0,_components_comment__WEBPACK_IMPORTED_MODULE_1__.EditForm)(commentText, commentEl.dataset.id)\n    const textareaEl = formEl.querySelector(\".sc-textarea__textarea\")\n    const counterEl = formEl.querySelector(\".comments__symbol-counter\")\n    const cancelButtonEl = formEl.querySelector(\".comments__cancel-button\")\n    const saveButtonEl = formEl.querySelector(\".comments__save-button\")\n\n    commentEl.appendChild(formEl)\n    saveButtonEl.onclick = () => {\n        saveEditing(commentContentEl, formEl, commentEl, textareaEl)\n    }\n    cancelButtonEl.onclick = () => {\n        cancelEditing(commentContentEl, formEl)\n    }\n    ;(0,_counter__WEBPACK_IMPORTED_MODULE_0__.countSymbols)(counterEl, textareaEl)\n}\n\nconst editComment = (commentEl) => {\n    const commentText = commentEl.querySelector(\".comments__instance-text\")\n        .textContent\n    const commentContentEl = commentEl.querySelector(\n        \".comments__instance-content\"\n    )\n    const tempFormEl = document.querySelector(\n        `.comments__temp-form[data-id='${commentEl.dataset.id}']`\n    )\n\n    commentContentEl.classList.toggle(\"comments__instance-content_hidden\")\n    if (!tempFormEl) {\n        createTempForm(commentText, commentEl, commentContentEl)\n    } else {\n        tempFormEl.classList.toggle(\"comments__temp-form_hidden\")\n        tempFormEl.querySelector(\".sc-textarea__textarea\").value = commentText\n        tempFormEl.querySelector(\n            \".comments__symbol-counter\"\n        ).innerHTML = `${commentText.length}/500`\n    }\n\n    // Санитайзим пользовательский ввод\n    // Если запрос неуспешен, то возвращаем параграф и кнопку редактировать и убираем кнопку сохранить\n    // Добавляем всплывающий алерт(неблокирующий), который говорит, что произошла ошибка\n}\n\nconst addCommentRequest = async (articleId, textarea) => {\n    const textareaPtr = textarea\n    const data = {\n        articleId,\n        text: textarea.value,\n    }\n    const res = await fetch(`/api/comments`, {\n        method: \"POST\",\n        headers: {\n            \"Content-Type\": \"application/json\",\n        },\n        body: JSON.stringify(data),\n    })\n    if (res.status === 200) {\n        const commentData = await res.json()\n        textareaPtr.value = \"\"\n        const event = new Event(\"input\")\n        textareaPtr.dispatchEvent(event)\n        const commentEl = (0,_components_comment__WEBPACK_IMPORTED_MODULE_1__.CommentJS)(commentData)\n        document.querySelector(\".comments__add-form\").after(commentEl)\n\n        const deleteButton = commentEl.querySelector(\".comments__delete-button\")\n        const editButton = commentEl.querySelector(\".comments__edit-button\")\n\n        deleteButton.onclick = () => {\n            deleteCommentRequest(commentEl)\n        }\n        editButton.onclick = () => {\n            editComment(commentEl)\n        }\n    }\n}\n\nconst getComments = async () => {\n    const addCommentPlace = document.querySelector(\".topic__js-add-comment\")\n    const allCommentsPlace = document.querySelector(\".topic__js-comments\")\n    const articleId = allCommentsPlace.dataset.id\n    if (addCommentPlace) {\n        const formEl = (0,_components_comment__WEBPACK_IMPORTED_MODULE_1__.CommentTextarea)()\n        addCommentPlace.appendChild(formEl)\n        const addButton = formEl.querySelector(\".comments__add-button\")\n        const textarea = formEl.querySelector(\".sc-textarea__textarea\")\n        ;(0,_counter__WEBPACK_IMPORTED_MODULE_0__.countSymbols)()\n        addButton.onclick = () => {\n            addCommentRequest(articleId, textarea)\n        }\n    }\n\n    const res = await fetch(`/api/articles/${articleId}/comments`)\n    if (res.status === 200) {\n        const commentsData = await res.json()\n        const commentsArray = commentsData.map((commentData) =>\n            (0,_components_comment__WEBPACK_IMPORTED_MODULE_1__.CommentJS)(commentData)\n        )\n        commentsArray.forEach((el) => {\n            allCommentsPlace.appendChild(el)\n        })\n    }\n}\n\nconst commentsInit = async () => {\n    await getComments()\n    const commentsNodeList = document.querySelectorAll(\".comments__instance\")\n    commentsNodeList.forEach((commentEl) => {\n        const deleteButtonEl = commentEl.querySelector(\n            \".comments__delete-button\"\n        )\n        const editButtonEl = commentEl.querySelector(\".comments__edit-button\")\n\n        if (deleteButtonEl) {\n            deleteButtonEl.onclick = () => {\n                deleteCommentRequest(commentEl)\n            }\n        }\n\n        if (editButtonEl) {\n            editButtonEl.onclick = () => {\n                editComment(commentEl)\n            }\n        }\n    })\n}\n\n\n//# sourceURL=webpack://blog/./public/js/comments.js?");

/***/ }),

/***/ "./public/js/components/comment.js":
/*!*****************************************!*\
  !*** ./public/js/components/comment.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CommentJS\": () => (/* binding */ CommentJS),\n/* harmony export */   \"EditForm\": () => (/* binding */ EditForm),\n/* harmony export */   \"CommentTextarea\": () => (/* binding */ CommentTextarea)\n/* harmony export */ });\nconst canEditOrDelete = (isEditable, isDeletable) => {\n    if (isEditable && isDeletable) {\n        return `<form class=\"comments__form\">\n            <button class=\"button comments__delete-button\" type=\"button\">Удалить</button>\n            <button class=\"button comments__edit-button\" type=\"button\">Редактировать</button> \n        </form>`\n    }\n    if (isEditable) {\n        return `<form class=\"comments__form\">\n            <button class=\"button comments__edit-button\" type=\"button\">Редактировать</button> \n        </form>`\n    }\n    if (isDeletable) {\n        return `<form class=\"comments__form\">\n            <button class=\"button comments__delete-button\" type=\"button\">Удалить</button>\n        </form>`\n    }\n    return \"\"\n}\n\nconst CommentJS = (commentData) => {\n    const {\n        _id,\n        user: { username, avatar = \"/img/icons/user-profile.svg\" },\n        text,\n        date,\n        isEditable,\n        isDeletable,\n    } = commentData\n    const article = document.createElement(\"article\")\n    article.classList.add(\"comments__instance\")\n    article.dataset.id = _id\n    article.innerHTML = `\n        <img class=\"comments__instance-ava\" src=\"${avatar}\" alt=\"Аватарка\">\n        <div class=\"comments__instance-content\">\n            <p class=\"comments__instance-author\">${username}</p>\n            <p class=\"comments__instance-text\">${text}</p>\n            <time class=\"comments__instance-date\" datetime=\"${new Date(\n                date\n            ).toISOString()}\">\n            ${new Date(date).toLocaleString(\"en-GB\")}\n            </time>\n            ${canEditOrDelete(isEditable, isDeletable)}\n        </div>\n    `\n    return article\n}\n\nconst EditForm = (paragraphText, commentId) => {\n    const form = document.createElement(\"form\")\n    form.dataset.id = commentId\n    form.classList.add(\"comments__temp-form\")\n    form.innerHTML = `<article class=\"textarea textarea_medium sc-textarea comments__sc-textarea\">\n        <p class=\"sc-textarea__counter comments__symbol-counter\">0/500</p>\n        <textarea class=\"sc-textarea__textarea\" maxlength=\"500\">${paragraphText}</textarea>\n        </article>\n        <button class=\"comments__save-button button\" type=\"button\">Сохранить</button>\n        <button class=\"comments__cancel-button button\" type=\"button\">Отменить</button>`\n    return form\n}\n\nconst CommentTextarea = () => {\n    const form = document.createElement(\"form\")\n    form.classList.add(\"comments__add-form\")\n    form.innerHTML = `\n    <article class=\"textarea textarea_medium sc-textarea comments__sc-textarea\">\n        <p class=\"sc-textarea__counter comments__symbol-counter\">0/500</p>\n        <textarea class=\"sc-textarea__textarea\" name=\"text\" maxlength=\"500\"></textarea>    \n    </article>\n    <button class=\"comments__add-button comments__send-button button\" type=\"button\"  data-id=\"\">Отправить</button>\n    `\n    return form\n}\n\n\n//# sourceURL=webpack://blog/./public/js/components/comment.js?");

/***/ }),

/***/ "./public/js/components/profile-info.js":
/*!**********************************************!*\
  !*** ./public/js/components/profile-info.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ProfileInfo\": () => (/* binding */ ProfileInfo)\n/* harmony export */ });\n/* harmony import */ var _lodash_escape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lodash/escape */ \"./public/js/lodash/escape.js\");\n\n\nconst ProfileInfo = (profileData) => {\n    const {\n        username = \"\",\n        city = \"\",\n        about = \"\",\n        avatar = \"/img/icons/user-profile.svg\",\n    } = profileData\n    const section = document.createElement(\"section\")\n\n    section.classList.add(\"my-page__about\")\n    section.innerHTML = `\n        <img class=\"my-page__about-avatar\" src=\"${(0,_lodash_escape__WEBPACK_IMPORTED_MODULE_0__.escape)(avatar)}\" alt=\"Ваше фото\">\n        <div class=\"my-page__about-info\">\n            <button class=\"my-page__about-edit-button button button_light\" type=\"button\">Редактировать</button>\n            <div class=\"my-page__about-fields\">\n                <p class=\"my-page__about-field my-page__about-username\">Ник: ${(0,_lodash_escape__WEBPACK_IMPORTED_MODULE_0__.escape)(username)}</p>\n                <p class=\"my-page__about-field my-page__about-city\">Город: ${(0,_lodash_escape__WEBPACK_IMPORTED_MODULE_0__.escape)(city)}</p>\n                <p class=\"my-page__about-field my-page__about-me\">Расскажите о себе или о своих питомцах:</p>\n                <p class=\"my-page__about-field\">${(0,_lodash_escape__WEBPACK_IMPORTED_MODULE_0__.escape)(about)}</p>\n            </div>\n            <form class=\"my-page__about-edit-form my-page__about-edit-form_hidden\">\n                <label class=\"my-page__avatar-label button button_light\">\n                    Загрузить аватар\n                    <input class=\"my-page__avatar-input\" type=\"file\" name=\"avatar\" accept=\".jpg, .jpeg, .png\">   \n                </label>\n                <label class=\"my-page__about-form-label\">\n                    Ник:\n                    <input class=\"my-page__about-form-input\" name=\"username\" type=\"text\" value=\"${(0,_lodash_escape__WEBPACK_IMPORTED_MODULE_0__.escape)(username)}\">\n                </label>\n                <label class=\"my-page__about-form-label\">\n                    Город:\n                    <input name=\"city\" type=\"text\" value=\"${(0,_lodash_escape__WEBPACK_IMPORTED_MODULE_0__.escape)(city)}\" class=\"my-page__about-form-input\">\n                </label>\n                <label class=\"my-page__about-form-label\">\n                        Расскажите о себе или своих питомцах:\n                    <textarea maxlength=\"250\" name=\"about\" placeholder=\"Расскажите о себе или своих питомцах\"\n                        class=\"my-page__about-form-textarea textarea\">${(0,_lodash_escape__WEBPACK_IMPORTED_MODULE_0__.escape)(about)}</textarea>\n                </label>\n                <button class=\"my-page__about-form-submit button button_light\" type=\"button\">Готово</button>\n            </form>\n        </div>\n    `\n    return section\n}\n\n\n//# sourceURL=webpack://blog/./public/js/components/profile-info.js?");

/***/ }),

/***/ "./public/js/components/sidebar-comment.js":
/*!*************************************************!*\
  !*** ./public/js/components/sidebar-comment.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SidebarComment\": () => (/* binding */ SidebarComment)\n/* harmony export */ });\nconst SidebarComment = ({\n    text,\n    user: { username, avatar = \"/img/icons/user-profile.svg\" },\n}) => {\n    const figureEl = document.createElement(\"figure\")\n    figureEl.classList.add(\"sidebar__comments-item\")\n    figureEl.innerHTML = `\n    <img class=\"sidebar__comments-img\" src=\"${avatar}\" width=\"38\" height=\"38\" alt=\"Аватарка\" >\n    <figcaption>\n        <p class=\"sidebar__comments-text\">${text}</p>\n        <p class=\"sidebar__comments-author\">${username}</p>\n    </figcaption>\n    `\n    return figureEl\n}\n\n\n//# sourceURL=webpack://blog/./public/js/components/sidebar-comment.js?");

/***/ }),

/***/ "./public/js/components/sidebar-instagram-widget.js":
/*!**********************************************************!*\
  !*** ./public/js/components/sidebar-instagram-widget.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SidebarInstagramWidget\": () => (/* binding */ SidebarInstagramWidget)\n/* harmony export */ });\nconst LinkList = (imgList) =>\n    imgList\n        .map(\n            (val) => `<a class=\"instagram-widget__photo-link\" href=${\n                val.permalink\n            }>\n                <img class=\"instagram-widget__photo-img\" src=\"${\n                    val.path.split(\"public\")[1]\n                }\" />\n            </a>`\n        )\n        .join(\"\\n\")\n\nconst SidebarInstagramWidget = (rootNode, { imgList }) => {\n    rootNode.innerHTML = `\n    <a class=\"instagram-widget__profile-link\" href=\"https://www.instagram.com\">\n        <img class=\"instagram-widget__profile-icon\" width=\"50\" height=\"50\" src=\"/img/icons/instagram.svg\" />\n        murzatay_dakian\n    </a>\n    <div class=\"instagram-widget__photos\">\n        ${LinkList(imgList.slice(0, 15))}\n        <div class=\"instagram-widget__hidden-photos\">\n            ${LinkList(imgList.slice(15, 18))}\n        </div>\n    </div>\n    <button class=\"instagram-widget__hide-btn\">\n        Показать больше фото...\n    </button>\n    <a class=\"instagram-widget__subscribe-btn\" href=\"https://www.instagram.com\">\n        <img class=\"instagram-widget__subscribe-img\" width=\"15\" height=\"15\" src=\"/img/icons/instagram-without-outline.svg\" />\n        Открыть Instagram и подписаться\n    </a>\n    `\n}\n\n\n//# sourceURL=webpack://blog/./public/js/components/sidebar-instagram-widget.js?");

/***/ }),

/***/ "./public/js/counter.js":
/*!******************************!*\
  !*** ./public/js/counter.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"countSymbols\": () => (/* binding */ countSymbols)\n/* harmony export */ });\nconst countSymbols = (counter, textarea) => {\n    let counterNode = counter\n    let textareaNode = textarea\n    if (!counterNode)\n        counterNode = document.querySelector(\".comments__symbol-counter\")\n    if (!textareaNode)\n        textareaNode = document.querySelector(\".sc-textarea__textarea\")\n    if (counterNode && textareaNode) {\n        counterNode.innerHTML = `${textareaNode.value.length}/500`\n        textareaNode.addEventListener(\"input\", (event) => {\n            const target = event.currentTarget\n            counterNode.innerHTML = `${target.value.length}/500`\n        })\n    }\n}\n\n\n//# sourceURL=webpack://blog/./public/js/counter.js?");

/***/ }),

/***/ "./public/js/getCookie.js":
/*!********************************!*\
  !*** ./public/js/getCookie.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCookie\": () => (/* binding */ getCookie),\n/* harmony export */   \"deleteCookie\": () => (/* binding */ deleteCookie)\n/* harmony export */ });\nconst getCookie = (cname) => {\n    const foundCookie = decodeURIComponent(document.cookie)\n        .split(\"; \")\n        .find((cookie) => cookie.startsWith(`${cname}=`))\n    if (foundCookie) return foundCookie.split(\"=\")[1]\n    return \"\"\n}\n\nconst deleteCookie = (cname) => {\n    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`\n}\n\n\n//# sourceURL=webpack://blog/./public/js/getCookie.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showMore\": () => (/* binding */ showMore)\n/* harmony export */ });\nfunction showMore() {\n    const photos = document.querySelector(\".instagram-widget__hidden-photos\")\n    const button = document.querySelector(\".instagram-widget__hide-btn\")\n    photos.classList.toggle(\"instagram-widget__hidden-photos_shown\")\n    button.remove()\n}\n\n\n//# sourceURL=webpack://blog/./public/js/instagram_widget.js?");

/***/ }),

/***/ "./public/js/lodash/escape.js":
/*!************************************!*\
  !*** ./public/js/lodash/escape.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"escape\": () => (/* binding */ escape)\n/* harmony export */ });\nconst htmlEscapes = {\n    '&': '&amp;',\n    '<': '&lt;',\n    '>': '&gt;',\n    '\"': '&quot;',\n    \"'\": '&#39;'\n}\n\nconst reUnescapedHtml = /[&<>\"']/g\nconst reHasUnescapedHtml = RegExp(reUnescapedHtml.source)\n\nfunction escape(string) {\n    return (string && reHasUnescapedHtml.test(string))\n        ? string.replace(reUnescapedHtml, (chr) => htmlEscapes[chr])\n        : (string || '')\n}\n\n\n//# sourceURL=webpack://blog/./public/js/lodash/escape.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _addFavourite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addFavourite */ \"./public/js/addFavourite.js\");\n/* harmony import */ var _instagram_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instagram_widget */ \"./public/js/instagram_widget.js\");\n/* harmony import */ var _areYouSure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./areYouSure */ \"./public/js/areYouSure.js\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./router */ \"./public/js/router.js\");\n/* harmony import */ var _imgsize_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./imgsize_control */ \"./public/js/imgsize_control.js\");\n/* harmony import */ var _sidebarComments__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sidebarComments */ \"./public/js/sidebarComments.js\");\n/* harmony import */ var _sidebarInstagramWidget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sidebarInstagramWidget */ \"./public/js/sidebarInstagramWidget.js\");\n/* harmony import */ var _authHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./authHandler */ \"./public/js/authHandler.js\");\n/* harmony import */ var _popupInit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./popupInit */ \"./public/js/popupInit.js\");\n/* harmony import */ var _checkCookies__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./checkCookies */ \"./public/js/checkCookies.js\");\n\n\n\n\n\n\n\n\n\n\n\n(0,_popupInit__WEBPACK_IMPORTED_MODULE_8__.popupInit)()\nconst imgInput = document.getElementById(\"image\")\nconst submitBtn = document.querySelector(\".edit__submit\")\n\n;(0,_imgsize_control__WEBPACK_IMPORTED_MODULE_4__.setSizeControl)(200, submitBtn, imgInput)\n\nconst deleteArticleButton = document.querySelector(\".articles__delete-button\")\nconst deleteArticleForm = document.querySelector(\".articles__delete-form\")\n;(0,_areYouSure__WEBPACK_IMPORTED_MODULE_2__.areYouSurePrompt)(\n    deleteArticleButton,\n    \"Вы уверены, что хотите удалить эту статью?\",\n    () => {\n        deleteArticleForm.submit()\n    }\n)\n\n/* Не закрываются выпадающие элементы при повторном клике */\n\nconst burger = document.querySelector(\".nav__burger\")\nconst menu = document.querySelector(\".nav__list\")\n\nburger.onclick = () => {\n    menu.classList.toggle(\"nav__list_opened\")\n}\n\nconst search = document.querySelector(\".nav__search\")\nconst searchField = document.querySelector(\".nav__search-form\")\n\nsearch.onclick = () => {\n    searchField.classList.toggle(\"nav__search-form_opened\")\n}\n\nconst rubricBtn = document.querySelector(\".header__rubrics-btn\")\nconst rubrics = document.querySelector(\".rubrics\")\n\nrubricBtn.onclick = () => {\n    rubrics.classList.toggle(\"rubrics_opened\")\n}\n\n;(0,_addFavourite__WEBPACK_IMPORTED_MODULE_0__.addFavourite)()\n;(0,_checkCookies__WEBPACK_IMPORTED_MODULE_9__.checkCookies)()\n\n;(0,_router__WEBPACK_IMPORTED_MODULE_3__.router)(window.location.pathname)\n;(0,_sidebarComments__WEBPACK_IMPORTED_MODULE_5__.sidebarComments)()\n;(0,_sidebarInstagramWidget__WEBPACK_IMPORTED_MODULE_6__.sidebarInstagramWidget)().then(() => {\n    document.querySelector(\".instagram-widget__hide-btn\").onclick = _instagram_widget__WEBPACK_IMPORTED_MODULE_1__.showMore\n})\n\n;(0,_authHandler__WEBPACK_IMPORTED_MODULE_7__.authHandlerModule)()\n\n\n//# sourceURL=webpack://blog/./public/js/main.js?");

/***/ }),

/***/ "./public/js/pages/passwordReset.js":
/*!******************************************!*\
  !*** ./public/js/pages/passwordReset.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"passwordReset\": () => (/* binding */ passwordReset)\n/* harmony export */ });\n/* harmony import */ var _validators_checkBeforeSubmit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validators/checkBeforeSubmit */ \"./public/js/validators/checkBeforeSubmit.js\");\n/* harmony import */ var _validators_isEqual__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validators/isEqual */ \"./public/js/validators/isEqual.js\");\n\n\n\nconst passwordReset = () => {\n    const forgotPassFormElem = document.querySelector(\".forgot-pass__form\")\n\n    ;(0,_validators_checkBeforeSubmit__WEBPACK_IMPORTED_MODULE_0__.checkBeforeSubmit)(\n        () =>\n            (0,_validators_isEqual__WEBPACK_IMPORTED_MODULE_1__.isEqual)(\n                forgotPassFormElem.querySelector(\"input[name='pass1']\"),\n                forgotPassFormElem.querySelector(\"input[name='pass2']\")\n            ),\n        forgotPassFormElem,\n        \"Пароли не совпадают\"\n    )\n}\n\n\n//# sourceURL=webpack://blog/./public/js/pages/passwordReset.js?");

/***/ }),

/***/ "./public/js/popupInit.js":
/*!********************************!*\
  !*** ./public/js/popupInit.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"popupInit\": () => (/* binding */ popupInit)\n/* harmony export */ });\n/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animations */ \"./public/js/animations.js\");\n\n\nconst handleClick = (targetElem, animationsArr) => {\n    if (targetElem) {\n        targetElem.onclick = () => {\n            animationsArr.forEach((animation) => {\n                animation()\n            })\n        }\n    }\n}\n\nconst popupInit = () => {\n    const loginBtn = document.querySelector(\".nav__button_login\")\n    const loginForm = document.querySelector(\".pop-up__login\")\n    const loginCancelBtn = document.querySelector(\n        \".pop-up__login .pop-up__cancel-btn\"\n    )\n    const signupBtn = document.querySelector(\".nav__button_signup\")\n    const signupForm = document.querySelector(\".pop-up__signup\")\n    const signupCancelBtn = document.querySelector(\n        \".pop-up__signup .pop-up__cancel-btn\"\n    )\n    const overlay = document.querySelector(\".pop-up__overlay\")\n\n    handleClick(loginBtn, [() => (0,_animations__WEBPACK_IMPORTED_MODULE_0__.slideToggle)(loginForm), () => (0,_animations__WEBPACK_IMPORTED_MODULE_0__.fadeIn)(overlay)])\n    handleClick(loginCancelBtn, [\n        () => (0,_animations__WEBPACK_IMPORTED_MODULE_0__.slideToggle)(loginForm),\n        () => (0,_animations__WEBPACK_IMPORTED_MODULE_0__.fadeOut)(overlay),\n    ])\n    handleClick(overlay, [\n        () => (0,_animations__WEBPACK_IMPORTED_MODULE_0__.fadeOut)(loginForm),\n        () => (0,_animations__WEBPACK_IMPORTED_MODULE_0__.fadeOut)(overlay),\n        () => (0,_animations__WEBPACK_IMPORTED_MODULE_0__.fadeOut)(signupForm),\n    ])\n    handleClick(signupBtn, [\n        () => (0,_animations__WEBPACK_IMPORTED_MODULE_0__.slideToggle)(signupForm),\n        () => (0,_animations__WEBPACK_IMPORTED_MODULE_0__.fadeIn)(overlay),\n    ])\n    handleClick(signupCancelBtn, [\n        () => (0,_animations__WEBPACK_IMPORTED_MODULE_0__.slideToggle)(signupForm),\n        () => (0,_animations__WEBPACK_IMPORTED_MODULE_0__.fadeOut)(overlay),\n    ])\n}\n\n\n//# sourceURL=webpack://blog/./public/js/popupInit.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"router\": () => (/* binding */ router)\n/* harmony export */ });\n/* harmony import */ var _comments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comments */ \"./public/js/comments.js\");\n/* harmony import */ var _profile_info__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-info */ \"./public/js/profile-info.js\");\n/* harmony import */ var _pages_passwordReset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/passwordReset */ \"./public/js/pages/passwordReset.js\");\n\n\n\n\nconst router = (url) => {\n    ;(async () => {\n        switch (url) {\n            case (url.match(/^\\/articles\\/\\w+/) || {}).input:\n                await (0,_comments__WEBPACK_IMPORTED_MODULE_0__.commentsInit)()\n                break\n            case (url.match(/^\\/my-page$/) || {}).input:\n                await (0,_profile_info__WEBPACK_IMPORTED_MODULE_1__.profileInfoInit)()\n                break\n            case (url.match(/^\\/auth\\/password-reset/) || {}).input:\n                ;(0,_pages_passwordReset__WEBPACK_IMPORTED_MODULE_2__.passwordReset)()\n                break\n            default:\n        }\n    })(url)\n}\n\n\n//# sourceURL=webpack://blog/./public/js/router.js?");

/***/ }),

/***/ "./public/js/sidebarComments.js":
/*!**************************************!*\
  !*** ./public/js/sidebarComments.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sidebarComments\": () => (/* binding */ sidebarComments)\n/* harmony export */ });\n/* harmony import */ var _components_sidebar_comment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/sidebar-comment */ \"./public/js/components/sidebar-comment.js\");\n\n\nconst sidebarComments = async () => {\n    const placeForCommentsEl = document.querySelector(\n        \".sidebar__js-last-comments\"\n    )\n    if (placeForCommentsEl) {\n        try {\n            const res = await fetch(\"/api/comments?limit=2\")\n            const commentsData = await res.json()\n            const headlineEl = document.createElement(\"h3\")\n\n            headlineEl.classList.add(\"sidebar__title\")\n            headlineEl.innerText = \"Комментарии\"\n            placeForCommentsEl.appendChild(headlineEl)\n            commentsData.map((commentData) =>\n                placeForCommentsEl.appendChild((0,_components_sidebar_comment__WEBPACK_IMPORTED_MODULE_0__.SidebarComment)(commentData))\n            )\n        } catch (e) {\n            placeForCommentsEl.remove()\n        }\n    }\n}\n\n\n//# sourceURL=webpack://blog/./public/js/sidebarComments.js?");

/***/ }),

/***/ "./public/js/sidebarInstagramWidget.js":
/*!*********************************************!*\
  !*** ./public/js/sidebarInstagramWidget.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sidebarInstagramWidget\": () => (/* binding */ sidebarInstagramWidget)\n/* harmony export */ });\n/* harmony import */ var _components_sidebar_instagram_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/sidebar-instagram-widget */ \"./public/js/components/sidebar-instagram-widget.js\");\n\n\nconst sidebarInstagramWidget = async () => {\n    const placeForWidgetEl = document.querySelector(\n        \".sidebar__js-instagram-widget\"\n    )\n    if (placeForWidgetEl) {\n        try {\n            const res = await fetch(\"/api/widget-urls\")\n            const widgetData = await res.json()\n            ;(0,_components_sidebar_instagram_widget__WEBPACK_IMPORTED_MODULE_0__.SidebarInstagramWidget)(placeForWidgetEl, widgetData)\n            return \"success\"\n        } catch (e) {\n            placeForWidgetEl.remove()\n        }\n    }\n}\n\n\n//# sourceURL=webpack://blog/./public/js/sidebarInstagramWidget.js?");

/***/ }),

/***/ "./public/js/validators/checkBeforeSubmit.js":
/*!***************************************************!*\
  !*** ./public/js/validators/checkBeforeSubmit.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkBeforeSubmit\": () => (/* binding */ checkBeforeSubmit)\n/* harmony export */ });\nconst checkBeforeSubmit = (validator, formElem, warningMsg) => {\n    formElem.onsubmit = (e) => {\n        e.preventDefault()\n        if (!validator()) {\n            return window.createNotification({\n                closeOnClick: true,\n                displayCloseButton: true,\n                positionClass: \"nfc-top-right\",\n                showDuration: \"5000\",\n                theme: \"error\",\n            })({\n                message: warningMsg,\n            })\n        }\n        return e.currentTarget.submit()\n    }\n}\n\n\n//# sourceURL=webpack://blog/./public/js/validators/checkBeforeSubmit.js?");

/***/ }),

/***/ "./public/js/validators/isEqual.js":
/*!*****************************************!*\
  !*** ./public/js/validators/isEqual.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isEqual\": () => (/* binding */ isEqual)\n/* harmony export */ });\nconst isEqual = (inputElement1, inputElement2) => {\n    if (inputElement1 && inputElement2) {\n        return inputElement1.value === inputElement2.value\n    }\n    return false\n}\n\n\n//# sourceURL=webpack://blog/./public/js/validators/isEqual.js?");

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