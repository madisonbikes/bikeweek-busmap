import { Configuration } from "../Configuration";
import routes from "../data/routes.json";
import { Entity, VehicleData, vehicleDataSchema } from "./Types";
import devBusData from "../data/test/VehiclePositions.json";
import { z } from "zod";

export const lookupRoute = (bus: Entity) => {
  return routes.find(
    (value) => value.route_id.toString() === bus.vehicle.trip.route_id
  );
};

export const lookupRouteLabel = (bus: Entity) => {
  return lookupRoute(bus)?.route_short_name;
};

export const lookupRouteColor = (bus: Entity) => {
  const color = lookupRoute(bus)?.route_color;
  if (!color) return "blue";
  else return `#${color}`;
};

export const lookupRouteServiceName = (bus: Entity) => {
  return lookupRoute(bus)?.route_service_name;
};

const labelSchema = z.string();

export const loadBuses = async (
  configuration: Configuration
): Promise<Entity[] | undefined> => {
  let data: VehicleData;
  if (!configuration) return undefined;

  if (!configuration.busLocationUri) {
    console.log("loading bus data from static development source");
    data = vehicleDataSchema.parse(devBusData);
  } else {
    console.log(`loading bus data from ${configuration.busLocationUri}`);
    const response = await fetch(configuration.busLocationUri, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw Error(`error loading response: ${response.statusText}`);
    }
    data = await vehicleDataSchema.parseAsync(response.json());
  }
  if (data) {
    return data.entity.filter((value) => {
      const id = labelSchema.parse(value.vehicle.vehicle.label);
      return configuration.busIds.includes(id);
    });
  }
  return undefined;
};
