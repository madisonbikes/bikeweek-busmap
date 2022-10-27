import { z } from "zod";

// configurable runtime options
const configurationSchema = z.object({
  busIds: z.array(z.string()).default([]),
  mapCenter: z
    .object({ lat: z.number(), lng: z.number() })
    .default({ lat: 43.07472052243664, lng: -89.38414963667884 }),
  updateInterval: z.number().default(10),
  initialZoomLevel: z.number().default(11.7),

  // This is should be updated using cron from http://transitdata.cityofmadison.com/Vehicle/VehiclePositions.json
  busLocationUri: z.string().optional(),
});

export type Configuration = z.infer<typeof configurationSchema>;

export const getConfiguration = async (): Promise<Configuration> => {
  if (process.env.REACT_APP_CONFIGURATION) {
    const envConfig = JSON.parse(process.env.REACT_APP_CONFIGURATION);
    return configurationSchema.parseAsync(envConfig);
  } else if (process.env.REACT_APP_CONFIGURATION_URL) {
    const urlConfig = await fetch(process.env.REACT_APP_CONFIGURATION_URL);
    if (!urlConfig.ok) {
      throw Error(`configuration resource not loaded: ${urlConfig.statusText}`);
    }
    return configurationSchema.parseAsync(urlConfig.json());
  } else {
    throw Error(
      "Either REACT_APP_CONFIGURATION or REACT_APP_CONFIGURATION_URL environmnet variable must be defined"
    );
  }
};
