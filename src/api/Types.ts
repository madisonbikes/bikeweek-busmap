/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import { z } from "zod";

const entitySchema = z.object({
  id: z.string(),
  is_deleted: z.boolean(),
  trip_update: z.string().nullable(),
  vehicle: z.object({
    trip: z.object({
      trip_id: z.string(),
      start_time: z.string(),
      start_date: z.string(),
      schedule_relationship: z.number(),
      route_id: z.string(),
      direction_id: z.number(),
    }),
    position: z.object({
      latitude: z.number(),
      longitude: z.number(),
      bearing: z.number(),
      odometer: z.number(),
      speed: z.number(),
    }),
    current_stop_sequence: z.number(),
    current_status: z.number(),
    timestamp: z.number(),
    congestion_level: z.number(),
    stop_id: z.string(),
    vehicle: z.object({
      id: z.string(),
      label: z.string(),
      license_plate: z.string(),
    }),
    occupancy_status: z.number(),
    occupancy_percentage: z.number(),
  }),
  alert: z.string().nullable(),
});

export const vehicleDataSchema = z.object({
  header: z.object({
    gtfs_realtime_version: z.string(),
    incrementality: z.number(),
    timestamp: z.number(),
  }),
  entity: entitySchema.array(),
});

export type VehicleData = z.infer<typeof vehicleDataSchema>;
export type Entity = z.infer<typeof entitySchema>;
