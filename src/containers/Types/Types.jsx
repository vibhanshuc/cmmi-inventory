import React from 'react';
import { Row, Col, Empty } from 'antd';
import { connect } from 'react-redux';
import { arrayOf, func, shape } from 'prop-types';
import {
  changeNameAction,
  changeTitleAction,
  addFieldAction,
  removeFieldAction,
  changeFieldTypeAction,
  changeFieldTextAction,
  addTypeAction,
  deleteTypeAction,
} from './actionCreators';
import Type from '../../components/Type/Type';
import ActionBar from '../../components/ActionButton';
import { addItemAction } from '../Objects/actionCreators';

function Types({
  types,
  onTypeAdd,
  onItemAdd,
  onTypeDelete,
  onNameChange,
  onTitleChange,
  onFieldAdd,
  onFieldRemove,
  onFieldTextChange,
  onFieldTypeChange,
}) {
  return types.length > 0 ? (
    <Row gutter={[16, 16]}>
      {types.map((type) => (
        <Col key={type.id} xs={24} sm={24} lg={12} xl={8} xxl={6}>
          <Type
            id={type.id}
            title={type.title}
            fields={type.fields}
            name={type.name}
            onFieldAdd={onFieldAdd}
            onFieldRemove={onFieldRemove}
            onFieldTextChange={onFieldTextChange}
            onFieldTypeChange={onFieldTypeChange}
            onDelete={onTypeDelete}
            onNameChange={onNameChange}
            onTitleChange={onTitleChange}
          />
        </Col>
      ))}
    </Row>
  ) : (
    <Row justify="center" align="middle">
      <Empty description="No types are created yet.">
        <ActionBar types={types} onItemAdd={onItemAdd} onTypeAdd={onTypeAdd} />
      </Empty>
    </Row>
  );
}

Types.propTypes = {
  types: arrayOf(shape({})).isRequired,
  onItemAdd: func.isRequired,
  onTypeAdd: func.isRequired,
  onTypeDelete: func.isRequired,
  onNameChange: func.isRequired,
  onTitleChange: func.isRequired,
  onFieldAdd: func.isRequired,
  onFieldRemove: func.isRequired,
  onFieldTextChange: func.isRequired,
  onFieldTypeChange: func.isRequired,
};

const mapStateToProps = (state) => state.types;

const mapDispatchToProps = (dispatch) => ({
  onItemAdd: (itemType) => {
    dispatch(addItemAction(itemType));
  },
  onTypeAdd: () => {
    dispatch(addTypeAction());
  },
  onTypeDelete: (typeId) => {
    dispatch(deleteTypeAction(typeId));
  },
  onNameChange: (typeId, text) => {
    dispatch(changeNameAction(typeId, text));
  },
  onTitleChange: (typeId, title) => {
    dispatch(changeTitleAction(typeId, title));
  },
  onFieldAdd: (typeId, fieldType) => {
    dispatch(addFieldAction(typeId, fieldType));
  },
  onFieldRemove: (typeId, fieldId) => {
    dispatch(removeFieldAction(typeId, fieldId));
  },
  onFieldTypeChange: (typeId, fieldId, type) => {
    dispatch(changeFieldTypeAction(typeId, fieldId, type));
  },
  onFieldTextChange: (typeId, fieldId, text) => {
    dispatch(changeFieldTextAction(typeId, fieldId, text));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Types);
