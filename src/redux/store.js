import { createStore, combineReducers } from 'redux';
import managementReducer from './managementReducer';

//Root reducer
const rootReducer= combineReducers({
    management:managementReducer,
  });


const configureStore = () => {
    return createStore(rootReducer,
         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default configureStore;