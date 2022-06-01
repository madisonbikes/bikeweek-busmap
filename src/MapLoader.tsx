/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import { useEffect, useState } from "react";
import axios from "axios";
import { Entity } from "./VehicleTypes";
import { SimpleScheduler } from "./simple_scheduler";
import { Map } from "./Map";
import { MAP_IDS } from "./Constants";
import devBusData from "./data/VehiclePositions.json";
import { useLoadScript } from "@react-google-maps/api";
import * as yup from "yup";
import { Configuration, getConfiguration } from "./Configuration";

axios.defaults.headers.common = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

export const MapLoader = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ?? "",
    mapIds: MAP_IDS,
  });
  const [configuration, setConfiguration] = useState<Configuration | undefined>(
    undefined
  );
  const [buses, setBuses] = useState<Entity[] | undefined>(undefined);
  const [selectedBus, setSelectedBus] = useState<Entity | undefined>(undefined);

  useEffect(() => {
    const lgc = async () => {
      const c = await getConfiguration();
      console.log(`Using configuration ${JSON.stringify(c)}`);
      setConfiguration(c);
    };
    lgc();
  }, []);

  useEffect(() => {
    if (!isLoaded || !configuration) return;

    async function loadBuses() {
      let data: Entity[];
      if (!configuration) return undefined;

      if (!configuration.busLocationUri) {
        console.log("loading bus data from static development source");
        data = devBusData.entity;
      } else {
        console.log(`loading bus data from ${configuration.busLocationUri}`);
        const response = await axios.get(configuration.busLocationUri);
        data = response.data.entity;
      }
      if (data) {
        return data.filter((bus) => {
          const id = yup
            .string()
            .required()
            .validateSync(bus.vehicle.vehicle.label);
          return configuration.busIds.includes(id);
        });
      }
      return undefined;
    }

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
      configuration.updateInterval,
      0
    );

    // cleanup aborts load
    return () => {
      cancel.cancel();
      abort = true;
    };
  }, [isLoaded, configuration]);

  if (loadError) {
    console.log(loadError);
    return <></>;
  }

  if (!buses || !isLoaded || !configuration) {
    return <></>;
  }

  return (
    <Map
      configuration={configuration}
      buses={buses}
      selectedBus={selectedBus}
      handleSetSelectedBus={setSelectedBus}
    />
  );
};
