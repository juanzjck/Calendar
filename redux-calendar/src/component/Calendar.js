import React,{useState} from 'react';
import moment from 'moment';
import Reminder from './Reminder';
import {
    connect
} from 'react-redux';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {allmonths :moment.months()}

  }
  useForceUpdate =()=>useState()[1];

  firstDayOfMonth = () => {
    let dateObject = this.props.dateObject;
    let firstDay = moment(dateObject)
                 .startOf("month")
                 .format("d"); 
   return firstDay;
  };
  LastDayOfMonth = () => {
    let dateObject = this.props.dateObject;
    let LastDay = moment(dateObject)
                 .endOf("month")
                 .format("d"); 
   return LastDay;
  };
 daysMonthOfBeforeCurrentMonth = () => {
    let monthNo=this.props.dateObject.month()-1;
    let dateObject = moment().set("month", monthNo);
    let daysInMonth = moment(dateObject)
                 .endOf("month")
                 .daysInMonth(); 
   return daysInMonth;
  };
 
  daysMonthOfNextCurrentMonth = () => {
    let monthNo=this.props.dateObject.month()+1;
    let dateObject = moment().set("month", monthNo);
    let daysInMonth = moment(dateObject)
                 .endOf("month")
                 .daysInMonth(); 
   return daysInMonth;
  };
  currentDay = () => {  
    return this.props.dateObject.format("D");
  };
  month = () => {
    return this.props.dateObject.format("MMMM");
  };
  MonthList = props => {

    let months = [];
    props.data.map(data => {
      months.push(
        <td
        key={data}
        className="calendar-month"
        onClick={e => {
          this.setMonth(data);
        }}
      >
        <span>{data}</span>
      </td>
      );
    });
    let rows = [];
      let cells = [];
      months.forEach((row, i) => { 
        if (i % 3 !== 0 || i === 0) { // except zero index 
            cells.push(row); 
        } else { 
            rows.push(cells); 
            cells = [];
            cells.push(row); 
        }
    });
    rows.push(cells); // add last row
    let monthlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
  });
  return (
    <table className="calendar-month">
      <thead>
        <tr>
          <th colSpan="4">Select a Month</th>
        </tr>
      </thead>
      <tbody>{monthlist}</tbody>
    </table>
  );
  }
  
  setMonth = month => {
    let monthNo = moment.months().indexOf(month);// get month number 
    let dateObject = Object.assign({}, this.props.dateObject);
    dateObject = moment(dateObject).set("month", monthNo); // change month value
    this.props.changeDateObject(dateObject);
  };
  setMonthById = month => {
    
    let dateObject = Object.assign({}, this.props.dateObject);
    dateObject = moment(dateObject).set("month", month); // change month value
    this.props.changeDateObject(dateObject);
  };
  createNewreminderForm = () =>{
    let Subject='';
    let locationCity='';
    let reminder='';
    let color='#2f74b5';
    let startDate=this.stringDefaultStartTime();
    let ednDate=this.stringDefaultStartTime();
    return(this.props.showFormNewreminder===true?<div className="popup_New_reminder">
      <div class="modal-content">
        <div><a onClick={()=>{
                    this.props.changeshowFormNewreminder(false);        
        }} className="btn btn-danger">X</a></div>
        <h1>New reminder</h1>
        <label>
           Title
        </label>
        <input class="form-control" type="text" placeholder="..." minLength={1}  maxLength={10}  onChange={e=>{Subject=e.target.value}} required></input>
        <label>
            reminder
        </label>
         <textarea class="form-control" type="text" placeholder="reminder...." minLength={1} onChange={e=>{reminder=e.target.value}}  maxLength={30} required></textarea>
         <label>
           Location (City)
        </label>
         <input class="form-control" type="text" placeholder="City" onChange={e=>{locationCity=e.target.value}}  required></input>
         <label>
           Start time
         </label>
         <input
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            defaultValue={  this.stringDefaultStartTime()}
            onChange={e=>{startDate=e.target.value}}
            InputLabelProps={{
              shrink: true,
            }}
          />
           <label>
           End time
         </label>
         <input
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            defaultValue={  this.stringDefaultEndTime()}
            onChange={e=>{ednDate=e.target.value}}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <label>
            Color
         </label>
         <input type="color" onChange={e=>{color=e.target.value}} defaultValue="#2f74b5" ></input>
                                                                                               
         <button className="newReminderButton btn btn-success" onClick={()=>{this.createNewreminder(Subject,locationCity,reminder,color,ednDate,startDate);}}> Save</button>
        </div>
      </div>
      :
      <div></div>);
  }
  stringDefaultStartTime = ()=>{
    return (this.props.dateObject.month()<=9 && this.props.selectedDay<10?this.props.dateObject.year()+"-0"+(this.props.dateObject.month()+1)+"-0"+this.props.selectedDay+"T00:00"
    :
    this.props.dateObject.month()<9 && this.props.selectedDay>=10?
    this.props.dateObject.year()+"-0"+(this.props.dateObject.month()+1)+"-"+this.props.selectedDay+"T00:00":
    this.props.dateObject.month()>9 && this.props.selectedDay<10?
    this.props.dateObject.year()+"-"+(this.props.dateObject.month()+1)+"-0"+this.props.selectedDay+"T00:00":
    this.props.dateObject.year()+"-"+(this.props.dateObject.month()+1)+"-"+this.props.selectedDay+"T00:00"
    );
  }
  stringDefaultEndTime = ()=>{
    return (this.props.dateObject.month()<=9 && this.props.selectedDay<10?this.props.dateObject.year()+"-0"+(this.props.dateObject.month()+1)+"-0"+this.props.selectedDay+"T12:00"
    :
    this.props.dateObject.month()<=9 && this.props.selectedDay>=10?
    this.props.dateObject.year()+"-0"+(this.props.dateObject.month()+1)+"-"+this.props.selectedDay+"T12:00":
    this.props.dateObject.month()>9 && this.props.selectedDay<10?
    this.props.dateObject.year()+"-"+(this.props.dateObject.month()+1)+"-0"+this.props.selectedDay+"T12:00":
    this.props.dateObject.year()+"-"+(this.props.dateObject.month()+1)+"-"+this.props.selectedDay+"T12:00"
    );
  }
  createNewreminder = (Subject,locationCity,reminder, color,ednDate,startDate) =>{
    let cuantity=this.props.reminders.length;
    let newreminder={
      Id:cuantity,
      Subject: Subject,
      StartTime: startDate,
      EndTime:ednDate , 
      Location: locationCity,
      Description:reminder, 
      Color:color};

      this.props.add(newreminder);
      this.props.sort();
      this.props.changeshowFormNewreminder(false);
   
  

  }
  componentWillMount() {
    this.props.sort();
}
  render() { 
    var weekdays = moment.weekdays();
    let weekdayshortname = weekdays.map(day => {
      return (
        <th key={day} className="week-day">
         {day}
        </th>
      );
   });
   
   //blank space
   let blanks = [];
   let daysOfBeforeMonth=this.daysMonthOfBeforeCurrentMonth();
   for (let i = 0; i < this.firstDayOfMonth(); i++) {
    daysOfBeforeMonth--;
   }
   for (let i = 0; i < this.firstDayOfMonth(); i++) {
    daysOfBeforeMonth++;
     blanks.push(
       <td className="calendar-day empty">{daysOfBeforeMonth}</td>
     );
   
   }
   let blanksNextMonth = [];
   let LasrDayOfCurrentMonth=Number(this.LastDayOfMonth());
   for(let i =0;i< 7-(LasrDayOfCurrentMonth+1);i++ ){
   
    blanksNextMonth.push(
      <td className="calendar-day empty">{i+1}</td>
    );
   }  
   
   //days of the month
   let daysInMonth = [];

    for (let d = 1; d <=this.props.dateObject.daysInMonth(); d++) {
    
      let currentDay = d === moment().toDate().getDate()  ? "today" : "";   
      daysInMonth.push(
        <td key={d}  className={'calendar-day '+ currentDay}>
          
          {d}<div className="reminders-div">
          <Reminder day={d} month={this.props.dateObject.month()} year={this.props.dateObject.year()} />
          
          </div>
         <div className="freespace" onClick={e=>{this.props.changeshowFormNewreminder(true); this.props.changeSelectedDay(d);}}>
              <div>+</div>
           </div>
          </td>
      );}
    //variable
    var totalSlots = [...blanks, ...daysInMonth,...blanksNextMonth];
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row); // if index not equal 7 that means not go to next week
      } else {
        rows.push(cells); // when reach next week we contain all td in last week to rows 
        cells = []; // empty container 
        cells.push(row); // in current loop we still push current row to new container
      }
      if (i === totalSlots.length - 1) { // when end loop we add remain date
        rows.push(cells);
      }
    });
    //total slots
    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    
  return (
  <div>
      
           {this.createNewreminderForm()}
            
    <div className="calendar"> 
    <div className="tail-datetime-calendar">
            <div className="list-group-item-action.list-group-item-light list-group-item ">
            <this.MonthList data={moment.months()} />
            </div>
    </div>
    <table className="calendar-day">
      <thead>
      {weekdayshortname}
      </thead>
      <tbody>
      {daysinmonth}

      </tbody>
    </table>
  </div>
    </div>  );
  }
}

 

const mapStateToProps = state => {

  return {
      reminders: state.management.reminders,
      selectedDay:state.management.selectedDay,
      dateObject:state.management.dateObject,
      showFormNewreminder:state.management.showFormNewreminder,
  }
};

const mapDispatchToProps = dispatch => ({
    add: (reminders) => dispatch({
        type: 'add_reminder',
        playload: reminders
    }),
    delete: (id) => dispatch({
        type: 'delete_reminder',
        playload: id
    }),
    change: (id) => dispatch({
        type: 'change_reminder',
        playload: id
    }),
    changeSelectedDay:(day)=>dispatch({
      type: 'change_selectedday',
      playload: day
     }),
     changeDateObject:(date)=>dispatch({
      type: 'change_dateObject',
      playload: date
     }),
     changeshowFormNewreminder:(value)=>dispatch({
      type: 'change_showFormNewreminder',
      playload: value
     }),
      sort: () => dispatch({
        type: 'sort_reminders',
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(Calendar)