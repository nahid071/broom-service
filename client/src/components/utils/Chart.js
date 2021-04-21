import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/charts";

const DemoPie = () => {
  var data = [
    {
      type: "Completed",
      value: 1020,
    },
    {
      type: "Declined",
      value: 146,
    },
  ];
  var config = {
    color: ["#7cd992", "#eb6161"],
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: function content(_ref) {
        return _ref.value;
      },
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },

    interactions: [{ type: "element-active" }],
  };
  return <Pie {...config} />;
};

export default DemoPie;
