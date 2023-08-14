//this is  a class based web app ...........
//constructor - render - componentdidmount {run sequence}

import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';


export default class App extends Component {
  
  render() {
    return (
      <div>
        <Navbar/>
        <News pageSize={5} country="in" category="science"/>
      </div>
    )
  }
}
