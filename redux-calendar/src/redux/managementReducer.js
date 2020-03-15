
import {CHANGE_SHOWFORMNEWREMINDER,ADD_REMINDER,DELETE_REMINDER,CHANGE_REMINDER, CHANGE_SELECTEDDAY, CHANGE_DATEOBJECT} from './constants';
import moment from 'moment';
let store={
    showFormNewreminder:false,
    selectedDay:0,
    dateObject: moment(),
    allmonths :moment.months(),
    reminders:[{Id:0,
        Subject: 'Ejemplo 1', 
        StartTime: "2020-03-04T00:00",
        EndTime: "2020-03-04T12:00", 
        Location: 'quito',
        Description:'This is a exapmle REMINDER', 
        Color:'#FF4500'},
        {Id:1,
            Subject: 'Ejemplo 1', 
            StartTime: "2020-03-04T00:00",
            EndTime: "2020-03-04T12:00", 
            Location: 'quito',
            Description:'This is a exapmle REMINDER', 
            Color:'#FF4500'},
            {Id:2,
                Subject: 'Ejemplo 1', 
                StartTime: "2020-03-04T00:00",
                EndTime: "2020-03-04T12:00", 
                Location: 'quito',
                Description:'This is a exapmle REMINDER', 
                Color:'#FF4500'}]
    };
const managementReducer = (state = store, action) =>{

    switch(action.type){
        case ADD_REMINDER:
          var newReminder=[];
          state.reminders.map(doc=>{
            newReminder.push(doc);
          });
          newReminder.push(action.playload);
          return {...state,
            reminders:newReminder};
  
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