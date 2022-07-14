import React from 'react';
import { StatusOnlineIcon } from '@heroicons/react/outline';

import useSettings, { initialSettings } from '../../hooks/use-settings';
import useGeolocationPosition from '../../hooks/use-geolocation-position';
import Search from './search';
import { PromptOverlay, Prompt, PromptIntro, GeolocateButton } from './style';

const LocationPrompt = () => {
  const [settings, updateSettings] = useSettings();
  const location = useGeolocationPosition(settings);

  if (typeof window === 'undefined') {
    return null;
  }

  const askPermissions = () => {
    navigator.geolocation.getCurrentPosition(
      () => location.refetch(),
      () => {
        console.log('error when asking for location, handle this state!');
      },
      { enableHighAccuracy: true }
    );
  };

  if (location.isError) {
    if (location.error.message === 'prompt') {
      return (
        <>
          <p>Please allow location permissions</p>
          <button type="button" onClick={askPermissions}>
            Allow location
          </button>
        </>
      );
    }

    return <p>Some location error: {location.error.message}</p>;
  }

  const useCurrentLocation = () => {
    updateSettings({ ...initialSettings, ...settings, location: 'current' });
  };

  if (settings.location === null) {
    return (
      <PromptOverlay>
        <Prompt>
          <PromptIntro>
            <img src="/assets/logo.svg" alt="" role="presentation" />
            <h3>Welcome to Bright Sky!</h3>
            <p>
              To get started, search for your nearest town/city or use your
              current GPS location
            </p>
          </PromptIntro>
          <Search />
          <GeolocateButton type="button" onClick={useCurrentLocation}>
            <StatusOnlineIcon /> Use current location
          </GeolocateButton>
        </Prompt>
      </PromptOverlay>
    );
  }

  return null;
};

export default LocationPrompt;
