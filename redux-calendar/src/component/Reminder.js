import Weather from './Weather';
import React from 'react';
import moment from 'moment';
import {
    connect
} from 'react-redux';

class Reminder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    getRemainderByDate= (date)=>{

    }
    render() { 
        return (  
        <div>
            
        </div>);
    }
}
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
const mapStateToProps = state => {

    return {
        reminders: state.management.reminders,
  
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Reminder);