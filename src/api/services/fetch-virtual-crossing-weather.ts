import axios from 'axios';

import type { Location } from '../types/location';

const API_KEY = process.env.VIRTUAL_CROSSING_API_KEY;

const fetchWeather = async (location: Location) => {
  const { lat, lng, unitGroup } = location;

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    throw new Error('Invalid coordinates');
  }

  const res = await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lng}`,
    {
      params: {
        unitGroup,
        include: 'current,hours',
        key: API_KEY,
        contentType: 'json'
      }
    }
  );
  if (res.status !== 200) {
    throw new Error('Failed to fetch weather');
  }

  return res.data;
};

export default fetchWeather;
