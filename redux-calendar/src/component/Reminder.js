import Weather from './Weather';
import React from 'react';
import moment from 'moment';
import {
    connect
} from 'react-redux';

class Reminder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showDetail:false }
    }
 
    getRemainderByDate= (day,month,year)=>{
        var  remainders=[];

        
        remainders= this.props.reminders.map( (doc)=>{
            //start
           let yearStored=doc.StartTime.split('-')[0];
           let monthStored=doc.StartTime.split('-')[1];
           let dayStored=doc.StartTime.split('-')[2].split('T')[0];
           //end 
           let endYearStored=doc.EndTime.split('-')[0];
           let endMonthStored=doc.EndTime.split('-')[1];
           let endDayStored=doc.EndTime.split('-')[2].split('T')[0];
           
           if((yearStored+monthStored+dayStored)===(year+month+day) ||  Number(month)>=Number(monthStored)  && Number(month)<=Number(endMonthStored) && Number(year)>=Number(yearStored) && Number(year)<=Number(endYearStored)  && day<=Number(endDayStored) && day>=Number(dayStored)){
              // alert(yearStored+monthStored+day+ "work but somewhere are a bug");
            return(<div className="reminder" onClick={(e)=>{this.getDetail(doc)}} style={{background:(""+doc.Color), textAlign:'center', color:'#ffff', padding:'1px'}}>
                    {doc.Subject}
                </div>);
           }
           
       });
        return remainders;
    }
    getDetail=(reminder)=>{
            this.setState({showDetail:true, reminder:reminder});
    };
    getDay = (day)=>{
        return(
            day<=9?("0"+day):(""+day)
        );
    }
    getMonth = (month)=>{
        return(
            month<9?("0"+(month+1)):(""+(month+1))
        );
    }
    detailReminder=()=>{
        let Subject;
        let locationCity;
        let reminder;
        let color;
        let startDate;
        let ednDate;
        if(this.state.showDetail===true){
            Subject=this.state.reminder.Subject;
           locationCity=this.state.reminder.Location;
            reminder=this.state.reminder.Description;
            color=this.state.reminder.Color;
             startDate=this.state.reminder.StartTime;
             ednDate=this.state.reminder.EndTime;
        }
      
        return(
            this.state.showDetail===true?<div className="popup_New_reminder">
                    <div class="modal-content">
                    <div><a onClick={()=>{
                            this.setState({showDetail:false});         
                    }} className="btn btn-danger">X</a></div>
                            <h1>    
                                    {this.state.reminder.Subject}
                            </h1>

                            <Weather city={this.state.reminder.Location} day={this.getDay(this.props.day)} year={this.props.year} month={this.getMonth(this.props.month)}/>
                            <label>
                            Title (Subject)
                            </label>
                            <input class="form-control" type="text" placeholder="..." minLength={1}  maxLength={10}  onChange={e=>{Subject=e.target.value}} defaultValue={this.state.reminder.Subject} required></input>
                            <label>
                                reminder
                            </label>
                            <textarea class="form-control" type="text" placeholder="reminder...." minLength={1} onChange={e=>{reminder=e.target.value}}  maxLength={30} defaultValue={this.state.reminder.Description} required></textarea>
                            <label>
                            Location (City)
                            </label>
                            <input class="form-control" type="text" placeholder="City" onChange={e=>{locationCity=e.target.value}} defaultValue={this.state.reminder.Location}  required></input>
                            <label>
                            Start time
                            </label>
                            <input
                                id="datetime-local"
                                label="Next appointment"
                                type="datetime-local"
                                defaultValue={this.state.reminder.StartTime}
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
                                defaultValue={this.state.reminder.EndTime}
                                onChange={e=>{ednDate=e.target.value}}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            <label>
                                Color
                            </label>
                            <input type="color" onChange={e=>{color=e.target.value}} defaultValue={this.state.reminder.Color} ></input>
                            <div className="buttonDiv">
                                <button className="newReminderButton actionsButton btn btn-success" onClick={()=>{this.Changereminder(Subject,locationCity,reminder,color,ednDate,startDate);}}> Save</button>
                                <button onClick={()=>{this.DeleteReminder()}} type="button" class="delete actionsButton btn btn-danger">Delete</button>
                            
                            </div>                                                                                  
                           </div> 
                </div>:<div></div>
        );
    }
   Changereminder=(Subject,locationCity,reminder,color,ednDate,startDate)=>{
    let newreminder={
        Id:this.state.reminder.Id,
        Subject: Subject,
        StartTime: startDate,
        EndTime:ednDate , 
        Location: locationCity,
        Description:reminder, 
        Color:color};
       
    this.props.change(newreminder); 
    this.setState({showDetail:false});  
    this.props.sort();   
    }
    DeleteReminder=()=>{
           this.props.delete(this.state.reminder.Id);
           this.setState({showDetail:false});
    }
    render() { 
        return (  
            
        <div className="reminders">
             {this.detailReminder()}
            {this. getRemainderByDate(this.getDay(this.props.day),this.getMonth(this.props.month),this.props.year)}
          
        </div>);
    }
}
const mapDispatchToProps = dispatch => ({
    delete: (id) => dispatch({
        type: 'delete_reminder',
        playload: id
    }),
    change: (reminder) => dispatch({
        type: 'change_reminder',
        playload: reminder
    }),  sort: () => dispatch({
        type: 'sort_reminders',
    })
});
const mapStateToProps = state => {

    return {
     
        reminders: state.management.reminders,
  
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Reminder);