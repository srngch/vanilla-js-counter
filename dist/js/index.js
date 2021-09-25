"use strict";

var _counter = _interopRequireDefault(require("./counter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var $ = function $(selector) {
  return document.querySelector(selector);
};

var store = {
  setLocalStorage: function setLocalStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
  },
  getLocalStorage: function getLocalStorage() {
    return JSON.parse(localStorage.getItem('data'));
  }
};

function App() {
  var _this = this;

  this.state = {
    id: 0,
    counterArray: []
  };

  this.init = function () {
    var storedData = store.getLocalStorage();

    if (storedData) {
      _this.state.id = storedData.id;
      storedData.counterArray.forEach(function (c) {
        addCounter(c.id, c.counter._value);
        _this.state.id = c.id + 1;
      });
      return;
    }

    addCounter(_this.state.id);
    _this.state.id++;
  };

  var $CounterList = $('.counter-list');
  var $btnAddCounter = $('#btnAddCounter');

  var addCounter = function addCounter(id) {
    var initValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _this.state.counterArray.push({
      id: id,
      counter: new _counter["default"](initValue)
    });

    $CounterList.insertAdjacentHTML('beforeend', counterTemplate(id, initValue));
  };

  var counterTemplate = function counterTemplate(id) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return "\n\t\t<section class=\"counter-wrapper\" data-id=\"".concat(id, "\">\n\t\t\t<div class=\"counter-value\">").concat(value, "</div>\n\t\t\t<div class=\"counter-control\">\n\t\t\t\t<button class=\"counter-button plus\"><i class=\"icon-plus\"></i></button>\n\t\t\t\t<button class=\"counter-button minus\"><i class=\"icon-minus\"></i></button>\n\t\t\t\t<button class=\"counter-button reset\"><i class=\"icon-circle\"></i></button>\n\t\t\t\t<button class=\"counter-button remove\"><i class=\"icon-cancel\"></i></button>\n\t\t\t</div>\n\t\t</section>\n\t");
  };

  $CounterList.addEventListener('click', function (e) {
    var classList = e.target.classList;
    var $wrapper = e.target.closest('.counter-wrapper');
    var $counterValue = $wrapper.querySelector('.counter-value');
    var id = Number($wrapper.dataset.id);

    var index = _this.state.counterArray.findIndex(function (c) {
      return c.id === id;
    });

    var counter = _this.state.counterArray[index].counter;

    if (classList.contains('counter-button')) {
      if (classList.contains('plus')) {
        counter.plus();
        $counterValue.textContent = counter.value;
      }

      if (classList.contains('minus')) {
        counter.minus();
        $counterValue.textContent = counter.value;
      }

      if (classList.contains('reset')) {
        counter.reset();
        $counterValue.textContent = counter.value;
      }

      if (classList.contains('remove') && _this.state.counterArray.length > 1) {
        counter = null;

        _this.state.counterArray.splice(index, 1);

        $wrapper.remove();
      }

      store.setLocalStorage(_this.state);
    }
  }, true);
  $btnAddCounter.addEventListener('click', function (e) {
    addCounter(_this.state.id);
    _this.state.id++;
    store.setLocalStorage(_this.state);
  });
}

var app = new App();
app.init();