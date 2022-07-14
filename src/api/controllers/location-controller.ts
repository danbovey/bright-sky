import { Request, Response } from 'express';

import {
  reverseGeocodeByQuery,
  reverseGeocodeByLatLng
} from '../services/reverse-geocoding';

export const getLocation = async (req: Request, res: Response) => {
  const { lat, lng, query } = req.query;

  if (typeof query !== 'undefined') {
    if (query === '') {
      res.status(400).json({ error: 'query cannot be empty' });
      return;
    }

    const response = await reverseGeocodeByQuery(query as string);

    res.json(response.features);
    return;
  }

  if (typeof lat === 'undefined' || typeof lng === 'undefined') {
    res.status(400).json({ error: 'lat and lng are required' });
  }

  let location;
  try {
    location = await reverseGeocodeByLatLng(
      Number.parseFloat(lat as string),
      Number.parseFloat(lng as string)
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.json({ name: location });
};
