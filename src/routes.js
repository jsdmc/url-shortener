import React from 'react';
import { Route, Redirect } from 'react-router';
import { CoreLayout, ShortenerPage, LinksArchivePage, AboutPage } from './containers';

const Routes = [
  <Route component={CoreLayout}>
    <Route path="shortener" component={ShortenerPage} />
    <Route path="archive" component={LinksArchivePage} />
    <Route path="about" component={AboutPage} />
    <Redirect from="/" to="/shortener" />
  </Route>
];

export default Routes;
