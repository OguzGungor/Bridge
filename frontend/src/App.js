import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApplicationRoutes from './route/ApplicationRoutes';
import { withCookies } from 'react-cookie';
import App1 from './responsive_util/App1';

function App() {
  
  return ApplicationRoutes(); 
  //return (<App1/>);
}

export default withCookies(App);
