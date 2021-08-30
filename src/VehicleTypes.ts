export interface VehicleData {
    header: Header;
    entity: Entity[];
}

export interface Entity {
    id:          string;
    is_deleted:  boolean;
    trip_update: null;
    vehicle:     EntityVehicle;
    alert:       null;
}

export interface EntityVehicle {
    trip:                  Trip;
    position:              Position;
    current_stop_sequence: number;
    current_status:        number;
    timestamp:             number;
    congestion_level:      number;
    stop_id:               string;
    vehicle:               VehicleVehicle;
    occupancy_status:      number;
    occupancy_percentage:  number;
}

export interface Position {
    latitude:  number;
    longitude: number;
    bearing:   number;
    odometer:  number;
    speed:     number;
}

export interface Trip {
    trip_id:               string;
    start_time:            string;
    start_date:            string;
    schedule_relationship: number;
    route_id:              string;
    direction_id:          number;
}

export interface VehicleVehicle {
    id:            string;
    label:         string;
    license_plate: string;
}

export interface Header {
    gtfs_realtime_version: string;
    incrementality:        number;
    timestamp:             number;
}
