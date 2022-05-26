import { Entity } from "./VehicleTypes";
import routes from "./data/routes.json";
import { InfoWindow, Marker } from "@react-google-maps/api";

const lookupRoute = (bus: Entity) => {
  return routes.find(
    (value) => value.route_id.toString() === bus.vehicle.trip.route_id
  );
};

const lookupRouteLabel = (bus: Entity) => {
  return lookupRoute(bus)?.route_short_name;
};

const lookupRouteColor = (bus: Entity) => {
  const color = lookupRoute(bus)?.route_color;
  if (!color) return "blue";
  else return `#${color}`;
};

const lookupRouteServiceName = (bus: Entity) => {
  return lookupRoute(bus)?.route_service_name;
};

type Props = {
  bus: Entity;
  selectedBus: Entity | undefined;
  handleSetSelectedBus: (bus: Entity | undefined) => void;
};

export const BusMarker = ({
  bus,
  selectedBus,
  handleSetSelectedBus,
}: Props) => {
  const busColor = lookupRouteColor(bus);
  return (
    <>
      {bus.id === selectedBus?.id && (
        <InfoWindow
          options={{ pixelOffset: new google.maps.Size(-5, -5) }}
          position={{
            lat: bus.vehicle.position.latitude,
            lng: bus.vehicle.position.longitude,
          }}
          onCloseClick={() => handleSetSelectedBus(bus)}
        >
          <div>
            Bus #: {bus.vehicle.vehicle.label}
            <br />
            Route: {lookupRouteLabel(bus)}
            <br />
            {lookupRouteServiceName(bus)}
          </div>
        </InfoWindow>
      )}
      <Marker
        position={{
          lat: bus.vehicle.position.latitude,
          lng: bus.vehicle.position.longitude,
        }}
        icon={{
          path: "M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z",
          fillColor: busColor,
          fillOpacity: 0.9,
          scaledSize: new google.maps.Size(40, 40),
          strokeColor: busColor,
          strokeWeight: 2,
          anchor: new google.maps.Point(20, 20),
          rotation: bus.vehicle.position.bearing,
        }}
        onClick={() => handleSetSelectedBus(bus)}
      />
    </>
  );
};
