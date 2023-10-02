import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import CloseIcon from "@mui/icons-material/Close";

import "./ConfigModalDecision.css";
import { IconButton, MenuItem, TextField } from "@mui/material";

const comparisonValues = [">", ">=", "==", "<=", "<"];

const ConfigModalDecision = ({
  open,
  handleClose,
  propertyName,
  setPropertyName,
  comparisonValue,
  setComparisonValue,
  comparedValue,
  setComparedValue,
  propertyNameError,
  comparisonValueError,
  comparedValueError,
}) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box className="decisionModalContainer">
          <div className="header">
            <Typography variant="subtitle1" gutterBottom>
              Decision editor
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon color="action" />
            </IconButton>
          </div>

          <TextField
            className="inputText"
            label="Property name"
            value={propertyName}
            onChange={(event) => {
              setPropertyName(event.target.value);
            }}
            error={propertyNameError}
            helperText={propertyNameError ? "Field can't be empty" : ""}
          />

          <TextField
            className="inputComparison"
            select
            label="Select"
            value={comparisonValue}
            onChange={(event) => {
              setComparisonValue(event.target.value);
            }}
            error={comparisonValueError}
            helperText={comparisonValueError ? "Field can't be empty" : ""}
          >
            {comparisonValues.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            className="inputNumber"
            label="Value"
            type="number"
            value={comparedValue}
            onChange={(event) => {
              setComparedValue(event.target.value);
            }}
            error={comparedValueError}
            helperText={comparedValueError ? "Field can't be empty" : ""}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ConfigModalDecision;
