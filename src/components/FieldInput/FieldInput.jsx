import { DatePicker, Input, InputNumber } from 'antd';
import { func, string } from 'prop-types';
import React from 'react';
import { FIELD_TYPES } from '../../utils/constants';

function FieldInput({ fieldType, onChange }) {
  switch (fieldType) {
    case FIELD_TYPES.SMALL_TEXT.id:
      return <Input onChange={(event) => onChange(event.target.value)} />;
    case FIELD_TYPES.LONG_TEXT.id:
      return (
        <Input.TextArea onChange={(event) => onChange(event.target.value)} />
      );
    case FIELD_TYPES.NUMBER.id:
      return <InputNumber onChange={(value) => onChange(value)} />;
    case FIELD_TYPES.DATE.id:
      return (
        <DatePicker onChange={(date, datestring) => onChange(datestring)} />
      );
    default:
      return null;
  }
}

FieldInput.propTypes = {
  fieldType: string.isRequired,
  onChange: func.isRequired,
};

export default FieldInput;
