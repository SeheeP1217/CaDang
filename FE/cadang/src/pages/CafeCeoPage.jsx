import React from "react";
import PropTypes from "prop-types";
import { Box, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NewOrderList from "../components/NewOrderList";
import OrderList from "../components/OrderList";

export default function CafeCeoPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }


  // useEffect(() => {
  //   console.log("drink 잘 set 된거니??????" + drink);

  //   // getOrder();
  // }, [drink]);

  return (
    <Card style={{ background: "#FF6E6E" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} mt={2}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="신규 주문" {...a11yProps(0)} />
          <Tab label="주문 목록" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Card sx={{ mt: "", p: 1 }}>
          {/* 신규 주문에 대한 컴포넌트 */}
          {/* {drink.length !== 0 && <NewOrderList drinks={drink} />} */}
          <NewOrderList />
          {/* ======================= */}
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Card sx={{ mt: "", p: 1 }}>
          <OrderList/>
        </Card>
      </TabPanel>
    </Card>
  );
}
