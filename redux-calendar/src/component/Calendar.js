
import React from 'react';
import {Inject,ViewDirective,ViewsDirective,ScheduleComponent, Day, Week, WorkWeek,Month, Agenda} from '@syncfusion/ej2-react-schedule';
const Calendar = (props) => (
    <ScheduleComponent eventSettings={{dataSource:props.remainders}} currentView='Month'>
         <ViewsDirective>
         <ViewDirective option='Month' />
        <ViewDirective option='Day' />
        <ViewDirective option='Week' />
        <ViewDirective option='WorkWeek' />
      
        <ViewDirective option='Agenda' />
         </ViewsDirective>
        <Inject services={[Month,Day,Week,WorkWeek,Agenda]} />
    </ScheduleComponent>


);
   
         

 
export default Calendar;