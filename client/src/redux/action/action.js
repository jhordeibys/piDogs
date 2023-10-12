import {GET_BREEDS, GET_BREEDS_BY_ID} from './actionTypes';


export const getBreeds =()=>{
    return function(dispatch){
        
           fetch('http://localhost:3001/dogs')
           .then(response => response.json())
           .then(data => dispatch({
            type: GET_BREEDS,
            payload: data
           }))

       
    }
};

export const getDetail =(id)=>{
    return function(dispatch){
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(response=> response.json())
        .then(data=> dispatch({
            type: GET_BREEDS_BY_ID,
            payload: data
        }))
    }
};

