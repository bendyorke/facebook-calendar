"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Event = (function (_React$Component) {
  _inherits(Event, _React$Component);

  function Event() {
    _classCallCheck(this, Event);

    _get(Object.getPrototypeOf(Event.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Event, [{
    key: "render",
    value: function render() {
      var width = 1.0 / this.props.size * 100,
          height = this.props.end - this.props.start,
          left = this.props.position * width,
          style = {
        top: this.props.start + "px",
        height: height + "px",
        left: left + "%",
        width: width + "%",
        zIndex: this.props.position
      };

      return React.createElement(
        "div",
        { className: "event-component", style: style },
        React.createElement(
          "h1",
          null,
          "Sample Item"
        ),
        React.createElement(
          "p",
          null,
          "Sample Location"
        )
      );
    }
  }]);

  return Event;
})(React.Component);

var Row = (function (_React$Component2) {
  _inherits(Row, _React$Component2);

  function Row() {
    _classCallCheck(this, Row);

    _get(Object.getPrototypeOf(Row.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Row, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.positionEvents();
      this.sizeEvents();
    }
  }, {
    key: "positionEvents",
    value: function positionEvents() {
      this.props.events.reduce(function (positionedEvents, event, index) {
        var conflicts = positionedEvents.filter(function (_event) {
          return isOverlapping(event, _event);
        });

        var offset = 0;

        if (conflicts.length) {
          var openSpaces = conflicts.sort(function (a, b) {
            return a.offset - b.offset;
          }).map(function (_event, i) {
            return [_event.offset, i];
          }).find(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2);

            var offset = _ref2[0];
            var i = _ref2[1];
            return offset != i;
          });
          offset = openSpaces ? openSpaces[1] : conflicts.length;
        }

        Object.defineProperty(event, 'offset', { value: offset });

        return [].concat(_toConsumableArray(positionedEvents), [event]);
      }, []);
    }
  }, {
    key: "sizeEvents",
    value: function sizeEvents() {
      for (var t = this.props.start; t < this.props.end; t++) {
        this.size = Math.max(this.props.events.filter(function (event) {
          return event.start <= t && event.end > t;
        }).length, this.size || 1);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return React.createElement(
        "div",
        null,
        this.props.events.map(function (event, i) {
          return React.createElement(Event, { start: event.start, end: event.end, size: _this.size, position: event.offset, key: new Date().getTime() + i });
        })
      );
    }
  }]);

  return Row;
})(React.Component);

var TimeTable = (function (_React$Component3) {
  _inherits(TimeTable, _React$Component3);

  function TimeTable() {
    _classCallCheck(this, TimeTable);

    _get(Object.getPrototypeOf(TimeTable.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(TimeTable, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "time-table-component" },
        [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (time, i) {
          var hour = i > 3 ? i - 3 : 9 + i,
              meridiem = i < 2 ? "AM" : "PM";
          return React.createElement(
            "div",
            { key: i },
            React.createElement(
              "div",
              { className: "time-table-hour" },
              hour,
              ":00 ",
              React.createElement(
                "b",
                null,
                meridiem
              )
            ),
            i == 12 ? null : React.createElement(
              "b",
              null,
              hour,
              ":30"
            )
          );
        })
      );
    }
  }]);

  return TimeTable;
})(React.Component);

var Calendar = (function (_React$Component4) {
  _inherits(Calendar, _React$Component4);

  function Calendar() {
    _classCallCheck(this, Calendar);

    _get(Object.getPrototypeOf(Calendar.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Calendar, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.createRows();
    }
  }, {
    key: "createRows",
    value: function createRows() {
      // All "rows" will have the same sized elements
      this.rows = this.props.events.sort(function (a, b) {
        return a.start - b.start;
      }).reduce(function (rows, event, index) {
        var row;
        // If the event is in an existing row, add it to that row and increase that rows size
        row = rows.find(function (row) {
          return isOverlapping(event, row);
        });

        if (row) {
          row.events.push(event);
        } else {
          row = {};
          row.events = [event];
          rows.push(row);
        }

        row.start = Math.min.apply(Math, _toConsumableArray(row.events.map(function (e) {
          return e.start;
        })));
        row.end = Math.max.apply(Math, _toConsumableArray(row.events.map(function (e) {
          return e.end;
        })));

        // Return the rows
        return rows;
      }, []);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "calendar-component" },
        React.createElement(TimeTable, null),
        React.createElement(
          "div",
          { className: "calendar-rows" },
          this.rows.map(function (row, i) {
            return React.createElement(Row, { events: row.events, key: new Date().getTime() + i, start: row.start, end: row.end });
          })
        )
      );
    }
  }]);

  return Calendar;
})(React.Component);

function isOverlapping(a, b) {
  if (a.start > b.start && a.start < b.end) return true;
  if (a.end > b.start && a.end < b.end) return true;
  if (a.start < b.start && a.end > b.end) return true;
  if (a.start == b.start) return true;
  return false;
}

function layOutDay() {
  var events = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  React.render(React.createElement(Calendar, { events: events }), document.querySelector('.calendar'));
}

if (window.location.search.substr(1)) {
  var randomTimes = Array(parseInt(window.location.search.substr(1))).fill().map(function () {
    var start = Math.trunc(Math.random() * 620);
    var length = Math.trunc(Math.random() * 51) + 50;
    return { start: start, end: start + length };
  });
  layOutDay(randomTimes);
} else {
  var specificTimes = [{ start: 30, end: 150 }, { start: 540, end: 600 }, { start: 560, end: 620 }, { start: 610, end: 670 }];
  layOutDay(specificTimes);
}

// isOverlapping conditions
//console.log(isOverlapping({start: 100, end: 200}, {start: 150, end: 250}) === true)
//console.log(isOverlapping({start: 100, end: 200}, {start: 50, end: 150}) === true)
//console.log(isOverlapping({start: 100, end: 200}, {start: 50, end: 250}) === true)
//console.log(isOverlapping({start: 100, end: 200}, {start: 125, end: 175}) === true)
//console.log(isOverlapping({start: 100, end: 200}, {start: 50, end: 200}) === true)
//console.log(isOverlapping({start: 100, end: 200}, {start: 200, end: 300}) === false)
//console.log(isOverlapping({start: 100, end: 200}, {start: 400, end: 500}) === false)
//console.log(isOverlapping({start: 100, end: 200}, {start: 0, end: 100}) === false)
//console.log(isOverlapping({start: 100, end: 200}, {start: 100, end: 300}) === true)
//console.log(isOverlapping({start: 100, end: 300}, {start: 100, end: 200}) === true)
