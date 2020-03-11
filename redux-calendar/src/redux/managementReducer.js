
import {ADD_REMAINDER,DELETE_REMAINDER,CHANGE_REMAINDER} from './constants';
const managementReducer = (state = {reminders:[{Id:1,Subject: 'Ejemplo 1', StartTime: new Date(2020,2,12,2,2),EndTime: new Date(2020,2,12,2,30), Location: 'quito',Description:'This is a exapmle remainder', Color:'#FF4500'}]}, action) =>{

    switch(action.type){
        case ADD_REMAINDER:
           
          return state;
  
        break;
        case DELETE_REMAINDER:
          
            return state;
        break;
        case CHANGE_REMAINDER:
          
            return state;
        break;
        default:
         
            return state;
        break;
  
    }
    return state;
  };

  export default managementReducer;