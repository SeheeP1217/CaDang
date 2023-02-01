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
          // 월 단위 표시
          initialView="dayGridMonth"
          // ****년 **월로 표시
          titleFormat={function (date) {
            const year = date.date.year
            const month = date.date.month + 1

            return year + "년 " + month + "월"
          }}
          // 추후 날짜 클릭 시 기록 표시 추가 예정
          dateClick={function () {
            alert("날짜 클릭 시 기록 표시 추가 예정!!")
          }}
          eventContent={renderEventContent}
          events={[
            {
              date: "2023-02-13",
              url: coffeebean,
            },
            {
              date: "2023-02-08",
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
