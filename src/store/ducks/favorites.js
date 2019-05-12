export const Types = {
    ADD_REQUEST: 'favorites/ADD_REQUEST',
    ADD_SUCCESS: 'favorites/ADD_SUCCESS',
    ADD_FAILURE: 'favorites/ADD_FAILURE'
};

const INITIAL_STATE = {
    loading: false,
    data: [],
    error: false
};

export default function favorites(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.ADD_REQUEST:
            return { ...state, loading: true, error: false };
        case Types.ADD_SUCCESS:
            return { ...state,  data: [...state.data, action.payload.data], loading: false, error: false };
        case Types.ADD_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        default:
            return state;
    }
}

export const Creators = {
    addFavoriteRequest: repository => ({
        type: Types.ADD_REQUEST,
        payload: { repository }
    }),
    addFavoriteSuccess: data => ({
        type: Types.ADD_SUCCESS,
        payload: { data }
    }),
    addFavoriteFailure: error => ({
        type: Types.ADD_FAILURE,
        payload: { error }
    })
};
