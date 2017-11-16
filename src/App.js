import React, { Component } from 'react';
import './App.css';
import Game from './Game.js'
import { Router, Route, Switch, browserHistory} from 'react-router'
import { Link } from 'react-router-dom';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.makeid.bind(this);
    this.state = { random: '' };
    this.isSelected =  false
  }

//  handleLoginClick() {
//      this.setState({isSelected: true});
//      this.props.history.push("/someNewPage");
//   }


   getName(){
    this.props.history.push("/game");

   }
  makeid() {
      var text = "";
      var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 4; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log("HI")

    this.setState({random: this.state.random = text})

    }

  render() {

    const isSelected = this.state.isSelected;
    return (
      <div className="App">

        <header className="App-header">

          <h1 className="App-title">Welcome to Master mind</h1>
        </header>
        <div className="login-page">
          <div className="form">
             <form className="register-form" >
              <input type="text" placeholder="name"/>
              <div>
                <p>Lobby ID:</p>
                <textarea readonly id="code-content" className="lobby-code" ></textarea>
              </div>
               <button>create</button>
               <p className="message">Already registered? <a href="#">Sign In</a></p>
            </form>

            <form className="login-form">
              <input type="text" placeholder="name"/>
              <Link to='/game'><button>Play !</button></Link>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

//param to push login name
//history

export default App;
