export const initialState = { user: null };

const reducer = (state, action) => {
    switch (action.type) {
        case "set_user":
            return {
                user: action.user
            };
        case "sign_out":
            return {
                user: action.user
            }
        default:
            return state;
    }
}

export default reducer;