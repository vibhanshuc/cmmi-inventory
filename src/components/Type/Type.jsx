import React from 'react';
import {
  Button,
  Card,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  message,
  Select,
} from 'antd';
import {
  DeleteOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { arrayOf, func, shape, string } from 'prop-types';
import { FIELD_TYPES } from '../../utils/constants';
import Field from '../Field/Field';

const { Option } = Select;

const { confirm } = Modal;

function Type({
  id,
  name,
  title,
  fields,
  onNameChange,
  onTitleChange,
  onFieldAdd,
  onFieldRemove,
  onFieldTextChange,
  onFieldTypeChange,
  onDelete,
}) {
  function handleMenuClick(event) {
    onFieldAdd(id, event.key);
  }

  function handleDeleteClick() {
    confirm({
      title: 'Do you want to delete this type?',
      icon: <ExclamationCircleOutlined />,
      content: 'All the items of this type will also get deleted',
      onOk() {
        onDelete(id);
      },
    });
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {Object.entries(FIELD_TYPES).map(([, field]) => (
        <Menu.Item key={field.id}>{field.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <Card
        title={name}
        extra={<Button onClick={handleDeleteClick} icon={<DeleteOutlined />} />}
      >
        <Form name={name} layout="vertical">
          <Form.Item initialValue={name} label="Object type" name="objectType">
            <Input onChange={(event) => onNameChange(id, event.target.value)} />
          </Form.Item>

          <Form.Item
            initialValue={title}
            label="Object title"
            name="objectTitle"
          >
            <Select
              onChange={(selectedTitle) => onTitleChange(id, selectedTitle)}
            >
              {fields.map((field) => (
                <Option key={field.id} value={field.id}>
                  {field.text}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {fields.map((field, index) => (
            <Form.Item key={field.id} label={index === 0 ? 'Fields' : ''}>
              <Field
                id={field.id}
                text={field.text}
                type={field.type}
                onDelete={(fieldId) => {
                  if (fields.length === 1) {
                    message.warning('At least one field is required.');
                  } else {
                    onFieldRemove(id, fieldId);
                  }
                }}
                onTextChange={(fieldId, text) =>
                  onFieldTextChange(id, fieldId, text)
                }
                onTypeChange={(fieldId, type) =>
                  onFieldTypeChange(id, fieldId, type)
                }
              />
            </Form.Item>
          ))}

          <Form.Item>
            <Dropdown overlay={menu}>
              <Button block>
                Add Field <DownOutlined />
              </Button>
            </Dropdown>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

Type.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  title: string.isRequired,
  fields: arrayOf(
    shape({
      id: string.isRequired,
      text: string.isRequired,
      type: string.isRequired,
    }),
  ).isRequired,
  onNameChange: func.isRequired,
  onTitleChange: func.isRequired,
  onFieldAdd: func.isRequired,
  onFieldRemove: func.isRequired,
  onFieldTextChange: func.isRequired,
  onFieldTypeChange: func.isRequired,
  onDelete: func.isRequired,
};

export default Type;
