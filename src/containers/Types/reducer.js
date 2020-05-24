import { FIELD_TYPES } from '../../utils/constants';
import createShortId from '../../utils/createShortId';
import {
  ADD_TYPE,
  REMOVE_TYPE,
  ADD_FIELD,
  REMOVE_FIELD,
  CHANGE_FIELD_TYPE,
  CHANGE_FIELD_TEXT,
  CHANGE_TYPE_NAME,
  CHANGE_TYPE_TITLE,
} from './actionCreators';

const createField = (type) => {
  return {
    id: createShortId(),
    text: 'Title',
    type: type || FIELD_TYPES.SMALL_TEXT.id,
  };
};

const createType = () => {
  const field = createField();

  return {
    id: createShortId(),
    name: '',
    title: field.id,
    fields: [field],
  };
};

const initialState = {
  types: [],
};

function TypesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TYPE:
      return {
        types: [...state.types, createType()],
      };

    case REMOVE_TYPE:
      return {
        types: state.types.filter((type) => type.id !== action.payload.typeId),
      };
    case CHANGE_TYPE_NAME:
      return {
        types: state.types.map((type) => {
          if (type.id === action.payload.typeId) {
            return {
              ...type,
              name: action.payload.text,
            };
          }
          return type;
        }),
      };
    case CHANGE_TYPE_TITLE:
      return {
        types: state.types.map((type) => {
          if (type.id === action.payload.typeId) {
            return {
              ...type,
              title: action.payload.title,
            };
          }
          return type;
        }),
      };
    case ADD_FIELD:
      return {
        types: state.types.map((type) => {
          if (type.id === action.payload.typeId) {
            return {
              ...type,
              fields: [...type.fields, createField(action.payload.fieldType)],
            };
          }
          return type;
        }),
      };
    case REMOVE_FIELD:
      return {
        types: state.types.map((type) => {
          if (type.id === action.payload.typeId) {
            return {
              ...type,
              fields: type.fields.filter(
                (field) => field.id !== action.payload.fieldId,
              ),
            };
          }
          return type;
        }),
      };
    case CHANGE_FIELD_TEXT:
      return {
        types: state.types.map((type) => {
          if (type.id === action.payload.typeId) {
            return {
              ...type,
              fields: type.fields.map((field) => {
                if (field.id === action.payload.fieldId) {
                  return {
                    ...field,
                    text: action.payload.fieldText || '',
                  };
                }
                return field;
              }),
            };
          }
          return type;
        }),
      };
    case CHANGE_FIELD_TYPE:
      return {
        types: state.types.map((type) => {
          if (type.id === action.payload.typeId) {
            return {
              ...type,
              fields: type.fields.map((field) => {
                if (field.id === action.payload.fieldId) {
                  return {
                    ...field,
                    type: action.payload.fieldType,
                  };
                }
                return field;
              }),
            };
          }
          return type;
        }),
      };
    default:
      return state;
  }
}

export default TypesReducer;
