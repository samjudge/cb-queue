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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Create a new queue function
 * 
 * @param {function} callback 
 */
function QueueFunction(callback) {

  this._callback = callback;
}

/**
 * Run the queued function
 * 
 * @param {function} done 
 */
QueueFunction.prototype.run = function () {
  var _this = this;

  return new Promise(function (resolve, reject) {

    _this._callback(resolve, reject);
  });
};

module.exports = QueueFunction;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Create a new result
 * 
 * @param {Object[]} response_arguments
 * @returns {Result}
 */
function Result(response_arguments) {

  this._response_arguments = response_arguments;
}

/**
 * Get the response arguments for the function at the specified index
 * 
 * @param {number} index The index of the function
 */
Result.prototype.getArguments = function (index) {

  return this._response_arguments[index];
};

module.exports = Result;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _QueueFunction = __webpack_require__(0);

var _QueueFunction2 = _interopRequireDefault(_QueueFunction);

var _Queue = __webpack_require__(3);

var _Queue2 = _interopRequireDefault(_Queue);

var _Result = __webpack_require__(1);

var _Result2 = _interopRequireDefault(_Result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { QueueFunction: _QueueFunction2.default, Queue: _Queue2.default, Result: _Result2.default };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Result = __webpack_require__(1),
    QueueFunction = __webpack_require__(0);

/**
 * Create a queue of functions
 * 
 * @param {Function[]} functions The array of functions
 * @returns {Queue}
 */
function Queue(functions) {

  this._functions = functions;
}

/**
 * Start running through the queued functions
 * 
 * @returns {Promise<Result, any[]>}
 */
Queue.prototype.start = function () {
  var _this = this;

  return new Promise(function (resolve, reject) {

    var responses = [],
        errors = [],
        complete = -1,
        perform = function perform() {

      complete++;

      var queued_function = _this._functions[complete];

      if (queued_function !== undefined) {

        if (queued_function.constructor.name === 'QueueFunction') {

          queued_function.run().then(function () {

            responses.push(arguments);

            perform();
          }).catch(function () {

            errors.push(arguments);

            perform();
          });
        } else {

          // current might not be a function or be instance of
          // QueueFunction but there may still be functions to run
          perform();
        }
      } else {

        // all functions are ran therefore the
        // .start() method should resolve or
        // reject depending on errors 

        if (errors.length > 0) {

          reject(errors);
        } else {

          resolve(new Result(responses));
        }
      }
    };

    // start the queue
    perform();
  });
};

module.exports = Queue;

/***/ })
/******/ ]);