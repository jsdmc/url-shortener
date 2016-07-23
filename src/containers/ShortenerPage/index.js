import React from 'react';
import { connect } from 'react-redux';
import Shortener from 'components/Shortener';

export const ShortenerPage = () => (
  <Shortener />
);

ShortenerPage.propTypes = {

};

const mapStateToProps = () => ({

});

export default connect(mapStateToProps)(ShortenerPage);
