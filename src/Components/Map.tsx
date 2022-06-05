/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import { GoogleMap } from "@react-google-maps/api";
import { BusMarker } from "./BusMarker";
import { Configuration } from "../Configuration";
import { MAPS_CONTAINER_STYLE } from "../Constants";
import { Entity } from "../VehicleTypes";

type Props = {
  configuration: Configuration;
  buses: Entity[];
  selectedBus: Entity | undefined;
  setSelectedBus: (bus: Entity | undefined) => void;
};

export function Map({
  configuration,
  buses,
  selectedBus,
  setSelectedBus,
}: Props) {
  return (
    <GoogleMap
      id="bikeweek-busmap"
      mapContainerStyle={MAPS_CONTAINER_STYLE}
      center={configuration.mapCenter}
      zoom={configuration.initialZoomLevel}
      onClick={() => {
        setSelectedBus(undefined);
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {buses.map((bus) => {
        return (
          <BusMarker
            key={bus.id}
            bus={bus}
            selectedBus={selectedBus}
            setSelectedBus={setSelectedBus}
          />
        );
      })}
    </GoogleMap>
  );
}
