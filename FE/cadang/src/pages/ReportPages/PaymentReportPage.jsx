import { Card, Grid, Button, Box } from "@mui/material";
import PaymentRecord from "../../components/PaymentRecord";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import { orderList } from "../../api/pay";
import Typography from "@mui/joy/Typography";
import { useMemo, useState } from "react";

export default function PaymentReportPage() {
  const [orderListData, setOrderListData] = useState([]);

  useMemo(() => {
    const getOrderList = async () => {
      await orderList(
        (res) => {
          console.log(res.data);
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setOrderListData(data));
    };

    getOrderList();
  }, []);
  return (
    <div>
      <Grid container sx={{ pb: 1 }}>
        <Button component={Link} to="/mypage">
          <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
        </Button>
        <Typography
          sx={{
            mt: 0.5,
            display: "inline",
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          주문 내역
        </Typography>
      </Grid>

      <Card>
        <Grid>
          {orderListData.map((item, key) => (
            <PaymentRecord order={item} />
          ))}
        </Grid>
      </Card>
    </div>
  );
}
