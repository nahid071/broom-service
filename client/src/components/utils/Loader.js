import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
// SyncOutlined;
const Loader = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingOutlined style={{ fontSize: 40 }} />
      </div>
    </>
  );
};

export default Loader;
