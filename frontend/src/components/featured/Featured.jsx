import {useEffect, useState} from 'react';
import axios from 'axios';


import "./Featured.css"
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Pagination from "../pagination/Pagination.jsx";
import BasicSearch from "../basicSearch/BasicSearch.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import {
    faCalendarDays, faCartShopping,
    faChild, faCircleInfo,
    faCity, faClock, faClockRotateLeft, faDollarSign,
    faEarthAmerica,
    faFlagUsa, faHeart,
    faLocationDot, faMailBulk, faMapPin, faRectangleAd, faRepeat, faStreetView, faTicket
} from "@fortawesome/free-solid-svg-icons";
import Favorites from "../../pages/Favorites/Favorites.jsx";
import {AuthContextProvider, useAuthContext} from "../../util/AuthContext.jsx";
const Featured = () => {

    const [venues,setVenues] = useState([]);
    const [cityName,setCityName] = useState("");
    const [pageNumber,setPageNumber] = useState(1);
    const [startDateTime,setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    let api_events = `https://app.ticketmaster.com/discovery/v2/events?apikey=nRQZQONjFLeDkVC7lxE0fNvSPCEGw0n3&locale=*&page=${pageNumber}&city=${cityName}&startDateTime=${startDateTime}&endDateTime=${endDateTime}`;
    const [totalPages,setTotalPages] = useState(0);
    const [fav, setFav] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);







    const toggleCart = async(index) => {
        const token = JSON.parse(localStorage.getItem('token')).jwt || null;
        const userId = JSON.parse(localStorage.getItem('token')).user.userId || null;

        const updatedCart = [...cartItems]
        updatedCart[index] = !updatedCart[index];
        setCart(updatedCart);

        const updatedCartItems = [...cartItems];

        if (updatedCart[index]) {

            await axios.post(
                `http://localhost:8080/api/cart/${userId}`,
                {
                    name: venues[index].name,
                    location: venues[index]._embedded.venues[0].name,
                    eventHour: venues[index].dates.start.localTime,
                    eventDate: venues[index].dates.start.localDate,
                    city: venues[index]._embedded.venues[0].city.name,
                    state:
                        venues[index]._embedded.venues[0].state !== undefined
                            ? venues[index]._embedded.venues[0].state.name
                            : 'unavailable',
                    country: venues[index]._embedded.venues[0].country.name,
                    street: venues[index]._embedded.venues[0].address.line1,
                    priceRange:
                        venues[index].priceRanges !== undefined
                            ? venues[index].priceRanges[0].min
                            : 0 - venues[index].priceRanges !== undefined
                                ? venues[index].priceRanges[0].max
                                : 0,
                    postalCode: venues[index]._embedded.venues[0].postalCode,
                    promoter: venues[index].promoter.name,
                    eventType: venues[index].type,
                    attraction:
                        venues[index]._embedded.attractions !== undefined
                            ? venues[index]._embedded.attractions[0].name
                            : 'unavailable',
                    upcomingEvents: venues[index]._embedded.venues[0].upcomingEvents._total,
                    child:
                        venues[index].ageRestrictions !== undefined &&
                        venues[index].ageRestrictions.legalAgeEnforced
                            ? true
                            : false,
                    imageUrl:
                        venues[index].images && venues[index].images[6] !== undefined
                            ? venues[index].images[0].url
                            : 'https://png.pngitem.com/pimgs/s/287-2876527_uncle-mike-s-qd115-ns-circle-hd-png.png',
                },
                {
                    headers:
                        {
                            Authorization: `Bearer ${token}`,
                        },
                }
            );
            updatedCartItems.push(venues[index]);
        } else {

            const cardIndex = updatedCart.findIndex((card) => card.id === venues[index].id);
            if (cardIndex !== -1) {
                updatedCart.splice(cardIndex, 1);
            }
        }
        setCartItems(updatedCart);
    };






    useEffect(() =>{

        fetchedData()
    },[api_events])

    const fetchedData = async () => {
        const data = await axios.get(api_events)
        setVenues(data.data._embedded.events)
        setTotalPages(data.data.page.totalPages);





    }
    const {AuthContextProvider} = useAuthContext()


    const toggleFavorite = async (index) => {



        const token = JSON.parse(localStorage.getItem('token')).jwt || null;
        const userId = JSON.parse(localStorage.getItem('token')).user.userId || null;
        console.log("I NEED THE USER ID" + " " + userId)
        const updatedFav = [...fav];
        updatedFav[index] = !updatedFav[index];
        setFav(updatedFav);
        console.log(venues[index].dates.start.localTime)

        const updatedFavorites = [...favorites]; // Use favorites instead of fav
        if (updatedFav[index]) {

            await axios.post(
                `http://localhost:8080/api/favorite/${userId}`,
                {
                    name: venues[index].name,
                    location: venues[index]._embedded.venues[0].name,
                    eventHour: venues[index].dates.start.localTime,
                    eventDate: venues[index].dates.start.localDate,
                    city: venues[index]._embedded.venues[0].city.name,
                    state:
                        venues[index]._embedded.venues[0].state !== undefined
                            ? venues[index]._embedded.venues[0].state.name
                            : 'unavailable',
                    country: venues[index]._embedded.venues[0].country.name,
                    street: venues[index]._embedded.venues[0].address.line1,
                    priceRange:
                        venues[index].priceRanges !== undefined
                            ? venues[index].priceRanges[0].min
                            : 0 - venues[index].priceRanges !== undefined
                                ? venues[index].priceRanges[0].max
                                : 0,
                    postalCode: venues[index]._embedded.venues[0].postalCode,
                    promoter: venues[index].promoter.name,
                    eventType: venues[index].type,
                    attraction:
                        venues[index]._embedded.attractions !== undefined
                            ? venues[index]._embedded.attractions[0].name
                            : 'unavailable',
                    upcomingEvents: venues[index]._embedded.venues[0].upcomingEvents._total,
                    child:
                        venues[index].ageRestrictions !== undefined &&
                        venues[index].ageRestrictions.legalAgeEnforced
                            ? true
                            : false,
                    imageUrl:
                        venues[index].images && venues[index].images[6] !== undefined
                            ? venues[index].images[0].url
                            : 'https://png.pngitem.com/pimgs/s/287-2876527_uncle-mike-s-qd115-ns-circle-hd-png.png',
                },
                {
                    headers:
                        {
                            Authorization: `Bearer ${token}`,
                        },
                }
            );
            updatedFavorites.push(venues[index]);
        } else {

            const cardIndex = updatedFavorites.findIndex((card) => card.id === venues[index].id);
            if (cardIndex !== -1) {
                updatedFavorites.splice(cardIndex, 1);
            }
        }
        setFavorites(updatedFavorites);
    };

    console.log(favorites)
    return (
        <Container  >
            <BasicSearch className={"basic"} setCityName={setCityName} venues={venues} setStartDateTime={setStartDateTime} setEndDateTime={setEndDateTime} ></BasicSearch>
            <Row className="row-1  justify-content-sm-evenly">
                {venues.map((e, index) =>{
                    return(
                        <Col md="6" sm="2" lg="3" className="p-4" key={e.id}>
                            <Flippy
                                className="flipper"
                                flipOnHover={false} // default false
                                flipOnClick={true} // default false
                                flipDirection="horizontal" // horizontal or vertical
                                 // to use toggle method like ref.current.toggle()
                                // if you pass isFlipped prop component will be controlled component.
                                // and other props, which will go to div
                                style={{ width: '300px', height: '550px', marginBottom:'200px' }} /// these are optional style, it is not necessary
                            >
                                <FrontSide className={""} >
                                    <Card className={"cardz text-white"} style={{ width: '300px', height: '550px' }}>
                                        <Card.Img variant="top" src={e.images && e.images[6] !== undefined ? e.images[0].url : "https://png.pngitem.com/pimgs/s/287-2876527_uncle-mike-s-qd115-ns-circle-hd-png.png"} />
                                        <Card.Body>
                                            <Card.Title>{e.name}</Card.Title>
                                            <br/>
                                            <Card.Text>
                                                <FontAwesomeIcon icon={faLocationDot}/> {e._embedded.venues[0].name!== undefined ? e._embedded.venues[0].name : "unavailable"}
                                                <br/>
                                                <br/>
                                                <FontAwesomeIcon icon={faClock}/> {e.dates.start.localTime}
                                                <br/>
                                                <br/>
                                                <FontAwesomeIcon icon={faCalendarDays}/> {e.dates.start.localDate}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Body className={"d-flex justify-content-between mt-3 h4"}>
                                            <FontAwesomeIcon className={"text-dark"} icon={faRepeat}/>
                                            <Link
                                                className={fav[index] ? "text-danger" : "text-primary"}
                                                onClick={() => toggleFavorite(index)}
                                            > <FontAwesomeIcon icon={faHeart}/></Link>
                                            <Link className={"text-warning"} to={"hotels/" + e.id} ><FontAwesomeIcon icon={faCircleInfo}/> </Link>
                                            <Link  className={"text-success"}   onClick={() => toggleCart(index)} ><FontAwesomeIcon  icon={faCartShopping}/></Link>
                                        </Card.Body>
                                    </Card>
                                </FrontSide>
                                <BackSide >
                                    <Card className={"backcardz text-white"} style={{ width: '300px', height: '550px' }}>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faCity} />:</strong> {e._embedded.venues[0].city.name}</ListGroup.Item>
                                        <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faEarthAmerica}/> :</strong> {e._embedded.venues[0].country.name}</ListGroup.Item>
                                        <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faFlagUsa}/> :</strong> {e._embedded.venues[0].state !== undefined ? e._embedded.venues[0].state.name : "unavailable"}</ListGroup.Item>
                                        <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faStreetView}/> :</strong> {e._embedded.venues[0].address.line1}</ListGroup.Item>
                                        <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faDollarSign}/> :</strong> {e.priceRanges !== undefined ? e.priceRanges[0].min : 0} - {e.priceRanges !== undefined ? e.priceRanges[0].max : 0}</ListGroup.Item>
                                        <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faMailBulk} />:</strong> {e._embedded.venues[0].postalCode}</ListGroup.Item>
                                        <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faRectangleAd}/> :</strong> {e.promoter !== undefined ? e.promoter.name : "unavailable"}</ListGroup.Item>
                                        <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faTicket}/> :</strong> {e.type}</ListGroup.Item>
                                        <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faMapPin}/> :</strong> {e._embedded.attractions !== undefined ? e._embedded.attractions[0].name : "unavailable"}</ListGroup.Item>
                                        <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faClockRotateLeft} />:</strong> {e._embedded.venues[0].upcomingEvents._total}</ListGroup.Item>
                                        <ListGroup.Item className={"backcardz text-white"}><strong><FontAwesomeIcon icon={faChild} />:</strong> {e.ageRestrictions !== undefined && (e.ageRestrictions.legalAgeEnforced) ? "yes" : "no"}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body className={"d-flex justify-content-between h4 p-2 mt-3"}>
                                        <FontAwesomeIcon className={"text-dark"} icon={faRepeat} />
                                        <Link
                                            className={fav[index] ? "text-danger" : "text-primary"}
                                            onClick={() => toggleFavorite(index)}
                                        > <FontAwesomeIcon icon={faHeart}/></Link>
                                        <Link className={"text-warning"} to={"hotels/" + e.id} ><FontAwesomeIcon icon={faCircleInfo}/> </Link>
                                        <Link  className={"text-success"}   onClick={() => toggleCart(index)} ><FontAwesomeIcon  icon={faCartShopping}/></Link>
                                    </Card.Body>
                                    </Card>
                                </BackSide>
                            </Flippy>
                        </Col>
                    )})}
            </Row>
            <Pagination className="paginate-2" setPageNumber={setPageNumber} totalPages = {totalPages}></Pagination>

        </Container>
    )
            }

export default Featured;