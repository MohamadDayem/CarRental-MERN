// ##// ##// ##
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
// import {ToastContainer, toast} from "react-toastify";
// import { useCookies } from "react-cookie";
import {Button, Container, Row, Col, Navbar, Nav, Card, NavDropdown} from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import Image from 'react-bootstrap/Image';

const ContactUs = () => {
    const {id} = useParams();

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [type, setType] = useState("");
    const [year, setYear] = useState();
    const [cost, setCost] = useState();
    const [image, setImage] = useState("");
    const [owner, setOwner] = useState("")

    const [carId, setCarId] = useState("");
    const [loaded, setLoaded] = useState(1);
    const [adminUser, setSAdminUser] = useState({});


    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [rentRequests, setRentRequests] = useState([]);
    const [cars, setCars] = useState([]);


    console.log(cookies);

    useEffect(() => {


        const verifyCookie = async () => {
            console.log(cookies);
            if (!cookies.token) {
                navigate("/login");
            }
            const {data} = await axios.post(
                "http://localhost:8000/home", {},
                {withCredentials: true}
            );
            const {status, user} = data;
            // console.log("First Status",user.firstName);

            data.user ? setUsername(user.firstName) : setUsername('')
            data.user ? setUserLastName(user.lastName) : setUserLastName('')
            data.user ? setUserId(user._id) : setUserId('');
            data.user ? setPassword(user.password) : setUserId('');
            data.user ? setEmail(user.email) : setUserId('');
            data.user ? setCars(user.cars) : setUserId([]);
            data.user ? setRentRequests(user.rentRequests) : setUserId([]);
            data.user ? setIsAdmin(user.isAdmin) : setUserId(false);

            console.log("Final state", status);
            return status
                ? toast(`Hello ${user}`, {
                    position: "top-right",
                })
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);
    const Logout = () => {
        removeCookie("token");
        navigate("/login");
    };



    const AboutUs = (carId) => {
        let updatedRentRequests = rentRequests.concat([userId, carId]); // Concatenates the new carId to the existing rentRequests

        axios.patch('http://localhost:8000/book/' + userId, {
            isAdmin,
            rentRequests: updatedRentRequests, // Updates the rentRequests with the new value
            cars,
            email,
            password,
            userLastName,
            username
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    return (
        <>
            <Navbar bg="dark" variant="dark" className="p-3">
                <Container>
                    <Navbar.Brand href="#">
                        <img
                            // img src="https://media.istockphoto.com/id/523002801/photo/traffic-on-the-gardiner-express.jpg?s=612x612&w=0&k=20&c=3VhrrCf-0jz_zXkxasSA0hdh8g35f5jpRZxeuJ0cTDI="
                            height="80"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {/*<Nav.Link cas={Link} to="/home">*/}
                            {/*    Home*/}
                            {/*</Nav.Link>*/}
                            <Nav.Link as={Link} to="/home" className="mx-5">
                                Home
                            </Nav.Link>

                            <Nav.Link as={Link} to="/aboutus" className="mx-5">
                                About Us
                            </Nav.Link>
                            {adminUser._id == userId && (
                                <Nav.Link as={Link} to="/admin" className="mx-5">
                                    Admin
                                </Nav.Link>
                            )}
                            <NavDropdown
                                title="Company"
                                id="navbarDropdownMenuLink"
                                className="mx-5"
                            >
                                <NavDropdown.Item href="#">Blog</NavDropdown.Item>
                                <NavDropdown.Item href="#">About Us</NavDropdown.Item>
                                <NavDropdown.Item href="#">Contact us</NavDropdown.Item>
                            </NavDropdown>
                            <Button variant="danger" onClick={Logout}>
                                LOGOUT
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <img src="" alt=""/>

<br/><br/>

<br/><br/>
            <h1 style={{textAlignLast:"left", marginLeft:"150px", fontFamily:"fantasy"}}>Meet our team members:</h1>
<br/><br/>
<br/><br/>


<div style={{display: "flex", justifyContent:"space-around", padding: "100x",textAlignLast:"center"}}>

            <Row>
                    <Col style={{textAlign: "center"}} xs={12} sm={6} md={4} lg={3}>
                        <Card style={{ width: '28rem',  }}>
                            <Card.Img variant="top" src="https://avatars.githubusercontent.com/u/121414255?v=4" style={{ height: '200px' }} />
                            <Card.Body>
                                <Card.Title>Awad Issa</Card.Title>
                                <Card.Text>awadissa403@gmail.com</Card.Text>

                            </Card.Body>
                        </Card>
                        <br/>
                    </Col>
            </Row>
            <Row>
                <Col style={{textAlign: "center"}} xs={12} sm={6} md={4} lg={3}>
                    <Card style={{ width: '28rem',  }}>
                        <Card.Img variant="top" src="https://avatars.githubusercontent.com/u/131618452?v=4" style={{ height: '200px' }} />
                        <Card.Body>
                            <Card.Title>Mohammed Dayem</Card.Title>
                            <Card.Text>mohammeddayem@hotmail.com</Card.Text>

                        </Card.Body>
                    </Card>
                    <br/>
                </Col>
            </Row>
            <Row>
                <Col style={{textAlign: "center"}} xs={12} sm={6} md={4} lg={3}>
                    <Card style={{ width: '28rem',  }}>
                        <Card.Img variant="top" src="" style={{ height: '200px' }} />
                        <Card.Body>
                            <Card.Title>Hakeem Albargothi</Card.Title>
                            <Card.Text>hakeembargothi@gmail.com</Card.Text>

                        </Card.Body>
                    </Card>
                    <br/>
                </Col>
            </Row>
</div>



            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>


            <Container className="mt-5">
                <Row>
                    <Col>
                        <ToastContainer />
                    </Col>
                </Row>
            </Container>

            <footer className="bg-dark text-light py-5">
                <Container>
                    <Row>
                        <Col md={6}>
                            <h4>About Us</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                                sodales lorem sed efficitur consequat.
                            </p>
                        </Col>
                        <Col md={3}>
                            <h4>Links</h4>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#">About</a>
                                </li>
                                <li>
                                    <a href="#">Services</a>
                                </li>
                                <li>
                                    <a href="#">Contact</a>
                                </li>
                            </ul>
                        </Col>
                        <Col md={3}>
                            <h4>Contact Us</h4>
                            <p>1234 Street Name</p>
                            <p>City, State ZIP</p>
                            <p>Email: info@example.com</p>
                            <p>Phone: 123-456-7890</p>
                        </Col>
                    </Row>
                </Container>
                <div className="text-center mt-4">
                    <p>© 2023 Your Website. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default ContactUs;




