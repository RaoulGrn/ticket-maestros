import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAjz6MObxC21XCcxOev2TmY5jhcxtjU0ec",
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

function Map() {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

    return (

        <GoogleMap zoom={10} center={center}>
            <Marker position={center} />
        </GoogleMap>

    );
}