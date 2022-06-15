import routes from "./routes.json";
import { Entity } from "./VehicleTypes";

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
