import { useQuery, useQueryClient } from 'react-query';

import { Settings } from './use-settings';

const getCurrentPosition = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true
    });
  });

const getPosition = async () => {
  const cache = localStorage.getItem('brightsky:position');
  if (cache) {
    return JSON.parse(cache) as GeolocationCoordinates;
  }

  // const hasPermission = await navigator.permissions.query({
  //   name: 'geolocation'
  // });
  // if (hasPermission.state === 'denied') {
  //   throw new Error('denied');
  // }
  // if (hasPermission.state === 'prompt') {
  //   throw new Error('prompt');
  // }

  const position = await getCurrentPosition();

  // TODO: We may want to store this using our own types i.e. BrightSkyLocation
  localStorage.setItem(
    'brightsky:position',
    JSON.stringify({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  );

  return position.coords;
};

const useGeolocationPosition = (settings: Settings) =>
  useQuery<GeolocationCoordinates, Error>('position', getPosition, {
    enabled: settings.location === 'current',
    refetchOnWindowFocus: false
  });

export const fetchGeolocationPosition = () => {
  const queryClient = useQueryClient();
  return queryClient.fetchQuery('position', getPosition);
};

export default useGeolocationPosition;
