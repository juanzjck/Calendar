import React from 'react';
import  WATHER_KEY from '../key';

class Wather extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        main:''
        ,temp: '',
        humidity:'',
        icon:''
     }
    }
    //get the wather filter by date--- the api only give 40 history data, for more https://openweathermap.org/price#history
    getWather=async (e)=>{
        try {
        const apiURL='http://api.openweathermap.org/data/2.5/forecast?q='+e.toLowerCase()+'&appid='+WATHER_KEY;
        var res = await fetch(apiURL);
        var json = await res.json();
        var selectedDateWather;
       
        for(let i=0;i<json.list.length;i++){
            var strings=(json.list[i].dt_txt).split(' ');
            var dateText;
            if(this.props.date.getMonth()+1<10){
                if(this.props.date.getDate()<10){
                    dateText  =this.props.date.getFullYear()+'-0'+(this.props.date.getMonth()+1)+"-0"+this.props.date.getDate();
                }else{
                    dateText  =this.props.date.getFullYear()+'-0'+(this.props.date.getMonth()+1)+"-"+this.props.date.getDate();
                }              
            }
            if(this.props.date.getMonth()+1>=10){
                if(this.props.date.getDate()<10){
                    dateText  =this.props.date.getFullYear()+'-'+(this.props.date.getMonth()+1)+"-0"+this.props.date.getDate();
                }else{
                    dateText  =this.props.date.getFullYear()+'-'+(this.props.date.getMonth()+1)+"-"+this.props.date.getDate();
                }
               
            }
          
        
            if(dateText==strings[0]){
                    selectedDateWather=json.list[i];
            }
        }
       await this.setState(
            {
                main:selectedDateWather.weather[0].main,
                temp:selectedDateWather.main.temp,
                icon:selectedDateWather.weather[0].icon,
                speedWind:selectedDateWather.wind.speed
            }
        )
        }catch(err){
           
        }
       
        
       
      
    }
    componentDidMount() {
        this.getWather(this.props.city);
       
    }
    getWatherUI=()=>{
        return  (this.state.main!='')?<div>
        <label>
            <h5>Wather</h5></label>
        <p>{this.state.main}
            <br/> {this.state.temp}°C
            <br/> {this.state.speedWind}m/s</p>
    </div>:
    <div>
        <label>
            <h5>Wather</h5></label>
        <p>There are no info</p>
    </div>;
    }
    render() { 
        
        return (
            <div>

                  {this.getWatherUI()}

            </div>
         );
    }
}
 
export default Wather;