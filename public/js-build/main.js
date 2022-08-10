/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./constants/index.js":
/*!****************************!*\
  !*** ./constants/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("exports.LONG_COMMENT_ERROR = \"Слишком длинный комментарий\"\nexports.NOT_LOGGED_IN = \"Вы не залогинены\"\n\nexports.RUBRICS = [\n    \"Кормление\",\n    \"Воспитание\",\n    \"Уход\",\n    \"Адаптация\",\n    \"Пора к ветеринару?\",\n    \"Коты доноры\",\n    \"Коты спинальники\",\n    \"Интересные факты\",\n    \"Забавные истории\",\n]\n\nexports.ARTICLES_LIMIT = 10\nexports.ARTICLE_PREVIEW_SIZE_KB = 500\nexports.CLIENT_500_ERROR =\n    \"Произошла какая-то ошибка, попробуйте еще раз позднее\"\nexports.NON_EXISTENT_CLIENT = \"Пользователя с таким email-ом не существует\"\nexports.PASSWORD_RESET_LINK_SENT =\n    \"Вам на почту направлено письмо с ссылкой для восстановления пароля\"\nexports.PASSWORD_MISMATCH = \"Пароли не совпадают\"\nexports.EXPIRED_PASSWORD_RESET_LINK =\n    \"Ссылка для восстановления пароля истекла, запросите новую\"\n\n\n//# sourceURL=webpack://blog/./constants/index.js?");

/***/ }),

/***/ "./node_modules/navigo/lib/navigo.min.js":
/*!***********************************************!*\
  !*** ./node_modules/navigo/lib/navigo.min.js ***!
  \***********************************************/
/***/ (function(module) {

eval("!function(t,n){ true?module.exports=n():0}(\"undefined\"!=typeof self?self:this,(function(){return function(){\"use strict\";var t={407:function(t,n,e){e.d(n,{default:function(){return N}});var o=/([:*])(\\w+)/g,r=/\\*/g,i=/\\/\\?/g;function a(t){return void 0===t&&(t=\"/\"),v()?location.pathname+location.search+location.hash:t}function s(t){return t.replace(/\\/+$/,\"\").replace(/^\\/+/,\"\")}function c(t){return\"string\"==typeof t}function u(t){return t&&t.indexOf(\"#\")>=0&&t.split(\"#\").pop()||\"\"}function h(t){var n=s(t).split(/\\?(.*)?$/);return[s(n[0]),n.slice(1).join(\"\")]}function f(t){for(var n={},e=t.split(\"&\"),o=0;o<e.length;o++){var r=e[o].split(\"=\");if(\"\"!==r[0]){var i=decodeURIComponent(r[0]);n[i]?(Array.isArray(n[i])||(n[i]=[n[i]]),n[i].push(decodeURIComponent(r[1]||\"\"))):n[i]=decodeURIComponent(r[1]||\"\")}}return n}function l(t,n){var e,a=h(s(t.currentLocationPath)),l=a[0],p=a[1],d=\"\"===p?null:f(p),v=[];if(c(n.path)){if(e=\"(?:/^|^)\"+s(n.path).replace(o,(function(t,n,e){return v.push(e),\"([^/]+)\"})).replace(r,\"?(?:.*)\").replace(i,\"/?([^/]+|)\")+\"$\",\"\"===s(n.path)&&\"\"===s(l))return{url:l,queryString:p,hashString:u(t.to),route:n,data:null,params:d}}else e=n.path;var g=new RegExp(e,\"\"),m=l.match(g);if(m){var y=c(n.path)?function(t,n){return 0===n.length?null:t?t.slice(1,t.length).reduce((function(t,e,o){return null===t&&(t={}),t[n[o]]=decodeURIComponent(e),t}),null):null}(m,v):m.groups?m.groups:m.slice(1);return{url:s(l.replace(new RegExp(\"^\"+t.instance.root),\"\")),queryString:p,hashString:u(t.to),route:n,data:y,params:d}}return!1}function p(){return!(\"undefined\"==typeof window||!window.history||!window.history.pushState)}function d(t,n){return void 0===t[n]||!0===t[n]}function v(){return\"undefined\"!=typeof window}function g(t,n){return void 0===t&&(t=[]),void 0===n&&(n={}),t.filter((function(t){return t})).forEach((function(t){[\"before\",\"after\",\"already\",\"leave\"].forEach((function(e){t[e]&&(n[e]||(n[e]=[]),n[e].push(t[e]))}))})),n}function m(t,n,e){var o=n||{},r=0;!function n(){t[r]?Array.isArray(t[r])?(t.splice.apply(t,[r,1].concat(t[r][0](o)?t[r][1]:t[r][2])),n()):t[r](o,(function(t){void 0===t||!0===t?(r+=1,n()):e&&e(o)})):e&&e(o)}()}function y(t,n){void 0===t.currentLocationPath&&(t.currentLocationPath=t.to=a(t.instance.root)),t.currentLocationPath=t.instance._checkForAHash(t.currentLocationPath),n()}function _(t,n){for(var e=0;e<t.instance.routes.length;e++){var o=l(t,t.instance.routes[e]);if(o&&(t.matches||(t.matches=[]),t.matches.push(o),\"ONE\"===t.resolveOptions.strategy))return void n()}n()}function k(t,n){t.navigateOptions&&(void 0!==t.navigateOptions.shouldResolve&&console.warn('\"shouldResolve\" is deprecated. Please check the documentation.'),void 0!==t.navigateOptions.silent&&console.warn('\"silent\" is deprecated. Please check the documentation.')),n()}function O(t,n){!0===t.navigateOptions.force?(t.instance._setCurrent([t.instance._pathToMatchObject(t.to)]),n(!1)):n()}m.if=function(t,n,e){return Array.isArray(n)||(n=[n]),Array.isArray(e)||(e=[e]),[t,n,e]};var w=v(),L=p();function b(t,n){if(d(t.navigateOptions,\"updateBrowserURL\")){var e=(\"/\"+t.to).replace(/\\/\\//g,\"/\"),o=w&&t.resolveOptions&&!0===t.resolveOptions.hash;L?(history[t.navigateOptions.historyAPIMethod||\"pushState\"](t.navigateOptions.stateObj||{},t.navigateOptions.title||\"\",o?\"#\"+e:e),location&&location.hash&&(t.instance.__freezeListening=!0,setTimeout((function(){if(!o){var n=location.hash;location.hash=\"\",location.hash=n}t.instance.__freezeListening=!1}),1))):w&&(window.location.href=t.to)}n()}function A(t,n){var e=t.instance;e.lastResolved()?m(e.lastResolved().map((function(n){return function(e,o){if(n.route.hooks&&n.route.hooks.leave){var r=!1,i=t.instance.matchLocation(n.route.path,t.currentLocationPath,!1);r=\"*\"!==n.route.path?!i:!(t.matches&&t.matches.find((function(t){return n.route.path===t.route.path}))),d(t.navigateOptions,\"callHooks\")&&r?m(n.route.hooks.leave.map((function(n){return function(e,o){return n((function(n){!1===n?t.instance.__markAsClean(t):o()}),t.matches&&t.matches.length>0?1===t.matches.length?t.matches[0]:t.matches:void 0)}})).concat([function(){return o()}])):o()}else o()}})),{},(function(){return n()})):n()}function P(t,n){d(t.navigateOptions,\"updateState\")&&t.instance._setCurrent(t.matches),n()}var R=[function(t,n){var e=t.instance.lastResolved();if(e&&e[0]&&e[0].route===t.match.route&&e[0].url===t.match.url&&e[0].queryString===t.match.queryString)return e.forEach((function(n){n.route.hooks&&n.route.hooks.already&&d(t.navigateOptions,\"callHooks\")&&n.route.hooks.already.forEach((function(n){return n(t.match)}))})),void n(!1);n()},function(t,n){t.match.route.hooks&&t.match.route.hooks.before&&d(t.navigateOptions,\"callHooks\")?m(t.match.route.hooks.before.map((function(n){return function(e,o){return n((function(n){!1===n?t.instance.__markAsClean(t):o()}),t.match)}})).concat([function(){return n()}])):n()},function(t,n){d(t.navigateOptions,\"callHandler\")&&t.match.route.handler(t.match),t.instance.updatePageLinks(),n()},function(t,n){t.match.route.hooks&&t.match.route.hooks.after&&d(t.navigateOptions,\"callHooks\")&&t.match.route.hooks.after.forEach((function(n){return n(t.match)})),n()}],S=[A,function(t,n){var e=t.instance._notFoundRoute;if(e){t.notFoundHandled=!0;var o=h(t.currentLocationPath),r=o[0],i=o[1],a=u(t.to);e.path=s(r);var c={url:e.path,queryString:i,hashString:a,data:null,route:e,params:\"\"!==i?f(i):null};t.matches=[c],t.match=c}n()},m.if((function(t){return t.notFoundHandled}),R.concat([P]),[function(t,n){t.resolveOptions&&!1!==t.resolveOptions.noMatchWarning&&void 0!==t.resolveOptions.noMatchWarning||console.warn('Navigo: \"'+t.currentLocationPath+\"\\\" didn't match any of the registered routes.\"),n()},function(t,n){t.instance._setCurrent(null),n()}])];function E(){return(E=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t}).apply(this,arguments)}function x(t,n){var e=0;A(t,(function o(){e!==t.matches.length?m(R,E({},t,{match:t.matches[e]}),(function(){e+=1,o()})):P(t,n)}))}function H(t){t.instance.__markAsClean(t)}function j(){return(j=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t}).apply(this,arguments)}var C=\"[data-navigo]\";function N(t,n){var e,o=n||{strategy:\"ONE\",hash:!1,noMatchWarning:!1,linksSelector:C},r=this,i=\"/\",d=null,w=[],L=!1,A=p(),P=v();function R(t){return t.indexOf(\"#\")>=0&&(t=!0===o.hash?t.split(\"#\")[1]||\"/\":t.split(\"#\")[0]),t}function E(t){return s(i+\"/\"+s(t))}function N(t,n,e,o){return t=c(t)?E(t):t,{name:o||s(String(t)),path:t,handler:n,hooks:g(e)}}function U(t,n){if(!r.__dirty){r.__dirty=!0,t=t?s(i)+\"/\"+s(t):void 0;var e={instance:r,to:t,currentLocationPath:t,navigateOptions:{},resolveOptions:j({},o,n)};return m([y,_,m.if((function(t){var n=t.matches;return n&&n.length>0}),x,S)],e,H),!!e.matches&&e.matches}r.__waiting.push((function(){return r.resolve(t,n)}))}function q(t,n){if(r.__dirty)r.__waiting.push((function(){return r.navigate(t,n)}));else{r.__dirty=!0,t=s(i)+\"/\"+s(t);var e={instance:r,to:t,navigateOptions:n||{},resolveOptions:n&&n.resolveOptions?n.resolveOptions:o,currentLocationPath:R(t)};m([k,O,_,m.if((function(t){var n=t.matches;return n&&n.length>0}),x,S),b,H],e,H)}}function F(){if(P)return(P?[].slice.call(document.querySelectorAll(o.linksSelector||C)):[]).forEach((function(t){\"false\"!==t.getAttribute(\"data-navigo\")&&\"_blank\"!==t.getAttribute(\"target\")?t.hasListenerAttached||(t.hasListenerAttached=!0,t.navigoHandler=function(n){if((n.ctrlKey||n.metaKey)&&\"a\"===n.target.tagName.toLowerCase())return!1;var e=t.getAttribute(\"href\");if(null==e)return!1;if(e.match(/^(http|https)/)&&\"undefined\"!=typeof URL)try{var o=new URL(e);e=o.pathname+o.search}catch(t){}var i=function(t){if(!t)return{};var n,e=t.split(\",\"),o={};return e.forEach((function(t){var e=t.split(\":\").map((function(t){return t.replace(/(^ +| +$)/g,\"\")}));switch(e[0]){case\"historyAPIMethod\":o.historyAPIMethod=e[1];break;case\"resolveOptionsStrategy\":n||(n={}),n.strategy=e[1];break;case\"resolveOptionsHash\":n||(n={}),n.hash=\"true\"===e[1];break;case\"updateBrowserURL\":case\"callHandler\":case\"updateState\":case\"force\":o[e[0]]=\"true\"===e[1]}})),n&&(o.resolveOptions=n),o}(t.getAttribute(\"data-navigo-options\"));L||(n.preventDefault(),n.stopPropagation(),r.navigate(s(e),i))},t.addEventListener(\"click\",t.navigoHandler)):t.hasListenerAttached&&t.removeEventListener(\"click\",t.navigoHandler)})),r}function I(t,n,e){var o=w.find((function(n){return n.name===t})),r=null;if(o){if(r=o.path,n)for(var a in n)r=r.replace(\":\"+a,n[a]);r=r.match(/^\\//)?r:\"/\"+r}return r&&e&&!e.includeRoot&&(r=r.replace(new RegExp(\"^/\"+i),\"\")),r}function M(t){var n=h(s(t)),o=n[0],r=n[1],i=\"\"===r?null:f(r);return{url:o,queryString:r,hashString:u(t),route:N(o,(function(){}),[e],o),data:null,params:i}}function T(t,n,e){return\"string\"==typeof n&&(n=z(n)),n?(n.hooks[t]||(n.hooks[t]=[]),n.hooks[t].push(e),function(){n.hooks[t]=n.hooks[t].filter((function(t){return t!==e}))}):(console.warn(\"Route doesn't exists: \"+n),function(){})}function z(t){return\"string\"==typeof t?w.find((function(n){return n.name===E(t)})):w.find((function(n){return n.handler===t}))}t?i=s(t):console.warn('Navigo requires a root path in its constructor. If not provided will use \"/\" as default.'),this.root=i,this.routes=w,this.destroyed=L,this.current=d,this.__freezeListening=!1,this.__waiting=[],this.__dirty=!1,this.__markAsClean=function(t){t.instance.__dirty=!1,t.instance.__waiting.length>0&&t.instance.__waiting.shift()()},this.on=function(t,n,o){var r=this;return\"object\"!=typeof t||t instanceof RegExp?(\"function\"==typeof t&&(o=n,n=t,t=i),w.push(N(t,n,[e,o])),this):(Object.keys(t).forEach((function(n){if(\"function\"==typeof t[n])r.on(n,t[n]);else{var o=t[n],i=o.uses,a=o.as,s=o.hooks;w.push(N(n,i,[e,s],a))}})),this)},this.off=function(t){return this.routes=w=w.filter((function(n){return c(t)?s(n.path)!==s(t):\"function\"==typeof t?t!==n.handler:String(n.path)!==String(t)})),this},this.resolve=U,this.navigate=q,this.navigateByName=function(t,n,e){var o=I(t,n);return null!==o&&(q(o.replace(new RegExp(\"^/?\"+i),\"\"),e),!0)},this.destroy=function(){this.routes=w=[],A&&window.removeEventListener(\"popstate\",this.__popstateListener),this.destroyed=L=!0},this.notFound=function(t,n){return r._notFoundRoute=N(\"*\",t,[e,n],\"__NOT_FOUND__\"),this},this.updatePageLinks=F,this.link=function(t){return\"/\"+i+\"/\"+s(t)},this.hooks=function(t){return e=t,this},this.extractGETParameters=function(t){return h(R(t))},this.lastResolved=function(){return d},this.generate=I,this.getLinkPath=function(t){return t.getAttribute(\"href\")},this.match=function(t){var n={instance:r,currentLocationPath:t,to:t,navigateOptions:{},resolveOptions:o};return _(n,(function(){})),!!n.matches&&n.matches},this.matchLocation=function(t,n,e){void 0===n||void 0!==e&&!e||(n=E(n));var o={instance:r,to:n,currentLocationPath:n};return y(o,(function(){})),\"string\"==typeof t&&(t=void 0===e||e?E(t):t),l(o,{name:String(t),path:t,handler:function(){},hooks:{}})||!1},this.getCurrentLocation=function(){return M(s(a(i)).replace(new RegExp(\"^\"+i),\"\"))},this.addBeforeHook=T.bind(this,\"before\"),this.addAfterHook=T.bind(this,\"after\"),this.addAlreadyHook=T.bind(this,\"already\"),this.addLeaveHook=T.bind(this,\"leave\"),this.getRoute=z,this._pathToMatchObject=M,this._clean=s,this._checkForAHash=R,this._setCurrent=function(t){return d=r.current=t},function(){A&&(this.__popstateListener=function(){r.__freezeListening||U()},window.addEventListener(\"popstate\",this.__popstateListener))}.call(this),F.call(this)}}},n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{}};return t[o](r,r.exports,e),r.exports}return e.d=function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e(407)}().default}));\n//# sourceMappingURL=navigo.min.js.map\n\n//# sourceURL=webpack://blog/./node_modules/navigo/lib/navigo.min.js?");

/***/ }),

/***/ "./public/js/api/api.js":
/*!******************************!*\
  !*** ./public/js/api/api.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"deleteArticle\": () => (/* binding */ deleteArticle)\n/* harmony export */ });\nconst deleteArticle = async (articleId) =>\n    fetch(`/api/articles/${articleId}`, {\n        method: \"DELETE\",\n    })\n\n\n//# sourceURL=webpack://blog/./public/js/api/api.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ \"./public/js/router.js\");\n/* harmony import */ var _widgets_sidebarComments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widgets/sidebarComments */ \"./public/js/widgets/sidebarComments.js\");\n/* harmony import */ var _utils_checkCookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/checkCookies */ \"./public/js/utils/checkCookies.js\");\n/* harmony import */ var _utils_$__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/$ */ \"./public/js/utils/$.js\");\n\n\n\n(function initDropdownHandlers() {\n    const searchForm = (0,_utils_$__WEBPACK_IMPORTED_MODULE_3__.$)(\".nav__search-form\")\n\n    ;(0,_utils_$__WEBPACK_IMPORTED_MODULE_3__.$)(\".nav__burger\")?.addEventListener(\"click\", () => {\n        ;(0,_utils_$__WEBPACK_IMPORTED_MODULE_3__.$)(\".nav__list\").classList.toggle(\"nav__list_opened\")\n        searchForm.classList.toggle(\"nav__search-form_opened\")\n        ;(0,_utils_$__WEBPACK_IMPORTED_MODULE_3__.$)(\".nav__logo\").classList.toggle(\"hidden\")\n    })\n\n    ;(0,_utils_$__WEBPACK_IMPORTED_MODULE_3__.$)(\".nav__search\")?.addEventListener(\"click\", () => {\n        searchForm.submit()\n    })\n\n    ;(0,_utils_$__WEBPACK_IMPORTED_MODULE_3__.$)(\".header__rubrics-btn\")?.addEventListener(\"click\", () =>\n        (0,_utils_$__WEBPACK_IMPORTED_MODULE_3__.$)(\".rubrics\").classList.toggle(\"rubrics_opened\")\n    )\n})()\n\n;(0,_utils_checkCookies__WEBPACK_IMPORTED_MODULE_2__.checkCookies)()\n\n;(0,_router__WEBPACK_IMPORTED_MODULE_0__.router)()\n;(0,_widgets_sidebarComments__WEBPACK_IMPORTED_MODULE_1__.sidebarComments)()\n\n\n//# sourceURL=webpack://blog/./public/js/main.js?");

/***/ }),

/***/ "./public/js/pages/articles.js":
/*!*************************************!*\
  !*** ./public/js/pages/articles.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initArticleRemovingHandlers\": () => (/* binding */ initArticleRemovingHandlers)\n/* harmony export */ });\n/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/api */ \"./public/js/api/api.js\");\n\n\nfunction initArticleRemovingHandlers() {\n    const deleteArticleForms = document.querySelectorAll(\n        \".articles__delete-form\"\n    )\n    deleteArticleForms.forEach((form) => {\n        form.addEventListener(\"submit\", async (event) => {\n            event.preventDefault()\n            const shouldDelete = window.confirm(\n                \"Вы уверены, что хотите удалить эту статью?\"\n            )\n            if (shouldDelete) {\n                try {\n                    const res = await _api_api__WEBPACK_IMPORTED_MODULE_0__.deleteArticle(form.dataset.articleId)\n                    if (res.ok) {\n                        return form.closest(\".articles__item\").remove()\n                    }\n                    throw new Error(\"Произошел сбой при удалении статьи\")\n                } catch (e) {\n                    console.error(e.message)\n                }\n            }\n            return false\n        })\n    })\n}\n\n\n//# sourceURL=webpack://blog/./public/js/pages/articles.js?");

/***/ }),

/***/ "./public/js/router.js":
/*!*****************************!*\
  !*** ./public/js/router.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"router\": () => (/* binding */ router)\n/* harmony export */ });\n/* harmony import */ var navigo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! navigo */ \"./node_modules/navigo/lib/navigo.min.js\");\n/* harmony import */ var navigo__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(navigo__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ \"./constants/index.js\");\n/* harmony import */ var _utils_imgsizeControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/imgsizeControl */ \"./public/js/utils/imgsizeControl.js\");\n/* harmony import */ var _utils_$__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/$ */ \"./public/js/utils/$.js\");\n/* harmony import */ var _pages_articles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/articles */ \"./public/js/pages/articles.js\");\n\n\n\n\n\n\nconst workWithArticles = () => {\n    const articleFormImgInput = (0,_utils_$__WEBPACK_IMPORTED_MODULE_3__.$)(\".article-editor__form-file\")\n    const articleFormSubmitBtn = (0,_utils_$__WEBPACK_IMPORTED_MODULE_3__.$)(\".article-editor__form-submit\")\n    ;(0,_utils_imgsizeControl__WEBPACK_IMPORTED_MODULE_2__.setSizeControl)(\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ARTICLE_PREVIEW_SIZE_KB,\n        articleFormSubmitBtn,\n        articleFormImgInput\n    )\n}\n\nconst router = () => {\n    const navigoRouter = new (navigo__WEBPACK_IMPORTED_MODULE_0___default())(\"/\")\n    navigoRouter.on(\"/articles\", _pages_articles__WEBPACK_IMPORTED_MODULE_4__.initArticleRemovingHandlers)\n    navigoRouter.on(\"/articles/add\", workWithArticles)\n    navigoRouter.on(\"/articles/:id/edit\", workWithArticles)\n}\n\n\n//# sourceURL=webpack://blog/./public/js/router.js?");

/***/ }),

/***/ "./public/js/utils/$.js":
/*!******************************!*\
  !*** ./public/js/utils/$.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"$\": () => (/* binding */ $)\n/* harmony export */ });\nconst $ = document.querySelector.bind(document)\n\n\n//# sourceURL=webpack://blog/./public/js/utils/$.js?");

/***/ }),

/***/ "./public/js/utils/checkCookies.js":
/*!*****************************************!*\
  !*** ./public/js/utils/checkCookies.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkCookies\": () => (/* binding */ checkCookies)\n/* harmony export */ });\nfunction checkCookies() {\n    const cookieDate = localStorage.getItem(\"cookieDate\")\n    const cookieNotification = document.getElementById(\"cookie_notification\")\n    const cookieBtn =\n        cookieNotification &&\n        cookieNotification.querySelector(\".cookie__button\")\n\n    // Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы\n    if (!cookieDate || +cookieDate + 31536000000 < Date.now()) {\n        cookieNotification.classList.add(\"show\")\n    }\n\n    // При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX\n    cookieBtn?.addEventListener(\"click\", () => {\n        localStorage.setItem(\"cookieDate\", Date.now())\n        cookieNotification.classList.remove(\"show\")\n    })\n}\n\n\n//# sourceURL=webpack://blog/./public/js/utils/checkCookies.js?");

/***/ }),

/***/ "./public/js/utils/imgsizeControl.js":
/*!*******************************************!*\
  !*** ./public/js/utils/imgsizeControl.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setSizeControl\": () => (/* binding */ setSizeControl)\n/* harmony export */ });\nconst imgSizeControl = (size, trigger, { files }) => {\n    if (files[0].size > size * 1024) {\n        const unit = size >= 1024 ? \"мб\" : \"кб\"\n        const unitSize = size >= 1024 ? size / 1024 : size\n        alert(`Размер файла превышает допустимые ${unitSize} ${unit}`)\n        trigger.disabled = true\n    } else {\n        trigger.disabled = false\n    }\n}\n\nconst setSizeControl = (sizeLimitKb, submitEl, fileInputEl) => {\n    if (submitEl && fileInputEl) {\n        fileInputEl.onchange = () =>\n            imgSizeControl(sizeLimitKb, submitEl, fileInputEl)\n    }\n}\n\n\n//# sourceURL=webpack://blog/./public/js/utils/imgsizeControl.js?");

/***/ }),

/***/ "./public/js/widgets/sidebarComments.js":
/*!**********************************************!*\
  !*** ./public/js/widgets/sidebarComments.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sidebarComments\": () => (/* binding */ sidebarComments)\n/* harmony export */ });\nconst populateTemplate = (template) => {\n    return ({ text, user }) => {\n        const comment = template.content.cloneNode(true)\n        const $ctx = comment.querySelector.bind(comment)\n        $ctx(\".sidebar__comments-text\").innerText = text\n        $ctx(\".sidebar__comments-author\").innerText = user.username\n        $ctx(\".sidebar__comments-img\").setAttribute(\n            \"src\",\n            `/static/${user.avatar || \"img/icons/user-profile.svg\"}`\n        )\n        return comment\n    }\n}\n\nconst sidebarComments = async () => {\n    const $ = document.querySelector.bind(document)\n    const lastComments = $(\".sidebar__js-last-comments\")\n    const template = $(\".sidebar__js-last-comments-template\")\n\n    if (lastComments) {\n        try {\n            const res = await fetch(\"/api/comments?limit=2\")\n            const commentsData = await res.json()\n            commentsData\n                .map(populateTemplate(template))\n                .forEach(lastComments.appendChild.bind(lastComments))\n        } catch (e) {\n            lastComments.remove()\n        }\n    }\n}\n\n\n//# sourceURL=webpack://blog/./public/js/widgets/sidebarComments.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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