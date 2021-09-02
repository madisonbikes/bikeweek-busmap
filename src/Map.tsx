/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { MAPS_CENTER, MAPS_CONTAINER_STYLE, MAPS_ZOOM_LEVEL } from "./Constants";
import React from "react";
import { Entity } from "./VehicleTypes";
import routes from "./data/routes.json"

type Props = {
  buses: Entity[];
  selectedBus: Entity | undefined;
  handleSetSelectedBus: (bus: Entity | undefined) => void;
};

function lookupRoute(bus: Entity) {
  return routes.find((value) => value.route_id.toString() === bus.vehicle.trip.route_id)
}

function lookupRouteLabel(bus: Entity) {
  return lookupRoute(bus)?.route_short_name
}

function lookupRouteColor(bus: Entity) {
  const color = lookupRoute(bus)?.route_color
  if(!color) return "blue"
  else return `#${color}`
}

export function Map({ buses, selectedBus, handleSetSelectedBus }: Props): JSX.Element {
  return (
    <GoogleMap
      mapContainerStyle={MAPS_CONTAINER_STYLE}
      center={MAPS_CENTER}
      zoom={MAPS_ZOOM_LEVEL}
      onClick={() => {
        handleSetSelectedBus(undefined);
      }}
    >
      { /* Child components, such as markers, info windows, etc. */}
      {buses.map((bus) => {
        const busColor = lookupRouteColor(bus)
        return <>
          {bus.id === selectedBus?.id &&
          <InfoWindow options={{ pixelOffset: new google.maps.Size(-5, -5) }}
                      position={{ lat: bus.vehicle.position.latitude, lng: bus.vehicle.position.longitude }}
                      onCloseClick={() => handleSetSelectedBus(bus)}>
            <div>Bus #: {bus.vehicle.vehicle.label}<br />
              Route: {lookupRouteLabel(bus)}<br />
            </div>
          </InfoWindow>
          }
          <Marker key={bus.id}
                  position={{ lat: bus.vehicle.position.latitude, lng: bus.vehicle.position.longitude }}
                  icon={{
                    path:
                      "M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z",
                    fillColor: busColor,
                    fillOpacity: 0.9,
                    scaledSize: new google.maps.Size(40, 40),
                    strokeColor: busColor,
                    strokeWeight: 2,
                    anchor: new google.maps.Point(20, 20),
                    rotation: bus.vehicle.position.bearing
                  }}
                  onClick={() => handleSetSelectedBus(bus)}
          />
        </>;
      })}
    </GoogleMap>
  );
}