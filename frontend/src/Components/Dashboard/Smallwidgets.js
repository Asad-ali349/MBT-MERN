import React from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { H4 } from '../../AbstractElements';
import SvgIcon from '../Common/Component/SvgIcon';
import { Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

const SmallWidgets = ({ mainClass }) => {
  const {totalSalesToday,totalDiscountOrderTodayResult,totalPendingOrderToday,totalSalesThisMonth,onsiteOrdersToday,totalDiscountToday,onlineOrdersToday,totalProducts,totalCategories} = useSelector(state=>state.dashboard)
  const Data = [
    {
      title: "Today's Sale",
      color: 'warning',
      total: totalSalesToday,
      gros: 80,
      icon: 'profit',
    },
    {
      title: 'Current Month Sale',
      color: 'warning',
      total: totalSalesThisMonth,
      gros: 80,

      icon: 'profit',
    },
    
    {
      title: "Today's Onsite Orders",
      color: 'success',
      total: onsiteOrdersToday,
      gros: 10,
      icon: 'return-box',
      suffix: 'k',
    },
   
    {
      title: "Today's  Online Orders",
      color: 'success',
      total: onlineOrdersToday,
      gros: 10,
      icon: 'rate',
      suffix: 'k',
    },
    {
      title: "Today's Total Discount",
      color: 'success',
      total: totalDiscountToday,
      gros: 10,
      icon: 'return-box',
      suffix: 'k',
    },
   
    {
      title: "Today's Discounted Orders",
      color: 'success',
      total: totalDiscountOrderTodayResult,
      gros: 10,
      icon: 'rate',
      suffix: 'k',
    },
    {
      title: "Today's Pending Orders",
      color: 'success',
      total: totalPendingOrderToday,
      gros: 10,
      icon: 'rate',
      suffix: 'k',
    },
    {
      title: 'Total Products',
      color: 'primary',
      total: totalProducts,
      gros: 50,
      icon: 'cart',
    },
    {
      title: 'Total Categories',
      color: 'primary',
      total: totalCategories,
      gros: 20,
      icon: 'rate',
    },
    

  ]

  return (
    <Col xl='6' lg='12' className='box-col-6 xl-50'>
      <Row >
        {Data.map((data, i) => (
          <Col sm='6' key={i} className='m-t-30'>
            <Card className={`small-widget ${mainClass ? mainClass : ''}`}>
              <CardBody className={data.color}>
                <span className='f-light'>{data.title}</span>
                <div className='d-flex align-items-end gap-1'>
                  <H4>
                    {data.total}
                  </H4>
                </div>
                <div className='bg-gradient'>
                  <SvgIcon iconId={data.icon} className='stroke-icon svg-fill' />
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
};


export default SmallWidgets;
