export const ADD_ITEM = 'OBJECTS/ADD_ITEM';
export const DELETE_ITEM = 'OBJECTS/DELETE_ITEM';

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
