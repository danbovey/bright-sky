/* eslint-disable camelcase */
type PrecipType = 'rain' | 'snow' | 'freezingrain' | 'ice';

interface Conditions {
  /**
   * ISO formatted date, time or datetime value indicating the date and time of the weather data in the local time zone of the requested location
   */
  datetime: string;
  /**
   * The datetime as a epoch timestamp
   */
  datetimeEpoch: number;
  /**
   * Temperature at the location
   */
  temp: number;
  /**
   * What the temperature feels like accounting for heat index or wind chill
   */
  feelslike: number;
  /**
   * Relative humidity in %
   */
  humidity: number;
  /**
   * Dew point temperature
   */
  dew: number;
  /**
   * The amount of liquid precipitation that fell or is predicted to fall in the period
   */
  precip: number;
  /**
   * The likelihood of measurable precipitation ranging from 0% to 100%
   */
  precipprob?: number;
  /**
   * The amount of snow that fell or is predicted to fall
   */
  snow: number;
  /**
   * The depth of snow on the ground
   */
  snowdepth: number;
  /**
   * The types of precipitation expected or that occurred
   */
  preciptype: PrecipType[];
  /**
   * Instantaneous wind speed at a location – May be empty if it is not significantly higher than the wind speed
   */
  windgust: unknown;
  /**
   * The sustained wind speed measured as the average windspeed that occurs during the preceding one to two minutes
   */
  windspeed: number;
  /**
   * Direction from which the wind is blowing
   */
  winddir: number;
  /**
   * The sea level atmospheric or barometric pressure in millibars (or hectopascals)
   */
  pressure: number;
  /**
   * Distance at which distant objects are visible
   */
  visibility: number;
  /**
   * How much of the sky is covered in cloud ranging from 0-100%
   */
  cloudcover: number;
  /**
   * (W/m2) the solar radiation power at the instantaneous moment of the observation (or forecast prediction)
   */
  solarradiation: number;
  /**
   * MJ/m2) indicates the total energy from the sun that builds up over an hour or day
   */
  solarenergy: number;
  /**
   * A value between 0 and 10 indicating the level of ultra violet (UV) exposure for that hour or day
   */
  uvindex: number;
  /**
   * Short description of the weather conditions
   */
  conditions: string;
  /**
   * A fixed, machine readable summary that can be used to display an icon
   */
  icon: string;
  /**
   * The formatted time of the sunrise
   */
  sunrise: string;
  /**
   * Sunrise time specified as epoch timestamp
   */
  sunriseEpoch: number;
  /**
   * The formatted time of the sunset
   */
  sunset: string;
  /**
   * Sunset time specified as epoch timestamp
   */
  sunsetEpoch: number;
  /**
   * Represents the fractional portion through the current moon lunation cycle ranging from 0 (the new moon) to 0.5 (the full moon) and back to 1 (the next new moon)
   */
  moonphase: number;
}

export interface DayForecast extends Conditions {
  /**
   * Maximum temperature at the location
   */
  tempmax: number;
  /**
   * Minimum temperature at the location
   */
  tempmin: number;
  /**
   * Maximum feelslike temperature at the location
   */
  feelslikemax: number;
  /**
   * Minimum feelslike temperature at the location
   */
  feelslikemin: number;
  /**
   * The proportion of hours where there is non-zero precipitation
   */
  precipcover: number;
  /**
   * A value between 0 and 100 representing the likelihood of severe weather such as thunderstorms, hail or tornados. 0 is very low chance of severe weather. 30-60 represents there is a chance of severe weather, 60-100 indicates there is a high chance of severe weather.
   */
  severerisk: number;
  /**
   * Longer description for the daily weather condition
   */
  description: string;
  /**
   * Hourly data
   */
  hours: Conditions[];
}

export type WeatherResponse = {
  timezone: string;
  tzoffset: number;
  days: DayForecast[];
  currentConditions: Conditions;
};
