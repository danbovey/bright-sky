/* eslint-disable camelcase */
export type MapboxFeature = {
  id: string;
  place_type: string;
  place_name: string;
  text: string;
  center: [number, number];
};

export type MapboxGeocodeResponse = {
  features: MapboxFeature[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMapboxFeature = (item: any): item is MapboxFeature =>
  item && item.id && item.place_type && item.place_name;
