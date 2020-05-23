export const ADD_TYPE = 'TYPES/ADD_TYPE';
export const REMOVE_TYPE = 'TYPES/REMOVE_TYPE';
export const ADD_FIELD = 'TYPES/ADD_FIELD';
export const CHANGE_TYPE_NAME = 'TYPES/CHANGE_NAME';
export const CHANGE_TYPE_TITLE = 'TYPES/CHANGE_TITLE';
export const REMOVE_FIELD = 'TYPES/REMOVE_FIELD';
export const CHANGE_FIELD_TYPE = 'TYPES/CHANGE_FIELD_TYPE';
export const CHANGE_FIELD_TEXT = 'TYPES/CHANGE_FIELD_TEXT';

export const addTypeAction = () => {
  return {
    type: ADD_TYPE,
  };
};

export const deleteTypeAction = (typeId) => {
  return {
    type: REMOVE_TYPE,
    payload: {
      typeId,
    },
  };
};

export const changeNameAction = (typeId, text) => {
  return {
    type: CHANGE_TYPE_NAME,
    payload: { typeId, text },
  };
};

export const changeTitleAction = (typeId, title) => {
  return {
    type: CHANGE_TYPE_TITLE,
    payload: { typeId, title },
  };
};

export const addFieldAction = (typeId, fieldType) => {
  return {
    type: ADD_FIELD,
    payload: {
      typeId,
      fieldType,
    },
  };
};

export const removeFieldAction = (typeId, fieldId) => {
  return {
    type: REMOVE_FIELD,
    payload: {
      typeId,
      fieldId,
    },
  };
};

export const changeFieldTypeAction = (typeId, fieldId, fieldType) => {
  return {
    type: CHANGE_FIELD_TYPE,
    payload: {
      typeId,
      fieldId,
      fieldType,
    },
  };
};

export const changeFieldTextAction = (typeId, fieldId, fieldText) => {
  return {
    type: CHANGE_FIELD_TEXT,
    payload: {
      typeId,
      fieldId,
      fieldText,
    },
  };
};
