import { DatePicker, Input, InputNumber } from 'antd';
import { func, shape } from 'prop-types';
import dayjs from 'dayjs';
import React from 'react';
import { FIELD_TYPES } from '../../utils/constants';

function FieldInput({ field, onChange }) {
  switch (field.type) {
    case FIELD_TYPES.SMALL_TEXT.id:
      return (
        <Input
          placeholder={field.label}
          defaultValue={field.value}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case FIELD_TYPES.LONG_TEXT.id:
      return (
        <Input.TextArea
          placeholder={field.label}
          defaultValue={field.value}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case FIELD_TYPES.NUMBER.id:
      return (
        <InputNumber
          placeholder={field.label}
          defaultValue={field.value}
          onChange={(value) => onChange(value)}
        />
      );
    case FIELD_TYPES.DATE.id:
      return (
        <DatePicker
          placeholder={field.label}
          defaultValue={dayjs(field.value)}
          onChange={(date, datestring) => onChange(datestring)}
        />
      );
    default:
      return null;
  }
}

FieldInput.propTypes = {
  field: shape({}).isRequired,
  onChange: func.isRequired,
};

export default FieldInput;
