import * as yup from "yup";

// configurable runtime options
const configurationSchema = yup.object({
  busIds: yup.array(yup.string().required()).default([]),
  mapCenter: yup
    .object({ lat: yup.number().required(), lng: yup.number().required() })
    .default({ lat: 43.07472052243664, lng: -89.38414963667884 }),
  updateInterval: yup.number().default(10).required(),
  initialZoomLevel: yup.number().default(11.7).required(),

  // This is should be updated using cron from http://transitdata.cityofmadison.com/Vehicle/VehiclePositions.json
  busLocationUri: yup.string(),
});

export type Configuration = yup.InferType<typeof configurationSchema>;

export const getConfiguration = async (): Promise<Configuration> => {
  if (process.env.REACT_APP_CONFIGURATION) {
    const envConfig = JSON.parse(process.env.REACT_APP_CONFIGURATION);
    return configurationSchema.validate(envConfig);
  } else if (process.env.REACT_APP_CONFIGURATION_URL) {
    const urlConfig = await fetch(process.env.REACT_APP_CONFIGURATION_URL);
    if (!urlConfig.ok) {
      throw Error(`configuration resource not loaded: ${urlConfig.statusText}`);
    }
    return configurationSchema.validate(await urlConfig.json());
  } else {
    throw Error(
      "Either REACT_APP_CONFIGURATION or REACT_APP_CONFIGURATION_URL environmnet variable must be defined"
    );
  }
};
