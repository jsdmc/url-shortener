import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

export const ShortenerPage = () => (
  <div>
    <div>Shortener page</div>

    <RaisedButton label="Default" />
  </div>
);

ShortenerPage.propTypes = {

};

const mapStateToProps = () => ({

});

export default connect(mapStateToProps)(ShortenerPage);
