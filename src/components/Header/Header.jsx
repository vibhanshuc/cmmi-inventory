import React from 'react';
import { Layout, Row, Menu, Dropdown, Button } from 'antd';
import { Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import styles from './Header.module.scss';

const { Header: AntdHeader } = Layout;

function Header() {
  function handleMenuClick(e) {
    console.log('click', e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">1st item</Menu.Item>
      <Menu.Item key="2">2nd item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );

  return (
    <AntdHeader className={styles.root}>
      <Row type="flex">
        <div className={styles.logo}>CMMI</div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/">All</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/types">Manage Types</Link>
          </Menu.Item>
        </Menu>
      </Row>
      <Dropdown overlay={menu}>
        <Button>
          Actions <DownOutlined />
        </Button>
      </Dropdown>
    </AntdHeader>
  );
}

export default Header;
