import React, {useEffect, useState} from 'react';
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays, faHotel, faPerson, faSearch} from "@fortawesome/free-solid-svg-icons";
import {format} from "date-fns";
import {DateRange} from "react-date-range";
import './BasicSearch.css'

const MyComponent = ({setCityName,venues,setStartDateTime,setEndDateTime}) => {

    const [openDate,setOpenDate] = useState(false);

    const [date, setDate] = useState(
        [{
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }]
    );

    const [allCityNames,setAllCityNames] = useState([]);

    useEffect(() => {
        const set1 = new Set();
        if (venues.length > 0) {
            for(let i = 0; i <venues.length; i++) {
            set1.add(venues[i]._embedded.venues[0].city.name);
            }
        }
        setAllCityNames(Array.from(set1));
    }, [venues]);

    return (
        <>
            <div className="search-container m-5 p-4 border border-dark border-1 d-flex align-items-center text-success justify-content-sm-evenly pe-1 rounded-1 ">
                <div className="d-flex align-items-center gap-1">
                    <InputGroup  >
                        <InputGroup.Text className={"bg-dark border-success "} id="basic-addon1"><FontAwesomeIcon icon={faHotel} className={"text-success"} /></InputGroup.Text>
                        <FormControl className={"bg-dark text-success border-dark"} placeholder="Search by City" type="text" onChange={(e) => setCityName(e.target.value)}>
                        </FormControl>
                    </InputGroup>
                    <InputGroup.Text className={"bg-dark border-success"} id="basic-addon1"><FontAwesomeIcon icon={faSearch} className={"text-success"} /></InputGroup.Text>

                    <Form.Select className={"bg-dark text-success border-dark"}  aria-label="Select a city"  onChange={(e) => setCityName(e.target.value)}>
                        <option >Open this select menu</option>
                        {allCityNames.map((city, index) => (
                            <option key={index} defaultValue={city}>{city}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <button className={"bg-success m-3"} onClick={() => setOpenDate((prevState)=>!prevState)}>
                        <FontAwesomeIcon icon={faCalendarDays} />
                    </button>
                    <span className="headerSearchText">{format(date[0].startDate,"MM/dd/yyyy")} to {format(date[0].endDate,"MM/dd/yyyy")}</span>
                </div>

                <div>
                    <button className={"w-100 bg-success"}  onClick={() =>  {
                        setStartDateTime(format(date[0].startDate,"yyyy-MM-dd")+"T08:00:00Z")
                        setEndDateTime(format(date[0].endDate,"yyyy-MM-dd") + "T01:00:00Z")
                        console.log(format(date[0].startDate,"yyyy-MM-dd"),format(date[0].endDate,"yyyy-MM-dd"))}}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>
            </div>
            {openDate && <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="open-date bg-light"
                rangeColors = "#343a40"
                color={"#343a40"}


            >
            </DateRange>}
        </>
    );
};

export default MyComponent;