/**
 * Unit groups are the system of units used for the output data.
 *
 * US units - °F mph
 * Metric units - °C kmh
 * UK units - °C mph
 * Base units - Kelvin ms
 */
export type UnitGroup = 'us' | 'metric' | 'uk' | 'base';

export const unitGroups = ['us', 'metric', 'uk', 'base'];

export const isUnitGroup = (input: any): input is UnitGroup =>
  unitGroups.includes(input);
