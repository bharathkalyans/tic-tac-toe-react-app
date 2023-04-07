import React from "react";
import "./ResetButton.css";

export const ResetButton = ({ resetGame }) => {
  return (
    <button className="reset-button" onClick={resetGame}>
      RESET
    </button>
  );
};
