const LOAD = '/steps/LOAD';
const ADD = '/steps/ADD';
const DELETE = '/steps/DELETE';
const EDIT = '/steps/EDIT';


const loadSteps = steps => {
    return {
        type: LOAD,
        steps
    }
}

const addStep = step => {
    return {
        type: ADD,
        step
    }
}

const removeStep = steps => {
    return {
        type: DELETE,
        steps
    }
}

const editStep = steps => {
    return {
        type: EDIT,
        steps
    }
}


export const getStep = (cheatsheetId) => async (dispatch) => {
    const response = await fetch(`/api/steps/${cheatsheetId}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSteps(data));
        return data;
    }
}

export const newStep = (payload) => async (dispatch) => {
    const response = await fetch(`/api/steps/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    let data;
    if (response.ok) {
        data = await response.json();
        dispatch(addStep(data));
        return data;
    }
}

export const updateStep = (payload) => async (dispatch) => {
    const response = await fetch(`/api/steps/${payload.stepId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(editStep(data));
        return data;
    }
}

export const deleteStep = (payload) => async (dispatch) => {
    const response = await fetch(`/api/steps/${payload.stepId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(removeStep(payload));
        return;
    }
}




const stepsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD:
            newState = { ...state };
            action.steps['all_steps'].forEach((step) => newState[step.id] = step);
            return newState;
        case ADD:
            newState = { ...state };
            newState[action.step.id] = action.step;
            console.log('ASDFASFDSAFA', newState)
            return newState;
        case DELETE:
            newState = { ...state };
            delete newState[ action.stepId ];
            return newState;
        case EDIT:
            newState = { ...state };
            newState[ action.step.id ] = action.step;
            return newState;
        default:
            return state
    }
}

export default stepsReducer;
