import React, { CSSProperties } from 'react';
import { LocationMarkerIcon } from '@heroicons/react/outline';

import { WeatherResponse } from '../../api/types/weather';
import { LocationHookData } from '../../hooks/use-location';
import useSettings from '../../hooks/use-settings';
import Spinner from '../spinner/spinner';
import {
  Panel,
  LocationArea,
  Temp,
  Degree,
  Description,
  Stats,
  WindDirection
} from './style';

type ConditionPanelProps = {
  location: LocationHookData;
  weather?: WeatherResponse;
};

const conditionThemes: Record<string, CSSProperties> = {
  clear: { backgroundColor: '#487ac8', color: '#38588b' },
  'partly-cloudy-day': { backgroundColor: '#c4e2ff', color: '#25619c' },
  cloudy: { backgroundColor: '#d1dae3', color: '#757b81' }
};

const ConditionPanel = ({ location, weather }: ConditionPanelProps) => {
  const [settings, updateSettings] = useSettings();

  if (!weather) {
    return null;
  }

  const resetLocation = () => {
    localStorage.removeItem('brightsky:position');
    updateSettings({ ...settings, location: null });
  };

  const { conditions, temp, icon, windspeed, winddir } =
    weather.currentConditions;

  const conditionStyle =
    icon in conditionThemes ? conditionThemes[icon] : conditionThemes.clear;

  return (
    <Panel style={conditionStyle}>
      <LocationArea onClick={resetLocation}>
        <LocationMarkerIcon />{' '}
        {location.isLoading ? (
          <Spinner />
        ) : location.data ? (
          location.data.name
        ) : (
          ''
        )}
      </LocationArea>
      <Temp>
        {Math.round(temp)}
        <Degree>°</Degree>
      </Temp>
      <Description>{conditions}</Description>
      <Stats>
        <div>
          {windspeed}m/s
          <WindDirection>
            <div
              title="{direction as compass bearings}"
              style={{
                transform: `rotate(${winddir}deg)`,
                lineHeight: '24px'
              }}
            >
              ↑
            </div>
          </WindDirection>
        </div>
      </Stats>
    </Panel>
  );
};
export default ConditionPanel;
