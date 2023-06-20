import React from 'react';
import {Button} from "react-bootstrap";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import BasicSearch from "../basicSearch/BasicSearch.jsx";
import CarouselMain from "../CarouselMain/CarouselMain.jsx"; // theme css file
import "./Header.css"
const MyComponent = (type) => {


    return (
        <div className="headz d-flex justify-content-center">
            <div className="container m-2 mb-3">

                <CarouselMain></CarouselMain>
            </div>
        </div>
    );
};

export default MyComponent;
