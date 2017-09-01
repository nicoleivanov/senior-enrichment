'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Routes from './Routes.js'
import Navbar from './components/Navbar.js'

console.log("in main.js")

ReactDOM.render (
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('main')
);