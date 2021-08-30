/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

/* Update these BUS IDS to reflect the buses you want to track */
export const BUS_IDS = [1904, 12, 129]

/* This is should be updated using cron from http://transitdata.cityofmadison.com/Vehicle/VehiclePositions.json */
export const BUS_LOCATIONS = "/MadisonMetroVehiclePositions.json"

/** update the locations every 10 seconds */
export const UPDATE_INTERVAL = 10000

/** center of map location coordinates */
export const MAPS_CENTER = {lat: 43.07472052243664, lng: -89.38414963667884};

/** initial zoom level */
export const MAPS_ZOOM_LEVEL = 12

export const MAPS_CONTAINER_STYLE = {
    width: '800px',
    height: '600px'
};
