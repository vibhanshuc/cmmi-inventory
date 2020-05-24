export const ADD_ITEM = 'OBJECTS/ADD_ITEM';
export const DELETE_ITEM = 'OBJECTS/DELETE_ITEM';
export const UPDATE_FIELD_VALUE = 'OBJECTS/UPDATE_FIELD_VALUE';

// eslint-disable-next-line import/prefer-default-export
export function addItemAction(itemType) {
  return {
    type: ADD_ITEM,
    payload: {
      itemType,
    },
  };
}

export function deleteItemAction(itemId) {
  return {
    type: DELETE_ITEM,
    payload: {
      itemId,
    },
  };
}

export function updateFieldValue(itemId, fieldId, value) {
  return {
    type: UPDATE_FIELD_VALUE,
    payload: {
      itemId,
      fieldId,
      value,
    },
  };
}
