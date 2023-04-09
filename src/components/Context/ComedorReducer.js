const ComedorReducer = (state, action) => {
    switch (action.type) {
        case "SET": { return { currentDinner: action.payload }; }
        case "UNSET": { return { currentDinner: null } }
        case "UPDATE": { return { currentDinner: action.payload }; }
        default:
            return state;
    }
}


export default ComedorReducer