
import React from 'react';
import './App.css';
import Calendar from './component/Calendar';
import {Provider} from 'react-redux';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'react-open-weather/lib/css/ReactWeather.css';

/*
import mapStateToProps from './store/mapStateToProps';
import store from './store/store';
import mapDispatchToProps from './store/mapDispatchToProps';
const ConnectedCalendar=connect(mapStateToProps,mapDispatchToProps)(Calendar);*/
import configureStore from './redux/store';
const store = configureStore();
const App=()=> (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
          <Calendar />
        </Provider>          
      </header>
    </div>
);
 


export default App;
