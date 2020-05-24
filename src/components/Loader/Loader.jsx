import React from 'react';
import { Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './Loader.module.scss';

function Loader() {
  return (
    <Row align="middle" justify="center" className={styles.root}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: '3rem' }} spin />} />
    </Row>
  );
}

export default Loader;
