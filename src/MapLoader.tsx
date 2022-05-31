/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import { useEffect, useState } from "react";
import axios from "axios";
import { Entity } from "./VehicleTypes";
import { SimpleScheduler } from "./simple_scheduler";
import {
  BUS_IDS,
  BUS_LOCATIONS,
  MAPS_MAP_ID,
  UPDATE_INTERVAL,
} from "./Constants";
import { Map } from "./Map";
import devBusData from "./data/VehiclePositions.json";
import { useLoadScript } from "@react-google-maps/api";

axios.defaults.headers.common = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

export const MapLoader = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ?? "",
    mapIds: [MAPS_MAP_ID],
  });

  const [buses, setBuses] = useState<Entity[] | undefined>(undefined);
  const [selectedBus, setSelectedBus] = useState<Entity | undefined>(undefined);

  async function loadBuses() {
    let data: Entity[];

    if (!BUS_LOCATIONS) {
      console.log("loading bus data from static development source");
      data = devBusData.entity;
    } else {
      console.log(`loading bus data from ${BUS_LOCATIONS}`);
      const response = await axios.get(BUS_LOCATIONS);
      data = response.data.entity;
    }
    if (data) {
      return data.filter((bus) => {
        const id = bus.vehicle.vehicle.label;
        return BUS_IDS.includes(id);
      });
    }
    return undefined;
  }

  useEffect(() => {
    if (!isLoaded) return;

    const scheduler = new SimpleScheduler();
    // use flag to avoid setting state if component unmounts (unlikely)
    let abort = false;

    const cancel = scheduler.scheduleRepeat(
      async () => {
        const buses = await loadBuses();
        if (!abort) {
          console.log(`loaded position data for ${buses?.length} buses`);
          setBuses(buses);
        }
      },
      UPDATE_INTERVAL,
      0
    );

    // cleanup aborts load
    return () => {
      cancel.cancel();
      abort = true;
    };
  }, [isLoaded]);

  if (loadError) {
    console.log(loadError);
    return <></>;
  }

  if (!buses || !isLoaded) {
    return <></>;
  }

  return (
    <Map
      buses={buses}
      selectedBus={selectedBus}
      handleSetSelectedBus={setSelectedBus}
    />
  );
};
