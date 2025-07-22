import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/img_home.png";


function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              ALGUNA <span className="purple"> INFORMACION </span> IMPORTANTE
            </h1>
            <p className="home-about-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
               🤷‍♂️
              <br />
              <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              <i>
                <b className="purple"> algo mas </b>
              </i>
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              <i>
                <b className="purple">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. </b> and
                also in areas related to{" "}
                <b className="purple">
                  algo
                </b>
              </i>
              <br />
              <br />
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              <b className="purple">Link</b> and
              <i>
                <b className="purple">
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> algo</b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <div className="tilt-container">
              <img src={myImg} className="img-fluid" alt="avatar" />
            </div>
          </Col>
        </Row>
        {/*
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/Soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/soumyajit4419/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        */}
      </Container>
    </Container>
  );
}
export default Home2;
