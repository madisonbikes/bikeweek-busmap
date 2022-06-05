/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import { Map } from "./Map";
import { MAP_IDS } from "../Constants";
import { useLoadScript } from "@react-google-maps/api";
import { Configuration } from "../Configuration";
import { Entity } from "../VehicleTypes";
import { useState } from "react";

type Props = {
  configuration: Configuration;
  buses: Entity[];
};

export const MapLoader = ({ configuration, buses }: Props) => {
  const [selectedBus, setSelectedBus] = useState<Entity | undefined>(undefined);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ?? "",
    mapIds: MAP_IDS,
  });

  if (!isLoaded) {
    return <></>;
  }

  if (loadError) {
    console.log(loadError);
    return <></>;
  }

  return (
    <div className="Map">
      <Map
        configuration={configuration}
        buses={buses}
        selectedBus={selectedBus}
        setSelectedBus={setSelectedBus}
      />
    </div>
  );
};
