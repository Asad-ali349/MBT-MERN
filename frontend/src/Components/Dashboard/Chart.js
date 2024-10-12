import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
export default function Chart({ type, dataPoints, valueFormatString }) {
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  

  const options = {
    animationEnabled: true,
    title: {
      text: `${type} Sales`,
    },
    // axisX: {
    //   title: "Sale",
    // },
    axisY: {
      title: "Sales (in Rupees)",
      prefix: "RS",
    },
    data: [
      {
        yValueFormatString: "$#,###",
        type: "spline",
        dataPoints: dataPoints, // Using dataPoints with numerical 'x' and string 'label'
      },
    ],
  };

  return <CanvasJSChart options={options} />;
}
