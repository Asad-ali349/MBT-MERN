import React from 'react';
import { useSelector } from 'react-redux';
import ConfigDB from '../../Config/ThemeConfig';

// Define your functional component
const MyComponent = () => {
  // Use useMemo to compute primary and secondary values only once
  const primary = React.useMemo(() => localStorage.getItem('default_color') || ConfigDB.data.color.primary_color, []);
  const secondary = React.useMemo(() => localStorage.getItem('secondary_color') || ConfigDB.data.color.secondary_color, []);

  // Use destructuring to extract Record from useSelector
  const { Record } = useSelector(state => state.dashboard);


  const progress1 = {
    series: [
      {
        name: 'Process 1',
        data: [`${Record.pending_reservation}`],
      },
    ],
    options: {
      chart: {
        height: 70,
        type: 'bar',
        stacked: true,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '15%',
          colors: {
            backgroundBarColors: [primary],
            backgroundBarOpacity: 0.2,
          },
        },
      },
      colors: [primary],
      stroke: {
        width: 0,
      },
      fill: {
        colors: [primary],
        type: 'gradient',
        opacity: 1,
        gradient: {
          gradientToColors: [primary],
        },
      },

      title: {
        floating: true,
        offsetX: -10,
        offsetY: 5,
        text: 'Pending',
        style: {
          fontSize: '18px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 500,
        },
      },
      subtitle: {
        floating: true,
        align: 'right',
        offsetY: 0,
        text: Record.pending_reservation,
        style: {
          fontSize: '14px',
        },
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        categories: ['Packed'],
      },
      yaxis: {
        max: 100,
      },

      responsive: [
        {
          breakpoint: 767,
          options: {
            title: {
              style: {
                fontSize: '16px',
              },
            },
          },
        },
      ],
    },
  };

  const progress2 = {
    series: [
      {
        name: 'Dispatched',
        data: [`${Record.inprogress_reservation}`],
      },
    ],
    options: {
      chart: {
        height: 70,
        type: 'bar',
        stacked: true,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '15%',
          colors: {
            backgroundBarColors: [secondary],
            backgroundBarOpacity: 0.2,
            backgroundBarRadius: 10,
          },
        },
      },
      colors: [secondary],
      stroke: {
        width: 0,
      },

      title: {
        floating: true,
        offsetX: -10,
        offsetY: 5,
        text: 'Inprogress',
        style: {
          fontSize: '18px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 500,
        },
      },
      subtitle: {
        floating: true,
        align: 'right',
        offsetY: 0,
        text: Record.inprogress_reservation,
        style: {
          fontSize: '14px',
        },
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        categories: ['Process 2'],
      },
      yaxis: {
        max: 100,
      },
      fill: {
        colors: [secondary],
        type: 'gradient',
        gradient: {
          inverseColors: false,
          gradientToColors: [secondary],
        },
      },
      responsive: [
        {
          breakpoint: 767,
          options: {
            title: {
              style: {
                fontSize: '16px',
              },
            },
          },
        },
      ],
    },
  };

  const progress3 = {
    series: [
      {
        name: 'Reach Station',
        data: [`${Record.onBoarding_reservation}`],
      },
    ],
    options: {
      chart: {
        height: 70,
        type: 'bar',
        stacked: true,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '15%',
          colors: {
            backgroundBarColors: ['#a927f9'],
            backgroundBarOpacity: 0.2,
            backgroundBarRadius: 10,
          },
        },
      },
      colors: ['#a927f9'],
      stroke: {
        width: 0,
      },

      fill: {
        colors: ['#a927f9'],
        type: 'gradient',
        gradient: {
          gradientToColors: ['#a927f9'],
        },
      },
      title: {
        floating: true,
        offsetX: -10,
        offsetY: 5,
        text: 'OnBoarding',
        style: {
          fontSize: '18px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 500,
        },
      },
      subtitle: {
        floating: true,
        align: 'right',
        offsetY: 0,
        text: Record.onBoarding_reservation,
        style: {
          fontSize: '14px',
        },
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        categories: ['Reach Station'],
      },
      yaxis: {
        max: 100,
      },
      responsive: [
        {
          breakpoint: 767,
          options: {
            title: {
              style: {
                fontSize: '16px',
              },
            },
          },
        },
      ],
    },
  };

  const progress4 = {

    options: {
      chart: {
        height: 70,
        type: 'bar',
        stacked: true,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '15%',
          colors: {
            backgroundBarColors: ['#F8D62B'],
            backgroundBarOpacity: 0.2,
            backgroundBarRadius: 10,
          },
        },
      },
      colors: ['#F8D62B'],
      stroke: {
        width: 0,
      },

      fill: {
        colors: ['#F8D62B'],
        type: 'gradient',
        gradient: {
          gradientToColors: ['#F8D62B'],
        },
      },
      title: {
        floating: true,
        offsetX: -10,
        offsetY: 5,
        text: 'Cancelled',
        style: {
          fontSize: '18px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 500,
        },
      },
      subtitle: {
        floating: true,
        align: 'right',
        offsetY: 0,
        text: Record.cancelled_reservation,
        style: {
          fontSize: '14px',
        },
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        categories: ['Out for delivery'],
      },
      yaxis: {
        max: 100,
      },
      responsive: [
        {
          breakpoint: 767,
          options: {
            title: {
              style: {
                fontSize: '16px',
              },
            },
          },
        },
      ],
    },
    series: [
      {
        name: 'Out for delivery',
        data: [`${Record.cancelled_reservation}`],
      },
    ],
  };

  const progress5 = {
    options: {
      chart: {
        height: 70,
        type: 'bar',
        stacked: true,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '15%',
          colors: {
            backgroundBarColors: ['#51BB25'],
            backgroundBarOpacity: 0.2,
            backgroundBarRadius: 10,
          },
        },
      },
      colors: ['#51BB25'],
      stroke: {
        width: 0,
      },

      fill: {
        colors: ['#51BB25'],
        type: 'gradient',
        gradient: {
          gradientToColors: ['#51BB25'],
        },
      },
      title: {
        floating: true,
        offsetX: -10,
        offsetY: 5,
        text: 'Completed',
        style: {
          fontSize: '18px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 500,
        },
      },
      subtitle: {
        floating: true,
        align: 'right',
        offsetY: 0,
        text: Record.completed_reservation,
        style: {
          fontSize: '14px',
        },
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        categories: ['Delivered'],
      },
      yaxis: {
        max: 100,
      },
      responsive: [
        {
          breakpoint: 767,
          options: {
            title: {
              style: {
                fontSize: '16px',
              },
            },
          },
        },
      ],
    },
    series: [
      {
        name: 'Delivered',
        data: [`${Record.completed_reservation}`],
      },
    ],
  };


  // 
  const Data = [

    {
      title: 'Total Resveration',
      color: 'primary',
      total: Record.total_reservation,
      gros: 50,
      icon: 'new-order',
    },
    {
      title: 'Total Customers',
      color: 'warning',
      total: Record.total_customers,
      gros: 20,
      icon: 'customers',
    },
    {
      title: 'Total Dealers',
      color: 'secondary',
      total: Record.total_dealer,
      gros: 10,
      // prefix: '$',
      icon: 'customers',
      suffix: 'k',
    },
    {
      title: 'Total Drivers',
      color: 'success',
      total: Record.total_drivers,
      gros: 80,
      // prefix: '$',
      icon: 'profit',
    },
    {
      title: 'Total Packages',
      color: 'primary',
      total: Record.total_packages,
      gros: 10,

      icon: 'sale',
      suffix: 'k',
    },
    {
      title: 'Total Services',
      color: 'warning',
      total: Record.total_service,
      gros: 80,

      icon: 'profit',
    },

  ]


  return [Data, progress1, progress2, progress3, progress4, progress5];
}


export default MyComponent;