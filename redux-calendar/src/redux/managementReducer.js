
import {SORT,CHANGE_SHOWFORMNEWREMINDER,ADD_REMINDER,DELETE_REMINDER,CHANGE_REMINDER, CHANGE_SELECTEDDAY, CHANGE_DATEOBJECT} from './constants';
import moment from 'moment';
let store={
    showFormNewreminder:false,
    selectedDay:0,
    dateObject: moment(),
    allmonths :moment.months(),
    reminders:[{Id:0,
        Subject: 'Temprano', 
        StartTime: "2020-03-04T00:00",
        EndTime: "2020-03-04T12:00", 
        Location: 'quito',
        Description:'This is a exapmle REMINDER', 
        Color:'#FF4500'},
        {Id:1,
            Subject: 'Ejemplo 1', 
            StartTime: "2020-03-16T00:00",
            EndTime: "2020-03-16T12:00", 
            Location: 'quito',
            Description:'This is a exapmle REMINDER', 
            Color:'#FF4500'},
            {Id:2,
                Subject: 'Tarde', 
                StartTime: "2020-03-04T12:00",
                EndTime: "2020-03-04T12:00", 
                Location: 'quito',
                Description:'This is a exapmle REMINDER', 
                Color:'#FF4500'},]
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
            var remindersFiltered=[];
            state.reminders.map(doc=>{
                
                if(action.playload==doc.Id){
                   
                
                }else{
                    remindersFiltered.push(doc);
                }
               
            });
            return {...state,
                reminders:remindersFiltered};
        break;
        case CHANGE_REMINDER:
            var reminders=[];
            state.reminders.map(doc=>{
                
                if(action.playload.Id==doc.Id){
                    reminders.push(action.playload);
                
                }else{
                    reminders.push(doc);
                }
               
            });

            return {...state,
            reminders:reminders};
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
        case SORT:
            var remaindersTosort=[];
                state.reminders.map(doc=>{
                    remaindersTosort.push(doc);
                });
          
            for(var i=0;i<Number(remaindersTosort.length);i++){
               
                //alert(remaindersTosort.length+""+i+" "+f);
                    for(var j=0;j<Number(remaindersTosort.length);j++){
                        let iRemainder=remaindersTosort[i].StartTime.split('-')[2].split('T')[1].split(':')[0]+remaindersTosort[i].StartTime.split('-')[2].split('T')[1].split(':')[1];
                        let jReminder =remaindersTosort[j].StartTime.split('-')[2].split('T')[1].split(':')[0]+remaindersTosort[i].StartTime.split('-')[2].split('T')[1].split(':')[1];
                        
                        if(iRemainder<jReminder){
                             
                            let lowDate=remaindersTosort[i]; 
                            let HighDate=remaindersTosort[j]; 
                            remaindersTosort[i]=HighDate;
                            remaindersTosort[j]=lowDate;
                        } 
                    }
            }
            return {...state,
                reminders:remaindersTosort};
            break;

        default:
         
            return state;
        break;
  
    }
    return state;
  };

  export default managementReducer;