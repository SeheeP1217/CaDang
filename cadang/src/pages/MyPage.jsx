import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';

function MyPage() {
  return (
    <Box sx={{ width: "90%" }} margin='auto' >
      <Stack spacing={1} >
        <Button
          variant="contained"
          startIcon={<ContentPasteSearchIcon />}
          endIcon={<ArrowForwardIosIcon />}
        >
          주문 내역
        </Button>
        <Button
          variant="contained"
          startIcon={<AssessmentIcon />}
          endIcon={<ArrowForwardIosIcon />}
        >
          내 리포트 보러가기
        </Button>
      </Stack>
    </Box>
  );
}

export default MyPage;
