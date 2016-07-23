import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import PersonIcon from 'material-ui/svg-icons/social/person';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-flexbox-grid';
import NavigationTabs from './NavigationTabs';
import LogoIcon from './logo.svg';

import styles from './style.scss';

const HeaderTabs = ({ user, activeRoute, dispatch }) => (
  <Grid>
    <Row bottom="xs">
      <Col xs>
        <NavigationTabs {...{ activeRoute, dispatch }} />
      </Col>
      { user &&
        <Col xs>
          <Row end="xs" middle="xs">
            <Col style={{ marginRight: 10 }}>
              <IconMenu
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                iconButtonElement={
                  <FlatButton
                    rippleColor={ '#fff' }
                    hoverColor={ 'rgba(255, 255, 255, 0)' }
                    style={{ color: '#fff', position: 'relative', top: -6, fontSize: 16, textTransform: 'none' }}
                    label={ user.email }
                    labelPosition="before"
                    icon={ <MoreVertIcon /> }
                  />
                }
              >
                <MenuItem>
                  <Row middle="xs">
                    <PersonIcon />
                    <Col xs={4}>
                      Profile
                    </Col>
                  </Row>
                </MenuItem>
                <MenuItem
                    onTouchTap={() => null}
                >
                  <Row middle="xs">
                    <LogoutIcon />
                    <Col xs={4}>
                      Sign out
                    </Col>
                  </Row>
                </MenuItem>
              </IconMenu>
            </Col>
          </Row>
        </Col>
      }
    </Row>
  </Grid>
);

const Header = ({ activeRoute, user }) => (
  <div>
    <AppBar
      showMenuIconButton
      iconElementLeft={<LogoIcon className={styles.logo} />}
      iconElementRight={<HeaderTabs {...{ user, activeRoute }} />}
    />
  </div>
);

Header.propTypes = {
  activeRoute: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { routing } = state;
  return {
    activeRoute: routing.location.pathname
    // user: { email: 'test@email' }
  };
};

export default connect(mapStateToProps)(Header);
