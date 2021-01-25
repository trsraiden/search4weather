import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Main from './components/Main'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='appBody'>
    <Router>
      <Switch>
        <Route path="/" component={Main}/>
      </Switch>
    </Router>
    <Footer/>
    </div>
  );
}

export default App;
