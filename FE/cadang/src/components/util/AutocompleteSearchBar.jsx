import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Autocomplete from "@mui/material/Autocomplete"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

function AutocompleteSearchBar(props) {
  //console.log(props.data);
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">카페명</InputLabel>
      <Select labelId="demo-select-small" id="demo-select-small" label="카페명">
        {props.data.map((cafe) => (
          <MenuItem
            key={cafe.id}
            value={cafe.franchiseName}
            onClick={() => props.getSelectedFranchise(cafe)}
          >
            {cafe.franchiseName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default AutocompleteSearchBar
