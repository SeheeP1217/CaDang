import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { fontSize } from "@mui/system"
import { Box } from "@mui/material"

export default function OrderStatus() {
  return (
    <div
      style={{
        marginTop: "5%",
      }}
    >
      {/* defaultExpanded 속성을 통해 AccordionDetails 보이게 하기 defaultExpanded="true" */}
      <Accordion defaultExpanded="true">
        <Box
          style={{
            borderBottom: "2px solid #ffab00",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffab00" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              "&.Mui-expanded": {
                margin: 0,
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "netmarble",
                fontSize: "22px",
                fontWeight: "xl",
                level: "h3",
                m: 0,
              }}
            >
              현재 주문 현황
            </Typography>
          </AccordionSummary>
        </Box>
        <AccordionDetails>
          <Typography>아이스 아메리카노 - 스타벅스 강남점</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
