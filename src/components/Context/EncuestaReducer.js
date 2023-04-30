const EncuestaReducer = (state, action) => {
    switch (action.type) {
        case "GUARDAR": { return { currentEncuesta: true }; }
        case "BORRAR": { return { currentEncuesta: false } }
        default:
            return state;
    }
}


export default EncuestaReducer