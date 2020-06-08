import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Route, BrowserRouter, Switch } from 'react-router-dom';

import UploadPage from './components/UploadPage';

const routes = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/upload" component={UploadPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  routes,
  document.getElementById('root'),
);
