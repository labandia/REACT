import {ActionTypes} from '../constant/index';

export const setCars = (car) => {
    return{
        type: ActionTypes.SETCARS,
        payload: car
    }
}

export const selectedCars = (select) => {
    return{
        type: ActionTypes.SELECTCARS,
        payload: select
    }
}