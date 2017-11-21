import React, { Component } from 'react';
import './App.css';
import Game from './Game.js'
import { Router, Route, Switch, browserHistory} from 'react-router'
import { Link } from 'react-router-dom';
import axios from "axios"

class App extends React.Component {

  constructor(props){
   super(props);
   this.state={inputfield: "no value"};
   this.handleClick = this.handleClick.bind(this);
   this.updateInputValue = this.updateInputValue.bind(this);
  }

  handleClick(){
   console.log("trying to add picture url");
   console.log("value of input field : "+this.state.inputfield);
   var js = this.performGetUserIDRequest();
   js.then(function (response){
       console.log("axios return : "+JSON.stringify(response));
       console.log("user: "+ (response.data.userID));
       console.log(this.props)
       this.props.router.push("http://localhost:8080/game/"+JSON.stringify(response.data.userID));
   })
   .catch(function (error){
        console.log(error);
   });


  }

  updateInputValue(evt){
    //console.log("input field updated with "+evt.target.value);
    this.state={inputfield: evt.target.value};

  }

  performGetUserIDRequest(){
      console.log("performing get request")
      console.log(this.state.inputfield)
      return axios.get("http://localhost:8080/login/"+this.state.inputfield)
  }
//  performGetUserIDRequest(){
//    console.log("performing get request")
//    console.log(this.state.inputfield)
//    var promise = axios.get("http://localhost:8080/login/"+this.state.inputfield)
//        .then(function (response){
//            console.log("axios return : "+JSON.stringify(response));
//        })
//        .catch(function (error){
//            console.log(error);
//        });
//  }


  onNavigateGame(e){
    e.preventDefault();
    var name = this.state.inputfield;
    if (name  == ""){
      this.props.history.push("/game/Anonymous");
    }
    else {
      this.props.history.push("/game/"+name);
    }


  }

  render() {
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
                <textarea readOnly id="code-content" className="lobby-code" ></textarea>
              </div>
               <button>create</button>
               <p className="message">Already registered? <a href="#">Sign In</a></p>
            </form>

            <form className="login-form">
              <input type="text" placeholder="name" onChange={this.updateInputValue}/>
              <input type="button" value="Play !" id="addpix" onClick={this.handleClick}/>

              <button onClick ={ (e) => this.onNavigateGame(e)}> Play! </button>
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
