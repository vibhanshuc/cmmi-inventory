import React from 'react';
import { Button, Layout, Dropdown, Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { PlusCircleOutlined, DownOutlined } from '@ant-design/icons';
import { arrayOf, func, shape } from 'prop-types';
import styles from './App.module.scss';
import Header from '../../components/Header/Header';
import routes from '../../routes';
import { addTypeAction } from '../Types/actionCreators';
import { getPageNameFromPathName } from '../../utils/utils';

const { Content } = Layout;

function App({ types, onTypeAdd }) {
  const location = useLocation();

  function handleMenuClick(e) {
    console.log('click', e);
  }

  // eslint-disable-next-line
  const menu = (
    <Menu onClick={handleMenuClick}>
      {types.map((type) => (
        <Menu.Item key={type.id}>{type.label || type.id}</Menu.Item>
      ))}
    </Menu>
  );

  function actionBar(page) {
    switch (page) {
      case '':
        return (
          <Dropdown overlay={menu}>
            <Button>
              Add Items <DownOutlined />
            </Button>
          </Dropdown>
        );
      case 'types':
        return (
          <Button onClick={onTypeAdd}>
            Add Type <PlusCircleOutlined />
          </Button>
        );
      default:
        return (
          <Button onClick={() => console.log('handle item addition')}>
            Add Item <PlusCircleOutlined />
          </Button>
        );
    }
  }

  const menuOptions = [
    {
      link: '/',
      key: 'all',
      label: 'All',
    },
    ...types.map((type) => {
      return {
        link: `/types/${type.id}`,
        key: type.id,
        label: type.name || type.id,
      };
    }),
    {
      link: '/types',
      label: 'Manage Types',
      key: 'types',
    },
  ];

  return (
    <Layout className={styles.app}>
      <Header
        defaultSelectedMenu={[getPageNameFromPathName(location.pathname)]}
        menuOptions={menuOptions}
        actionBar={actionBar(getPageNameFromPathName(location.pathname))}
      />
      <Content className={styles.app__content}>{routes}</Content>
    </Layout>
  );
}

const mapStateToProps = (state) => state.types;

const mapDispatchToProps = (dispatch) => ({
  onTypeAdd: () => {
    dispatch(addTypeAction());
  },
});

App.propTypes = {
  types: arrayOf(shape({})).isRequired,
  onTypeAdd: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
