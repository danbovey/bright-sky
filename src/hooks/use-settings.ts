import useLocalStorageState from 'use-local-storage-state';

import { MapboxFeature } from '../api/types/mapbox';
import { UnitGroup } from '../api/helpers/units';

export type Settings = {
  unitGroup: UnitGroup;
  location: MapboxFeature | 'current' | null;
};

export const initialSettings: Settings = {
  unitGroup:
    typeof navigator !== 'undefined' && navigator.language === 'en-GB'
      ? 'uk'
      : 'us',
  location: null
};

const useSettings = () =>
  useLocalStorageState<Settings>('brightsky:settings', {
    defaultValue: initialSettings
  });

export default useSettings;
