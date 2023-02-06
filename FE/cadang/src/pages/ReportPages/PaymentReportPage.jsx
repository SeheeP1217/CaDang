import { Card, Grid, Button, Box } from "@mui/material"
import PaymentRecord from "../../components/PaymentRecord"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { Link } from "react-router-dom"

export default function PaymentReportPage() {
  return (
    <div>
      <div>
        <Grid container>
          <Button component={Link} to="/mypage">
            <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
          </Button>
          <Box>주문 내역</Box>
        </Grid>
      </div>

      <Card>
        <Grid>
          <PaymentRecord />
          <PaymentRecord />
        </Grid>
      </Card>
    </div>
  )
}
