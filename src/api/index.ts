import { Router } from 'express';

import { getLocation } from './controllers/location-controller';
import { getWeather } from './controllers/weather-controller';
// import { getHourlyForecast } from './controllers/forecast-controller';

const router = Router();

router.get('/location', getLocation);
router.get('/weather', getWeather);
// router.get('/hourly-forecast', getHourlyForecast);

export default router;
