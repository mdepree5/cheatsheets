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
    const response = await fetch(`/api/comments/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(load(data));
        return data;
    }
    return response
};

export const addComment = (payload) => async (dispatch) => {
    const response = await fetch(`/api/comments/new_comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    let data;
    if (response.ok) {
        data = await response.json();
        dispatch(add(data));
        return data;
    }
    return response

}

export const deleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })
    console.log('deletecomment thunk response@@@@@@@@', response)
    if (response.ok) {
        const data = await response.json();
        dispatch(remove(data));
        return data;
    }
    return response
}



export const editComment = (payload) => async (dispatch) => {
    const response = await fetch(`/api/comments/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    console.log('editcomment thunk response@@@@@@@@', response)
    if (response.ok) {
        const data = await response.json();
        dispatch(edit(data));
        return data;
    }
}


const initialState = {};

const commentReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD:
            newState = { ...state };
            action.comments['cheetsheet_comments'].forEach((comment) => newState[comment.id] = comment);
            return newState;
        case ADD:
            newState = {};
            newState[action.comment.id] = action.comment;
            return newState;
        case DELETE:
            newState = { ...state };
            console.log('%%%%%',newState)
            console.log('action commentid', action.id.commentId)
            delete newState[ action.id.commentId ];
            return newState;
        case EDIT:
            newState = { ...state };
            newState[ action.comment.comment.id ] = action.comment;
            return newState;
        default:
            return state
    }
}


export default commentReducer;
