import React, { Component, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import coffeebean from "../assets/coffeebean.png"
import coffeebeansugar from "../assets/coffeebeansugar.png"
import sugar2 from "../assets/sugar2.png"
import "./MyCalendar.css"
import { Grid } from "@mui/material"

class MyCalendar extends React.Component {
  render() {
    console.log("props 받아온 데이터", this.props.monthDataList)

    // Event Render Function To Get Images and Titles
    function renderEventContent(eventInfo) {
      return (
        <div>
          <img className="eventimage" src={eventInfo.event.url} />
        </div>
      )
    }

    return (
      <Grid className="maincontainer">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          header={{
            left: "prev",
            center: "title",
            right: "next today",
          }}
          titleFormat={function (date) {
            const year = date.date.year
            const month = date.date.month + 1
            console.log("년월", year, month)
            return year + "년 " + month + "월"
          }}
          dateClick={function () {
            alert("날짜 클릭 시 기록 표시 추가 예정!!")
          }}
          eventContent={renderEventContent}
          contentHeight="auto"
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
              url: sugar2,
            },
          ]}
        />
      </Grid>
    )
  }
}

export default MyCalendar
