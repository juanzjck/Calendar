import React from 'react';
import moment from 'moment';
import reminder from './Reminder';
import {
    connect
} from 'react-redux';




class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dateObject: moment(), allmonths :moment.months(), showFormNewreminder:false, selectedDay:0}
  }
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
                 .startOf("month")
                 .format("d"); 
   return firstDay;
  };
  currentDay = () => {  
    return this.state.dateObject.format("D");
  };
  month = () => {
    return this.state.dateObject.format("MMMM");
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
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo); // change month value
    this.setState({
      dateObject: dateObject // add to state
    });
    alert(dateObject);
  };
  createNewreminderForm = () =>{
    let Subject='';
    let locationCity='';
    let reminder='';
    let color='#fff';
    return(this.state.showFormNewreminder===true?<div class="popup_New_reminder">
      <div class="modal-content">
        <div><a onClick={()=>{
                    let dateObject=this.state.dateObject;
                    let allmonths=this.state.allmonths;
                    let showFormNewreminder=false;
                    let oldDay=this.state.selectedDay;
                    this.setState({dateObject,allmonths,showFormNewreminder,selectedDay:oldDay});
        }} className="btn btn-danger">X</a></div>
        <h1>New reminder</h1>
        <label>
           Title
        </label>
        <input class="form-control" type="text" placeholder="..." minLength={1}  maxLength={30}  onChange={e=>{Subject=e.target.value}} required></input>
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
           
            InputLabelProps={{
              shrink: true,
            }}
          />
          <label>
            Color
         </label>
         <input type="color" onChange={e=>{color=e.target.value}}></input>
         <button className="newReminderButton btn btn-success" onClick={()=>{this.createNewreminder(1,Subject,locationCity,reminder,color);}}> Save</button>
        </div>
      </div>
      :
      <div></div>);
  }
  stringDefaultStartTime = ()=>{
    return (this.state.dateObject.month()<=9 && this.state.selectedDay<10?this.state.dateObject.year()+"-0"+(this.state.dateObject.month()+1)+"-0"+this.state.selectedDay+"T10:30"
    :
    this.state.dateObject.month()<=9 && this.state.selectedDay>=10?
    this.state.dateObject.year()+"-0"+(this.state.dateObject.month()+1)+"-"+this.state.selectedDay+"T00:00":
    this.state.dateObject.month()>9 && this.state.selectedDay<10?
    this.state.dateObject.year()+"-"+(this.state.dateObject.month()+1)+"-0"+this.state.selectedDay+"T00:00":
    this.state.dateObject.year()+"-"+(this.state.dateObject.month()+1)+"-"+this.state.selectedDay+"T00:00"
    );
  }
  stringDefaultEndTime = ()=>{
    return (this.state.dateObject.month()<=9 && this.state.selectedDay<10?this.state.dateObject.year()+"-0"+(this.state.dateObject.month()+1)+"-0"+this.state.selectedDay+"T10:30"
    :
    this.state.dateObject.month()<=9 && this.state.selectedDay>=10?
    this.state.dateObject.year()+"-0"+(this.state.dateObject.month()+1)+"-"+this.state.selectedDay+"T12:00":
    this.state.dateObject.month()>9 && this.state.selectedDay<10?
    this.state.dateObject.year()+"-"+(this.state.dateObject.month()+1)+"-0"+this.state.selectedDay+"T12:00":
    this.state.dateObject.year()+"-"+(this.state.dateObject.month()+1)+"-"+this.state.selectedDay+"T12:00"
    );
  }
  createNewreminder = (day,Subject,locationCity,reminder, color) =>{
    alert(this.state.selectedDay+" \n"+Subject+" \n"+locationCity+" \n"+reminder+" \n"+this.state.dateObject.year()+"-"+day+"-"+this.state.dateObject.month());
    let cuantity=this.props.reminders.length;
    let newreminder={
      Id:cuantity,
      Subject: Subject,
      StartTime: new Date(2020,2,12,2,2),
      EndTime: new Date(2020,2,12,2,30), 
      Location: locationCity,
      Description:reminder, 
      Color:color};
      this.props.add(newreminder);

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
   for (let i = 0; i < this.firstDayOfMonth(); i++) {
     blanks.push(
       <td className="calendar-day empty">{""}</td>
     );
   }
   //days of the month
   let daysInMonth = [];
  
    for (let d = 1; d <=this.state.dateObject.daysInMonth(); d++) {
      let currentDay = d === this.currentDay() ? "today" : "";   
      daysInMonth.push(
        <td key={d}   onClick={e=>{
          let dateObject=this.state.dateObject;
          let allmonths=this.state.allmonths;
          let showFormNewreminder=!this.state.showFormNewreminder;
          this.setState({dateObject,allmonths,showFormNewreminder,selectedDay:d});
          
        }} className={'calendar-day '+ currentDay}>
          
          {d}
          <reminder/>
        </td>
      );}
    //variable
    var totalSlots = [...blanks, ...daysInMonth];
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
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(Calendar)