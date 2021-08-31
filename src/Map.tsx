/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import {GoogleMap, Marker} from "@react-google-maps/api";
import {MAPS_CENTER, MAPS_CONTAINER_STYLE, MAPS_ZOOM_LEVEL} from "./Constants";
import React from "react";
import {Entity} from "./VehicleTypes";

type Props = {
    buses: Entity[];
};

export function Map({buses}: Props): JSX.Element {
    return (
        <GoogleMap
            mapContainerStyle={MAPS_CONTAINER_STYLE}
            center={MAPS_CENTER}
            zoom={MAPS_ZOOM_LEVEL}
        >
            { /* Child components, such as markers, info windows, etc. */}
            {buses.map((m) => {
                return <Marker key={m.id}
                               position={{lat: m.vehicle.position.latitude, lng: m.vehicle.position.longitude}}
                               icon={{
                                   path:
                                       "M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z",
                                   fillColor: "blue",
                                   fillOpacity: 0.9,
                                   scaledSize: new google.maps.Size(40,40),
                                   strokeColor: "blue",
                                   strokeWeight: 2,
                                   anchor: new google.maps.Point(20, 20),
                                   rotation: m.vehicle.position.bearing
                               }}
                />
            })}
        </GoogleMap>)
}