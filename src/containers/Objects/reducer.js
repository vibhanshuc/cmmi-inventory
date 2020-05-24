import { ADD_ITEM, DELETE_ITEM, UPDATE_FIELD_VALUE } from './actionCreators';
import createShortId from '../../utils/createShortId';
import { REMOVE_TYPE } from '../Types/actionCreators';
import { FIELD_TYPES } from '../../utils/constants';

function getInitialFieldValue(fieldType) {
  switch (fieldType) {
    case FIELD_TYPES.DATE.id:
      return new Date();
    case FIELD_TYPES.NUMBER.id:
      return 0;
    default:
      return '';
  }
}

function createItem(type) {
  return {
    id: createShortId(),
    type: type.id,
    fields: type.fields.map((field) => {
      return {
        id: createShortId(),
        fieldId: field.id,
        value: getInitialFieldValue(field.type),
      };
    }),
  };
}

const initialState = {
  objects: [],
};

function ObjectsReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_TYPE:
      return {
        objects: state.objects.filter(
          (object) => object.type !== action.payload.typeId,
        ),
      };
    case ADD_ITEM:
      return {
        objects: [...state.objects, createItem(action.payload.itemType)],
      };
    case DELETE_ITEM:
      return {
        objects: state.objects.filter(
          (object) => object.id !== action.payload.itemId,
        ),
      };
    case UPDATE_FIELD_VALUE:
      return {
        objects: state.objects.map((object) => {
          if (object.id === action.payload.itemId) {
            return {
              ...object,
              fields: object.fields.map((field) => {
                if (field.id === action.payload.fieldId) {
                  return {
                    ...field,
                    value: action.payload.value,
                  };
                }
                return field;
              }),
            };
          }
          return object;
        }),
      };
    default:
      return state;
  }
}

export default ObjectsReducer;
