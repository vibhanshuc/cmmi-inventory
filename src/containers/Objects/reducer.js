import { ADD_ITEM, DELETE_ITEM } from './actionCreators';
import createShortId from '../../utils/createShortId';

function createItem(type) {
  return {
    id: createShortId(),
    type: type.id,
    fields: type.fields.map((field) => {
      return {
        id: createShortId(),
        fieldId: field.id,
        value: '',
      };
    }),
  };
}

const initialState = {
  objects: [],
};

function ObjectsReducer(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default ObjectsReducer;
