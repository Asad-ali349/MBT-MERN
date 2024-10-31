import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
export default function Chart({ type, dataPoints }) {
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    animationEnabled: true,
    title: {
      text: `${type} Records`,
    },
    
    axisY: {
      title: "Sales (in Rupees)",
      prefix: "RS",
    },
    toolTip: {
      shared: true
  },
    data: dataPoints.map((dataPoint)=>{
      return {
        // yValueFormatString: "#,###",
        type: "spline",
        name: dataPoint.name,
        showInLegend: true,
        dataPoints: dataPoint.data,
      }
    })
  };

  return <CanvasJSChart options={options} />;
}
