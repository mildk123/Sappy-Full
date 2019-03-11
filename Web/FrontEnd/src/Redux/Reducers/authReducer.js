const reducer = (state = {}, action) => {
    switch (action.type) {

        case 'CHANGE_MODAL': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'USER_TOKEN': {
            return action.payload
        }
        case 'CREATE_USER': {
            return action.payload
        }
        case 'UPDATE_USER': {
            return action.payload
        }
        default: {
            return ``
        }
    }
}

export default reducer
