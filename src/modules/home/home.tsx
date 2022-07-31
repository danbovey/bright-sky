import React from 'react';
import { useQuery } from 'react-query';

import { WeatherResponse } from '../../api/types/weather';
import useLocation, { LocationResult } from '../../hooks/use-location';
import useSettings, { Settings } from '../../hooks/use-settings';
import Container from '../../components/container/container';
import ConditionPanel from '../../components/condition-panel/condition-panel';
import Forecast from '../../components/forecast/forecast';
import Spinner from '../../components/spinner/spinner';
import { LoadingSplash } from '../../style';

const fetchWeather = async (location?: LocationResult) => {
  if (!location) {
    throw new Error('location is not defined');
  }

  const data = await fetch(
    `/api/weather?lat=${location.lat}&lng=${location.lng}`
  )
    .catch(res => {
      if (res.status !== 200) {
        throw new Error('Failed to fetch weather');
      }

      return res;
    })
    .then(res => res.json());

  return data;
};

const useWeather = (settings: Settings, location?: LocationResult) =>
  useQuery<WeatherResponse, Error>('weather', () => fetchWeather(location), {
    enabled: !!location,
    refetchOnWindowFocus: false
  });

const Home = () => {
  const [settings] = useSettings();
  const location = useLocation(settings);
  const weather = useWeather(settings, location.data);

  return (
    <Container>
      {!!settings.location && (weather.isIdle || weather.isLoading) && (
        <LoadingSplash>
          <Spinner />
        </LoadingSplash>
      )}
      <ConditionPanel location={location} weather={weather.data} />
      {weather.isSuccess && weather.data.days.length > 0 && (
        <Forecast
          hourlyForecast={weather.data.days[0].hours}
          timezone={weather.data.timezone}
        />
      )}
    </Container>
  );
};

export default Home;
