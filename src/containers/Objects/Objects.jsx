import React from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { arrayOf, func, shape } from 'prop-types';
import { deleteItemAction, updateFieldValue } from './actionCreators';
import Item from '../../components/Item/Item';

function Objects({ types, objects, onItemDelete, onFieldValueChange }) {
  const { id } = useParams();

  function getObjects() {
    if (id === undefined) {
      return objects;
    }
    return objects.filter((object) => object.type === id);
  }

  return (
    <Row gutter={[16, 16]}>
      {getObjects().map((object) => (
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
  );
}

const mapStateToProps = ({ types, objects }) => ({
  types: types.types,
  objects: objects.objects,
});

const mapDispatchToProps = (dispatch) => ({
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
  onItemDelete: func.isRequired,
  onFieldValueChange: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Objects);
