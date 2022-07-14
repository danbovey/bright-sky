import { Request, Response } from 'express';
import { isUnitGroup, unitGroups } from '../helpers/units';

import fetchWeather from '../services/fetch-virtual-crossing-weather';

export const getWeather = async (req: Request, res: Response) => {
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

  let weather;
  try {
    weather = await fetchWeather({
      lat: Number.parseFloat(lat as string),
      lng: Number.parseFloat(lng as string),
      unitGroup: unitGroup || 'uk'
    });
  } catch (err) {
    // TODO: log error to Sentry
    console.log('weatherController', err.message);
    res.status(500).json({ error: 'Failed to fetch weather' });
    return;
  }

  res.json(weather);
};
