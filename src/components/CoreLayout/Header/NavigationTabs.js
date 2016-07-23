import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';

import style from './style.scss';

class NavigationTabs extends Component {

  handleOnTabChange(route) {
    if (route) {
      browserHistory.push(route);
    }
  }

  render() {

    const { activeRoute } = this.props;

    return (
      <Tabs
          className={style.tabs}
          inkBarStyle={{ backgroundColor: '#ffff8d' }}
          value={activeRoute}
          onChange={::this.handleOnTabChange}
      >
        <Tab
            label="Short it"
            value="/shortener"
        />
        <Tab
            label="ARCHIVE"
            value="/archive"
        />
        <Tab
            label="ABOUT"
            value="/about"
        />
      </Tabs>
    );
  }
}

export default NavigationTabs;

NavigationTabs.propTypes = {
  activeRoute: PropTypes.string
};
