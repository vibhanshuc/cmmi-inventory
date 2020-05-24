import React, { useState } from 'react';
import { Col, Empty, Row } from 'antd';
import { connect } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { arrayOf, func, shape } from 'prop-types';
import {
  addItemAction,
  deleteItemAction,
  updateFieldValue,
} from './actionCreators';
import Item from '../../components/Item/Item';
import ActionButton from '../../components/ActionButton';
import { addTypeAction } from '../Types/actionCreators';

function Objects({
  types,
  onItemAdd,
  objects,
  onItemDelete,
  onFieldValueChange,
  onTypeAdd,
}) {
  const { id } = useParams();

  const [redirect, setRedirect] = useState(false);

  function getObjects() {
    if (id === undefined) {
      return objects;
    }
    return objects.filter((object) => object.type === id);
  }

  function handleAddTypeClick() {
    onTypeAdd();
    setRedirect(true);
  }

  const filteredObjects = getObjects();

  return filteredObjects.length ? (
    <Row gutter={[16, 16]}>
      {filteredObjects.map((object) => (
        <Col key={object.id} xs={24} sm={24} lg={12} xl={8} xxl={6}>
          <Item
            onFieldValueChange={onFieldValueChange}
            onDelete={onItemDelete}
            type={types.find((type) => type.id === object.type)}
            fields={object.fields}
            id={object.id}
          />
        </Col>
      ))}
    </Row>
  ) : (
    <Empty
      description={
        types.length > 0
          ? 'No items are created. Create one'
          : 'In order to create items please create a type first'
      }
    >
      <ActionButton
        onTypeAdd={handleAddTypeClick}
        onItemAdd={onItemAdd}
        types={types}
      />
      {redirect && <Redirect to="/types" />}
    </Empty>
  );
}

const mapStateToProps = ({ types, objects }) => ({
  types: types.types,
  objects: objects.objects,
});

const mapDispatchToProps = (dispatch) => ({
  onTypeAdd: () => {
    dispatch(addTypeAction());
  },
  onItemAdd: (itemType) => {
    dispatch(addItemAction(itemType));
  },
  onFieldValueChange(itemId, fieldId, fieldValue) {
    dispatch(updateFieldValue(itemId, fieldId, fieldValue));
  },
  onItemDelete: (itemId) => {
    dispatch(deleteItemAction(itemId));
  },
});

Objects.propTypes = {
  types: arrayOf(shape({})).isRequired,
  objects: arrayOf(shape({})).isRequired,
  onItemAdd: func.isRequired,
  onItemDelete: func.isRequired,
  onFieldValueChange: func.isRequired,
  onTypeAdd: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Objects);
