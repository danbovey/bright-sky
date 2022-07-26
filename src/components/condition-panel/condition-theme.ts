import { WeatherResponse } from '../../api/types/weather';

export type ConditionTheme = {
  name: string;
  color: string;
  backgroundColor: string;
  overlayBackgroundColor: string;
  overlayBackgroundColorRgb: [number, number, number];
  dotStroke: string;
};

const conditionThemes: Record<string, ConditionTheme> = {
  bright: {
    name: 'bright',
    color: '#1f1e31',
    backgroundColor: '##ffd89e',
    overlayBackgroundColor: '#ffe3ba',
    overlayBackgroundColorRgb: [255, 227, 186],
    dotStroke: '#ffcc9d'
  },
  clear: {
    name: 'clear',
    color: '#38588b',
    backgroundColor: '#487ac8',
    overlayBackgroundColor: '#d5eaff',
    overlayBackgroundColorRgb: [213, 234, 255],
    dotStroke: '#f00'
  },
  'clear-night': {
    name: 'clear-night',
    color: '#fff',
    backgroundColor: '#1e3045',
    overlayBackgroundColor: 'rgba(255, 255, 255, 0.2)',
    overlayBackgroundColorRgb: [255, 255, 255],
    dotStroke: '#b9dcff'
  },
  'partly-cloudy-day': {
    name: 'partly-cloudy-day',
    color: '#24609c',
    backgroundColor: '#c4e2ff',
    overlayBackgroundColor: '#d1e8ff',
    overlayBackgroundColorRgb: [209, 232, 255],
    dotStroke: '#badcff'
  },
  cloudy: {
    name: 'cloudy',
    color: '#757b81',
    backgroundColor: '#d1dae3',
    overlayBackgroundColor: '#f00',
    overlayBackgroundColorRgb: [255, 255, 255],
    dotStroke: '#f00'
  },
  rain: {
    name: 'rain',
    backgroundColor: '#c4e2ff',
    color: '#24609c',
    overlayBackgroundColor: '#f00',
    overlayBackgroundColorRgb: [255, 255, 255],
    dotStroke: '#f00'
  }
};

export const getConditionTheme = (weather: WeatherResponse) => {
  const { datetimeEpoch, sunsetEpoch } = weather.currentConditions;
  let { icon } = { ...weather.currentConditions };

  const isNight = datetimeEpoch > sunsetEpoch;
  if (isNight) {
    icon += '-night';
  }

  const defaultTheme = isNight
    ? conditionThemes['clear-night']
    : conditionThemes.clear;

  const conditionStyle =
    icon in conditionThemes ? conditionThemes[icon] : defaultTheme;

  return conditionStyle;
};
