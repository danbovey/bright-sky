import React from 'react';
import { LocationMarkerIcon } from '@heroicons/react/outline';

import { WeatherResponse } from '../../api/types/weather';
import { LocationHookData } from '../../hooks/use-location';
import useSettings from '../../hooks/use-settings';
import TemperatureGraph from '../temperature-graph/temperature-graph';
import Spinner from '../spinner/spinner';
import { getConditionTheme } from './condition-theme';
import { getConditionBackground } from './condition-background';
import {
  Panel,
  Background,
  PanelContent,
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

const ConditionPanel = ({ location, weather }: ConditionPanelProps) => {
  const [settings, updateSettings] = useSettings();

  if (!weather) {
    return null;
  }

  const resetLocation = () => {
    localStorage.removeItem('brightsky:position');
    updateSettings({ ...settings, location: null });
  };

  const { conditions, temp, windspeed, winddir } = weather.currentConditions;

  const conditionTheme = getConditionTheme(weather);
  const conditionBackground = getConditionBackground(conditionTheme.name);

  return (
    <Panel style={conditionTheme}>
      {conditionBackground && (
        <Background
          style={{
            opacity: 0.2,
            backgroundRepeat: 'repeat',
            backgroundImage: `url('/assets/condition-panel/${conditionBackground}.svg')`
          }}
        />
      )}
      <PanelContent>
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
        <TemperatureGraph weather={weather} conditionTheme={conditionTheme} />
      </PanelContent>
    </Panel>
  );
};
export default ConditionPanel;
