import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Smallwidgets from "./Smallwidgets";
import { Breadcrumbs } from "../../AbstractElements";
import "./style.css";
import { Link } from "react-router-dom";
import Chart from "./Chart";
import { fetchDashboardData } from "../../Redux/Slices/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import formateMonthlyDataPoints from "../../utils/formateMonthlyDataPoints";
import formateYearlyDataPoints from "../../utils/formateYearlyDataPoints";
import DataTableComponent from "./DataTableComponent";
import HeaderCard from "../Common/Component/HeaderCard";
import PurchasedDataTableComponent from "./PurchasedDataTableComponent";

const ChartComponent = () => {
  const dispatch = useDispatch();

  const { yearlySales, monthlySales } = useSelector((state) => state.dashboard);
  const [monthlyData, setMonthlyData] = useState([[], []]);
  const [yearlyData, setYearlyData] = useState([[], []]);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);

  useEffect(() => {
    if (monthlySales?.length > 0) {
      setMonthlyData(formateMonthlyDataPoints(monthlySales));
    }
  }, [monthlySales]);

  useEffect(() => {
    if (yearlySales?.length > 0) {
      setYearlyData(formateYearlyDataPoints(yearlySales));
    }
  }, [yearlySales]);

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
                        <Link
                          class="btn btn-outline-white btn btn-outline-transparent"
                          to={"/onsite_orders"}
                        >
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
                  <img
                    src="/svg/cartoon.svg"
                    alt="vector women with leptop"
                    class="media"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Smallwidgets />

          <Col smd={12} md={12}>
            <Card>
              <HeaderCard
                title="Sold Products Stats"
                mainClasses={"d-flex justify-content-between"}
              />
              <CardBody>
                <DataTableComponent />
              </CardBody>
            </Card>
          </Col>
          <Col smd={12} md={12}>
            <Card>
              <HeaderCard
                title="Purchase Stats"
                mainClasses={"d-flex justify-content-between"}
              />
              <CardBody>
                <PurchasedDataTableComponent />
              </CardBody>
            </Card>
          </Col>
          <Col smd={12} md={12}>
            <Card>
              <CardBody>
                <Chart dataPoints={monthlyData} type={"Monthly"} />
              </CardBody>
            </Card>
          </Col>
          <Col smd={12} md={12}>
            <Card>
              <CardBody>
                <Chart type={"Yearly"} dataPoints={yearlyData} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ChartComponent;
