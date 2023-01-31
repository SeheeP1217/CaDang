import React, { Component } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import coffeebean from "../assets/coffeebean.png"
import coffeebeansugar from "../assets/coffeebeansugar.png"
import sugar from "../assets/sugar.png"
import "./MyCalendar.css"

class MyCalendar extends Component {
  render() {
    // Event Render Function To Get Images and Titles
    function renderEventContent(eventInfo) {
      return (
        <div>
          <img className="eventimage" src={eventInfo.event.url} />
        </div>
      )
    }
    return (
      <div className="maincontainer">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          eventContent={renderEventContent}
          events={[
            {
              date: "2023-01-13",
              url: coffeebean,
            },
            {
              date: "2023-01-08",
              url: coffeebeansugar,
            },
            {
              date: "2023-02-01",
              url: sugar,
            },
          ]}
        />
      </div>
    )
  }
}

export default MyCalendar
