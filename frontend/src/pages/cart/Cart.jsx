import React, {useEffect, useState} from 'react';
import './Cart.css'
import axios from "axios";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {validateCardCw, validateCardDate, validateCardNumber} from "../../util/PaymentValidators.jsx";


const MyComponent = () => {
    const [data,setData] = useState([]);

    const [subTotal, setSubTotal] = useState(0);
    const [total,setTotal]   = useState(10);
    const [nameCard, setNameCard] = useState("");
    const [cardNumber,setCardNumber] = useState("");
    const [cardDate, setCardDate] = useState("");
    const [cardCw, setCardCw] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [randomCode, setRandomCode] = useState('');
    const [itemCodes, setItemCodes] = useState([]);
    const cardData = {
        name: nameCard,
        number: cardNumber,
        date: cardDate,
        randomCode: randomCode
    };
    const onNameCardChange = (e) => {

       setNameCard(e.target.value);
        console.log(nameCard);
    };
    const onCardNumberChange = (e) => {
        let inputValue = e.target.value;
        const formattedValue = formatCardNumber(inputValue);

        setCardNumber(formattedValue);
        console.log(formattedValue);

        const isValidCard = validateCardNumber(inputValue);
        console.log(isValidCard);
    };

    const formatCardNumber = (cardNumber) => {

        const digitsOnly = cardNumber.replace(/\D/g, '');


        const groupedNumber = digitsOnly.match(/(\d{1,4})/g);


        const formattedNumber = groupedNumber ? groupedNumber.join(' ') : '';

        return formattedNumber;
    };

    const onCardDateChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = inputValue.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})/, '$1/');

        if (formattedValue !== inputValue) {

            e.target.value = formattedValue;
        }

        const isValidCardDate = validateCardDate(formattedValue);

        if (isValidCardDate) {
            setCardDate(formattedValue);
            console.log(cardDate);
            console.log("VALID DATE");
        } else {

            console.log("Invalid card date");
        }
    };

    const onCardCwChange = (e) => {
        const inputValue = e.target.value;
        const isValidCardCw = validateCardCw(inputValue);

        if (isValidCardCw) {
            setCardCw(inputValue);
            console.log(cardCw);
            console.log("VALID CVV")
        } else {

            console.log("Invalid card CW");
        }
    };

    const toggleSubmit = async () => {


        if (nameCard && cardNumber && cardDate && cardCw) {



            const isValidCardNumber = validateCardNumber(cardNumber);
            if (!isValidCardNumber) {
                console.log("Invalid card number");
                return;
            }


            const isValidCardDate = validateCardDate(cardDate);
            if (!isValidCardDate) {
                console.log("Invalid card date");
                return;
            }


            const isValidCardCw = validateCardCw(cardCw);
            if (!isValidCardCw) {
                console.log("Invalid card CW");
                return;
            }






            setShowModal(!showModal);
            console.log("Submitting card data:", cardData);

            const token = JSON.parse(localStorage.getItem('token')).jwt || null;
            const userId = JSON.parse(localStorage.getItem('token')).user.userId || null;

            const response = await axios.delete(`http://localhost:8080/api/cart/${userId}`,{
                headers:
                    {
                        Authorization: `Bearer ${token}`,
                    },
            });


        } else {

            console.log("Incomplete card data");

            alert("Incomplete card data")
        }
    };
    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const codeLength = 10;

        let code = '';

        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            const randomChar = characters.charAt(randomIndex);
            code += randomChar;
        }


        return code;
    };
    const closeModal = () => {
        setShowModal(false);
        window.location.reload(false);
    };
    const fetchData = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token')).jwt || null;
            const userId = JSON.parse(localStorage.getItem('token')).user.userId || null;
            console.log("THIS IS MY USERID " + userId)

            const response = await axios.get(`http://localhost:8080/api/carts/${userId}`,{
                headers:
                    {
                        Authorization: `Bearer ${token}`,
                    },
            });
            console.log(response.data);
            setData(response.data);

            let subTotalPrice = 0;
            let totalPrice = 10;
            response.data.forEach((e) => {
                subTotalPrice += parseFloat(e.priceRange);
            });
            totalPrice += subTotalPrice;

            setSubTotal(subTotalPrice.toFixed(2));
            setTotal(totalPrice.toFixed(2));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);



    return (

        <div>
            <div className="container mt-5 p-3 rounded cart mb-5">
                <div className="row no-gutters">
                    <div className="col-md-8">
                        <div className="product-details mr-2">


                                <h6 className="mb-0">Shopping cart</h6>
                                <div className="d-flex justify-content-between">
                                    <span>You have {data.length} items in your cart</span>
                                    <div className="d-flex flex-row align-items-center"><span className="text-black-50">Sort by:</span>
                                        <div className="price ml-2"><span className="mr-1">price</span><i
                                            className="fa fa-angle-down"></i></div>
                                    </div>
                                </div>
                            {data.map(e =>{


                                return(

                                    <div
                                        className="d-flex justify-content-between align-items-center  mt-4 p-2 items rounded">
                                        <div className="d-flex flex-row"><img className="rounded"
                                                                              src={e.imageUrl }
                                                                              width="40" />
                                            <div className="ml-2"><span
                                                className="font-weight-bold  m-2  d-block">{e.name}</span>
                                                <span
                                                className="spec">{e.eventHour}</span>
                                                <span
                                                    className="spec">{e.eventDate}</span>
                                                <span
                                                    className="spec">{e.street}</span>



                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center"><span
                                            className="d-block ml-5 font-weight-bold">${e.priceRange}</span><i
                                            className="fa fa-trash-o ml-3 text-black-50"></i></div>
                                    </div>
                                )})}



                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="payment-info">
                            <div className="d-flex justify-content-between align-items-center"><span className={"text-warning"} >Card details</span><FontAwesomeIcon className={"text-success"} icon={faUser}/></div>
                            <span className="type d-block mt-3 mb-1">Card type</span><label className="radio"> <input
                            type="radio" name="card" value="payment" checked/> <span><img width="30"
                                                                                         src="https://img.icons8.com/color/48/000000/mastercard.png"/></span>
                        </label>

                            <label className="radio"> <input type="radio" name="card" value="payment"/> <span><img
                                width="30" src="https://img.icons8.com/officel/48/000000/visa.png"/></span> </label>

                            <label className="radio"> <input type="radio" name="card" value="payment"/> <span><img
                                width="30" src="https://img.icons8.com/ultraviolet/48/000000/amex.png"/></span> </label>


                           
                            <div><label className="credit-card-label">Name on card</label><input type="text"
                                                                                                 className="form-control credit-inputs"
                                                                                                 placeholder="Name"  value={nameCard}
                                                                                                 onChange={onNameCardChange}/>
                            </div>
                            <div><label className="credit-card-label">Card number</label><input type="text"
                                                                                                className="form-control credit-inputs"
                                                                                                placeholder="0000 0000 0000 0000"  value={cardNumber}
                                                                                                onChange={onCardNumberChange}
                                                                                               />
                            </div>
                            <div className="row">
                                <div className="col-md-6"><label className="credit-card-label">Date</label><input
                                    type="text" className="form-control credit-inputs" placeholder="12/24" defaultValue={cardDate}
                                    onChange={onCardDateChange}/></div>
                                <div className="col-md-6"><label className="credit-card-label">CVV</label><input
                                    type="text" className="form-control credit-inputs" placeholder="342" defaultValue={cardCw}
                                    onChange={onCardCwChange}/> </div>
                            </div>

                                <div className="d-flex justify-content-between information">
                                    <span>Subtotal</span><span>${subTotal}</span></div>
                                <div className="d-flex justify-content-between information">
                                    <span>Tax</span><span>$10.00</span></div>
                                <div className="d-flex justify-content-between information">
                                    <span>Total(Incl. taxes)</span><span>${total}</span></div>
                                <button className="btn btn-success btn-block d-flex justify-content-between mt-3"
                                        type="button" onClick={toggleSubmit} ><span>Checkout<i
                                    className="fa fa-long-arrow-right ml-1"></i></span></button>

                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} className={"modalz bg-dark-50 "} onHide={closeModal}>
                <Modal.Header className={"bg-dark"} closeButton>
                    <Modal.Title className={"bg-dark text-success"}>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body className={"bg-dark text-white"}>
                    {data.map((item) => (
                        <div key={item.id}>
                            <p>
                                <strong>Item:</strong> {item.name}
                                <br />
                                <strong>Code:</strong> {generateRandomCode()}
                            </p>
                            <hr className="my-3" />
                        </div>
                    ))}
                    <p>Save them and do not share them until the event, where you will be asked to show them upon entry.</p>
                </Modal.Body>
                <Modal.Footer className={"bg-dark"}>
                    <Button variant="secondary bg-dark border-success" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MyComponent;
