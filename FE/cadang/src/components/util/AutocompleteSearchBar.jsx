import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

function AutocompleteSearchBar(props) {
  console.log(props.data)
  return (
    <div>
    <Autocomplete
      freeSolo
      disableClearable
      options={props.data.map((option) => option.franchiseName)}
      renderInput={(params) => (
        <TextField
        {...params}
        label="Search input"
        InputProps={{
          ...params.InputProps,
          type: "search",
        }}
        />
        )}
        size="small"
        >
    </Autocomplete>
      </div>
  );
}

export default AutocompleteSearchBar;
