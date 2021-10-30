import { combineReducers } from "redux";
import { Productsreducer } from './productsreducer';
import { CatergoryReducer} from './categoryreducer'
import { Cartreducers } from '../reducers/cartreducers'


const rootReducer = combineReducers({
    products: Productsreducer,
    category: CatergoryReducer,
    cart: Cartreducers
})

export default rootReducer;