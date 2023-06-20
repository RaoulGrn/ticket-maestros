import React from 'react';

export const validateCardNumber = (cardNumber) => {

    const digitsOnly = cardNumber.replace(/\D/g, '');


    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;


    const mastercardRegex = /^5[1-5][0-9]{14}$/;


    const amexRegex = /^3[47][0-9]{13}$/;


    if (visaRegex.test(digitsOnly)) {
        return 'Visa';
    } else if (mastercardRegex.test(digitsOnly)) {
        return 'Mastercard';
    } else if (amexRegex.test(digitsOnly)) {
        return 'Amex';
    } else {
        return 'Invalid';
    }
};
export const validateCardDate = (cardDate) => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(cardDate)) {
        return false;
    }

    const [month, year] = cardDate.split('/');

    if (parseInt(month) < 1 || parseInt(month) > 12) {
        return false;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const cardYear = parseInt(year) + Math.floor(currentYear / 100) * 100; // Get the full year based on the two-digit input

    if (cardYear < currentYear || (cardYear === currentYear && parseInt(month) < currentMonth)) {
        return false;
    }

    return true;
};

export const validateCardCw = (cardCw) => {

    const visaMastercardRegex = /^\d{3}$/;
    const amexRegex = /^4{4}$/;

    if (cardCw.startsWith("3")) {
        return visaMastercardRegex.test(cardCw);
    } else if (cardCw.startsWith("4")) {
        return amexRegex.test(cardCw);
    }

    return false;
};