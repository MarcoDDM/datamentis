import React from "react";
import "./index.css";

const Loading = props => {
  const { width, height } = props;
  return <div className="Loading-loading" style={{ width, height }} />;
};

Loading.defaultProps = {
  width: "28px",
  height: "28px"
};

export default Loading;
