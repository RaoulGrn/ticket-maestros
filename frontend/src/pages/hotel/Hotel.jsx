import {useEffect, useState} from 'react';
import Navbar from "../../components/navbar/Navbar.jsx";
import { useParams} from "react-router-dom";
import axios from "axios";
import {Button, Card, Carousel, Image} from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {faHashtag, faInfo, faLink, faMap, faMusic, faTag, faTicket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./Hotel.css"
import MediaPlayer from "../../components/mediaPlayer/MediaPlayer.jsx";
import LocationMap from "../../components/locationMap/LocationMap.jsx";
import SeatmapModal from "../../components/modals/SeatmapModal.jsx";


const MyComponent = () => {

    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const { id } = useParams();
    const [venues, setVenues] = useState({});
    const [generatedText, setGeneratedText] = useState('');
    const [displayedText, setDisplayedText] = useState('');
    const [attractionName, setAttractionName] = useState('')

    useEffect(() => {
        setDisplayedText('');
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
            if (currentIndex >= generatedText.length) {
                clearInterval(typingInterval);
                return;
            }

            setDisplayedText((prevText) => prevText + generatedText[currentIndex]);
            currentIndex++;
        }, 10);

        return () => {
            clearInterval(typingInterval);
        };
    }, [generatedText]);

    useEffect(() => {
        getEventById();
    }, []);

    const getEventById = async () => {
        try {
            const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=nRQZQONjFLeDkVC7lxE0fNvSPCEGw0n3&locale=*`);
            setVenues(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async (type) => {
        try {
            let message = "";

            if (type === 'name') {
                message = `Hello, I would like to know more about this attraction: ${venues.name}`;
            } else if (type === 'location') {
                message = `Hello, I would like to know more about this location: ${venues._embedded.venues[0].name}`;
            } else if (type === 'city') {
                message = `Hello, I would like to know more about this city: ${venues._embedded.venues[0].city.name}`;
            }

            const apiKey = "OPEN_API_KEY"; // Replace with your OpenAI API key

            const response = await axios.post(
                'https://api.openai.com/v1/completions',
                {
                    "model": "text-davinci-003",
                    "prompt": `Please answer as if you are a virtual assistant for a ticket sale website. REMEMBER TO WATCH OUT FOR GRAMMAR. USER prompt will be this: ${message}`,
                    "temperature": 1,
                    "max_tokens": 256,
                    "top_p": 1,
                    "frequency_penalty": 0,
                    "presence_penalty": 0
                },
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );


            const generatedText = response.data.choices[0].text;
            setGeneratedText(generatedText);
            console.log(generatedText);
            console.log(message)
        } catch (error) {
            console.error(error);
        }
    };





    const handleAttractionClick = () => {
        fetchData('name');
    };

    const handleLocationClick = () => {
        fetchData('location');
    };

    const handleCityClick = () => {
        fetchData('city');
    };

    return (
        <div>
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <div className="w-100 p-5 d-flex carousel-container">
                <Carousel className="carousel-inner justify-content-center w-100 " pause={true} indicators={false} interval={null}>
                    {venues._embedded &&
                        venues._embedded.attractions.map((el) => (
                            <Carousel.Item className="content text-white  mt-2" key={el.id}>
                                <Card
                                    className="content border-dark"
                                    style={{
                                        width: '80%',
                                        height: '80%',
                                        left: '10%',

                                        backgroundImage: 'linear-gradient(#343a40, #0c0c0c)',
                                        borderRadius: '25px',


                                    }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={el.images[6].url}
                                        style={{ borderRadius: '25px' }}
                                        className={'w-100 img-fluid '}
                                    />
                                    <Card.Body className="m-4 ">
                                        <Card.Title className={'text-warning p-2 fs-2'}>{el.name}</Card.Title>
                                        <Card.Text className="d-flex justify-content-between">
                                            <div>
                                                <FontAwesomeIcon className={'text-success'} icon={faTicket} />
                                                <span className={'text-white m-2'}>{venues.accessibility.ticketLimit}</span>
                                            </div>
                                            <div>
                                                <FontAwesomeIcon className={'text-success'} icon={faHashtag} />
                                                <span className={'text-white m-2'}>{el.classifications[0].segment.name}</span>
                                            </div>
                                            <div>
                                                <FontAwesomeIcon className={'text-success'} icon={faTag} />
                                                <span className={'text-white m-2'}>{el.classifications[0].genre.name}</span>
                                            </div>
                                            <div>
                                                <FontAwesomeIcon
                                                    className={'text-success'}
                                                    onClick={() => setModalShow(true)}
                                                    icon={faTag}
                                                />
                                                <span className={'text-white m-2'}>Seat Map Here</span>
                                            </div>
                                            <SeatmapModal
                                                show={modalShow}
                                                handleClose={handleClose}
                                                seatMap={venues.seatmap.staticUrl}
                                            />
                                        </Card.Text>
                                        <div className={'d-flex btn-container justify-content-around p-3'}>
                                            <Button
                                                className={'bg-success border-dark'}
                                                onClick={handleAttractionClick}
                                            >
                                                Fetch Attraction Info
                                            </Button>
                                            <Button
                                                className={'bg-success border-dark'}
                                                onClick={handleLocationClick}

                                            >
                                                Fetch Location Info
                                            </Button>
                                            <Button
                                                className={'bg-success border-dark'}
                                                onClick={handleCityClick}
                                            >
                                                Fetch City Info
                                            </Button>
                                        </div>
                                        {generatedText && (
                                            <div className="generated-text text-success p-3">
                                                <p>{displayedText}</p>
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                        ))}
                </Carousel>
            </div>
        </div>
    );
};

export default MyComponent;