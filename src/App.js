import React, { Component } from 'react';
import './App.css';
import Game from './Game.js'
import { Router, Route, Switch, browserHistory} from 'react-router'
import { Link } from 'react-router-dom';
import axios from "axios"

class App extends React.Component {

  constructor(props){
   super(props);
   this.state={name: "no value", id: ""};
   this.updateInputValue = this.updateInputValue.bind(this);
  }

  updateInputValue(evt){
    //console.log("input field updated with "+evt.target.value);
    //this.state={inputfield: evt.target.value};
    this.setState({name: evt.target.value})

  }

  performGetUserIDRequest(){
      console.log("performing get request")
      console.log(this.state.name)
      return axios.get("http://localhost:8080/login/"+this.state.name)
  }

  onNavigateGame(e){
        e.preventDefault();
        console.log("value of input field : "+this.state.name);
        var js = this.performGetUserIDRequest();
        js.then((response) => {
           console.log("axios return : "+JSON.stringify(response));
           console.log("user: "+ (response.data.userID));
           //this.state.id = response.data.userID
           this.setState({id: response.data.userID})
           console.log(this.state.id)
        }).then(() => {
            console.log(this.state.id)
            var name = this.state.inputfield;
            if (name  == ""){
              this.props.history.push("/game/Anonymous");
            }
            else {
                console.log(this.props.history)
//              this.props.history.push("/game/"+this.state.name+"/"+this.state.id);
            }
        })
        .catch(function (error){
            console.log(error);
        });

//        console.log(this.state.id)
//        var name = this.state.inputfield;
//        if (name  == ""){
//          this.props.history.push("/game/Anonymous");
//        }
//        else {
//          this.props.history.push("/game/"+this.state.id);
//        }


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
              <button onClick ={ (e) => this.onNavigateGame(e) }> Play! </button>
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
