import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import './OrderStatus.css'

export default function OrderStatus() {
  return (
    <div className="div">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>현재 주문 현황</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>아이스 아메리카노 - 스타벅스 강남점</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}