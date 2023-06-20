import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import BasicSearch from "../../components/basicSearch/BasicSearch.jsx";
import Flippy, {BackSide, FrontSide} from "react-flippy";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendarDays, faCartShopping, faChild,
    faCircleInfo, faCity,
    faClock, faClockRotateLeft, faDollarSign, faEarthAmerica, faFlagUsa,
    faHeart,
    faLocationDot, faMailBulk, faMapPin, faRectangleAd,
    faRepeat, faStreetView, faTicket
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Pagination from "../../components/pagination/Pagination.jsx";
import axios from "axios";
import "./Favorites.css"

const MyComponent = () => {

    const [data,setData] = useState([]);


    const fetchData = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token')).jwt || null;
            const userId = JSON.parse(localStorage.getItem('token')).user.userId || null;
            console.log("THIS IS MY USERID " + userId)

            const response = await axios.get(`http://localhost:8080/api/favorites/${userId}`,{
                headers:
                    {
                        Authorization: `Bearer ${token}`,
                    },
            });
            console.log(response.data);
            setData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };




    useEffect(() => {

        fetchData();

    }, []);



    return (


        <Container className={"conti"}>
            <span className={"title-span text-white fs-1 fw-bold"}>FAVORITES</span>
            <Row className="justify-content-md-center">
                {data.map(e =>{
                    return(
                        <Col md="3" className="p-4" key={e.id}>
                            <Flippy
                                flipOnHover={false}
                                flipOnClick={true}
                                flipDirection="horizontal"

                                style={{ width: '300px', height: '550px' }}
                            >
                                <FrontSide >
                                    <Card className={"cardz text-white"} style={{ width: '300px', height: '550px' }}>
                                        <Card.Img variant="top" src={e.imageUrl}/>
                                        <Card.Body>
                                            <Card.Title>{e.name}</Card.Title>
                                            <br/>
                                            <Card.Text>
                                                <FontAwesomeIcon icon={faLocationDot}/> <FontAwesomeIcon icon={faLocationDot}/> {e.attraction!== undefined ? e.attraction : "unavailable"}
                                                <br/>
                                                <br/>
                                                <FontAwesomeIcon icon={faClock}/> {e.eventHour}
                                                <br/>
                                                <br/>
                                                <FontAwesomeIcon icon={faCalendarDays}/> {e.eventDate}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Body className={"d-flex justify-content-between mt-3 h4"}>
                                            <FontAwesomeIcon className={"text-dark"} icon={faRepeat}/>

                                            <Link className={"text-warning"} to={"/hotels/" + e.id} ><FontAwesomeIcon icon={faCircleInfo}/> </Link>
                                            <Link className={"text-success"} to={"/hotels/" + e.id} ><FontAwesomeIcon icon={faCartShopping}/> </Link>
                                        </Card.Body>
                                    </Card>
                                </FrontSide>
                                <BackSide >
                                    <Card className={"backcardz text-white"} style={{ width: '300px', height: '550px' }}>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faCity} />:</strong> {e.city}</ListGroup.Item>
                                            <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faEarthAmerica}/> :</strong> {e.country}</ListGroup.Item>
                                            <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faFlagUsa}/> :</strong> {e.state !== undefined ? e.state : "unavailable"}</ListGroup.Item>
                                            <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faStreetView}/> :</strong> {e.street}</ListGroup.Item>
                                            <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faDollarSign}/> :</strong> {e.priceRange !== undefined ? e.priceRange: "unavailable"}</ListGroup.Item>
                                            <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faMailBulk} />:</strong> {e.postalCode}</ListGroup.Item>
                                            <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faRectangleAd}/> :</strong> {e.promoter !== undefined ? e.promoter: "unavailable"}</ListGroup.Item>
                                            <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faTicket}/> :</strong> {e.eventType}</ListGroup.Item>
                                            <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faMapPin}/> :</strong> {e.attraction !== undefined ? e.attraction : "unavailable"}</ListGroup.Item>
                                            <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faClockRotateLeft} />:</strong> {e.upcomingEvents}</ListGroup.Item>

                                        </ListGroup>
                                        <Card.Body className={"d-flex justify-content-between h4 p-2 mt-3"}>
                                            <FontAwesomeIcon className={"text-dark"} icon={faRepeat} />

                                            <Link className={"text-warning"} to={"/hotels/" + e.id} ><FontAwesomeIcon icon={faCircleInfo}/> </Link>
                                            <Link  className={"text-success"} to={"/hotels/" + e.id} ><FontAwesomeIcon  icon={faCartShopping}/></Link>
                                        </Card.Body>
                                    </Card>
                                </BackSide>
                            </Flippy>
                        </Col>
                    )})}
            </Row>

        </Container>

    )
};

export default MyComponent;
