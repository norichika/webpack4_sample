/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/_util/Breakpoint.js":
/*!*********************************!*\
  !*** ./src/_util/Breakpoint.js ***!
  \*********************************/
/*! exports provided: BreakPoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BreakPoint\", function() { return BreakPoint; });\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * ブレイクポイント振り分けJS\r\n *\r\n */\nvar BreakPoint = function () {\n\t/**\r\n  *\r\n  * @param {object} options ブレイクポイントのobject\r\n  */\n\tfunction BreakPoint(options) {\n\t\t_classCallCheck(this, BreakPoint);\n\n\t\tthis.listeners = [];\n\t\tthis.settings = {};\n\t\tthis.obj = {};\n\t\tthis.break_point_change_event = {};\n\t\tthis.myquery = [];\n\t\tthis.myquery_cl = [];\n\n\t\tthis.defaults = {\n\t\t\tbreakpoints: [{ width: 600, name: 'tablet' }, { width: 960, name: 'PC' }]\n\t\t};\n\n\t\tif (options === undefined) {\n\t\t\toptions = this.defaults;\n\t\t}\n\t\tthis.settings.breakpoints = options.breakpoints || this.defaults.breakpoints;\n\t\tthis.settings.breakpoints.unshift({ width: 1, name: 'SP' });\n\n\t\tthis._init();\n\t}\n\n\t/**\r\n  * _init\r\n  */\n\n\n\t_createClass(BreakPoint, [{\n\t\tkey: '_init',\n\t\tvalue: function _init() {\n\t\t\tvar _this = this;\n\n\t\t\t//ブラウザ判定（旧IE event登録振り分け）\n\t\t\tif (typeof Event === 'function') {\n\t\t\t\tthis.break_point_change_event = new CustomEvent('breakpoints');\n\t\t\t} else {\n\t\t\t\tthis.break_point_change_event = document.createEvent('CustomEvent');\n\t\t\t\tthis.break_point_change_event.initCustomEvent('breakpoints', true, true, null);\n\t\t\t}\n\n\t\t\t// メディアの組み立て\n\t\t\tthis.settings.breakpoints.some(function (val, index) {\n\t\t\t\tif (index === 0) {\n\t\t\t\t\t_this.myquery.push('screen and (max-width: ' + _this.settings.breakpoints[index + 1]['width'] + 'px)');\n\t\t\t\t} else if (index === _this.settings.breakpoints.length - 1) {\n\t\t\t\t\t_this.myquery.push('screen and (min-width: ' + (val['width'] + 1) + 'px)');\n\t\t\t\t} else {\n\t\t\t\t\t_this.myquery.push('screen and (max-width: ' + _this.settings.breakpoints[index + 1]['width'] + 'px) and (min-width: ' + (_this.settings.breakpoints[index]['width'] + 1) + 'px)');\n\t\t\t\t}\n\t\t\t});\n\n\t\t\tthis.myquery_cl = [].concat(this.myquery);\n\t\t\tthis.myquery_cl.some(function (val, index) {\n\t\t\t\t_this.myquery_cl[index] = _this.myquery_cl[index].replace(/\\s+/g, \"\");\n\t\t\t});\n\n\t\t\tthis.dispatchEvent = function (e, data) {\n\t\t\t\tvar observers = _this.listeners[e.type] || '';\n\t\t\t\tif (observers !== '') {\n\t\t\t\t\tfor (var i = 0; i < observers.length; ++i) {\n\t\t\t\t\t\tobservers[i](data);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t};\n\t\t\twindow.addEventListener('load', this._check_breakpoints.bind(this));\n\t\t}\n\n\t\t/**\r\n   * breakpoint dispatch\r\n   */\n\n\t}, {\n\t\tkey: '_check_breakpoints',\n\t\tvalue: function _check_breakpoints() {\n\t\t\tvar _this2 = this;\n\n\t\t\tthis.myquery.some(function (val, index) {\n\t\t\t\t// init\n\t\t\t\tif (window.matchMedia(_this2.myquery[index]).matches) {\n\t\t\t\t\t_this2.obj = {\n\t\t\t\t\t\twidth: window.innerWidth,\n\t\t\t\t\t\tbreakpoint: _this2.settings.breakpoints[index]['width'],\n\t\t\t\t\t\tname: _this2.settings.breakpoints[index]['name']\n\t\t\t\t\t};\n\t\t\t\t\t_this2.dispatchEvent(_this2.break_point_change_event, _this2.obj);\n\t\t\t\t}\n\n\t\t\t\twindow.matchMedia(_this2.myquery[index]).addListener(function (e) {\n\t\t\t\t\tif (e.matches) {\n\t\t\t\t\t\tvar tmp = e['media'].replace(/\\s+/g, \"\");\n\n\t\t\t\t\t\t// fire\n\t\t\t\t\t\t_this2.obj = {\n\t\t\t\t\t\t\twidth: window.innerWidth,\n\t\t\t\t\t\t\tbreakpoint: _this2.settings.breakpoints[_this2.myquery_cl.indexOf(tmp)]['width'],\n\t\t\t\t\t\t\tname: _this2.settings.breakpoints[_this2.myquery_cl.indexOf(tmp)]['name']\n\t\t\t\t\t\t};\n\t\t\t\t\t\t_this2.dispatchEvent(_this2.break_point_change_event, _this2.obj);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t});\n\t\t}\n\n\t\t/**\r\n   * イベントリスナー登録\r\n   * @param state\r\n   * @param callback\r\n   * @param isCapture\r\n   */\n\n\t}, {\n\t\tkey: 'addEventListener',\n\t\tvalue: function addEventListener(state, callback, isCapture) {\n\t\t\tif (!this.listeners[state]) this.listeners[state] = [];\n\t\t\tthis.listeners[state].push(callback);\n\t\t}\n\n\t\t/**\r\n   * イベントリスナー削除\r\n   * @param state\r\n   */\n\n\t}, {\n\t\tkey: 'removeEventListener',\n\t\tvalue: function removeEventListener(state) {\n\t\t\tif (!this.listeners[state]) return;\n\t\t\tthis.listeners[state] = null;\n\t\t}\n\t}, {\n\t\tkey: 'getPoint',\n\t\tvalue: function getPoint() {\n\t\t\treturn this.obj;\n\t\t}\n\t}, {\n\t\tkey: 'getName',\n\t\tvalue: function getName() {\n\t\t\treturn this.obj['name'];\n\t\t}\n\t}, {\n\t\tkey: 'getBreakPoint',\n\t\tvalue: function getBreakPoint() {\n\t\t\treturn this.obj['breakpoint'];\n\t\t}\n\t}, {\n\t\tkey: 'getWidth',\n\t\tvalue: function getWidth() {\n\t\t\treturn this.obj['width'];\n\t\t}\n\t}]);\n\n\treturn BreakPoint;\n}();\n\n//# sourceURL=webpack:///./src/_util/Breakpoint.js?");

/***/ }),

/***/ "./src/js/_sub.js":
/*!************************!*\
  !*** ./src/js/_sub.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Utils = function () {\n\tfunction Utils() {\n\t\t_classCallCheck(this, Utils);\n\t}\n\n\t_createClass(Utils, null, [{\n\t\tkey: 'method1',\n\t\tvalue: function method1() {\n\t\t\tconsole.log('method1');\n\t\t}\n\t}, {\n\t\tkey: 'method2',\n\t\tvalue: function method2() {\n\t\t\tconsole.log('method2');\n\t\t}\n\t}]);\n\n\treturn Utils;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Utils);\n\n//# sourceURL=webpack:///./src/js/_sub.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_sub */ \"./src/js/_sub.js\");\n/* harmony import */ var _util_Breakpoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_util/Breakpoint */ \"./src/_util/Breakpoint.js\");\n// import _ from 'lodash';\n\n\n\n_sub__WEBPACK_IMPORTED_MODULE_0__[\"default\"].method1();\n_sub__WEBPACK_IMPORTED_MODULE_0__[\"default\"].method2();\n_sub__WEBPACK_IMPORTED_MODULE_0__[\"default\"].method2();\n\n// timer(5000);\n// console.log(_);\n\n\nconsole.log(\"aaaaaa\");\nconsole.log(\"aaaaaa\");\nconsole.log(\"aaaaaa\");\n\ntimer(5000);\n\nfunction timer(delay) {\n\tvar myFirstPromise = new Promise(function (resolve, reject) {\n\t\tsetTimeout(function () {\n\t\t\tresolve(\"Success!\"); // Yay! Everything went well!\n\t\t}, delay);\n\t});\n\n\tmyFirstPromise.then(function (successMessage) {\n\t\t// successMessage is whatever we passed in the resolve(...) function above.\n\t\t// It doesn't have to be a string, but if it is only a succeed message, it probably will be.\n\t\tconsole.log(\"Yay! \" + successMessage);\n\t});\n}\n\nvar breakpoint = new _util_Breakpoint__WEBPACK_IMPORTED_MODULE_1__[\"BreakPoint\"]({\n\tbreakpoints: [{ width: 480, name: 'portrait' }, { width: 720, name: 'landscape' }, { width: 1200, name: 'PC' }]\n});\nbreakpoint.addEventListener('breakpoints', function (e) {\n\tconsole.log(e);\n\t// if(e['name'] === 'PC') {\n\t// \tconsole.log(e['name']);\n\t// } else if(e['name'] === 'landscape') {\n\t// \tconsole.log(e['name']);\n\t// } else if(e['name'] === 'portrait') {\n\t// \tconsole.log(e['name']);\n\t// } else if(e['name'] === 'SP') {\n\t// \tconsole.log(e['name']);\n\t// }\n});\n\ndocument.addEventListener(\"click\", function (event) {\n\tif (event.target.classList.contains(\"button\")) {\n\t\tconsole.log(breakpoint.getPoint());\n\t\tconsole.log(breakpoint.getName());\n\t\tconsole.log(breakpoint.getBreakPoint());\n\t\tconsole.log(breakpoint.getWidth());\n\t\tbreakpoint.removeEventListener('breakpoints');\n\t}\n}, false);\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ })

/******/ });