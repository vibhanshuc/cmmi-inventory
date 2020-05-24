import React from 'react';
import { Button, Card, Form, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  arrayOf,
  func,
  number,
  object,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import FieldInput from '../FieldInput/FieldInput';

const { confirm } = Modal;

function Item({ id, type, fields, onDelete, onFieldValueChange }) {
  function handleDeleteClick() {
    confirm({
      title: 'Do you want to delete this item?',
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      onOk() {
        onDelete(id);
      },
    });
  }

  function findFieldType(fieldId) {
    return type.fields.find((field) => field.id === fieldId);
  }

  function findTitleFieldValue() {
    const titleField = fields.find((field) => field.fieldId === type.title);
    return titleField ? ` - ${titleField.value}` : '';
  }

  return (
    <Card
      title={`${type.name}${findTitleFieldValue()}`}
      extra={
        <Button
          type="primary"
          danger
          onClick={handleDeleteClick}
          icon={<DeleteOutlined />}
        />
      }
    >
      <Form layout="vertical">
        {fields.map((field) => {
          const fieldType = findFieldType(field.fieldId);
          return (
            <Form.Item key={field.fieldId} label={fieldType.text}>
              <FieldInput
                onChange={(value) => {
                  onFieldValueChange(id, field.id, value);
                }}
                field={{
                  ...field,
                  label: fieldType.text,
                  type: fieldType.type,
                }}
              />
            </Form.Item>
          );
        })}
      </Form>
    </Card>
  );
}

Item.propTypes = {
  id: string.isRequired,
  type: shape({
    id: string.isRequired,
    name: string.isRequired,
  }).isRequired,
  fields: arrayOf(
    shape({
      id: string.isRequired,
      fieldId: string.isRequired,
      value: oneOfType([string, number, object]).isRequired,
    }),
  ).isRequired,
  onDelete: func.isRequired,
  onFieldValueChange: func.isRequired,
};

export default Item;
