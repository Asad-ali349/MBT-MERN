import React, { useContext, useState } from 'react';
import { Grid } from 'react-feather';
import { Link } from 'react-router-dom';
import { Image } from '../../AbstractElements';
import CubaIcon from '../../assets/Logo/logo_dark.png';
import CustomizerContext from '../../_helper/Customizer';

const SidebarLogo = () => {
  const { mixLayout, toggleSidebar, toggleIcon, layout, layoutURL } = useContext(CustomizerContext);

  const openCloseSidebar = () => {
    toggleSidebar(!toggleIcon);
  };

  const layout1 = localStorage.getItem("sidebar_layout") || layout;

  return (
    <div className='logo-wrapper'>
     
      <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
        <Image  attrImage={{ className: 'img-fluid d-inline', src: `${require('../../assets/Logo/logo.png')}`, style:{width:"90%"}}} />
      </Link>
      
      <div className='back-btn' onClick={() => openCloseSidebar()}>
        <i className='fa fa-angle-left'></i>
      </div>
      
    </div>
  );
};

export default SidebarLogo;
