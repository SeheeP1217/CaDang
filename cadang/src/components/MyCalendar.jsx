import React, { Component } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
// import coffeecong from "../store/coffeecong.png"

class MyCalendar extends Component {
  render() {
    // Event Render Function To Get Images and Titles
    function renderEventContent(eventInfo) {
      return (
        <div>
          <p>{eventInfo.event.title}</p>
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
              title: "event 1",
              date: "2023-01-13",
              imageurl: "../store/coffeecong.png",
            },
            {
              title: "event 2",
              date: "2023-01-08",
              url: "https://cdn-icons-png.flaticon.com/128/712/712287.png",
            },
          ]}
        />
      </div>
    )
  }
}

export default MyCalendar
