/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import React, {useEffect, useState} from 'react'
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import axios from "axios";
import {Entity} from "./VehicleTypes";
import {SimpleScheduler} from "./simple_scheduler";
import {BUS_IDS, BUS_LOCATIONS, MAPS_CENTER, MAPS_CONTAINER_STYLE, MAPS_ZOOM_LEVEL, UPDATE_INTERVAL} from "./Constants";

export default function MapComponent(): JSX.Element {
    const [buses, setBuses] = useState<Entity[] | undefined>(undefined)

    async function loadBuses() {
        const response = await axios.get(BUS_LOCATIONS);
        const data: Entity[] = response.data.entity;
        if (data) {
            return data.filter((bus) => {
                const id = bus.vehicle.vehicle.id
                return BUS_IDS.includes(Number(id))
            })
        }
        return undefined
    }

    useEffect(() => {
        const scheduler = new SimpleScheduler()
        // use flag to avoid setting state if component unmounts (unlikely)
        let abort = false;

        const cancel = scheduler.scheduleRepeat(async () => {
            console.log("loading buses")
            const buses = await loadBuses()
            if (!abort) {
                setBuses(buses)
            }
        }, UPDATE_INTERVAL, 0)

        // cleanup aborts load
        return () => {
            cancel.cancel()
            abort = true;
        };
    }, [])

    if (!buses) return <></>

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY!}
        >
            <GoogleMap
                mapContainerStyle={MAPS_CONTAINER_STYLE}
                center={MAPS_CENTER}
                zoom={MAPS_ZOOM_LEVEL}
            >
                { /* Child components, such as markers, info windows, etc. */}
                {buses.map((m) => {
                    return <Marker key={m.id}
                                   position={{lat: m.vehicle.position.latitude, lng: m.vehicle.position.longitude}}
                                   icon="bus.png"/>
                })}
            </GoogleMap>
        </LoadScript>
    )
}
