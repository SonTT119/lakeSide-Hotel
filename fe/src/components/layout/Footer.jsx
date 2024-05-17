import React from "react";
// import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer =() => {
    let today = new Date();
    // return (
    //     <footer className="bg-dark text-light py-3 footer mt-lg-5">
    //         <Container>
    //             <Row>
    //                 <Col xs={12} md={12} className="text-center">
    //                 <p className="mb-0">&copy; {today.getFullYear()} lakeSide Hotel</p>
    //                 </Col>
    //             </Row>
    //         </Container>
    //     </footer>
    // )

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h3>Contact Info</h3>
                    <p>Address: No 6A, 1/69, BXT, Khuong Dinh, Thanh Xuan, Han Noi City</p>
                    <p>Phone: 0868440902</p>
                    <p>Email: sonden02092002@gmai.com</p>
                    <p className="mb-0">&copy; {today.getFullYear()} lakeSide Hotel</p>

                </div>
                <div className="footer-right">
                    <h3>Quick link</h3>
                    <ul>
                        <li><Link to="/">Home page</Link></li>
                        {/* <li><a href="#">Dịch vụ</a></li> */}
                        <li><Link to={"/browse-all-rooms"}>Room</Link></li>
                        {/* <li><a href="#">Liên hệ</a></li> */}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
