import React, { Component, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import coffeebean from "../assets/coffeebean.png"
import coffeebeansugar from "../assets/coffeebeansugar.png"
import sugar2 from "../assets/sugar2.png"
import "./MyCalendar.css"
import { Grid, Modal, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import styled from "styled-components"
import dayjs from "dayjs"

class MyCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      changeDate: dayjs().format("YYYY-MM-DD"),
      showModal: false,
      modalData: {},
    }
  }

  dateChangeHandler = (num) => {
    this.setState({
      changeDate: dayjs(this.state.changeDate)
        .add(num, "day")
        .format("YYYY-MM-DD"),
    })
  }

  handleModal = (clickedData) => {
    this.setState({
      showModal: !this.state.showModal,
      modalData: clickedData,
    })
  }

  render() {
    const theme = createTheme({
      palette: {
        primary: {
          main: "#3A130C",
        },
      },
      typography: {
        fontFamily: "netmarble",
      },
    })

    // Event Render Function To Get Images and Titles
    function renderEventContent(eventInfo) {
      return (
        <div>
          <img className="eventimage" src={eventInfo.event.url} />
        </div>
      )
    }

    const events = this.props.monthDataList
      .filter((item) => {
        if (item.caffeSuccess && item.sugarSuccess) {
          return true
        } else if (item.caffeSuccess && !item.sugarSuccess) {
          return true
        } else if (!item.caffeSuccess && item.sugarSuccess) {
          return true
        } else {
          return false
        }
      })
      .map((item) => {
        if (item.caffeSuccess && item.sugarSuccess) {
          return { date: item.date, url: coffeebeansugar }
        } else if (item.caffeSuccess && !item.sugarSuccess) {
          return { date: item.date, url: coffeebean }
        } else if (!item.caffeSuccess && item.sugarSuccess) {
          return { date: item.date, url: sugar2 }
        }
      })

    return (
      <ThemeProvider theme={theme}>
        <Grid className="maincontainer">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            fixedWeekCount={false}
            titleFormat={function (date) {
              const year = date.date.year
              const month = date.date.month + 1
              return year + "년 " + month + "월"
            }}
            dateClick={(info) => {
              const clickedDate = info.dateStr
              const clickedData = this.props.monthDataList.find(
                (item) => item.date === clickedDate
              )
              this.handleModal(clickedData)
            }}
            eventContent={renderEventContent}
            contentHeight="auto"
            events={events}
          />

          <Modal
            open={this.state.showModal}
            onClose={this.handleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& .MuiPaper-root": {
                width: "50%",
                backgroundColor: "#fff",
                boxShadow: 24,
                padding: "20px",
                borderRadius: "10px",
              },
            }}
          >
            <div>
              <h2>Modal Title</h2>
              <p>Modal content goes here.</p>
            </div>
          </Modal> 
        </Grid>
      </ThemeProvider>
    )
  }
}

export default MyCalendar
