import React, {useEffect, useState} from 'react'
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import axios from "axios";
import {Entity} from "./VehicleTypes";
import {SimpleScheduler} from "./simple_scheduler";

const containerStyle = {
    width: '800px',
    height: '600px'
};

const center = {
    lat: 43.07472052243664, lng: -89.38414963667884
};

export default function MapComponent(): JSX.Element {
    /*
    const url = "http://transitdata.cityofmadison.com/Vehicle/VehiclePositions.json"
     */
    const [buses, setBuses] = useState<Entity[] | undefined>(undefined)

    async function loadBuses() {
        const filterIds = [1904, 12, 129]
        const response = await axios.get("/MadisonMetroVehiclePositions.json");
        const data: Entity[] = response.data.entity;
        if (data) {
            return data.filter((bus) => {
                const id = bus.vehicle.vehicle.id
                return filterIds.includes(Number(id))
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
        }, 10000, 0)

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
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
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
