import { H5 } from '../../../AbstractElements';
import React, { Fragment } from 'react';
import { CardHeader } from 'reactstrap';

const HeaderCard = ({ title, span1, span2, mainClasses, button }) => {
  return (
    <Fragment>
      <CardHeader className={`${mainClasses ? mainClasses : ''}`}>
        <H5>{title}</H5>
        {button && (<button className='btn btn-primary' onClick={button.onClick}>{button.text}</button>)}
      </CardHeader>
    </Fragment>
  );
};

export default HeaderCard;
