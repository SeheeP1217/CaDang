import React from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import coffeebean from "../assets/coffeebean.png"
import coffeebeansugar from "../assets/coffeebeansugar.png"
import sugar from "../assets/sugar.png"
import "./MyCalendar.css"
import { Grid, Modal, Typography, Card, Button } from "@mui/material"
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
  handleOpen = (date) => {
    const data = this.props.monthDataList.find((item) => item.date === date)
    this.setState({
      open: true,
      modalData: data,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      modalData: null,
    })
  }

  render() {
    const theme = createTheme({
      palette: {
        primary: {
          main: "#3A130C",
        },
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
          return { date: item.date, url: sugar }
        }
      })
    console.log("aaaaaaaa", this.state.modalData.date)
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
              if (clickedData) {
                this.handleModal(clickedData)
              } else {
                alert("해당 일자에 대한 기록이 없습니다.")
              }
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
                width: "80%",
                backgroundColor: "#fff",
                boxShadow: 24,
                padding: "10px",
                borderRadius: "10px",
              },
            }}
          >
            {this.state.modalData && (
              <ModalCard>
                <Date>{this.state.modalData.date} 섭취량</Date>
                <Grid>
                  {this.state.modalData ? (
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon src={coffeebean}></Icon>
                      {this.state.modalData.caffeDaily}/
                      {this.state.modalData.caffeGoal}
                      <Icon src={sugar}></Icon>
                      {this.state.modalData.sugarDaily}/
                      {this.state.modalData.sugarGoal}
                    </Typography>
                  ) : (
                    <Typography>
                      <h2 id="modal-modal-title">데이터 없음</h2>
                      <p id="modal-modal-description">
                        해당 일자에 대한 데이터가 없습니다.
                      </p>
                    </Typography>
                  )}
                </Grid>
              </ModalCard>
            )}
          </Modal>
        </Grid>
      </ThemeProvider>
    )
  }
}

const Icon = styled.img`
  width: 40px !important;
`

const ModalCard = styled(Card)`
  border: 5px solid #3a130c !important;
  border: 10px solid #ffba00 !important;
`

const Date = styled.h2`
  margin-top: 3px !important;
  border-bottom: 5px solid #3a130c !important;
`
export default MyCalendar
