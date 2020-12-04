import React from 'react';
import './App.css';
import {Router, Route, Switch,NavLink} from 'react-router-dom'
import Global from './Components/GlobalData'
import Country from './Components/Country'
import Header from './Components/Header'
import Graphs from './Components/Graphs'
import Details from './Components/Details'
import _404 from './Components/_404'
import history from './Components/History'


function App() {
  
  return (
    <Router history={history}>
      <Header />
      <div style={{display:'inline-flex', marginTop:'50px'}}>
                        <h4><NavLink style={{color:'Black',margin:'10px'}} exact to='/'>Global</NavLink></h4>
                        <h4><NavLink style={{color:'Black',margin:'10px'}}  to="/Countries">Countries</NavLink></h4>
                        <h4><NavLink style={{color:'Black',margin:'10px'}} to='/graph'>Graph</NavLink></h4>
                        {/* <h4><NavLink style={{color:'Black',margin:'10px'}} to='/details'>Detail</NavLink></h4> */}
                        </div>
      <Switch>
        <Route exact path="/" component={Global}></Route>
        <Route path="/Countries" component={Country}></Route>
        <Route path="/graph" component={Graphs}></Route>
        <Route path="/details:index" component={Details}></Route>
        <Route path="**" component={_404}></Route>
      </Switch>
    </Router>
  );
}

export default App;
