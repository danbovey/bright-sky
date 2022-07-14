import { Request, Response } from 'express';
import { isUnitGroup, unitGroups } from '../helpers/units';

import fetchHourlyForecast from '../services/fetch-hourly-forecast';

export const getHourlyForecast = async (req: Request, res: Response) => {
  const { lat, lng, unitGroup } = req.query;

  if (typeof lat === 'undefined' || typeof lng === 'undefined') {
    res.status(400).json({ error: 'lat and lng are required' });
  }

  if (typeof unitGroup !== 'undefined' && !isUnitGroup(unitGroup)) {
    res.status(400).json({
      error: `Invalid unitGroup parameter. The available groups are: ${unitGroups.join(
        ', '
      )}`
    });
    return;
  }

  let hourlyForecast;
  try {
    hourlyForecast = await fetchHourlyForecast({
      lat: Number.parseFloat(lat as string),
      lng: Number.parseFloat(lng as string),
      unitGroup
    });
  } catch (err) {
    // TODO: log error to Sentry
    console.log('forecastController', err.message);
    res.status(500).json({ error: 'Failed to fetch hourly forecast' });
    return;
  }

  res.json(hourlyForecast);
};
