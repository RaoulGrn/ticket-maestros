import React, {useState} from 'react';
import {Modal, Button, Image} from "react-bootstrap";
import "./SeatmapModal.css"
const SeatmapModal = ({ show, handleClose,seatMap }) => {
    return (
        <Modal show={show} onHide={handleClose}>

                <Image className={"bg-dark img-fluid"} style={{height:"800px", border:"1px double black"}} src={seatMap}></Image>

            <Modal.Footer className={"bg-dark text-white d-flex justify-content-center"}>
                <Button className="text-success" variant="dark" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SeatmapModal;