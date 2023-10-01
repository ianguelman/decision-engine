import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import CloseIcon from "@mui/icons-material/Close";

import "./ConfigModelReturn.css";
import { IconButton, MenuItem, TextField } from "@mui/material";

const returnValues = ["true", "false"];

const ConfigModalReturn = ({
  open,
  handleClose,
  returnValue,
  setReturnValue,
  returnValueError,
}) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box className="returnModalContainer">
          <div className="header">
            <Typography variant="subtitle1" gutterBottom>
              Return editor
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon color="action" />
            </IconButton>
          </div>

          <TextField
            className="inputReturn"
            select
            label="Select"
            value={returnValue}
            onChange={(event) => {
              setReturnValue(event.target.value);
            }}
            error={returnValueError}
            helperText={returnValueError ? "Field can't be empty" : ""}
          >
            {returnValues.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Modal>
    </>
  );
};

export default ConfigModalReturn;
