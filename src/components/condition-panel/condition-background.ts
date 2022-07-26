const conditionBackgrounds = {
  rain: 'rain',
  'rain-night': 'rain-night'
};

export const getConditionBackground = (conditionThemeName: string) =>
  conditionBackgrounds[conditionThemeName] ?? null;
