import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Smallwidgets from "./Smallwidgets";
import { Breadcrumbs } from "../../AbstractElements";
import "./style.css";
import { Link } from "react-router-dom";
import Chart from "./Chart";

const ChartComponent = () => {
  // const dispatch = useDispatch();

  // React.useEffect(() => {

  //   dispatch(Dashboard())
  // }, [])

  const monthlyData = [
    { y: 25060, label: "Jan" },
    { y: 27980, label: "Feb" },
    { y: 42800, label: "Mar" },
    { y: 32400, label: "Apr" },
    { y: 35260, label: "May" },
    { y: 33900, label: "Jun" },
    { y: 40000, label: "Jul" },
    { y: 52500, label: "Aug" },
    { y: 32300, label: "Sep" },
    { y: 42000, label: "Oct" },
    { y: 37160, label: "Nov" },
    { y: 38400, label: "Dec" },
  ];
  const yearlyData=[
    { y: 25060, label: "2019" },
    { y: 27980, label: "2020" },
    { y: 42800, label: "2021" },
    { y: 32400, label: "2022" },
    { y: 35260, label: "2023" },
  ]

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Dashboard" parent="Dashboard" />
      <Container fluid={true} className="chart-widget">
        <Row>
          <Col sm={12} md={6}>
            <Card className="welcomeCard">
              <CardBody className="welcomeCardBody">
                <div className="media">
                  <div class="media-body">
                    <div class="greeting-user">
                      <h4 class="f-w-600">Welcome to Mithu Butt Shop</h4>
                      <p>Here whats happing in your account today</p>
                      <div class="whatsnew-btn">
                        <Link class="btn btn-outline-white btn btn-outline-transparent" to={'/onsite_orders'}>
                          Go To Orders
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="clockbox">
                      <svg
                        id="clock"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 600 600"
                      >
                        <g id="face">
                          <circle
                            class="circle"
                            cx="300"
                            cy="300"
                            r="253.9"
                          ></circle>
                          <path
                            class="hour-marks"
                            d="M300.5 94V61M506 300.5h32M300.5 506v33M94 300.5H60M411.3 107.8l7.9-13.8M493 190.2l13-7.4M492.1 411.4l16.5 9.5M411 492.3l8.9 15.3M189 492.3l-9.2 15.9M107.7 411L93 419.5M107.5 189.3l-17.1-9.9M188.1 108.2l-9-15.6"
                          ></path>
                          <circle
                            class="mid-circle"
                            cx="300"
                            cy="300"
                            r="16.2"
                          ></circle>
                        </g>
                        <g id="hour">
                          <path class="hour-hand" d="M300.5 298V142"></path>
                          <circle
                            class="sizing-box"
                            cx="300"
                            cy="300"
                            r="253.9"
                          ></circle>
                        </g>
                        <g id="minute">
                          <path class="minute-hand" d="M300.5 298V67"></path>
                          <circle
                            class="sizing-box"
                            cx="300"
                            cy="300"
                            r="253.9"
                          ></circle>
                        </g>
                        <g id="second">
                          <path class="second-hand" d="M300.5 350V55"></path>
                          <circle
                            class="sizing-box"
                            cx="300"
                            cy="300"
                            r="253.9"
                          ></circle>
                        </g>
                      </svg>
                    </div>
                    <div class="badge f-10 p-0" id="txt"></div>
                  </div>
                </div>
                <div class="cartoon">
                  <img src="/svg/cartoon.svg" alt="vector women with leptop" class="media"/>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Smallwidgets />

          <Col smd={12} md={12}>
            <Card>
              <CardBody>
                <Chart dataPoints={monthlyData} type={"Monthly"} valueFormatString={'MMM'}/>
              </CardBody>
            </Card>
          </Col>
          <Col smd={12} md={12}>
            <Card>
              <CardBody>
                <Chart type={'Yearly'} dataPoints={yearlyData} valueFormatString={'YYYY'}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ChartComponent;
