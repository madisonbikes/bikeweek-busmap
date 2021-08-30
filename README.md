# Madison Bike Week Bus Map

React app the loads the Madison Metro bus status (nominally
from http://transitdata.cityofmadison.com/Vehicle/VehiclePositions.json) and shows where our bus week ad buses are.

## Running/Building

You need to include your Google Maps API key in and .env file like so:

```
REACT_APP_MAPS_API_KEY=<insert key here>
```

The current configuration for the `npm run build` step assumes a deployment location
at https://madisonbikes.org/bikeweek-busmap/. You can modify this by modifying the homepage in `package.json`.

To avoid CORS restrictions that prevent React App's from loading remote resources, the bus data is loaded
from https://madisonbikes.org/MadisonMetroVehiclePositions.json, which is updated on the server with a cron job running
every 5 minutes.