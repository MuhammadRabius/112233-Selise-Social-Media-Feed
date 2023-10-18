import React from "react";
import "./loader.css";
import Backdrop from "@mui/material/Backdrop";


const Loader = ({ isLoading, backDrop, handleClose }) => {
  if (!isLoading) return null;

  return (
    <div data-testid="loader-mock">
      {!backDrop ? (
        <div className="bouncer" style={{ backgroundColor: "rgba(255, 255, 255, 0.603)" }} >
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      ) : (
        <Backdrop
          sx={{ color: "rgba(255, 255, 255, 0.603)", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
          data-testid="backdrop-mock"
        >
          <div className="bouncer">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </Backdrop>
      )}
    </div>
  );
};

export default Loader;
