import React from 'react';
import  weather_KEY from '../key';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        main:''
        ,temp: '',
        humidity:'',
        icon:''
     }
    }
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
    //get the weather filter by date--- the api only give 40 history data, for more https://openweathermap.org/price#history
    getweather=async (e)=>{
        try {
        const apiURL='http://api.openweathermap.org/data/2.5/forecast?q='+e.toLowerCase()+'&appid='+weather_KEY;
        var res = await fetch(apiURL);
        var json = await res.json();
        var selectedDateweather=null;
        var dateText=""+this.props.year+"-"+this.props.month+"-"+this.props.day;
          
        for(let i=0;i<json.list.length;i++){
            var strings=(json.list[i].dt_txt).split(' ');
         
            if(dateText===strings[0]){
      
                    selectedDateweather=json.list[i];
                    break;
            }
           
        }
   
        if(selectedDateweather!==null){
           
            await this.setState(
                {
                    main:selectedDateweather.weather[0].main,
                    temp:selectedDateweather.main.temp,
                    icon:selectedDateweather.weather[0].icon,
                    speedWind:selectedDateweather.wind.speed
                }
            )
        }
        //get current weather
        if(selectedDateweather===null){
                
                 var today = new Date();
                 
                if (dateText===(today.getFullYear()+"-"+this.getMonth(today.getMonth())+"-"+this.getDay(today.getDate()))){
                    const apiURLCurrentWeather='http://api.openweathermap.org/data/2.5/weather?q='+e.toLowerCase()+'&appid='+weather_KEY;
                     res = await fetch(apiURLCurrentWeather);
                     json = await res.json();

                    await this.setState(    
                        {
                            main:json.weather[0].main,
                            temp:json.main.temp,
                            icon:json.weather[0].icon,
                            speedWind:json.wind.speed
                        }
                    )     
                }

        }
   
        }catch(err){
           
        }
       
        
       
      
    }
    componentDidMount() {
        this.getweather(this.props.city);
       
    }
    getweatherUI=()=>{
        return  (this.state.main!=='')?<div className="weather">
        <label>
            <h5>weather</h5></label>
           <div>
           <img src={"http://openweathermap.org/img/wn/"+this.state.icon+"@2x.png"}/>
            <p>{this.state.main}</p>
            <p><span>Temp:</span> {this.state.temp}°C </p>
            <p><span>wind's speed: </span>{this.state.speedWind}m/s</p>
           </div>
          
    </div>:
    <div>
        <label>
            <h5>weather</h5></label>
        <p>There are no info</p>
    </div>;
    }
    render() { 
        
        return (
            <div>

                  {this.getweatherUI()}

            </div>
         );
    }
}
 
export default Weather;