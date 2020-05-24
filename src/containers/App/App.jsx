import React, { Suspense } from 'react';
import { Button, Layout, Dropdown, Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { PlusCircleOutlined, DownOutlined } from '@ant-design/icons';
import { arrayOf, func, shape } from 'prop-types';
import styles from './App.module.scss';
import Header from '../../components/Header/Header';
import routes from '../../routes';
import { addTypeAction } from '../Types/actionCreators';
import { getIdFromParams, getPageNameFromPathName } from '../../utils';
import Loader from '../../components/Loader/Loader';
import { addItemAction } from '../Objects/actionCreators';

const { Content, Footer } = Layout;

function App({ types, onTypeAdd, onItemAdd }) {
  const location = useLocation();

  const id = getIdFromParams(location.pathname);

  function handleItemAdd(typeId) {
    onItemAdd(types.find((item) => item.id === typeId));
  }

  function handleMenuClick(event) {
    handleItemAdd(event.key);
  }

  // eslint-disable-next-line
  const menu = (
    <Menu onClick={handleMenuClick}>
      {types.map((type) => (
        <Menu.Item key={type.id}>{type.name || type.id}</Menu.Item>
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
        return types.length > 0 ? (
          <Button onClick={onTypeAdd}>
            Add Type <PlusCircleOutlined />
          </Button>
        ) : null;
      default:
        return (
          <Button
            onClick={() => {
              onItemAdd(types.find((item) => item.id === id));
            }}
          >
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
      label: `Manage Types ${types.length > 0 ? `(${types.length})` : ''}`,
      key: 'types',
    },
  ];

  return (
    <Layout>
      <div className={styles.header}>
        <Header
          defaultSelectedMenu={[
            getPageNameFromPathName(location.pathname) || 'all',
          ]}
          menuOptions={menuOptions}
          actionBar={actionBar(getPageNameFromPathName(location.pathname))}
        />
      </div>

      <Content className={styles.content}>
        <Suspense fallback={<Loader />}>{routes}</Suspense>
      </Content>
      <Footer className={styles.footer}>
        CMM Inc. &copy; {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  types: state.types.types,
  objects: state.objects.objects,
});

const mapDispatchToProps = (dispatch) => ({
  onTypeAdd: () => {
    dispatch(addTypeAction());
  },
  onItemAdd: (itemType) => {
    dispatch(addItemAction(itemType));
  },
});

App.propTypes = {
  types: arrayOf(shape({})).isRequired,
  onTypeAdd: func.isRequired,
  onItemAdd: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
