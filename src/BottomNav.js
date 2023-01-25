import * as React from "react";
import "./App.css";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import Paper from "@mui/material/Paper";

const BottomNav = () => {
  const [value, setValue] = React.useState(-1);
  // const ref = React.useRef(null);

  React.useEffect(() => {
    // ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      // elevation={3}
    >
      <BottomNavigation className="nav"
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="" icon={<SearchIcon fontSize="large" />} />
        <BottomNavigationAction label="" icon={<AddCircleOutlineIcon fontSize="large" />} />
        <BottomNavigationAction label="" icon={<PersonIcon fontSize="large" />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;