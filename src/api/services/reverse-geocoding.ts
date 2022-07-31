import axios from 'axios';
import { MapboxGeocodeResponse } from '../types/mapbox';

const API_KEY = process.env.MAPBOX_API_KEY;

export const reverseGeocodeByLatLng = async (lat: number, lng: number) => {
  const res = await axios.get<MapboxGeocodeResponse>(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`,
    { params: { access_token: API_KEY, types: 'locality,place', limit: 1 } }
  );

  if (res.data.features.length === 0) {
    throw new Error('No results found');
  }

  return res.data.features[0].text;
};

export const reverseGeocodeByQuery = async (query: string) => {
  const res = await axios.get<MapboxGeocodeResponse>(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
    { params: { access_token: API_KEY, types: 'place' } }
  );

  return res.data;
};
