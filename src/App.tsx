import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import GlobalStyles from './global-styles';
import LocationPrompt from './modules/location-prompt/location-prompt';
import Home from './Home';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <LocationPrompt />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </QueryClientProvider>
);

export default App;
