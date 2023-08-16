import React from "react";
import "./loader.scss";
import Backdrop from "@mui/material/Backdrop";

interface props {
  isLoading: boolean;
  message?: string;
  backDrop?: boolean;
  handleClose?: () => void;
}

const Loader: React.FC<props> = ({ isLoading, backDrop, handleClose }) => {
  if (!isLoading) return null;

  return (
    <div data-testid="loader-mock">
      {!backDrop ? (
        <div className="bouncer" style={{ backgroundColor: "white" }}>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
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
