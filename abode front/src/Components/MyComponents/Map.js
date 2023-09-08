import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAytC_TusuhG7kpNQ19hMrCzXDIUjd307o",
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={props.latLng}
      zoom={18}
    >
      <Marker position={props.latLng} />
    </GoogleMap>
  ) : (
    <></>
  );
}


