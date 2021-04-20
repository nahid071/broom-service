import React from "react";
import { Progress, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
const Uploading = () => {
  const { uploading, progress } = useSelector((state) => state.upload);

  return (
    <>
      {uploading && (
        <div style={styles.container}>
          <Progress type="circle" percent={progress} />
        </div>
      )}
    </>
  );
};

export default Uploading;

const styles = {
  container: {
    width: "125px",
    height: "125px",
    borderRadius: "50%",
    position: "fixed",
    right: 0,
    bottom: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    zIndex: "10001",
  },
};
