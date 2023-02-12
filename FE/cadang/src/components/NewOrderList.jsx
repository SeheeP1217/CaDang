import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Paper, Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material-next/Button";
import NewOrderListItem from "./NewOrderListItem.jsx";

export default function NewOrderList(props) {
  const data = props.drinks;
  console.log("NewOrderList !!!!!!!!!!!!! " + data);
  // if (!Array.isArray(props)) {
  //   console.log(props + " !!!!!!!null??????");
  //   return null;
  // }

  return (
    <div>
      {data.map((item, key) => (
        <NewOrderListItem drink={item} />
      ))}
    </div>
  );
}
