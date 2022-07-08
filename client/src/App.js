import React,{Component,useEffect} from 'react';
import { Router,Switch,Route} from 'react-router-dom';
import Login from './components/Login';
import Admin_navbar from './components/Admin_navbar';
import history from './history';
import User_navbar from './components/User_navbar';

 function App(){
  
  
  return (
      <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Admin_navbar" component={Admin_navbar}/>
        <Route path="/User_navbar" component={User_navbar}/>
      </Switch>
      </Router>
  )
}
export default App