import { UnitGroup } from '../helpers/units';

export type Location = {
  lat: number;
  lng: number;
  unitGroup?: UnitGroup;
};
