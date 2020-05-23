import React from 'react';
import { Row, Col } from 'antd';
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

function Types({
  types,
  onTypeDelete,
  onNameChange,
  onTitleChange,
  onFieldAdd,
  onFieldRemove,
  onFieldTextChange,
  onFieldTypeChange,
}) {
  return (
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
  );
}

Types.propTypes = {
  types: arrayOf(shape({})).isRequired,
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
