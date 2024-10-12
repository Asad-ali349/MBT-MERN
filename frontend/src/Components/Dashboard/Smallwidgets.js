import React from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { H4 } from '../../AbstractElements';
import SvgIcon from '../Common/Component/SvgIcon';
import { Col } from 'react-bootstrap';


const SmallWidgets = ({ mainClass }) => {
  const Data = [
    {
      title: 'Total Sale (Current Month)',
      color: 'warning',
      total: 8,
      gros: 80,
      icon: 'profit',
    },
    {
      title: 'Total Sale (Current Year)',
      color: 'warning',
      total: 9,
      gros: 80,

      icon: 'profit',
    },
    {
      title: 'Total Products',
      color: 'primary',
      total: 10,
      gros: 50,
      icon: 'cart',
    },
    {
      title: 'Total Categories',
      color: 'primary',
      total: 1,
      gros: 20,
      icon: 'rate',
    },
    {
      title: 'Total Onsite Orders',
      color: 'success',
      total: 6,
      gros: 10,
      icon: 'return-box',
      suffix: 'k',
    },
   
    {
      title: 'Total Online Orders',
      color: 'success',
      total: 7,
      gros: 10,
      icon: 'rate',
      suffix: 'k',
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
