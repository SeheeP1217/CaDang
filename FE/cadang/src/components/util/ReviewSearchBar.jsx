import React, { useState, useEffect, useMemo } from "react"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Autocomplete from "@mui/material/Autocomplete"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { Button, Grid } from "@mui/material"

function ReviewSearchBar(props) {
  // console.log(props);
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    setReviews(props.data.recordList)
  }, [props])

  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={9}>
        <Autocomplete
          freeSolo
          disableClearable
          options={reviews.map((option) => option.drinkName)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="카페, 메뉴 검색"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              onChange={props.onChangeKeyword}
              style={{ marginLeft: 5 }}
            />
          )}
          size="small"
        ></Autocomplete>
      </Grid>
      <Grid item xs={3}>
        <Button
          onClick={props.getSearchedReviews}
          sx={{
            backgroundColor: "#ffba00",
            color: "white",
            fontSize: "15px",
            margin: 1,
          }}
        >
          검색
        </Button>
      </Grid>
    </Grid>
  )
}

export default ReviewSearchBar
