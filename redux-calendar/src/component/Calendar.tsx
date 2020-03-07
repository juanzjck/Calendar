
import React from 'react';
import {Inject,ViewDirective,ViewsDirective,ScheduleComponent, Day, Week, WorkWeek,Month, Agenda} from '@syncfusion/ej2-react-schedule';
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns';



 export interface CalendarProps {
     
 }
  
 export interface CalendarState {
     
 }

export default class Calendar  extends React.Component<CalendarProps, CalendarState> {
    constructor(props: CalendarProps) {
        super(props);
        this.state = {  };
    }
    private editorWindowTemplate(props: any):JSX.Element{
        return(<tbody>
            <tbody>
                
            </tbody>
        </tbody>);
    
    }
    
    public render() { 
        return (

            <ScheduleComponent eventSettings={{dataSource:this.props.remainders}} currentView='Month'
            >
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
    }
}
 
