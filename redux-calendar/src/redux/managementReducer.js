
import {CHANGE_SHOWFORMNEWREMINDER,ADD_REMINDER,DELETE_REMINDER,CHANGE_REMINDER, CHANGE_SELECTEDDAY, CHANGE_DATEOBJECT} from './constants';
import moment from 'moment';
let store={
    showFormNewreminder:true,
    selectedDay:0,
    dateObject: moment(),
    allmonths :moment.months(),
    reminders:[{Id:0,
        Subject: 'Ejemplo 1', 
        StartTime: new Date(2020,2,12,2,2),
        EndTime: new Date(2020,2,12,2,30), 
        Location: 'quito',
        Description:'This is a exapmle REMINDER', 
        Color:'#FF4500'},]
    };
const managementReducer = (state = store, action) =>{

    switch(action.type){
        case ADD_REMINDER:

          return {...state,
            reminders_length:state.reminders.push(action.playload)        };
  
        break;
        case DELETE_REMINDER:
          
            return state;
        break;
        case CHANGE_REMINDER:
          
            return state;
        break;
        case CHANGE_SELECTEDDAY:
          
            return {...state,
                selectedDay:action.playload
            };
        break;
        case CHANGE_SHOWFORMNEWREMINDER:
          
            return {...state,
                showFormNewreminder:action.playload
            };
        break;
        case CHANGE_DATEOBJECT:
            return {...state,
                dateObject:action.playload
            };
        break;
        default:
         
            return state;
        break;
  
    }
    return state;
  };

  export default managementReducer;