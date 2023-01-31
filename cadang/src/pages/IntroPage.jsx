import introImg from "../assets/introImg.png";
import Button from "@mui/material-next/Button";
import Stack from "@mui/material/Stack";

function FirstPage() {
  return (
    <div>
      <img width="100%" src={introImg} alt="커피" />

      <Stack spacing={1} width="50%" margin="auto">
        <Button
          variant="filledTonal"
          sx={{"&:hover, &.Mui-focusVisible": {zIndex: 1,backgroundColor: "#F99417",}}}>
          ☕ 한잔 하러 가기
        </Button>
        <Button variant="text">이미 회원이라면? 로그인</Button>
      </Stack>
    </div>
  );
}

export default FirstPage;
