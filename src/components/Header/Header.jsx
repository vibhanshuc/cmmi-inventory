import React from 'react';
import { Layout, Row, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { arrayOf, node, shape, string } from 'prop-types';
import styles from './Header.module.scss';

const { Header: AntdHeader } = Layout;

function Header({ defaultSelectedMenu, menuOptions, actionBar }) {
  return (
    <>
      <AntdHeader className={styles.root}>
        <Row type="flex">
          <div className={styles.logo}>CMMI</div>
        </Row>
        {actionBar}
      </AntdHeader>
      <Menu
        className={styles.menu}
        defaultSelectedKeys={defaultSelectedMenu}
        mode="horizontal"
      >
        {menuOptions.map((option) => (
          <Menu.Item key={option.key}>
            <Link to={option.link}>{option.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
}

Header.propTypes = {
  defaultSelectedMenu: arrayOf(string).isRequired,
  menuOptions: arrayOf(shape({})).isRequired,
  actionBar: node,
};

Header.defaultProps = {
  actionBar: null,
};

export default Header;
