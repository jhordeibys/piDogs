//importar las accion-types
import {GET_BREEDS, GET_BREEDS_BY_ID, GET_TEMPERAMENT} from '../action/actionTypes';


let inicialState = {
    breeds: [],
    detail:{},
    temperament:[]
};

//definir las funciones

function reducer(state=inicialState, action){
    switch(action.type){
        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload,
                
            };

        case GET_BREEDS_BY_ID:
            return{
                ...state,
                detail: action.payload,
            }

        case GET_TEMPERAMENT:
            return{
                ...state,
                temperament: action.payload,
            }
           
        default:
            return{...state}
    }
};

export default reducer;