import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

function AddButton({ text, handleClick }) {
  return (
    <Button onClick={(e) => handleClick(e)} variant="outlined" color="success">
      <Add />
      <span>{text}</span>
    </Button>
  );
}

export default AddButton;
