class Event extends React.Component {
  render() {
    var width  = 1.0 / this.props.size * 100
      , height = this.props.end - this.props.start
      , left   = this.props.position * width
      , style  = {
        top: `${this.props.start}px`,
        height: `${height}px`,
        left: `${left}%`,
        width: `${width}%`,
        zIndex: this.props.position
      }

    return (
      <div className="event-component" style={style}>
        <h1>Sample Item</h1>
        <p>Sample Location</p>
      </div>
    )
  }
}

class Row extends React.Component {
  componentWillMount() {
    this.positionEvents()
    this.sizeEvents()
  }

  positionEvents() {
    this.props.events.reduce((positionedEvents, event, index) => {
      let conflicts = positionedEvents.filter((_event) => isOverlapping(event, _event))

      let offset = 0

      if (conflicts.length) {
        let openSpaces = conflicts
          .sort((a, b) => a.offset - b.offset)
          .map((_event, i) => [_event.offset, i])
          .find(([offset, i]) => offset != i)
        offset = openSpaces ? openSpaces[1] : conflicts.length
      }

      Object.defineProperty(event, 'offset', { value: offset })

      return [...positionedEvents, event]
    }, [])
  }

  sizeEvents() {
    for(var t = this.props.start; t < this.props.end; t++) {
      this.size = Math.max(this.props.events.filter((event) => event.start <= t && event.end > t).length, this.size || 1)
    }
  }

  render() {
    return (
      <div>
        { this.props.events.map((event, i) => {
        return <Event start={event.start} end={event.end} size={this.size} position={event.offset} key={new Date().getTime() + i} />
        }) }
      </div>
    )
  }
}

class TimeTable extends React.Component {
  render() {
    return (
      <div className="time-table-component">
      { [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((time, i) => {
        var hour     = i > 3 ? i - 3 : 9 + i
          , meridiem = i < 2 ? "AM" : "PM"
        return (
          <div key={i}>
            <div className="time-table-hour">{ hour }:00 <b>{ meridiem }</b></div>
            { i == 12 ? null : <b>{ hour }:30</b> }
          </div>
        )
      }) }
      </div>
    )
  }
}

class Calendar extends React.Component {
  componentWillMount() {
    this.createRows()
  }

  createRows() {
    // All "rows" will have the same sized elements
    this.rows = this.props.events.sort((a, b) => a.start - b.start).reduce((rows, event, index) => {
      var row
      // If the event is in an existing row, add it to that row and increase that rows size
      row = rows.find((row) => isOverlapping(event, row))

      if (row) {
        row.events.push(event)
      } else {
        row = {}
        row.events = [event]
        rows.push(row)
      }

      row.start = Math.min(...row.events.map((e) => e.start))
      row.end   = Math.max(...row.events.map((e) => e.end))

      // Return the rows
      return rows
    }, [])
  }

  render() {
    return (
      <div className="calendar-component">
        <TimeTable />
        <div className="calendar-rows">
          { this.rows.map((row, i) => <Row events={row.events} key={new Date().getTime() + i} start={row.start} end={row.end} />) }
        </div>
      </div>
    )
  }
}

function isOverlapping(a, b) {
  if (a.start > b.start && a.start < b.end) return true
  if (a.end > b.start && a.end < b.end) return true
  if (a.start < b.start && a.end > b.end) return true
  if (a.start == b.start) return true
  return false
}

function layOutDay(events = []) {
  React.render(<Calendar events={events} />, document.querySelector('.calendar'))
}



if (window.location.search.substr(1)) {
  var randomTimes = Array(parseInt(window.location.search.substr(1))).fill().map(() => {
    let start = Math.trunc(Math.random() * 620)
    let length = Math.trunc(Math.random() * 51) + 50
    return { start: start, end: start + length }
  })
  layOutDay(randomTimes)
} else {
  var specificTimes = [
    {start: 30, end: 150},
    {start: 540, end: 600},
    {start: 560, end: 620},
    {start: 610, end: 670},
  ]
  layOutDay(specificTimes)
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
