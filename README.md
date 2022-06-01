# Madison Bike Week Bus Map

React app the loads the Madison Metro bus status (nominally
from http://transitdata.cityofmadison.com/Vehicle/VehiclePositions.json) and shows where our bus week ad buses are. This data is expected to change minute-to-minute.

At this time, route data is manually preloaded from http://transitdata.cityofmadison.com/GTFS/mmt_gtfs.zip and must be extracted/updated periodically in the `data/routes.json` file. The data is provided in CSV, which can be converted to JSON here: https://csvjson.com/csv2json. This data changes relatively infrequently so for our purposes, once per season.

## Running/Building

You need to include your Google Maps API key in an `.env.production` file like so:

```
REACT_APP_MAPS_API_KEY=<insert key here>
```

You also need to supply either `REACT_APP_CONFIGURATION`, which accepts an inline JSON object or `REACT_APP_CONFIGURATION_URI` which takes a relative link to a JSON configuration file. The information in this file is not considered sensitive, so should be placed on your web server next to the app deployment.

Example `REACT_APP_CONFIGURATION_URI` file:

```
{"busIds": [129, 998, 1905, 149], "busLocationUri": "/MadisonMetroVehiclePositions.json"}
```

Example `REACT_APP_CONFIGURATION` environment key:

```
REACT_APP_CONFIGURATION={"busIds": ["931", "988"]}
```

The current configuration for the `npm run build` step assumes a deployment location
at https://madisonbikes.org/bikeweek-busmap/. You can modify this by modifying the homepage in `package.json`.

To avoid CORS restrictions that prevent React App's from loading remote resources, the bus data is loaded
from https://madisonbikes.org/MadisonMetroVehiclePositions.json, which is updated on the server with a cron job running
every 5 minutes.

## Customization

Look in `src/Constants.ts` and `src/Configuration.ts` for various configurable settings.
