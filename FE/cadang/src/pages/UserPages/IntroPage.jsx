import Button from "@mui/material-next/Button"
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom"
import introimage from "../../assets/introimage.jpg"
import coffeeheart from "../../assets/coffeeheart.gif"
import { Grid, Box } from "@mui/material"
import styled from "styled-components"
import mainlogo from "../../assets/mainlogo.png"
import "./introPage.css"

const Container = styled.div`
  margin: 0;
`

function FirstPage() {
  return (
    <Container>
      <Grid>
        <Grid zIndex={0} style={{ padding: 0, margin: 0 }}>
          <img
            width="100%"
            // height="740px"
            src={introimage}
            alt="커피"
            style={{
              opacity: "60%",
              margin: "0",
            }}
          />
        </Grid>
        <Grid container zIndex={1}>
          <img
            width="200px"
            src={mainlogo}
            alt="로고"
            style={{
              position: "absolute",
              top: "45%",
              left: "7%",
              opacity: "65%",
            }}
          ></img>
        </Grid>
        <Grid zIndex={1}>
          <img
            width="100%"
            src={coffeeheart}
            alt="커피"
            style={{
              position: "absolute",
              top: "65%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "30%",
              // backgroundImage:
              //   "radial-gradient(ellipse 100% 60% at center, #ffffff 30%, #ffffff00, #ffffff00)",
            }}
          />
        </Grid>
        <Grid container zIndex={1}>
          <Stack spacing={1} width="50%" margin="auto">
            <Button
              component={Link}
              to="/sign-up"
              variant="filledTonal"
              sx={{
                "&:hover, &.Mui-focusVisible": {
                  zIndex: 1,
                  backgroundColor: "#ffab00",
                },
              }}
              style={{
                position: "absolute",
                top: "80%",
                backgroundColor: "#3A130C",
                color: "white",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              ☕ 한 잔 하러 가기
            </Button>
            <Button
              component={Link}
              to="/sign-in"
              variant="text"
              style={{
                position: "absolute",
                top: "85%",
                color: "white",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "0px",
              }}
            >
              이미 회원이라면? 로그인
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default FirstPage
