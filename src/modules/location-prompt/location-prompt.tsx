import React from 'react';
import {
  ExclamationCircleIcon,
  StatusOnlineIcon
} from '@heroicons/react/outline';

import useSettings, { initialSettings } from '../../hooks/use-settings';
import useGeolocationPosition from '../../hooks/use-geolocation-position';
import { DangerText } from '../../components/text/text';
import Search from './search';
import { PromptOverlay, Prompt, PromptIntro, GeolocateButton } from './style';

const LocationPrompt = () => {
  const [settings, updateSettings] = useSettings();
  const location = useGeolocationPosition(settings);

  if (typeof window === 'undefined') {
    return (
      <PromptOverlay>
        <Prompt />
      </PromptOverlay>
    );
  }

  const askPermissions = () => {
    navigator.geolocation.getCurrentPosition(
      () => location.refetch(),
      () => {
        //
      },
      { enableHighAccuracy: true }
    );
  };

  if (location.isError && location.error.message === 'prompt') {
    return (
      <>
        <p>Please allow location permissions</p>
        <button type="button" onClick={askPermissions}>
          Allow location
        </button>
      </>
    );
  }

  const useCurrentLocation = () => {
    updateSettings({ ...initialSettings, ...settings, location: 'current' });
  };

  const deniedGeolocation =
    location.isError && location.error.message.indexOf('denied') > -1;

  if (settings.location === 'current' && deniedGeolocation) {
    return (
      <PromptOverlay>
        <Prompt>
          <PromptIntro>
            <DangerText>
              <ExclamationCircleIcon />
            </DangerText>
            <p>
              You have current location as your preference but have denied
              location permissions.
            </p>
            <p>
              Please allow location permissions and reload the page or
              alternatively, select a location by name.
            </p>
            <Search />
          </PromptIntro>
        </Prompt>
      </PromptOverlay>
    );
  }

  if (settings.location === null) {
    return (
      <PromptOverlay>
        <Prompt>
          <PromptIntro>
            <img
              src="/assets/logo.svg"
              width="128"
              height="128"
              alt=""
              role="presentation"
            />
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
