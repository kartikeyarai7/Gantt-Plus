// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Screens/Home';
import Navigation from './Components/Navigation';
import Resources from './Screens/Resource';
import TestResource from './Archive-Components/TestResource';
import Plan from './Archive-Components/Plan';
import Workload from './Screens/Workload';
import Jobs from './Screens/Jobs';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileScreen from './Screens/ProfileScreen';
import JobScreen from './Screens/JobScreen';
import Report from './Screens/Report';
import 'notyf/notyf.min.css';
import Schedule from './Archive-Components/Schedule';
import LoginScreen from './Screens/Login/LoginScreen';
import ProjectSchedule from './Screens/Project-Schedule/ProjectSchedule';
import React, { useState } from 'react';
import CalendarBPS from './Screens/CalendarBPS/CalendarBPS';
import CalendarBDS from './Screens/CalendarBDS/CalendarBDS';
import { useSelector } from 'react-redux';

function App() {
  // const darkMode = true;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      <Router>
        {userInfo && <Navigation />}

        <main>
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/jobs' component={Jobs} exact />
          <Route path='/resources' component={Resources} exact />
          <Route path='/test-resource' component={TestResource} exact />
          <Route path='/board' component={Plan} exact />
          <Route path='/resource-schedule' component={Workload} exact />
          <Route path='/project-schedule' component={ProjectSchedule} exact />
          <Route path='/activity-calendar-bps' component={CalendarBPS} exact />
          <Route path='/activity-calendar-bds' component={CalendarBDS} exact />
          <Route path='/schedule' component={Schedule} exact />
          <Route path='/report' component={Report} exact />
          <Route path='/resources/:id' component={ProfileScreen} />
          <Route path='/jobs/:id' component={JobScreen} />
          <Route path='/' component={Home} exact />
        </main>
      </Router>
    </>
  );
}

export default App;
