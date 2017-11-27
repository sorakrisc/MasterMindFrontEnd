import React, { Component } from 'react';
import './App.css';
import Game from './Game.js'
import { Router, Route, Switch, browserHistory} from 'react-router'
import { Link } from 'react-router-dom';
import axios from "axios"


class App extends React.Component {

    constructor(props){
        super(props);
        this.state={name:"Anonymous"+Math.floor(Math.random()*1000), id: "", lobbyid: "", regform: false, logform: true, logClass: "login-form", regClass: "register-form", active: 0, generatedLobID:"", randomLobStatus:false};
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


    join(e){
        if(this.state.lobbyid.length != 6){
            e.preventDefault();

            alert("BAD LOBBY ID!")
        }
        else {
            e.preventDefault();
            console.log("value of input field : "+this.state.name);
            var js = axios.post("http://localhost:8080/join/"+this.state.lobbyid+"/"+this.state.name);
            js.then((response) => {
                console.log(response)
                if(response.data.lobStatus == "invalid"){
                    alert("Room not found D;")
                }
                if(response.data.nameStatus =="invalid"){
                    alert("Name taken (boring name D:)")
                }
                else{
                    this.props.history.push("/lobby/"+this.state.lobbyid+"/"+this.state.name);

                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    create(e){
        e.preventDefault();
        var js = axios.post("http://localhost:8080/create/"+this.state.generatedLobID+"/"+this.state.name)
        js.then(()=>{
            this.props.history.push("/lobby/"+this.state.generatedLobID+"/"+this.state.name);
        }).catch(function (error){
            console.log(error);
        });

    }

    makeLobbyID(){
        var vowel ="aeiou";
        var consonant = "bcdfghjklmnpqrstvwxyz";
        var randomLobID = consonant[Math.floor(Math.random()*21)]+vowel[Math.floor(Math.random()*5)]+consonant[Math.floor(Math.random()*21)]+consonant[Math.floor(Math.random()*21)]+vowel[Math.floor(Math.random()*5)]+consonant[Math.floor(Math.random()*21)];
        var js = axios.get("http://localhost:8080/isLobIDEmpty/"+randomLobID)
        js.then((response)=>{
            if(response.data.isLobIDEmpty=="true"){
                this.setState({randomLobStatus: true, generatedLobID: randomLobID})
            }
            else{

                return this.makeLobbyID()
            }
        }).catch(function(error){
            console.log(error);
        });
    }

    componentDidUpdate(){

        if(this.state.logform && window.location.href.indexOf("#register-form") !== -1  ){
            this.setState({regClass: "register-form show", logform: false, regform: true, active: this.state.active+1})
            this.makeLobbyID()
        }
        else if (this.state.regform && window.location.href.indexOf("#login-form") !== -1 ){
            this.setState({regClass: "register-form", logform: true, regform: false,active: this.state.active+1})
        }


    }

    render() {
        //so when people access http://localhost:3000/login#register-form directly it make the register page visible
        if(this.state.active == 0 &&this.state.logform && window.location.href.indexOf("#register-form") !== -1 ){
            this.setState({regClass: "register-form show", logform: false, regform: true, active: this.state.active+1})
            this.makeLobbyID()
        }
        return (
            <div className="App">

                <header className="App-header">
                    <h1 className="App-title">Welcome to Master mind</h1>
                </header>

                <div className="login-page">
                    <div className="form" >

                        <form  id="login-form" className={this.state.regClass} >
                            <input type="text" placeholder="name" onChange={this.updateInputValue}/>
                            <div>
                                <p>Your Lobby ID: {this.state.generatedLobID}</p>

                            </div>
                            <button onClick ={ (e) => this.create(e) }>create</button>
                            <p className="message">Got a lobby? <a href="#login-form">Join a lobby</a></p>
                        </form>

                        <form id="register-form" className={this.state.logClass} >
                            <input type="text" placeholder="name" onChange={this.updateInputValue}/>
                            <input type="text" placeholder="lobby id" onChange={this.updateInputLobby}/>
                            <button onClick ={ (e) => this.join(e) }> Join! </button>
                            <p className="message">No lobby? <a href="#register-form" >Create lobby</a></p>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}


export default App;
