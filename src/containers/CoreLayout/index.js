import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, Footer } from 'components/CoreLayout';

import style from './style.scss';

export const CoreLayout = ({ children }) => (
  <div className={ style.container }>
    <Header />
    <div className={ style.children }>
      { children }
    </div>
    <Footer />
  </div>
);

CoreLayout.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(CoreLayout);
