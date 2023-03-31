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

/***/ "./src/js/changeStatus.js":
/*!********************************!*\
  !*** ./src/js/changeStatus.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(() => {\r\n    const changeStatusButtons = document.querySelectorAll('.change-status');\r\n\r\n    const token = document.querySelector('meta[name=\"csrf-token\"]').getAttribute('content');\r\n\r\n    const changePropertyStatus = async (event) => {\r\n        const { propertyId } = event.target.dataset; // Represents the value stored on custom dataset \"data-property-id\" in properties/admin.pug\r\n\r\n        const url = `/properties/${propertyId}`;\r\n\r\n        try {\r\n            const response = await fetch(url, {\r\n                method: 'PUT',\r\n                headers: {\r\n                    // 'X-CSRF-TOKEN': token\r\n                    'CSRF-Token': token\r\n                }\r\n            });\r\n\r\n            const { result } = await response.json();\r\n\r\n            if (result) {\r\n                if (event.target.classList.contains('bg-amber-100')) {\r\n                    event.target.classList.add('bg-green-100', 'text-green-800');\r\n                    event.target.classList.remove('bg-amber-100', 'text-amber-800');\r\n                    event.target.textContent = 'Published'\r\n                } else {\r\n                    event.target.classList.add('bg-amber-100', 'text-amber-800');\r\n                    event.target.classList.remove('bg-green-100', 'text-green-800');\r\n                    event.target.textContent = 'Not Published'\r\n                }\r\n            }\r\n        } catch (error) {\r\n            console.log('Error when updating property published status\\n', error);\r\n        }\r\n    }\r\n\r\n    changeStatusButtons.forEach(button => {\r\n        button.addEventListener('click', changePropertyStatus)\r\n    });\r\n\r\n})()\n\n//# sourceURL=webpack://bienes-raices-mvc/./src/js/changeStatus.js?");

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
/******/ 	__webpack_modules__["./src/js/changeStatus.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;