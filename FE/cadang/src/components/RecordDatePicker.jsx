import * as React from "react";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

function RecordDatePicker(props) {
  const [value, setValue] = React.useState(dayjs());
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            props.getRecordDate(dayjs(newValue.$d).format("YYYY-MM-DD"));
            // console.log(dayjs(newValue.$d).format("YYYY-MM-DD"));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}

export default RecordDatePicker;
