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
          
           let yearStored=doc.StartTime.split('-')[0];
           let monthStored=doc.StartTime.split('-')[1];
           let dayStored=doc.StartTime.split('-')[2].split('T')[0];
           
           if((yearStored+monthStored+dayStored)===(year+month+day)){
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
        return(
            this.state.showDetail===true?<div className="popup_New_reminder">
                    <div class="modal-content">
                    <div><a onClick={()=>{
                            this.setState({showDetail:false});         
                    }} className="btn btn-danger">X</a></div>
                            <h1>    
                                    {this.state.reminder.Subject}
                            </h1>
                            <Weather day={this.getDay(this.props.day)} year={this.props.year} month={this.getMonth(this.props.month)}/>
                        </div> 
                </div>:<div></div>
        );
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
    change: (id) => dispatch({
        type: 'change_reminder',
        playload: id
    })
});
const mapStateToProps = state => {

    return {
     
        reminders: state.management.reminders,
  
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Reminder);