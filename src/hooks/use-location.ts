import { useQuery, UseQueryResult } from 'react-query';

import { isMapboxFeature } from '../api/types/mapbox';
import useGeolocationPosition from './use-geolocation-position';
import { Settings } from './use-settings';

export type LocationResult = {
  lat: number;
  lng: number;
  name: string;
};

const getLocation = async (coords: LocationResult): Promise<LocationResult> => {
  const location = await fetch(
    `/api/location?lat=${coords.lat}&lng=${coords.lng}`
  ).then(res => res.json());

  return { lat: coords.lat, lng: coords.lng, name: location.name };
};

const useLocation = (settings: Settings) => {
  const position = useGeolocationPosition(settings);

  const coords: LocationResult = { lat: 0, lng: 0, name: '' };
  let enabled = false;
  if (settings.location === 'current' && position.data) {
    coords.lat = position.data.latitude;
    coords.lng = position.data.longitude;
    enabled = true;
  }
  let initialData;
  if (isMapboxFeature(settings.location)) {
    // eslint-disable-next-line prefer-destructuring
    [coords.lng, coords.lat] = settings.location.center;
    initialData = {
      lat: settings.location.center[1],
      lng: settings.location.center[0],
      name: settings.location.text
    };
    enabled = true;
  }

  return useQuery<LocationResult, Error>(
    ['location', coords.lat, coords.lng],
    () => getLocation(coords),
    { enabled, refetchOnWindowFocus: false, initialData }
  );
};

export type LocationHookData = UseQueryResult<LocationResult, Error>;

export default useLocation;
