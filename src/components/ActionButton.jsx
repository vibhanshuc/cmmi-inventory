import { useLocation } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { arrayOf, bool, func, shape } from 'prop-types';
import { getIdFromParams, getPageNameFromPathName } from '../utils';

function ActionBar({
  showAddType = true,
  showAddItem = true,
  types,
  onTypeAdd,
  onItemAdd,
}) {
  const location = useLocation();

  const id = getIdFromParams(location.pathname);

  const page = getPageNameFromPathName(location.pathname);

  function handleItemAdd(typeId) {
    onItemAdd(types.find((item) => item.id === typeId));
  }

  function handleMenuClick(event) {
    handleItemAdd(event.key);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {types.map((type) => (
        <Menu.Item key={type.id}>{type.name || type.id}</Menu.Item>
      ))}
    </Menu>
  );

  switch (page) {
    case '':
      return types.length > 0
        ? showAddItem && (
            <Dropdown overlay={menu}>
              <Button size="large" shape="round">
                Add Items <DownOutlined />
              </Button>
            </Dropdown>
          )
        : showAddType && (
            <Button size="large" shape="round" onClick={onTypeAdd}>
              Add Type <PlusCircleOutlined />
            </Button>
          );
    case 'types':
      return (
        showAddType && (
          <Button size="large" shape="round" onClick={onTypeAdd}>
            Add Type <PlusCircleOutlined />
          </Button>
        )
      );
    default:
      return (
        <Button
          size="large"
          shape="round"
          onClick={() => {
            handleItemAdd(id);
          }}
        >
          Add Item <PlusCircleOutlined />
        </Button>
      );
  }
}

ActionBar.propTypes = {
  showAddType: bool,
  showAddItem: bool,
  types: arrayOf(shape({})).isRequired,
  onTypeAdd: func.isRequired,
  onItemAdd: func.isRequired,
};

ActionBar.defaultProps = {
  showAddType: false,
  showAddItem: false,
};

export default ActionBar;
