import * as React from "react";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Card, Grid, Divider } from "@mui/material";
import Typography from "@mui/joy/Typography";

function CustomOption(props) {
  const defaultInfo = props.drinkDetail.drinkResponseDtos;
  const optionInfo = props.drinkDetail.optionDtos;
  const orderInfo = props.orderDetail;

  const [cupSize, setCupSize] = useState(0);
  const [isWhiped, setIsWhiped] = useState(defaultInfo[0].whip);
  const [howTasty, setHowTasty] = useState(orderInfo.sugarContent);
  console.log(defaultInfo);
  console.log(isWhiped);
  console.log(howTasty);
  return (
    <div>
      <Divider>custom</Divider>
      <Card>
        <Grid
          container
          sx={{
            display: "flex",
            textAlign: "center",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={4}>
            사이즈
          </Grid>
          <Grid item xs={8}>
            <ButtonGroup
              exclusive
              size="small"
              defaultValue={defaultInfo[0].size}
            >
              {defaultInfo.map((size, index) => {
                console.log(orderInfo.size);
                return (
                  <Button
                    variant={cupSize === index ? "contained" : "outlined"}
                    style={{ backgroundColor: cupSize === index ? "#ffba00" : "white" }}
                    key={index}
                    value={size.size}
                    onClick={() => {
                      setCupSize(index);
                      props.onClickSizeChangeHandler(index);
                    }}
                  >
                    {size.size}
                  </Button>
                );
              })}
            </ButtonGroup>
          </Grid>
          <Grid item xs={4} textAlign="center" margin="auto">
            샷
          </Grid>
          <Grid item xs={8} alignItems="center">
            <ButtonGroup variant="outlined" size="small">
              <IconButton
                style={{color: '#3A130C'}}
                onClick={() => {
                  props.onClickOptionChangeHandler("shot", -1);
                }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Typography width="20%" margin="auto">
                {orderInfo.shot}
              </Typography>
              <IconButton
                style={{color: '#3A130C'}}
                onClick={() => {
                  props.onClickOptionChangeHandler("shot", 1);
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </ButtonGroup>
          </Grid>
          <Grid item xs={4} textAlign="center" margin="auto">
            휘핑
          </Grid>
          <Grid item xs={8} alignItems="center">
            {isWhiped === null ? (
              <ButtonGroup size="small">
                <Button variant="disabled">
                  X
                </Button>
                <Button variant="disabled">
                  O
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup variant="outlined" size="small">
                <Button
                  style={{color: '#3A130C'}}  
                  value={false}
                  variant={isWhiped ? "outlined" : "contained"}
                  onClick={() => {
                    props.onClickOptionChangeHandler("whip", false);
                    setIsWhiped(false);
                  }}
                >
                  X
                </Button>
                <Button
                  style={{color: '#3A130C'}}
                  value={true}
                  variant={isWhiped ? "contained" : "outlined"}
                  onClick={() => {
                    props.onClickOptionChangeHandler("whip", true);
                    setIsWhiped(true);
                  }}
                >
                  O
                </Button>
              </ButtonGroup>
            )}
          </Grid>
          <Grid item xs={4} textAlign="center" margin="auto">
            당도
          </Grid>
          <Grid item xs={8} alignItems="center">
            <ButtonGroup variant="outlined" size="small">
              <Button
                variant={howTasty === "LESS" ? "contained" : "outlined"}
                style={{ backgroundColor: howTasty === "LESS" ? "#ffba00" : "white" }}
                onClick={() => {
                  setHowTasty("LESS");
                  props.onclickSugarContentHandler("LESS", 0.5);
                }}
              >
                덜달게
              </Button>
              <Button
                variant={howTasty === "BASIC" ? "contained" : "outlined"}
                style={{ backgroundColor: howTasty === "BASIC" ? "#ffba00" : "white" }}
                onClick={() => {
                  setHowTasty("BASIC");
                  props.onclickSugarContentHandler("BASIC", 1);
                }}
              >
                기본
              </Button>
              <Button
                variant={howTasty === "MORE" ? "contained" : "outlined"}
                // style={{ backgroundColor: "#ffba00"}}
                style={{ backgroundColor: howTasty === "MORE" ? "#ffba00" : "white" }}
                onClick={() => {
                  setHowTasty("MORE");
                  props.onclickSugarContentHandler("MORE", 1.5);
                }}
              >
                달게
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={4} textAlign="center" margin="auto">
            시럽
          </Grid>
          <Grid item xs={8} alignItems="center">
            <ButtonGroup variant="outlined" size="small">
              <IconButton
                style={{color: '#3A130C'}}
                onClick={() => {
                  props.onClickOptionChangeHandler("syrup", -1);
                }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Typography width="20%" margin="auto">
                {orderInfo.syrup}
              </Typography>
              <IconButton
                style={{color: '#3A130C'}}
                onClick={() => {
                  props.onClickOptionChangeHandler("syrup", 1);
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </ButtonGroup>
          </Grid>
          <Grid item xs={4} textAlign="center" margin="auto">
            헤이즐넛 시럽
          </Grid>
          <Grid item xs={8} alignItems="center">
            <ButtonGroup variant="outlined" size="small">
              <IconButton
                style={{color: '#3A130C'}}
                onClick={() => {
                  props.onClickOptionChangeHandler("hazelnut", -1);
                }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Typography width="20%" margin="auto">
                {orderInfo.hazelnut}
              </Typography>
              <IconButton
                style={{color: '#3A130C'}}
                onClick={() => {
                  props.onClickOptionChangeHandler("hazelnut", 1);
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </ButtonGroup>
          </Grid>
          <Grid item xs={4} textAlign="center" margin="auto">
            바닐라 시럽
          </Grid>
          <Grid item xs={8} alignItems="center">
            <ButtonGroup variant="outlined" size="small">
              <IconButton
                style={{color: '#3A130C'}}
                onClick={() => {
                  props.onClickOptionChangeHandler("vanilla", -1);
                }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Typography width="20%" margin="auto">
                {orderInfo.vanilla}
              </Typography>
              <IconButton
                style={{color: '#3A130C'}}
                onClick={() => {
                  props.onClickOptionChangeHandler("vanilla", 1);
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </ButtonGroup>
          </Grid>
          <Grid item xs={4} textAlign="center" margin="auto">
            카라멜 시럽
          </Grid>
          <Grid item xs={8} alignItems="center">
            <ButtonGroup variant="outlined" size="small">
              <IconButton
                style={{color: '#3A130C'}}
                onClick={() => {
                  props.onClickOptionChangeHandler("caramel", -1);
                }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Typography width="20%" margin="auto">
                {orderInfo.caramel}
              </Typography>
              <IconButton
                style={{color: '#3A130C'}}
                onClick={() => {
                  props.onClickOptionChangeHandler("caramel", 1);
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default CustomOption;
