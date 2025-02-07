import { H5 } from '../../../AbstractElements';
import React, { Fragment } from 'react';
import { CardHeader } from 'reactstrap';

const HeaderCard = ({ title, mainClasses, button }) => {
  return (
    <Fragment>
      <CardHeader className={`${mainClasses ? mainClasses : ''}`} style={{display: 'flex', justifyContent:'space-between'}}>
        <H5>{title}</H5>
        {button && (<button className='btn btn-primary' onClick={button.onClick}>{button.text}</button>)}
      </CardHeader>
    </Fragment>
  );
};

export default HeaderCard;
