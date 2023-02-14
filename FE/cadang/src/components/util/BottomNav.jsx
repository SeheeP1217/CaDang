import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import "./BottomNav.css"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import SettingsIcon from "@mui/icons-material/Settings"
import HomeIcon from "@mui/icons-material/Home"
import CoffeeIcon from "@mui/icons-material/Coffee"
import NoteAltIcon from "@mui/icons-material/NoteAlt"
import PersonIcon from "@mui/icons-material/Person"
import Paper from "@mui/material/Paper"
import styled from "styled-components"
import { createTheme, ThemeProvider } from "@mui/material/styles"

function BottomNav() {
  const location = useLocation()
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffba00",
      },
    },
    typography: {
      fontFamily: "netmarble",
      fontSize: 12,
    },
  })
  const [value, setValue] = React.useState(0)
  // const ref = React.useRef(null);

  React.useEffect(() => {
    // ref.current.ownerDocument.body.scrollTop = 0;
  }, [value])

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{ position: "fixed", bottom: -1, left: 0, right: 0, zIndex: 1 }}
        // elevation={3}
      >
        <BottomNavigation
          className="nav"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction
            component={Link}
            to="/main"
            label="홈"
            icon={<HomeIcon fontSize="large" />}
            style={{
              color: location.pathname === "/main" ? "#ffba00" : "white",
            }}
            active={location.pathname === "/main"}
          />
          <BottomNavigationAction
            component={Link}
            to="/cafe-map"
            label="주문하기"
            icon={<CoffeeIcon fontSize="large" />}
            style={{
              color: location.pathname === "/cafe-map" ? "#ffba00" : "white",
            }}
            active={location.pathname === "/cafe-map"}
          />
          <BottomNavigationAction
            component={Link}
            to="/drink-add"
            label="기록하기"
            icon={<NoteAltIcon fontSize="large" />}
            style={{
              color: location.pathname === "/drink-add" ? "#ffba00" : "white",
            }}
            active={location.pathname === "/drink-add"}
          />
          <BottomNavigationAction
            component={Link}
            to="/mypage"
            label="마이페이지"
            icon={<PersonIcon fontSize="large" />}
            style={{
              color: location.pathname === "/mypage" ? "#ffba00" : "white",
              fontSize: "10px",
            }}
            active={location.pathname === "/mypage"}
          />
          <BottomNavigationAction
            component={Link}
            to="/update-profile"
            label="설정"
            icon={<SettingsIcon fontSize="large" />}
            style={{
              color:
                location.pathname === "/update-profile" ? "#ffba00" : "white",
            }}
            active={location.pathname === "/update-profile"}
          />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  )
}

export default BottomNav
