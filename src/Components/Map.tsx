/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import { BusMarker } from "./BusMarker";
import { Configuration } from "../Configuration";
import { Entity } from "../data/VehicleTypes";
import { MapContainer, TileLayer } from "react-leaflet";

type Props = {
  configuration: Configuration;
  buses: Entity[];
};

export const Map = ({ configuration, buses }: Props) => {
  return (
    <MapContainer
      id="bikeweek-busmap"
      center={configuration.mapCenter}
      zoom={configuration.initialZoomLevel}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Child components, such as markers, info windows, etc. */}
      {buses.map((bus) => {
        return <BusMarker key={bus.id} bus={bus} />;
      })}
    </MapContainer>
  );
};
