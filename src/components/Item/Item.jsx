import React from 'react';
import { Button, Card, Form, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { arrayOf, func, shape, string } from 'prop-types';
import FieldInput from '../FieldInput/FieldInput';

const { confirm } = Modal;

function Item({ id, type, fields, onDelete, onFieldValueChange }) {
  function handleDeleteClick() {
    confirm({
      title: 'Do you want to delete this item?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        onDelete(id);
      },
    });
  }

  function findFieldType(fieldId) {
    return type.fields.find((field) => field.id === fieldId);
  }

  return (
    <Card
      title={`${type.name} - `}
      extra={<Button onClick={handleDeleteClick} icon={<DeleteOutlined />} />}
    >
      <Form layout="vertical">
        {fields.map((field) => {
          return (
            <Form.Item
              key={field.fieldId}
              label={findFieldType(field.fieldId).text}
            >
              <FieldInput
                onChange={(value) => {
                  onFieldValueChange(id, field.id, value);
                }}
                fieldType={findFieldType(field.fieldId).type}
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
      value: string.isRequired,
    }),
  ).isRequired,
  onDelete: func.isRequired,
  onFieldValueChange: func.isRequired,
};

export default Item;
