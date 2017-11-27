import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Game from './Game';
import Congrats from './Congrats'
import Test from './test'
import Lobby from './Lobby'

// using CommonJS modules

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom'

function MainApp(){
    return (
     <Router>
        <div>
          <Route path="/login" component={App} />
          <Route path="/game/:lobID/:name" component={Game} />
          <Route path="/congrats/" component={Congrats} />
          <Route path="/lobby/:lobID/:name" component={Lobby}/>
          <Route path="/test" component={Test}/>
        </div>
    </Router>
    )
}

ReactDOM.render(<MainApp />, document.getElementById('root'));
registerServiceWorker();

//axious