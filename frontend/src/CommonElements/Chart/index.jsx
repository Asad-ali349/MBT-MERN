import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
import PropTypes from 'prop-types';
export default function Chart({currency,dataPoints}) {

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const options = {
        animationEnabled: true,	
        title:{
        text: "Time"
        },
        axisY : {
        title: "Price ("+currency+")"
        },
        
        toolTip: {
            shared: true
        },
        data: [{
        type: "spline",
        name: "Open",
        
        showInLegend: true,
        dataPoints: dataPoints.open.reverse()
        },
        {
        type: "spline",
        name: "Close",
        showInLegend: true,
        dataPoints: dataPoints.close.reverse()
        },
        {
        type: "spline",
        name: "Low",
        showInLegend: true,
        dataPoints: dataPoints.low.reverse()
        },
        {
        type: "spline",
        name: "High",
        showInLegend: true,
        dataPoints: dataPoints.high.reverse()
        }]
    }
  return (
    <CanvasJSChart options = {options} />
  )
}



Chart.propTypes = {
    currency: PropTypes.string.isRequired,
};
