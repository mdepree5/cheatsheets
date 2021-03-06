const LOAD_SEARCH_RESULTS = 'search/LOAD_SEARCH_RESULTS';

const loadSearch = (cheatsheets) => ({
    type: LOAD_SEARCH_RESULTS,
    cheatsheets
})

export const getSearchResults = (keyword) => async (dispatch) => {
    const response = await fetch(`/api/search/${keyword}`, {
        method: 'GET'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSearch(data));
        return data;
    }
    return response
}

const searchReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SEARCH_RESULTS:
            newState = {};
            action.cheatsheets['cheatsheet_by_title'].forEach((cheatsheet) => newState[cheatsheet.id] = cheatsheet);
            return newState;
        default:
            return state
    }
}

export default searchReducer
