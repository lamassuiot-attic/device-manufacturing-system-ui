import React from 'react';
import { render } from 'react-dom';
import uuid from 'react-uuid';
import { Switch, Route, HashRouter } from 'react-router-dom';
import 'typeface-roboto';
import dotenv from 'dotenv';

import { CssBaseline } from '@material-ui/core';
import Config from './routes/config';
import Home from './routes';
import Operation from './routes/operation';
import ScrollToTop from './utils/scroll-to-top';
import LamassuAppBar from './components/app-bar';

import { initKeycloak } from './services/auth';

dotenv.config();

initKeycloak().success((auth) => {
  if (!auth) {
    window.location.reaload();
  } else {
    render(
      <HashRouter>
        <CssBaseline />
        <LamassuAppBar />
        <ScrollToTop />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home key={uuid()} {...props} />}
          />
          <Route
            path="/config/:id"
            render={(props) => <Config key={uuid()} {...props} />}
          />
          <Route
            exact
            path="/operation"
            render={(props) => <Operation key={uuid()} {...props} />}
          />
        </Switch>
      </HashRouter>,
      document.getElementById('root')
    );
  }
});
