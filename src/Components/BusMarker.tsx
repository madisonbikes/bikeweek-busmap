import { Entity } from "../VehicleTypes";
import routes from "../data/routes.json";
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

type BusMarkerProps = {
  bus: Entity;
  selectedBus: Entity | undefined;
  setSelectedBus: (bus: Entity | undefined) => void;
};

export const BusMarker = ({
  bus,
  selectedBus,
  setSelectedBus,
}: BusMarkerProps) => {
  const busColor = lookupRouteColor(bus);

  return (
    <>
      {bus.id === selectedBus?.id && (
        <BusInfoWindow bus={bus} setSelectedBus={setSelectedBus} />
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
        onClick={() => setSelectedBus(bus)}
      />
    </>
  );
};

type BusInfoWindowProps = {
  bus: Entity;
  setSelectedBus: (bus: Entity | undefined) => void;
};

const BusInfoWindow = ({ bus, setSelectedBus }: BusInfoWindowProps) => {
  const routeLabel = lookupRouteLabel(bus);
  const routeServiceName = lookupRouteServiceName(bus);
  return (
    <InfoWindow
      options={{ pixelOffset: new google.maps.Size(-5, -5) }}
      position={{
        lat: bus.vehicle.position.latitude,
        lng: bus.vehicle.position.longitude,
      }}
      onCloseClick={() => setSelectedBus(bus)}
    >
      <div>
        {routeLabel && (
          <>
            <b>Route {lookupRouteLabel(bus)}</b>
          </>
        )}
        <br />
        Bus #{bus.vehicle.vehicle.label}
        {routeServiceName && (
          <>
            <br />
            {routeServiceName}
          </>
        )}
      </div>
    </InfoWindow>
  );
};
