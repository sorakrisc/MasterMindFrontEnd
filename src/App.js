import React, { Component } from 'react';
import './App.css';
import Game from './Game.js'
import { Router, Route, Switch, browserHistory} from 'react-router'
import { Link } from 'react-router-dom';
import axios from "axios"

class App extends React.Component {

    constructor(props){
        super(props);
        this.state={name: "no value", id: "", lobbyid: "", regform: "none", logform: "block", logClass: "login-form", regClass: "register-form"};
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateInputLobby = this.updateInputLobby.bind(this);
        this.joinLobby = this.joinLobby.bind(this);
        this.createLobby = this.createLobby.bind(this);
    }

    updateInputValue(evt){
        this.setState({name: evt.target.value})
    }

    updateInputLobby(evt){
        this.setState({lobbyid: evt.target.value})
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
                this.props.history.push("/game/"+this.state.name);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    createLobby(e){
        e.preventDefault();
        console.log("in create lobby funtion")
        this.setState({logClass: "login-form hide", regClass: "register-form show"})
    }
    joinLobby(e){
        e.preventDefault();
        console.log("in join lobby")
        this.setState({logClass: "login-form", regClass: "register-form"})


    }
//    animate(e){
//
//        const
//    }
    render() {
        return (
              <div className="App">

                    <header className="App-header">
                        <h1 className="App-title">Welcome to Master mind</h1>
                    </header>

                    <div className="login-page">
                        <div className="form" >
                            <form  className={this.state.regClass} >
                                <input type="text" placeholder="name"/>
                                <div>
                                    <p>Lobby ID:</p>
                                    <textarea readOnly id="code-content" className="lobby-code" ></textarea>
                                </div>
                                <button>create</button>
                                <p className="message">Got a lobby? <a onClick={(e)=>this.joinLobby(e)}>Join a lobby</a></p>
                            </form>

                            <form className={this.state.logClass}>
                                <input type="text" placeholder="name" onChange={this.updateInputValue}/>
                                <input type="text" placeholder="lobby id" onChange={this.updateInputLobby}/>
                                <button onClick ={ (e) => this.onNavigateGame(e) }> Play! </button>
                                <p className="message">No lobby? <a onClick={(e) => this.createLobby(e)}>Create lobby</a></p>
                            </form>

                        </div>
                    </div>
              </div>
        );
    }
}


export default App;
