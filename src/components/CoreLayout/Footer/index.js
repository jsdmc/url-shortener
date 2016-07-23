import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router';

import style from './style.scss';

const Footer = () => (
  <Grid className={style.footer}>
    <Row middle="xs" center="xs" className={style.row}>
      <Col xs>
        <Link to="about">About Shorneter</Link>
      </Col>
      <Col xs>
        <Link to="contact">Contact</Link>
      </Col>
      <Col xs>
        <Link to="blog">Blog</Link>
      </Col>
      <Col xs={5} className={style.copyright}>
        © 2016. Company Shortener. All rights reserved.
      </Col>
    </Row>
  </Grid>
);

export default Footer;
