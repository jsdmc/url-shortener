import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import PersonIcon from 'material-ui/svg-icons/social/person';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';
import MenuItem from 'material-ui/MenuItem';
import { Row, Col } from 'react-flexbox-grid';
import NavigationTabs from './NavigationTabs';
import LogoIcon from './assets/logo.svg';

import style from './style.scss';

const HeaderTabs = ({ user, activeRoute, dispatch }) => (
  <Row bottom="xs">
    <Col xs>
      <NavigationTabs {...{ activeRoute, dispatch }} />
    </Col>
    { user &&
      <Col>
        <Row end="xs">
          <Col xs>
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
);

const Header = ({ activeRoute, user }) => (
  <Row between="xs" className={style.container}>
    <Col xs={2} sm={1}>
      <LogoIcon className={style.logo} />
    </Col>
    <Col xs={8}>
      <HeaderTabs {...{ user, activeRoute }} />
    </Col>
  </Row>
);

Header.propTypes = {
  activeRoute: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { routing } = state;
  return {
    activeRoute: routing.location.pathname,
    // user: { email: 'test@email' }
  };
};

export default connect(mapStateToProps)(Header);
