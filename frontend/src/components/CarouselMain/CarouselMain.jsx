import React from 'react';
import Navbar from "../navbar/Navbar.jsx";
import { Carousel} from "react-bootstrap";
import "./Carousel.css"

const MyComponent = () => {
    return (
        <div>
            <Carousel  className="carouselz mb-5">
                <Carousel.Item>
                    <video
                        style={{minWidth: "100%", minHeight: "100%"}}
                        playsInline
                        autoPlay
                        muted
                        loop
                    >
                        <source
                            className="h-100"
                            src="https://assets.mixkit.co/videos/preview/mixkit-people-waving-hands-at-the-concert-14104-large.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <Carousel.Caption>
                        <h3>You choose the event, we provide the rest!.
                        </h3>
                        <p>    Get rewarded for your travels - unlock instant savings of 10% or more with a free Ticket Maestro's account</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <video
                        style={{minWidth: "100%" , minHeight: "100%", borderRadius: "25px"}}
                        playsInline
                        autoPlay
                        muted
                        loop
                    >
                        <source
                            className="h-100"
                            src="https://assets.mixkit.co/videos/preview/mixkit-stage-of-an-electronic-music-festival-4188-large.mp4"
                            type="video/mp4"
                        />
                    </video>

                    <Carousel.Caption>
                        <h3>Discover the world with ease! Let Ticket Maestro be your travel companion.</h3>
                        <p>From flights to accommodations, we've got you covered. Sign up for a free account today and unlock instant savings of 10% or more on your bookings!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <video
                        style={{minWidth: "100%", minHeight: "100%", borderRadius: "25px"}}
                        playsInline
                        autoPlay
                        muted
                        loop
                    >
                        <source
                            className="h-100"
                            src="https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-nightclub-831-large.mp4"
                            type="video/mp4"
                        />
                    </video>

                    <Carousel.Caption>
                        <h3>Let Ticket Maestro enhance your journey! </h3>
                        <p> Select your desired event and leave the planning to us. Join our free Ticket Maestro's account today and embark on unforgettable adventures.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </div>
    );
};

export default MyComponent;
