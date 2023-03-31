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

/***/ "./src/js/checkUserIsLogged.js":
/*!*************************************!*\
  !*** ./src/js/checkUserIsLogged.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(async () => {\r\n    const navUserLoggedOut = document.querySelector('#nav-logged-out');\r\n    const navUserLoggedIn = document.querySelector('#nav-logged-in');\r\n\r\n    // const getCookie = cookieName => {\r\n    //     let name = cookieName + '=';\r\n    //     let decodedCookie = decodeURIComponent(document.cookie);\r\n    //     let ca = decodedCookie.split(';');\r\n\r\n    //     for(let i = 0; i <ca.length; i++) {\r\n    //       let c = ca[i];\r\n\r\n    //       while (c.charAt(0) == ' ') {\r\n    //         c = c.substring(1);\r\n    //       }\r\n\r\n    //       if (c.indexOf(name) == 0) {\r\n    //         return c.substring(name.length, c.length);\r\n    //       }\r\n    //     }\r\n\r\n    //     return '';\r\n    // }\r\n\r\n    // const csrfToken = getCookie('_csrf');\r\n\r\n    const response = await fetch('/auth/logStatus', {\r\n        method: 'GET',\r\n        credentials: 'same-origin'\r\n        // headers: {\r\n        //     // 'X-CSRF-TOKEN': token\r\n        //     'CSRF-Token': csrfToken\r\n            \r\n        // }\r\n    });\r\n\r\n    const { userLogged } = await response.json();\r\n\r\n    if (userLogged) {\r\n        navUserLoggedOut.className = 'hidden';\r\n        navUserLoggedIn.classList.add('my-5', 'text-sm', 'md:flex', 'md:items-center', 'md:gap-3', 'font-bold', 'text-white', 'hidden');\r\n    } else {\r\n        navUserLoggedIn.className = 'hidden';\r\n        navUserLoggedOut.classList.add('my-5', 'text-sm', 'md:flex', 'md:items-center', 'md:gap-3', 'font-bold', 'text-white', 'hidden');\r\n    }\r\n\r\n})();\n\n//# sourceURL=webpack://bienes-raices-mvc/./src/js/checkUserIsLogged.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/checkUserIsLogged.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;