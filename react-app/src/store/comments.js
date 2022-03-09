const LOAD = '/comments/LOAD';
const ADD = '/comments/ADD';
const DELETE = '/comments/DELETE';
const EDIT = '/comments/EDIT';

const load = (comments) => ({
    type: LOAD,
    comments
});

const add = (comment) => ({
    type: ADD,
    comment
});

const remove = (id) => ({
    type: DELETE,
    id
});

const edit = (comment) => ({
    type: EDIT,
    comment
});


export const getComment = (id) => async (dispatch) => {
    const response = await fetch(`/api/cheatsheets/${id}/comments`);
    if (response.ok) {
        const data = await response.json();
        dispatch(load(data));
        return data;
    }
};

export const addComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/new_comment`, {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(add(data.comment));
        return data;
    }
    return response
}

export const deleteComment = (payload) => async (dispatch) => {
    const response = await fetch(`/api/${payload.id}/comments/${payload.commentId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(remove(payload.commentId));
        return;
    }
}


export const editComment = (comment, commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(edit(data));
        return data;
    }
}


const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD:
            newState = {...state};
            action.cheatsheets['all_cheatsheets'].forEach(
                cheatsheet => newState[cheatsheet.id] = cheatsheet);
            return newState;
        case ADD:
            newState = { ...state };
            newState[action.comment.id] = action.comment;
            return newState;
        case DELETE:
            newState = { ...state };
            delete newState[action.commentId];
            return newState;
        case EDIT:
            newState = { ...state };
            newState[action.commment.id] = action.comment;
            return newState;
        default:
            return state
    }
}

export default commentReducer;
