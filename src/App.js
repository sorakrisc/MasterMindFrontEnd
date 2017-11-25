import React, { Component } from 'react';
import './App.css';
import Game from './Game.js'
import { Router, Route, Switch, browserHistory} from 'react-router'
import { Link } from 'react-router-dom';
import axios from "axios"


class App extends React.Component {

    constructor(props){
        super(props);
        this.state={name: "no value", id: "", lobbyid: "", regform: false, logform: true, logClass: "login-form", regClass: "register-form", active: 0, generatedLobID:""};
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateInputLobby = this.updateInputLobby.bind(this);
        this.makeLobbyID = this.makeLobbyID.bind(this);

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
    makeLobbyID(){
        var vowel ="aeiou";
        var consonant = "bcdfghjklmnpqrstvwxyz";
        return consonant[Math.floor(Math.random()*21)]+vowel[Math.floor(Math.random()*5)]+consonant[Math.floor(Math.random()*21)]+consonant[Math.floor(Math.random()*21)]+vowel[Math.floor(Math.random()*5)]+consonant[Math.floor(Math.random()*21)];
    }
    componentDidUpdate(){

        if(this.state.logform && window.location.href =="http://localhost:3000/login#register-form" ){
            this.setState({regClass: "register-form show", logform: false, regform: true, active: this.state.active+1, generatedLobID: this.makeLobbyID()})
        }
        else if (this.state.regform && window.location.href =="http://localhost:3000/login#login-form"){
            this.setState({regClass: "register-form", logform: true, regform: false,active: this.state.active+1})
        }


    }

    render() {
        //so when people access http://localhost:3000/login#register-form directly it make the register page visible
        if(this.state.active == 0 &&this.state.logform && window.location.href =="http://localhost:3000/login#register-form" ){
            this.setState({regClass: "register-form show", logform: false, regform: true, active: this.state.active+1, generatedLobID: this.makeLobbyID()})
        }
        return (
            <div className="App">

                <header className="App-header">
                    <h1 className="App-title">Welcome to Master mind</h1>
                </header>

                <div className="login-page">
                    <div className="form" >

                        <form  id="login-form" className={this.state.regClass} >
                            <input type="text" placeholder="name"/>
                            <div>
                                <p>Lobby ID: {this.state.generatedLobID}</p>

                            </div>
                            <button>create</button>
                            <p className="message">Got a lobby? <a href="#login-form">Join a lobby</a></p>
                        </form>

                        <form id="register-form" className={this.state.logClass} >
                            <input type="text" placeholder="name" onChange={this.updateInputValue}/>
                            <input type="text" placeholder="lobby id" onChange={this.updateInputLobby}/>
                            <button onClick ={ (e) => this.onNavigateGame(e) }> Play! </button>
                            <p className="message">No lobby? <a href="#register-form" >Create lobby</a></p>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}


export default App;
