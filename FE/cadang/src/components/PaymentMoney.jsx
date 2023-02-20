import { Box, Grid, Card } from "@mui/material";
import styled from "styled-components";
import Typography from "@mui/joy/Typography";

export default function PaymentMoney(props) {
  console.log(props);

  const engOptionToKor = {whip: "휘핑", shot: "샷", syrup: "시럽", hazelnut: "헤이즐넛 시럽", vanilla: "바닐라 시럽", caramel: "카라멜 시럽"}

  return (
    <div>
      <Box
        style={{ marginTop: "3%" }}
        component="span"
        sx={{ display: "block", fontSize: 18, fontWeight: "700" }}
      >
        주문 음료
      </Box>
      <Card sx={{ mt: "3%", p: 1 }}>
        <MoneyBox>
          <span >
            {props.drinkItem.drinkName}
          </span>
          <span >
            + {props.sizePrice}
          </span>
          </MoneyBox>
          
          {props.optionPriceTable.map((option) => {
            if (option.type === 'whip' && !props.drinkItem.whip && props.orderDetail[option.type]) {
              return (
                <MoneyBox key={option.type}>
                  <span>
                    {engOptionToKor[option.type]}
                  </span>
                  <span>
                    + {option.price * props.orderDetail[option.type]}
                  </span>
                  </MoneyBox>
            )
            } else if (option.type === 'whip') {
              return;
            }
            if (props.orderDetail[option.type]) {
              return (
                <MoneyBox key={option.type}>
                  <span>
                    {engOptionToKor[option.type]}
                  </span>
                  <span >
                    + {option.price * props.orderDetail[option.type]}
                  </span>
                </MoneyBox>
            )
            }
          })}
          
        
       
      </Card>
    </div>
  );
}

const MoneyBox =  styled.div`
  display: flex;
  justify-content: space-between;
`
