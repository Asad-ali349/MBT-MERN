import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Row } from 'reactstrap';
import CountUp from 'react-countup';
import { H6, Image, LI, UL } from '../../../src/AbstractElements';
import { BOD, ContactUs, ContactUsNumber, DDMMYY, Designer, Email, Follower, Following, LocationDetails, MarekjecnoMailId, MarkJecno, Location } from '../../Constant';
import { useNavigate, useNavigation } from 'react-router';
import {useSelector,useDispatch} from 'react-redux';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchProfile } from '../../Redux/Slices/authSlice';

const UserProfile = () => {
  const {loading,profile}=useSelector(state=>state.auth);
  const [url, setUrl] = useState('');
  const navigate=useNavigate();
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchProfile());
  },[])
  return (
    <Fragment>
       {Object.keys(profile).length === 0 ? (
        <>
         <Skeleton  height={350} style={{borderRadius:'8px'}}/>
         <Skeleton  height={80}/>
        </>
       ):(
        <Col sm='12'>
           <Card className='hovercard text-center'>
             <CardHeader className='cardheader'></CardHeader>
             <div className='user-image'>
               <div className='avatar'>
                  {
                    profile.profile_image && profile.profile_image.url ? (
                      <Image
                        attrImage={{ className: 'step1', alt: '', src: `${profile.profile_image.url}` }}
                      />
                    ) : (
                      <Image
                        attrImage={{ className: 'step1', alt: '', src: `${url ? url : require('../../assets/images/user/sample.png')}` }}
                      />
                    )
                  }
               </div>
               <div className='icon-wrapper step2' onClick={() => navigate("/edit_profile")}>
                 <i className='icofont icofont-pencil-alt-5' >
                   
                 </i>
               </div>
             </div>
             <div className='info'>
               <Row className='step3' data-intro='This is the your details'>
                 <Col sm='6' lg='4' className='order-sm-1 order-xl-0'>
                   <Row>
                     <Col md='6'>
                       <div className='ttl-info text-start'>
                         <H6>
                           <i className='fa fa-envelope me-2'></i> {Email}
                         </H6>
                         <span>{profile.email}</span>
                       </div>
                     </Col>
                     <Col md='6'>
                       <div className='ttl-info text-start ttl-xs-mt'>
                         <H6>
                           <i className='fa fa-phone me-2'></i>
                           {ContactUs}
                         </H6>
                         <span>{profile.phone}</span>
                       </div>
                     </Col>
                   </Row>
                 </Col>
                 <Col sm='12' lg='4' className='order-sm-0 order-xl-1'>
                   <div className='user-designation'>
                     <div className='title'>
                       <a target='_blank' href='#javascript'>
                         {profile.name}
                       </a>
                     </div>
                     
                   </div>
                 </Col>
                 <Col sm='6' lg='4' className='order-sm-2 order-xl-2'>
                   <Row>
                   <Col md='6'>
                       <div className='ttl-info text-start ttl-sm-mb-0'>
                         <H6>
                           <i className='fa fa-location-arrow me-2'></i>
                           {Location}
                         </H6>
                         <span>{profile.street}{profile.city?','+profile.city:''}{profile.state?','+profile.state:''}{profile.country?','+profile.country:''}</span>
                       </div>
                     </Col>
                     <Col md='6'>
                       <div className='ttl-info text-start ttl-xs-mt'>
                         <H6>
                           <i className='fa fa-phone me-2'></i>
                           {ContactUs}
                         </H6>
                         <span>{profile.zip}</span>
                       </div>
                     </Col>
                     
                   </Row>
                 </Col>
               </Row>
               
              
             </div>
           </Card>
        </Col> 

       )} 
    </Fragment>
  );
};

export default UserProfile;
