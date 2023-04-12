function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { jsonExample, yamlExample, yamlToJson } from '../helpers';
import LeftRegion from './regions/LeftRegion';
import MiddleRegion from './regions/MiddleRegion';
import RightRegion from './regions/RightRegion';
import { resolveRefs } from '../core/resolver';
import FileUploadPage from '../core/FileUploadPage';
import ErrorBoundary from '../core/ErrorBoundary';
import FileUrl from '../core/FileUrl';
import '../core/assets/styles.scss';
export default function ApiDocPro(props) {
  var _theme$styles, _theme$styles2, _theme$styles3, _theme$styles4, _theme$styles5, _theme$styles6, _theme$styles7, _theme$styles8, _theme$styles9, _theme$styles10, _theme$styles11, _theme$styles12;
  // eslint-disable-next-line react/prop-types
  //   collapse, search, codesnippet
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    left = _useState2[0],
    setLeft = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray(_useState3, 2),
    right = _useState4[0],
    setRight = _useState4[1];
  // eslint-disable-next-line no-unused-vars
  var _useState5 = useState(),
    _useState6 = _slicedToArray(_useState5, 2),
    obj = _useState6[0],
    setObj = _useState6[1];
  var _useState7 = useState(),
    _useState8 = _slicedToArray(_useState7, 2),
    resolved = _useState8[0],
    setResolved = _useState8[1];
  var _props$title = props.title,
    title = _props$title === void 0 ? '' : _props$title,
    spec = props.spec,
    collapse = props.collapse,
    theme = props.theme,
    leftregion = props.leftregion,
    rightregion = props.rightregion,
    header = props.header;
  var _useState9 = useState(false),
    _useState10 = _slicedToArray(_useState9, 2),
    openCollapse = _useState10[0],
    setopenCollapse = _useState10[1];
  var _useState11 = useState(true),
    _useState12 = _slicedToArray(_useState11, 2),
    head = _useState12[0],
    setHead = _useState12[1];
  var _useState13 = useState(''),
    _useState14 = _slicedToArray(_useState13, 2),
    spectype = _useState14[0],
    setspectype = _useState14[1];
  var _useState15 = useState(true),
    _useState16 = _slicedToArray(_useState15, 2),
    loading = _useState16[0],
    setLoading = _useState16[1];
  var _useState17 = useState(yamlExample),
    _useState18 = _slicedToArray(_useState17, 2),
    specification = _useState18[0],
    setSpecification = _useState18[1];
  var rebuild = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var e,
        finE,
        newSpec,
        ob,
        reso,
        _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
            setopenCollapse(collapse || false);
            setResolved(null);
            setObj(null);
            setspectype('');
            if (e) {
              try {
                finE = JSON.parse(e);
              } catch (error) {
                finE = e;
              }
            }
            newSpec = finE ? finE : localStorage.getItem('spec') && localStorage.getItem('spec') !== '' ? JSON.parse(localStorage.getItem('spec')) : yamlExample;
            if (newSpec && (newSpec.asyncapi || newSpec['asyncapi'])) {
              setspectype('asyncapi');
            } else if (newSpec && (newSpec.openapi || newSpec['openapi'])) {
              setspectype('openapi');
            } else if (newSpec && (newSpec.swagger || newSpec['swagger'])) {
              setspectype('swagger');
            } else {
              setspectype('openapi');
            }
            if (newSpec) {
              try {
                setSpecification(JSON.parse(newSpec));
              } catch (error) {
                setSpecification(newSpec);
              }
            } else {
              setSpecification(jsonExample);
            }
            ob = yamlToJson(newSpec) ? yamlToJson(newSpec) : newSpec;
            setObj(ob);
            reso = resolveRefs(newSpec); // Check Openapi or Async
            setResolved(reso);
            setTimeout(function () {
              try {
                var test = JSON.parse(resolved);
                setResolved(test);
              } catch (error) {
                setResolved(reso);
              }
              setLoading(false);
            }, 1000);
          case 14:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function rebuild() {
      return _ref.apply(this, arguments);
    };
  }();
  useEffect(function () {
    setLoading(true);
    rebuild(spec);
  }, [spec]);
  useEffect(function () {
    setLoading(true);
    rebuild(spec);
    if (leftregion) {
      setLeft(leftregion);
    } else {
      setLeft(false);
    }
    if (rightregion) {
      setRight(rightregion);
    } else {
      setRight(false);
    }
    if (header) {
      setHead(header);
    } else {
      setHead(false);
    }
  }, []);
  var _handleFileCallback = function handleFileCallback(e) {
    setLoading(true);
    rebuild(e);
  };
  var goToDefault = function goToDefault() {
    localStorage.removeItem('spec');
    setLoading(true);
    rebuild(specification);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "container-fluid p-0 m-0"
  }, head && spectype !== '' && /*#__PURE__*/React.createElement("header", {
    className: "row p-3 bg-light sticky-top shadow pt-5 pb-3 m-0 mb-3 maxw-100 "
  }, /*#__PURE__*/React.createElement("div", {
    className: "col text-start"
  }, title || 'APIDocPro UI'), /*#__PURE__*/React.createElement("div", {
    className: "col text-start"
  }, /*#__PURE__*/React.createElement(FileUrl, {
    handleFileCallback: function handleFileCallback(e) {
      return _handleFileCallback(e);
    }
  }), /*#__PURE__*/React.createElement(FileUploadPage, {
    handleFileCallback: function handleFileCallback(e) {
      return _handleFileCallback(e);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "col pull-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon badge rounded-pill bg-dark text-light form-control",
    onClick: function onClick() {
      return setLeft(!left);
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-caret-left"
  }), " Left-side Menu"), /*#__PURE__*/React.createElement("button", {
    className: "icon badge rounded-pill bg-dark text-light form-control",
    onClick: function onClick() {
      return setRight(!right);
    }
  }, "Request Body ", /*#__PURE__*/React.createElement("i", {
    className: "fa fa-caret-right"
  })), /*#__PURE__*/React.createElement("button", {
    className: "icon badge rounded-pill bg-dark text-light form-control",
    onClick: function onClick() {
      return setopenCollapse(!openCollapse);
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-bars"
  }), " Expand All"), /*#__PURE__*/React.createElement("button", {
    className: "icon badge rounded-pill bg-dark text-light form-control",
    onClick: goToDefault
  }, "Reset"))), loading && spectype === '' ? /*#__PURE__*/React.createElement("div", {
    className: "container justify-content-middle"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-sync fa-spin"
  })) : /*#__PURE__*/React.createElement("main", {
    className: "d-flex m-0 col-sx-12"
  }, /*#__PURE__*/React.createElement(ErrorBoundary, null, left ? /*#__PURE__*/React.createElement("div", {
    id: "apidocpro-leftsidemenu",
    className: "sidenav d-none d-md-block col-2 m-0 ".concat(theme === null || theme === void 0 ? void 0 : (_theme$styles = theme.styles) === null || _theme$styles === void 0 ? void 0 : _theme$styles.left, " ").concat(theme === null || theme === void 0 ? void 0 : (_theme$styles2 = theme.styles) === null || _theme$styles2 === void 0 ? void 0 : _theme$styles2.lefttext, " "),
    "data-mdb-hidden": "false"
  }, /*#__PURE__*/React.createElement(LeftRegion, {
    data: resolved,
    resolved: resolved,
    menuClicked: function menuClicked() {
      return console.log('menu clicked');
    },
    theme: theme,
    spectype: spectype
  })) : [], /*#__PURE__*/React.createElement("div", {
    id: "apidocpro-middleregion",
    className: right && left ? "col-12 col-sm-12 col-md-7 ".concat(theme === null || theme === void 0 ? void 0 : (_theme$styles3 = theme.styles) === null || _theme$styles3 === void 0 ? void 0 : _theme$styles3.middle, " ").concat(theme === null || theme === void 0 ? void 0 : (_theme$styles4 = theme.styles) === null || _theme$styles4 === void 0 ? void 0 : _theme$styles4.middletext) : right && !left ? "col-12 col-sm-12 col-md-9 ".concat(theme === null || theme === void 0 ? void 0 : (_theme$styles5 = theme.styles) === null || _theme$styles5 === void 0 ? void 0 : _theme$styles5.middle, " ").concat(theme === null || theme === void 0 ? void 0 : (_theme$styles6 = theme.styles) === null || _theme$styles6 === void 0 ? void 0 : _theme$styles6.middletext) : left && !right ? "col-12 col-sm-12 col-md-10 ".concat(theme === null || theme === void 0 ? void 0 : (_theme$styles7 = theme.styles) === null || _theme$styles7 === void 0 ? void 0 : _theme$styles7.middle, " ").concat(theme === null || theme === void 0 ? void 0 : (_theme$styles8 = theme.styles) === null || _theme$styles8 === void 0 ? void 0 : _theme$styles8.middletext) : "col-12 col-sm-12 col-md-12 ".concat(theme === null || theme === void 0 ? void 0 : (_theme$styles9 = theme.styles) === null || _theme$styles9 === void 0 ? void 0 : _theme$styles9.middle, " ").concat(theme === null || theme === void 0 ? void 0 : (_theme$styles10 = theme.styles) === null || _theme$styles10 === void 0 ? void 0 : _theme$styles10.middletext)
  }, /*#__PURE__*/React.createElement(MiddleRegion, {
    data: resolved,
    resolved: resolved,
    openCollapse: openCollapse,
    theme: theme,
    spectype: spectype
  })), right ? /*#__PURE__*/React.createElement("div", {
    id: "apidocpro-rightregion",
    className: "d-none d-md-block pt-3 pb-5 col-3 pt-3 minh-100 m-0 ".concat(theme === null || theme === void 0 ? void 0 : (_theme$styles11 = theme.styles) === null || _theme$styles11 === void 0 ? void 0 : _theme$styles11.right, " ").concat(theme === null || theme === void 0 ? void 0 : (_theme$styles12 = theme.styles) === null || _theme$styles12 === void 0 ? void 0 : _theme$styles12.righttext, " ")
  }, /*#__PURE__*/React.createElement(RightRegion, {
    data: resolved,
    resolved: resolved,
    theme: theme,
    openCollapse: openCollapse,
    spectype: spectype
  })) : [])), /*#__PURE__*/React.createElement("footer", {
    className: "sticky-bottom bg-white p-2 m-0"
  }, /*#__PURE__*/React.createElement("div", {
    id: "copyright",
    className: "badge rounded-pill bg-light text-dark "
  }, "Copyright @ ", /*#__PURE__*/React.createElement("a", {
    href: "//apidocpro.com/editor"
  }, "APIDocPro UI"), ",", /*#__PURE__*/React.createElement("a", {
    href: "//reallexi.com"
  }, "RealLexi LLC"))));
}
ApiDocPro.propTypes = {
  spec: propTypes.oneOfType([propTypes.string, propTypes.object]),
  resolved: propTypes.any,
  title: propTypes.string,
  leftregion: propTypes.bool,
  rightregion: propTypes.bool,
  collapse: propTypes.bool,
  header: propTypes.bool,
  theme: propTypes.object
};