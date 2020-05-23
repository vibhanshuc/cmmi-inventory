import React from 'react';
import { Input, Select } from 'antd';
import { func, string } from 'prop-types';
import { DeleteOutlined } from '@ant-design/icons';
import { FIELD_TYPES } from '../../utils/constants';

const { Option } = Select;

function Field({ id, text, type, onTypeChange, onTextChange, onDelete }) {
  const handleTypeChange = (selectedValue) => {
    if (selectedValue === 'REMOVE_FIELD') {
      onDelete(id);
    } else {
      onTypeChange(id, selectedValue);
    }
  };

  const selectAfter = (
    <Select value={type} onChange={handleTypeChange}>
      {Object.entries(FIELD_TYPES).map(([, field]) => (
        <Option key={field.id} value={field.id}>
          {field.label}
        </Option>
      ))}
      <Option value="REMOVE_FIELD">
        <DeleteOutlined style={{ color: 'red' }} />
        &nbsp; Remove
      </Option>
    </Select>
  );

  return (
    <Input
      addonAfter={selectAfter}
      value={text}
      onChange={(event) => onTextChange(id, event.target.value)}
    />
  );
}

Field.propTypes = {
  id: string.isRequired,
  text: string.isRequired,
  type: string.isRequired,
  onDelete: func.isRequired,
  onTextChange: func.isRequired,
  onTypeChange: func.isRequired,
};

export default Field;
