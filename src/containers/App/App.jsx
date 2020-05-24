import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { arrayOf, func, shape } from 'prop-types';
import styles from './App.module.scss';
import Header from '../../components/Header/Header';
import routes from '../../routes';
import { addTypeAction } from '../Types/actionCreators';
import { getPageNameFromPathName } from '../../utils';
import Loader from '../../components/Loader/Loader';
import { addItemAction } from '../Objects/actionCreators';
import ActionBar from '../../components/ActionButton';

const { Content, Footer } = Layout;

function App({ types, objects, onTypeAdd, onItemAdd }) {
  const location = useLocation();

  const menuOptions = [
    {
      link: '/',
      key: 'all',
      label: `All ${objects.length > 0 ? `(${objects.length})` : ''}`,
    },
    ...types.map((type) => {
      const countOfItems = objects.filter((object) => object.type === type.id)
        .length;
      return {
        link: `/types/${type.id}`,
        key: `types${type.id}`,
        label: `${type.name || type.id} ${
          countOfItems > 0 ? `(${countOfItems})` : ''
        }`,
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
          actionBar={
            <ActionBar
              showAddItem={objects.length > 0}
              showAddType={types.length > 0}
              types={types}
              onTypeAdd={onTypeAdd}
              onItemAdd={onItemAdd}
            />
          }
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
  objects: arrayOf(shape({})).isRequired,
  onTypeAdd: func.isRequired,
  onItemAdd: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
