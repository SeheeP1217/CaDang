import { Grid } from "@mui/material";
import Typography from "@mui/joy/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material-next/Button";
import { Link } from "react-router-dom";

export default function PaySuccessPage() {

  return(
    <div>
      <Grid container sx={{ mt: 15 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia component="img" sx={{ width: 200 }} image="https://cdn.discordapp.com/attachments/1057523367147753542/1073425369027334165/giphy-unscreen.gif" alt="payImg" />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "700",
              display: "inline",
              fontSize: 19,
            }}
          >
            결제완료
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "700",
              display: "inline",
              fontSize: 19,
            }}
          >
            매장에서 픽업해 주세요.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
          <Button
            component={Link}
            to="/main"
            variant="contained"
            sx={{
              borderRadius: 2,
              background: "#FFD0AE",
              fontSize: 14,
              fontWeight: "500",
              mt: 7,
              mr: 3
            }}
          >
            메인으로
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}