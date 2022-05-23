# Madison Bike Week Bus Map

React app the loads the Madison Metro bus status (nominally
from http://transitdata.cityofmadison.com/Vehicle/VehiclePositions.json) and shows where our bus week ad buses are. This data is expected to change minute-to-minute.

At this time, route data is manually preloaded from http://transitdata.cityofmadison.com/GTFS/mmt_gtfs.zip and must be extracted/updated periodically in the `data/routes.json` file. The data is provided in CSV, which can be converted to JSON here: https://csvjson.com/csv2json. This data changes relatively infrequently.

## Running/Building

You need to include your Google Maps API key in an `.env.production` file like so:

```
REACT_APP_MAPS_API_KEY=<insert key here>
```

The current configuration for the `npm run build` step assumes a deployment location
at https://madisonbikes.org/bikeweek-busmap/. You can modify this by modifying the homepage in `package.json`.

To avoid CORS restrictions that prevent React App's from loading remote resources, the bus data is loaded
from https://madisonbikes.org/MadisonMetroVehiclePositions.json, which is updated on the server with a cron job running
every 5 minutes.

## Customization

Look in `src/Constants.ts` for various configurable settings.
