import * as React from "react";
import { Box, Grid, Card } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import payCompleteImg from "../assets/payComplete.png";
import making from "../assets/making.png";
import finished from "../assets/finished.png";

export default function OrderStatus() {
  return (
    <div
      style={{
        marginTop: "5%",
      }}
    >
      {/* defaultExpanded 속성을 통해 AccordionDetails 보이게 하기 defaultExpanded="true" */}
      <Accordion defaultExpanded="true">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{
              fontWeight: "700",
              display: "inline",
              fontSize: 20,
            }}
          >
            현재 주문 현황
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Typography
            sx={{
              fontWeight: "700",
              display: "inline",
              fontSize: 18,
            }}
          >
            음료 이름 - 주문한 카페명 지점
          </Typography>
          <Box>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={4} sx={{ display: "flex" }}>
                {/* <Typography
                  sx={{
                    fontWeight: "700",
                    display: "inline",
                    fontSize: 18,
                  }}
                >
                  결제 완료
                </Typography> */}
                <CardMedia
                  component="img"
                  sx={{ width: 50, ml: 3 }}
                  image={payCompleteImg}
                  alt="payCompleteImg"
                />
                {/* <img
                  alt="paysuccess"
                  src={payCompleteImg}
                  style={{ objectFit: "fill" }}
                  width="50"
                /> */}
              </Grid>
              <Grid item xs={4} sx={{ boxShadow: 0, display: "flex" }}>
                <CardMedia component="img" sx={{ width: 50, ml: 2 }} image={making} alt="making" />
                {/* <img alt="making" src={making} style={{ objectFit: "fill" }} width="50" /> */}
                {/* <Typography
                  sx={{
                    fontWeight: "700",
                    display: "inline",
                    fontSize: 18,
                    mt: "1%",
                  }}
                >
                  제조 중
                </Typography> */}
              </Grid>
              <Grid item xs={4} sx={{ boxShadow: 0, display: "flex" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 50, ml: 1 }}
                  image={finished}
                  alt="finished"
                />
                {/* <img alt="finished" src={finished} style={{ objectFit: "fill" }} width="50" /> */}
                {/* <Typography
                  sx={{
                    fontWeight: "700",
                    display: "inline",
                    fontSize: 18,
                    mt: "1%",
                  }}
                >
                  제조 완료
                </Typography> */}
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
