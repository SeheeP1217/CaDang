import { Grid } from "@mui/material";
import Typography from "@mui/joy/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material-next/Button";
import { Link } from "react-router-dom";
import paymentCancel from "../../assets/paymentCancel.png";
import payFail from "../../assets/paymentCancel.png";

export default function PayFailPage() {
  return (
    <div>
      <Grid container sx={{ mt: 15 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia component="img" sx={{ width: 100 }} image={paymentCancel} alt="payImg" />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "700",
              display: "inline",
              fontSize: 19,
            }}
          >
            죄송합니다.
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
            결제에 실패하였습니다.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 6, boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "700",
              display: "inline",
              fontSize: 13,
            }}
          >
            다시 시도해 주세요.
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Button
            component={Link}
            to="/main"
            variant="contained"
            sx={{
              borderRadius: 2,
              background: "#FFD0AE",
              fontSize: 14,
              fontWeight: "500",
              mt: 8,
            }}
          >
            메인으로
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              // width: "130px",
              borderRadius: 2,
              background: "#FFD0AE",
              fontSize: 14,
              fontWeight: "500",
              mt: 8,
            }}
          >
            이전 페이지
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
