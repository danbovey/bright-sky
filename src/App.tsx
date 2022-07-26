import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import GlobalStyles from './global-styles';
import LocationPrompt from './modules/location-prompt/location-prompt';
import Home from './Home';
import NotFoundPage from './modules/not-found/not-found';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <LocationPrompt />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </QueryClientProvider>
);

export default App;
