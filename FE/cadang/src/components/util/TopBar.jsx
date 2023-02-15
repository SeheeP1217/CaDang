import * as React from "react"
import { Link } from "react-router-dom"
import "./TopBar.css"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import logo from "../../assets/logo.png"
import logo222 from "../../assets/logo222.png"

export default function TopBar() {
  const ref = React.useRef(null)

  return (
    <Box sx={{ pb: 7, zIndex: 5 }} ref={ref}>
      <CssBaseline />
      <AppBar className="appBar" position="static">
        <Toolbar>
          <Link to="/main">
            <img
              height={65}
              src={logo222}
              alt="로고"
              style={{ marginTop: "5px", marginLeft: "5px" }}
            />
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
