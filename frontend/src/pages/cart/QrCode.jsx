import {QRCodeCanvas} from "qrcode.react";
import React, {useRef,useEffect,useState} from 'react';
const QrCode = ({ randomCode }) => {
    const qrRef = useRef();

    const downloadQRCode = (e) => {
        e.preventDefault();
        const canvas = qrRef.current.querySelector("canvas");
        const image = canvas.toDataURL("image/png");
        const anchor = document.createElement("a");
        anchor.href = image;
        anchor.download = "qr-code.png";
        anchor.click();
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                downloadQRCode(event);
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    const qrcode = (
        <QRCodeCanvas
            id="qrCode"
            value={randomCode}
            size={300}
            bgColor={"#00ff00"}
            level={"H"}
        />
    );

    return (
        <div className="qrcode__container">
            <div ref={qrRef}>{qrcode}</div>
            <div className="input__group">
                <button type="button" onClick={downloadQRCode}>
                    Download QR code
                </button>
            </div>
        </div>
    );
};

export { QrCode };