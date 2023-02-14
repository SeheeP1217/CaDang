import introImg from "../../assets/introImg.png"
import Button from "@mui/material-next/Button"
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom"
import introimage from "../../assets/introimage.jpg"
import coffeeheart from "../../assets/coffeeheart.gif"
import { Grid, Box } from "@mui/material"
import styled from "styled-components"

function FirstPage() {
  return (
    <Grid>
      <Grid zIndex={0}>
        <img
          // width="100%"
          height="740px"
          src={introimage}
          alt="커피"
        />
      </Grid>
      <Grid zIndex={1}>
        <BackBox>
          <img
            width="100%"
            src={coffeeheart}
            alt="커피"
            style={{
              position: "absolute",
              top: "50%",
              left: "53%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </BackBox>
        <Stack spacing={1} width="50%" margin="auto">
          <Button
            component={Link}
            to="/sign-up"
            variant="filledTonal"
            sx={{
              "&:hover, &.Mui-focusVisible": {
                zIndex: 1,
                backgroundColor: "#F99417",
              },
            }}
          >
            ☕ 한잔 하러 가기
          </Button>
          <Button component={Link} to="/sign-in" variant="text">
            이미 회원이라면? 로그인
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

const BackBox = styled(Box)`
background-color: #FFFFFF !important
border-radius: 20px !important
`

export default FirstPage
