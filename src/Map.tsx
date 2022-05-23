/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import { GoogleMap } from "@react-google-maps/api";
import { BusMarker } from "./BusMarker";
import {
  MAPS_CENTER,
  MAPS_CONTAINER_STYLE,
  MAPS_ZOOM_LEVEL,
} from "./Constants";
import { Entity } from "./VehicleTypes";

type Props = {
  buses: Entity[];
  selectedBus: Entity | undefined;
  handleSetSelectedBus: (bus: Entity | undefined) => void;
};

export function Map({ buses, selectedBus, handleSetSelectedBus }: Props) {
  return (
    <GoogleMap
      id="bikeweek-busmap"
      mapContainerStyle={MAPS_CONTAINER_STYLE}
      center={MAPS_CENTER}
      zoom={MAPS_ZOOM_LEVEL}
      onClick={() => {
        handleSetSelectedBus(undefined);
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {buses.map((bus) => {
        return (
          <BusMarker
            key={bus.id}
            bus={bus}
            selectedBus={selectedBus}
            handleSetSelectedBus={handleSetSelectedBus}
          />
        );
      })}
    </GoogleMap>
  );
}
