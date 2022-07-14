import React, { useState } from 'react';
import { SearchCircleIcon } from '@heroicons/react/outline';

import { MapboxFeature } from '../../api/types/mapbox';
import useSettings, { initialSettings } from '../../hooks/use-settings';
import fetchLocation from './fetch-location';
import { DangerText } from '../../components/text/text';
import {
  SearchArea,
  SearchInput,
  SearchError,
  SearchResultsList,
  SearchResult
} from './style';

const LocationSearch = () => {
  const [settings, updateSettings] = useSettings();

  const [searchQuery, setSearchQuery] = useState('');
  const [isFetchingResults, setFetchingResults] = useState(false);
  const [results, setResults] = useState<MapboxFeature[]>([]);
  const [error, setError] = useState<string>();

  const onBeginSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFetchingResults(true);

    let res;
    try {
      res = await fetchLocation(searchQuery);
    } catch (err) {
      setFetchingResults(false);
      setError(err.message);
      return;
    }

    setFetchingResults(false);

    if (res.length === 0) {
      setError('No results');
      setResults([]);
      return;
    }

    setResults(res);
  };

  const selectLocation = (location: MapboxFeature) => {
    updateSettings({ ...initialSettings, ...settings, location });
  };

  return (
    <SearchArea>
      <SearchCircleIcon />
      <form onSubmit={onBeginSearch}>
        <SearchInput
          type="text"
          name="query"
          placeholder="Search for your town..."
          autoComplete="off"
          required
          enterKeyHint="search"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          disabled={isFetchingResults}
        />
      </form>
      {error && (
        <SearchError>
          <DangerText>{error}</DangerText>
        </SearchError>
      )}
      {results && (
        <SearchResultsList>
          {results.map(place => (
            <SearchResult onClick={() => selectLocation(place)} key={place.id}>
              {place.place_name}
            </SearchResult>
          ))}
        </SearchResultsList>
      )}
    </SearchArea>
  );
};

export default LocationSearch;
