const CREATE = 'cheatsheet/create';
const GET_ALL = 'cheatsheet/get_all';
const GET_ONE = 'cheatsheet/get_one';
const UPDATE = 'cheatsheet/update';
const DELETE = 'cheatsheet/delete';

const create = cheatsheet => ({ type: CREATE, cheatsheet });
const getAll = cheatsheets => ({ type: GET_ALL, cheatsheets });
const getOne = cheatsheet => ({ type: GET_ONE, cheatsheet });
const update = cheatsheet => ({ type: UPDATE, cheatsheet });
const destroy = cheatsheetId => ({ type: DELETE, cheatsheetId });
// todo ——————————————————————————————————————————————————————————————————————————————————
export const createCheatsheet = cheatsheet => async (dispatch) => {
  const response = await fetch(`/api/cheatsheets/new`, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(cheatsheet) });
  
  console.log('REDUX', response)


  if (response.ok) {
    const newcheatsheet = await response.json();
    dispatch(create(newcheatsheet));
    return newcheatsheet;
  }
  return response;
};

export const getCheatsheets = () => async (dispatch) => {
  const response = await fetch(`/api/cheatsheets/all`, { method: 'GET' });

  if (response.ok) {
    const cheatsheets = await response.json();
    dispatch(getAll(cheatsheets));
    return cheatsheets;
  }
  return response;
};

export const getCheatsheet = (cheatsheetId) => async (dispatch) => {
  const response = await fetch(`/api/cheatsheets/${cheatsheetId}`, { method: 'GET' });

  if (response.ok) {
    const cheatsheet = await response.json();
    dispatch(getOne(cheatsheet));
    return cheatsheet;
  }
  return response;
};

export const updateCheatsheet = cheatsheet => async (dispatch) => {
  const response = await fetch(`/api/cheatsheets/${cheatsheet.id}`, { method: 'PUT', body: JSON.stringify(cheatsheet) });

  if (response.ok) {
    const updatedcheatsheet = await response.json();
    dispatch(update(updatedcheatsheet));
    return updatedcheatsheet;
  }
  return response;
};

export const deleteCheatsheet = cheatsheetId => async (dispatch) => {
  const response = await fetch(`/api/cheatsheets/${cheatsheetId}`, { method: 'DELETE' });

  if (response.ok) {
    const cheatsheetId = await response.json();
    dispatch(destroy(cheatsheetId));
    return cheatsheetId;
  }
  return response;
};
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                                 Reducer
// todo ——————————————————————————————————————————————————————————————————————————————————
const initialState = {};

const cheatsheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE: {
      const newState = {...state};
      newState[action.cheatsheet.id] = action.cheatsheet
      return newState;
    };
// todo ——————————————————————————————————————————————————————————————————————————————————
    case GET_ALL: {
      const newState = {...state};
      action.cheatsheets['all_cheatsheets'].forEach(cheatsheet => newState[cheatsheet.id] = cheatsheet);
      return newState;
    };
// todo ——————————————————————————————————————————————————————————————————————————————————
    case GET_ONE: {
      const newState = {...state};
      newState[action.cheatsheet.id] = action.cheatsheet;
      return newState;
    };
// todo ——————————————————————————————————————————————————————————————————————————————————
    case UPDATE: {
      const newState = {...state};
      console.log('REDUX', action.cheatsheet)
      newState[action.cheatsheet.id] = action.cheatsheet;
      return newState;
    };
// todo ——————————————————————————————————————————————————————————————————————————————————
    case DELETE: {
      const newState = {...state};
      delete newState[action.cheatsheetId];
      return newState;
    }
// todo ——————————————————————————————————————————————————————————————————————————————————
    default:
      return state;
  }
};

export default cheatsheetReducer;
