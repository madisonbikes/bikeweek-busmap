import { Entity } from "../api/Types";
import { Marker, Popup } from "react-leaflet";
import { DivIcon } from "leaflet";
import busImage from "../images/bus.png";
import { lookupRouteLabel, lookupRouteServiceName } from "../api/Vehicles";

type BusMarkerProps = {
  bus: Entity;
};

export const BusMarker = ({ bus }: BusMarkerProps) => {
  const bearing = bus.vehicle.position.bearing;

  // bearing 0 is north, the bus icon is oriented facing east by default
  const transformedBearing = bearing - 90;

  const icon = new DivIcon({
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    className: "div-icon",
    html: `<img 
    id="busicon"
    style="transform: rotate(${transformedBearing}deg);"
    height="20"
    width="20"
    src="${busImage}">`,
  });

  return (
    <>
      <Marker
        position={{
          lat: bus.vehicle.position.latitude,
          lng: bus.vehicle.position.longitude,
        }}
        icon={icon}
      >
        <BusInfoWindow bus={bus} />
      </Marker>
    </>
  );
};

type BusInfoWindowProps = {
  bus: Entity;
};

const BusInfoWindow = ({ bus }: BusInfoWindowProps) => {
  const routeLabel = lookupRouteLabel(bus);
  const routeServiceName = lookupRouteServiceName(bus);
  return (
    <Popup>
      <div id="bus-marker">
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
    </Popup>
  );
};
