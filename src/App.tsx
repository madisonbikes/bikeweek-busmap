/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import "./App.css";
import { MapLoader } from "./Components/MapLoader";
import { useEffect, useState } from "react";
import axios from "axios";
import { Entity } from "./VehicleTypes";
import { scheduleRepeat } from "./utils/simple_scheduler";
import devBusData from "./data/VehiclePositions.json";
import * as yup from "yup";
import { Configuration, getConfiguration } from "./Configuration";
import { MapFooter } from "./Components/MapFooter";

axios.defaults.headers.common = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

export const App = () => {
  const [configuration, setConfiguration] = useState<Configuration | undefined>(
    undefined
  );
  const [buses, setBuses] = useState<Entity[] | undefined>(undefined);

  useEffect(() => {
    if (configuration) return;

    const lgc = async () => {
      const c = await getConfiguration();
      console.log(`Using configuration ${JSON.stringify(c)}`);
      setConfiguration(c);
    };
    // this triggers to async block above. seems weird.
    // the void is an indicator to lint that we know we're not awaiting the promise.
    void lgc();
  }, [configuration]);

  useEffect(() => {
    if (!configuration) return;

    const loadBuses = async () => {
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
    };

    // use flag to avoid setting state if component unmounts (unlikely)
    let abort = false;
    const canceller = scheduleRepeat(
      async () => {
        const buses = await loadBuses();
        if (!abort) {
          console.log(`loaded position data for ${buses?.length} buses`);
          setBuses(buses);
        }
      },
      {
        intervalInMillis: configuration.updateInterval * 1000,
        delayInMillis: 0,
      }
    );

    // cleanup aborts load
    return () => {
      canceller.cancel();
      abort = true;
    };
  }, [configuration]);

  if (!buses || !configuration) {
    return <></>;
  }

  return (
    <div className="Root">
      <div className="App">
        <h1>Bike Week 2022 Bus Map</h1>
        <MapLoader configuration={configuration} buses={buses} />
        <MapFooter configuration={configuration} />
      </div>
    </div>
  );
};
