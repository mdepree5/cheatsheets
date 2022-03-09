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
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    console.log('addcomment thunk @@@@@@@@@@@@', response)

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

    if (response.ok) {
        const data = await response.json();
        dispatch(remove(data));
        return data;
    }
    return response
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
            delete newState[ action.commentId ];
            return newState;
        case EDIT:
            newState = { ...state };
            newState[ action.comment.id ] = action.comment;
            return newState;
        default:
            return state
    }
}


export default commentReducer;
