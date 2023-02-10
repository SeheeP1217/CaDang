import * as React from "react";
import { Link } from "react-router-dom";
import "./BottomNav.css";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import CoffeeIcon from '@mui/icons-material/Coffee';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import PersonIcon from '@mui/icons-material/Person';
import Paper from "@mui/material/Paper";

const BottomNav = () => {
  const [value, setValue] = React.useState(0);
  // const ref = React.useRef(null);

  React.useEffect(() => {
    // ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1 }}
      // elevation={3}
    >
      <BottomNavigation className="nav"
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        
        <BottomNavigationAction component={Link} to="/main" label="홈" icon={<HomeIcon fontSize="medium" />} />
        <BottomNavigationAction component={Link} to="/cafe-map" label="주문하기" icon={<CoffeeIcon fontSize="small" />} />
        <BottomNavigationAction component={Link} to="/drink-add" label="기록하기" icon={<NoteAltIcon fontSize="medium" />} />
        <BottomNavigationAction component={Link} to="/mypage" label="마이페이지" icon={<PersonIcon fontSize="medium" />} />
        <BottomNavigationAction  component={Link} to="/update-profile"label="설정" icon={<SettingsIcon fontSize="medium" />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;