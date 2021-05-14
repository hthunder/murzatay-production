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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addFavourite\": () => (/* binding */ addFavourite)\n/* harmony export */ });\nconst addFavourite = () => {\n    const favouriteBtn = document.querySelector(\".add-favourite\")\n\n    async function fetchRequest() {\n        const { articleId } = favouriteBtn.dataset\n        const { userId } = favouriteBtn.dataset\n        try {\n            const res = await fetch(`/api/users/${userId}`, {\n                method: \"PUT\",\n                headers: { \"Content-Type\": \"application/json\" },\n                body: JSON.stringify({ favourites: `${articleId}` }),\n            })\n            const data = await res.json()\n            if (\n                (data.favourites &&\n                    !favouriteBtn.classList.contains(\"add-favourite-active\")) ||\n                (!data.favourites &&\n                    favouriteBtn.classList.contains(\"add-favourite-active\"))\n            ) {\n                favouriteBtn.classList.toggle(\"add-favourite-active\")\n            }\n        } catch (e) {\n            console.log(e)\n        }\n    }\n    if (favouriteBtn) {\n        favouriteBtn.onclick = fetchRequest\n    }\n}\n\n\n//# sourceURL=webpack://blog/./public/js/addFavourite.js?");

/***/ }),

/***/ "./public/js/animations.js":
/*!*********************************!*\
  !*** ./public/js/animations.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"slideUp\": () => (/* binding */ slideUp),\n/* harmony export */   \"slideDown\": () => (/* binding */ slideDown),\n/* harmony export */   \"slideToggle\": () => (/* binding */ slideToggle),\n/* harmony export */   \"fadeOut\": () => (/* binding */ fadeOut),\n/* harmony export */   \"fadeIn\": () => (/* binding */ fadeIn)\n/* harmony export */ });\nconst slideUp = (target, duration) => {\n    /* Sliding-up logic */\n    target.style.transitionProperty = \"height, margin, padding\" \n    target.style.transitionDuration = `${duration}ms` \n    target.style.boxSizing = \"border-box\"\n    target.style.height = `${target.offsetHeight}px`\n    target.style.height = 0 \n    target.style.paddingTop = 0 \n    target.style.paddingBottom = 0 \n    target.style.marginTop = 0\n    target.style.marginBottom = 0\n    target.style.overflow = \"hidden\"\n    window.setTimeout(() => {\n        target.style.display = \"none\"\n        target.style.removeProperty(\"height\")\n        target.style.removeProperty(\"padding-top\")\n        target.style.removeProperty(\"padding-bottom\")\n        target.style.removeProperty(\"margin-top\")\n        target.style.removeProperty(\"margin-bottom\")\n        target.style.removeProperty(\"overflow\")\n        target.style.removeProperty(\"transition-duration\")\n        target.style.removeProperty(\"transition-property\")\n    }, duration)\n}\n\nconst slideDown = (target, duration) => {\n    /* Sliding-down logic */\n    target.style.removeProperty(\"display\")\n    let { display } = window.getComputedStyle(target)\n    if (display === \"none\") {\n        display = \"block\"\n    }\n    target.style.display = display\n    const height = target.offsetHeight\n    target.style.height = 0 \n    target.style.paddingTop = 0 \n    target.style.paddingBottom = 0\n    target.style.marginTop = 0 \n    target.style.marginBottom = 0 \n    target.style.overflow = \"hidden\"\n    target.style.boxSizing = \"border-box\"\n    target.style.transitionProperty = \"height, margin, padding\"\n    target.style.transitionDuration = `${duration}ms`\n    target.style.height = `${height}px`\n    target.style.removeProperty(\"padding-top\") \n    target.style.removeProperty(\"padding-bottom\") \n    target.style.removeProperty(\"margin-top\") \n    target.style.removeProperty(\"margin-bottom\")\n    window.setTimeout(() => {\n        target.style.removeProperty(\"height\")\n        target.style.removeProperty(\"overflow\")\n        target.style.removeProperty(\"transition-duration\")\n        target.style.removeProperty(\"transition-property\")\n    }, duration)\n}\n\nconst slideToggle = (target, duration = 500) => {\n    if (window.getComputedStyle(target).display === \"none\") {\n        return slideDown(target, duration)\n    }\n    return slideUp(target, duration)\n}\n\nfunction fadeOut(el) {\n    el.style.opacity = 1\n    ;(function fade() {\n        if ((el.style.opacity -= 0.1) <= 0) {\n            el.style.display = \"none\"\n            el.style.opacity = null\n        } else {\n            requestAnimationFrame(fade)\n        }\n    })()\n}\n\nfunction fadeIn(el, display) {\n    el.style.opacity = 0\n    el.style.display = display || \"block\"\n    ;(function fade() {\n        let val = parseFloat(el.style.opacity)\n        if (!((val += 0.1) > 1)) {\n            el.style.opacity = val\n            requestAnimationFrame(fade)\n        }\n    })()\n}\n\n//# sourceURL=webpack://blog/./public/js/animations.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _addFavourite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addFavourite.js */ \"./public/js/addFavourite.js\");\n/* harmony import */ var _sendFormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sendFormData.js */ \"./public/js/sendFormData.js\");\n/* harmony import */ var _instagram_widget_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instagram_widget.js */ \"./public/js/instagram_widget.js\");\n/* harmony import */ var _animations_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animations.js */ \"./public/js/animations.js\");\n\n\n\n\n\nconst login = document.querySelector(\".log-in\")\nconst popupLogin = document.querySelector(\".pop-up__login\")\nconst cancelLogin = document.querySelector(\".cancel-login\")\nconst overlay = document.querySelector(\".overlay\")\nconst signup = document.querySelector(\".sign-up\")\nconst popupSignup = document.querySelector(\".pop-up__signup\")\nconst cancelSignup = document.querySelector(\".cancel-signup\")\nconst loginMbl = document.querySelector(\".log-in-mbl\")\nconst signupMbl = document.querySelector(\".sign-up-mbl\")\n\nif (login) {\n    login.onclick = function () {\n        (0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.slideToggle)(popupLogin)\n        ;(0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.fadeIn)(overlay)\n    }\n}\n\nif (cancelLogin) {\n    cancelLogin.addEventListener(\"click\", function (e) {\n        e.preventDefault()\n        ;(0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.slideToggle)(popupLogin)\n        ;(0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.fadeOut)(overlay)\n    })\n}\n\nif (overlay) {\n    overlay.addEventListener(\"click\", function (e) {\n        (0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.fadeOut)(popupLogin)\n        ;(0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.fadeOut)(overlay)\n        ;(0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.fadeOut)(popupSignup)\n    })   \n}\n\n\nif (signup) {\n    signup.onclick = function () {\n        (0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.slideToggle)(popupSignup)\n        ;(0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.fadeIn)(overlay)\n    }\n}\n\nif (cancelSignup) {\n    cancelSignup.addEventListener(\"click\", function (e) {\n        e.preventDefault()\n        ;(0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.slideToggle)(popupSignup)\n        ;(0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.fadeOut)(overlay)\n    })  \n}\n\n\nif (loginMbl) {\n    loginMbl.onclick = function () {\n        (0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.slideToggle)(popupLogin)\n        ;(0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.fadeIn)(overlay)\n    }\n}\n\nif (signupMbl) {\n    signupMbl.onclick = function () {\n        (0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.slideToggle)(popupSignup)\n        ;(0,_animations_js__WEBPACK_IMPORTED_MODULE_3__.fadeIn)(overlay)\n    }\n}\n\n/* Не закрываются выпадающие элементы при повторном клике */\n\nconst burger = document.querySelector(\".mobile-menu\")\nconst mbMenu = document.querySelector(\".menu-list\")\n\nburger.onclick = function () {\n    if (mbMenu.classList.contains(\"open\")) {\n        mbMenu.classList.remove(\"open\")\n    } else {\n        mbMenu.classList.add(\"open\")\n    }\n}\n\nconst search = document.querySelector(\".search-icon\")\nconst searchField = document.querySelector(\".search-wrap\")\n\nsearch.onclick = function () {\n    if (searchField.classList.contains(\"open\")) {\n        searchField.classList.remove(\"open\")\n    } else {\n        searchField.classList.add(\"open\")\n    }\n}\n\nconst rubrickBtn = document.querySelector(\".mobile-rubrics-btn-wrap\")\nconst rubricks = document.querySelector(\".rubrics-mbl-container\")\n\nrubrickBtn.onclick = function () {\n    if (rubricks.classList.contains(\"open-rubric\")) {\n        rubricks.classList.remove(\"open-rubric\")\n    } else {\n        rubricks.classList.add(\"open-rubric\")\n    }\n}\n\n;(0,_addFavourite_js__WEBPACK_IMPORTED_MODULE_0__.addFavourite)()\n;(0,_sendFormData_js__WEBPACK_IMPORTED_MODULE_1__.sendForm)(\"signup__form\", \"/api/auth/signup\")\n;(0,_sendFormData_js__WEBPACK_IMPORTED_MODULE_1__.sendForm)(\"signin__form\", \"/api/auth/signin\")\n\nconst widget = document.querySelector(\".instagram-widget__hide-button\")\nwidget.onclick = _instagram_widget_js__WEBPACK_IMPORTED_MODULE_2__.showMore\n\nfunction checkCookies() {\n    const cookieDate = localStorage.getItem(\"cookieDate\")\n    const cookieNotification = document.getElementById(\"cookie_notification\")\n    const cookieBtn = cookieNotification.querySelector(\".cookie_accept\")\n\n    // Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы\n    if (!cookieDate || +cookieDate + 31536000000 < Date.now()) {\n        cookieNotification.classList.add(\"show\")\n    }\n\n    // При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX\n    cookieBtn.addEventListener(\"click\", function () {\n        localStorage.setItem(\"cookieDate\", Date.now())\n        cookieNotification.classList.remove(\"show\")\n    })\n}\ncheckCookies()\n// if (module.hot) {\n//     // Accept hot update\n//     module.hot.accept();\n// }\n\n//# sourceURL=webpack://blog/./public/js/main.js?");

/***/ }),

/***/ "./public/js/sendFormData.js":
/*!***********************************!*\
  !*** ./public/js/sendFormData.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sendForm\": () => (/* binding */ sendForm)\n/* harmony export */ });\nconst sendForm = (formId, url) => {\n    const myForm = document.getElementById(formId)\n\n    myForm.addEventListener(\"submit\", function fetchFormDataRequest(e) {\n        e.preventDefault()\n\n        const formData = new FormData(this)\n        fetch(url, {\n            method: \"post\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n            },\n            body: JSON.stringify(Object.fromEntries(formData)),\n        })\n            .then((res) => {\n                return res.json()\n            })\n            .then((resJson) => {\n                if (resJson.redirected) {\n                    window.location.href = resJson.redirectUrl\n                } else {\n                    throw new Error(resJson.error)\n                }\n            })\n            .catch((err) => {\n                let errors\n                if (url === \"/api/auth/signup\") {\n                    errors = document.querySelector(\n                        \".pop-up__signup .pop-up__errors\"\n                    )\n                } else if (url === \"/api/auth/signin\") {\n                    errors = document.querySelector(\n                        \".pop-up__login .pop-up__errors\"\n                    )\n                }\n                if (errors) {\n                    const strErr = err.toString()\n                    errors.innerText = strErr.slice(7, strErr.length)\n                    setTimeout(() => {\n                        errors.innerText = \"\"\n                    }, 5000)\n                }\n            })\n    })\n}\n\n\n//# sourceURL=webpack://blog/./public/js/sendFormData.js?");

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