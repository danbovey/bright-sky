import React from 'react';
import { Link } from 'react-router-dom';
import { format, fromUnixTime, getUnixTime } from 'date-fns';

import {
  HourlyForecastArea,
  HourlyForecastRow,
  ForecastItem,
  ForecastTime,
  ForecastTemp,
  HourlyForecastHeader
} from './style';
import { DayForecast } from '../../api/types/weather';

type ForecastProps = {
  hourlyForecast: DayForecast['hours'];
};

const Forecast = ({ hourlyForecast }: ForecastProps) => {
  const now = new Date();
  now.setUTCHours(new Date().getUTCHours(), 0, 0);

  const futureHours = hourlyForecast.slice(
    hourlyForecast.findIndex(h => h.datetimeEpoch === getUnixTime(now))
  );

  return (
    <HourlyForecastArea>
      <HourlyForecastHeader>
        <h6>Today</h6>
        <Link to="/forecast">Next 7 days</Link>
      </HourlyForecastHeader>
      <HourlyForecastRow>
        {futureHours.slice(0, 12).map(hour => (
          <ForecastItem key={hour.datetimeEpoch}>
            <ForecastTime>
              {format(fromUnixTime(hour.datetimeEpoch), 'hh aa')}
            </ForecastTime>
            <img
              src={`/assets/condition-icons/${hour.icon}.svg`}
              alt={hour.icon}
            />
            <ForecastTemp>{Math.round(hour.temp)}°</ForecastTemp>
          </ForecastItem>
        ))}
      </HourlyForecastRow>
    </HourlyForecastArea>
  );
};

export default Forecast;
