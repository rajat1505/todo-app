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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 81);
/******/ })
/************************************************************************/
/******/ ({

/***/ 116:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(94)(true);
// imports


// module
exports.push([module.i, "html {\r\n  background-color: #222;\r\n  font-size: 16px;\r\n  cursor: default;\r\n}\r\n\r\nbody {\r\n  font-family: aktiv-grotesk-std, Helvetica Neue, Arial, sans-serif;\r\n  font-size: 1.125rem;\r\n  line-height: 1.3333333333;\r\n  color: #999;\r\n}\r\n\r\n.button {\r\n  -webkit-appearance: none;\r\n  border: 1px solid #999;\r\n  background: transparent;\r\n  padding: 20px 30px;\r\n  color: inherit;\r\n  border-radius: 7px;\r\n  font-size: 1.5rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:focus {\r\n  outline: none;\r\n}\r\n\r\n.button:hover {\r\n  color: #222;\r\n  background-color: #999;\r\n}\r\n\r\n.app {\r\n  width: 920px;\r\n  margin: 150px auto 0 auto;\r\n}\r\n\r\n.todo__add-new__input {\r\n  height: 61px;\r\n  font-size: 2rem;\r\n  outline: none;\r\n  border: 0;\r\n  border-bottom: 1px dotted #666;\r\n  border-radius: 0;\r\n  width: 100%;\r\n  font-family: inherit;\r\n  font-weight: 300;\r\n  color: #fff;\r\n  background: transparent;\r\n  width: 75%;\r\n  margin-right: 5%;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.todo__add-new__button {\r\n  display: inline-block;\r\n}\r\n\r\n.todo {\r\n  width: 100%;\r\n  margin: 0 auto;\r\n}\r\n\r\n.todo__list {\r\n  padding: 0;\r\n  margin-top: 80px;\r\n}\r\n\r\n.todo__item {\r\n  user-select: none;\r\n  height: 60px;\r\n  border-bottom: 1px dotted #666;\r\n  list-style-type: none;\r\n  font-size: 1.5rem;\r\n  position: relative;\r\n}\r\n\r\n.todo__item__text--completed {\r\n  color: #666;\r\n  text-decoration: line-through;\r\n}\r\n\r\n.todo__filter {\r\n  padding: 0;\r\n  margin-top: 50px;\r\n  text-align: center;\r\n}\r\n\r\n.todo__filter__list {\r\n  display: inline-block;\r\n  list-style-type: none;\r\n}\r\n\r\n.todo__filter__list:before {\r\n  padding-right: 12px;\r\n  content: \"/\";\r\n  font-weight: 300;\r\n}\r\n\r\n.todo__filter__list:first-child:before {\r\n  content: '';\r\n}\r\n\r\n.todo__filter__link {\r\n  padding-right: 30px;\r\n  color: #aaa;\r\n  text-decoration: none;\r\n  font-size: 1.5rem;\r\n}\r\n\r\n.todo__filter__link--selected {\r\n  color: #fff;\r\n}\r\n\r\n.todo__item__text {\r\n  display: inline-block;\r\n  cursor: pointer;\r\n  padding: 0;\r\n  margin: 0;\r\n  line-height: 80px;\r\n}\r\n\r\n.todo__item__actions {\r\n  display: inline-block;\r\n  position: absolute;\r\n  right: 0;\r\n  bottom: 15%;\r\n}\r\n\r\n.todo__item__actions--edit {\r\n  padding: 5px 10px;\r\n  margin: 0 10px;\r\n  font-size: 1.2rem;\r\n}\r\n\r\n.todo__item__actions--delete {\r\n  padding: 5px 10px;\r\n  margin: 0 10px;\r\n  font-size: 1.2rem;\r\n}\r\n\r\n.todo__item__add-input {\r\n  outline: none;\r\n  border: 0;\r\n  padding: 0;\r\n  width: 100%;\r\n  height: 60px;\r\n  color: inherit;\r\n  font: inherit;\r\n  background: transparent;\r\n  margin-top: 10px;\r\n}\r\n", "", {"version":3,"sources":["C:/Users/RAJA/Desktop/Rajat/ToDoApp/css/styles.css"],"names":[],"mappings":"AAAA;EACE,uBAAuB;EACvB,gBAAgB;EAChB,gBAAgB;CACjB;;AAED;EACE,kEAAkE;EAClE,oBAAoB;EACpB,0BAA0B;EAC1B,YAAY;CACb;;AAED;EACE,yBAAyB;EACzB,uBAAuB;EACvB,wBAAwB;EACxB,mBAAmB;EACnB,eAAe;EACf,mBAAmB;EACnB,kBAAkB;EAClB,gBAAgB;CACjB;;AAED;EACE,cAAc;CACf;;AAED;EACE,YAAY;EACZ,uBAAuB;CACxB;;AAED;EACE,aAAa;EACb,0BAA0B;CAC3B;;AAED;EACE,aAAa;EACb,gBAAgB;EAChB,cAAc;EACd,UAAU;EACV,+BAA+B;EAC/B,iBAAiB;EACjB,YAAY;EACZ,qBAAqB;EACrB,iBAAiB;EACjB,YAAY;EACZ,wBAAwB;EACxB,WAAW;EACX,iBAAiB;EACjB,uBAAuB;CACxB;;AAED;EACE,sBAAsB;CACvB;;AAED;EACE,YAAY;EACZ,eAAe;CAChB;;AAED;EACE,WAAW;EACX,iBAAiB;CAClB;;AAED;EACE,kBAAkB;EAClB,aAAa;EACb,+BAA+B;EAC/B,sBAAsB;EACtB,kBAAkB;EAClB,mBAAmB;CACpB;;AAED;EACE,YAAY;EACZ,8BAA8B;CAC/B;;AAED;EACE,WAAW;EACX,iBAAiB;EACjB,mBAAmB;CACpB;;AAED;EACE,sBAAsB;EACtB,sBAAsB;CACvB;;AAED;EACE,oBAAoB;EACpB,aAAa;EACb,iBAAiB;CAClB;;AAED;EACE,YAAY;CACb;;AAED;EACE,oBAAoB;EACpB,YAAY;EACZ,sBAAsB;EACtB,kBAAkB;CACnB;;AAED;EACE,YAAY;CACb;;AAED;EACE,sBAAsB;EACtB,gBAAgB;EAChB,WAAW;EACX,UAAU;EACV,kBAAkB;CACnB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;EACT,YAAY;CACb;;AAED;EACE,kBAAkB;EAClB,eAAe;EACf,kBAAkB;CACnB;;AAED;EACE,kBAAkB;EAClB,eAAe;EACf,kBAAkB;CACnB;;AAED;EACE,cAAc;EACd,UAAU;EACV,WAAW;EACX,YAAY;EACZ,aAAa;EACb,eAAe;EACf,cAAc;EACd,wBAAwB;EACxB,iBAAiB;CAClB","file":"styles.css","sourcesContent":["html {\r\n  background-color: #222;\r\n  font-size: 16px;\r\n  cursor: default;\r\n}\r\n\r\nbody {\r\n  font-family: aktiv-grotesk-std, Helvetica Neue, Arial, sans-serif;\r\n  font-size: 1.125rem;\r\n  line-height: 1.3333333333;\r\n  color: #999;\r\n}\r\n\r\n.button {\r\n  -webkit-appearance: none;\r\n  border: 1px solid #999;\r\n  background: transparent;\r\n  padding: 20px 30px;\r\n  color: inherit;\r\n  border-radius: 7px;\r\n  font-size: 1.5rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:focus {\r\n  outline: none;\r\n}\r\n\r\n.button:hover {\r\n  color: #222;\r\n  background-color: #999;\r\n}\r\n\r\n.app {\r\n  width: 920px;\r\n  margin: 150px auto 0 auto;\r\n}\r\n\r\n.todo__add-new__input {\r\n  height: 61px;\r\n  font-size: 2rem;\r\n  outline: none;\r\n  border: 0;\r\n  border-bottom: 1px dotted #666;\r\n  border-radius: 0;\r\n  width: 100%;\r\n  font-family: inherit;\r\n  font-weight: 300;\r\n  color: #fff;\r\n  background: transparent;\r\n  width: 75%;\r\n  margin-right: 5%;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.todo__add-new__button {\r\n  display: inline-block;\r\n}\r\n\r\n.todo {\r\n  width: 100%;\r\n  margin: 0 auto;\r\n}\r\n\r\n.todo__list {\r\n  padding: 0;\r\n  margin-top: 80px;\r\n}\r\n\r\n.todo__item {\r\n  user-select: none;\r\n  height: 60px;\r\n  border-bottom: 1px dotted #666;\r\n  list-style-type: none;\r\n  font-size: 1.5rem;\r\n  position: relative;\r\n}\r\n\r\n.todo__item__text--completed {\r\n  color: #666;\r\n  text-decoration: line-through;\r\n}\r\n\r\n.todo__filter {\r\n  padding: 0;\r\n  margin-top: 50px;\r\n  text-align: center;\r\n}\r\n\r\n.todo__filter__list {\r\n  display: inline-block;\r\n  list-style-type: none;\r\n}\r\n\r\n.todo__filter__list:before {\r\n  padding-right: 12px;\r\n  content: \"/\";\r\n  font-weight: 300;\r\n}\r\n\r\n.todo__filter__list:first-child:before {\r\n  content: '';\r\n}\r\n\r\n.todo__filter__link {\r\n  padding-right: 30px;\r\n  color: #aaa;\r\n  text-decoration: none;\r\n  font-size: 1.5rem;\r\n}\r\n\r\n.todo__filter__link--selected {\r\n  color: #fff;\r\n}\r\n\r\n.todo__item__text {\r\n  display: inline-block;\r\n  cursor: pointer;\r\n  padding: 0;\r\n  margin: 0;\r\n  line-height: 80px;\r\n}\r\n\r\n.todo__item__actions {\r\n  display: inline-block;\r\n  position: absolute;\r\n  right: 0;\r\n  bottom: 15%;\r\n}\r\n\r\n.todo__item__actions--edit {\r\n  padding: 5px 10px;\r\n  margin: 0 10px;\r\n  font-size: 1.2rem;\r\n}\r\n\r\n.todo__item__actions--delete {\r\n  padding: 5px 10px;\r\n  margin: 0 10px;\r\n  font-size: 1.2rem;\r\n}\r\n\r\n.todo__item__add-input {\r\n  outline: none;\r\n  border: 0;\r\n  padding: 0;\r\n  width: 100%;\r\n  height: 60px;\r\n  color: inherit;\r\n  font: inherit;\r\n  background: transparent;\r\n  margin-top: 10px;\r\n}\r\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(80);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(82)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--2-1!./styles.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--2-1!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(116);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 94:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ })

/******/ });
//# sourceMappingURL=css.bundle.js.map