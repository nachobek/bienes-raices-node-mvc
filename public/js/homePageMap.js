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

/***/ "./src/js/homePageMap.js":
/*!*******************************!*\
  !*** ./src/js/homePageMap.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n    const lat = 41.3935138;\r\n    const lng = 2.1791033;\r\n    const map = L.map('map-homePage').setView([lat, lng ], 14);\r\n\r\n    let markers = new L.FeatureGroup().addTo(map);\r\n\r\n    // Home Page Map Filters set up\r\n    const categoriesSelect = document.querySelector('#categories');\r\n    const pricesSelect = document.querySelector('#prices');\r\n\r\n    let properties = [];\r\n\r\n    const filters = {\r\n        category: '',\r\n        price: ''\r\n    }\r\n\r\n\r\n    // Render map\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(map);\r\n\r\n\r\n    // Home Page Map Filtering\r\n    const filterCategory = (property) => {\r\n        // The .filter() array method returns the object in question on a truthy condition.\r\n        if (filters.category) {\r\n            // Meaning, here, if there is a Category filter applied, it will return true for every object that matches the given filter. Therefore it will literally return each mathing object.\r\n            // If the object being evaluated doesn't match the given filter, it returns false, meaning the object is not passed back to the resulting array.\r\n            return filters.category === property.categoryId;\r\n        }\r\n\r\n        // Therefore, if there are no filters provided, we can either return the very same object in question (property). Or returning true will also return the object.\r\n        return true;\r\n    }\r\n\r\n    const filterPrice = (property) => {\r\n        return filters.price ? filters.price === property.priceId : property\r\n    }\r\n\r\n    const filterProperties = () => {\r\n        const result = properties.filter(filterCategory).filter(filterPrice);\r\n\r\n        displayProperties(result);\r\n    }\r\n\r\n    categoriesSelect.addEventListener('change', event => {\r\n        filters.category = Number(event.target.value);\r\n        filterProperties();\r\n    });\r\n\r\n    pricesSelect.addEventListener('change', event => {\r\n        filters.price = Number(event.target.value);\r\n        filterProperties();\r\n    });\r\n\r\n\r\n    // Get and render properties on map.\r\n    const displayProperties = (properties) => {\r\n        markers.clearLayers(); // Clearing current layer of markers so it resets when filters are applied.\r\n\r\n        properties.forEach(property => {\r\n            const marker = new L.marker([property?.lat, property?.lng], {\r\n                autoPan: true\r\n            })\r\n            .addTo(map)\r\n            .bindPopup(`\r\n                <h1 class=\"text-xl font-extrabold uppercase mt-2\">${property?.title}</h1>\r\n                <p class=\"text-indigo-600 font-bold\">${property?.category?.name}</p>\r\n                <p class=\"text-gray-600 font-bold\">${property?.price?.priceRange}</p>\r\n                <img src=\"/uploads/${property?.image}\" alt=\"Property: ${property?.title} image\">\r\n                <a href=\"/property/${property?.id}\" class=\"bg-indigo-600 block p-2 text-center font-bold uppercase mt-5\">View Property</a>\r\n            `);\r\n\r\n            markers.addLayer(marker); // Adding each marker to markers so it can be used for filtering.\r\n        });\r\n    }\r\n\r\n    const getProperties = async () => {\r\n        try {\r\n            const url = '/api/properties';\r\n\r\n            const response = await fetch(url);            \r\n            const responseJson = await response.json();\r\n\r\n            properties = responseJson.properties;\r\n\r\n            // Passing the array of properties found in the response.\r\n            displayProperties(properties);\r\n\r\n        } catch (error) {\r\n            console.log('Error encountered when retrieving the list of properties.\\n', error);\r\n        }\r\n    }\r\n\r\n    getProperties();\r\n})();\n\n//# sourceURL=webpack://bienes-raices-mvc/./src/js/homePageMap.js?");

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
/******/ 	__webpack_modules__["./src/js/homePageMap.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;