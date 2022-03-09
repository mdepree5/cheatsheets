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
  console.log('OUTSIDE, EXPECT FORMDATA OBJ', cheatsheet)

  const response = await fetch(`/api/cheatsheets/new`, {
    method: "POST",
    headers: {"Content-Type": "multipart/form-data"},
    body: cheatsheet
    // body: JSON.stringify(cheatsheet)

    // method: "POST",
    // headers: {"Content-Type": "application/json"},
    // body: JSON.stringify(cheatsheet)
  });

  // console.log('REDUX RESPONSE', response)

  if (response.ok) {
    const newcheatsheet = await response.json();
    dispatch(create(newcheatsheet));
    return newcheatsheet;
  }
  return response;
};
// export const createCheatsheet = cheatsheet => async (dispatch) => {
//   const response = await fetch(`/api/cheatsheets/new`, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(cheatsheet) });
  
//   // console.log('REDUX', response)

//   if (response.ok) {
//     const newcheatsheet = await response.json();
//     dispatch(create(newcheatsheet));
//     return newcheatsheet;
//   }
//   return response;
// };

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
  const response = await fetch(`/api/cheatsheets/${cheatsheet.id}`, { method: 'PUT', headers: {"Content-Type": "application/json"}, body: JSON.stringify(cheatsheet) });

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
      const newState = {}; //* => empty object to reset state to only have access to one cheatsheet
      newState[action.cheatsheet.id] = action.cheatsheet;
      // console.log('CREATE ONE NEWSTATE', newState);
      return newState;
    };
// todo ——————————————————————————————————————————————————————————————————————————————————
    case GET_ALL: {
      const newState = {}; //* => empty object to reset state and populate with fresh query
      action.cheatsheets['all_cheatsheets'].forEach(cheatsheet => newState[cheatsheet.id] = cheatsheet);
      // console.log('GET ALL NEWSTATE', newState);
      return newState;
    };
// todo ——————————————————————————————————————————————————————————————————————————————————
    case GET_ONE: {
      const newState = state;
      newState[action.cheatsheet.id] = action.cheatsheet;
      // console.log('GET ONE NEW STATE', newState);
      return newState;
    };
// todo ——————————————————————————————————————————————————————————————————————————————————
    case UPDATE: {
      const newState = state;
      newState[action.cheatsheet.id] = action.cheatsheet;
      // console.log('UPDATE', newState);
      return newState;
    };
// todo ——————————————————————————————————————————————————————————————————————————————————
    case DELETE: {
      const newState = state;
      delete newState[action.cheatsheetId.id];
      // console.log('ID OF THE DELETED ONE', action.cheatsheetId.id);
      // console.log('NEWSTATE AFTER DELETE', newState);
      return newState;
    }
// todo ——————————————————————————————————————————————————————————————————————————————————
    default:
      return state;
  }
};

export default cheatsheetReducer;
