import React, { Component } from 'react';
import './App.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Router, Route, Switch, browserHistory} from 'react-router';
import './Lobby.css';

import ReactCountdownClock from 'react-countdown-clock'

class Lobby extends React.Component {
    constructor(props){
        super(props);
        this.state={};

    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <h1 style={{"textAlign": "center"}}className="App-title">Welcome to Master mind, {this.props.match.params.name}</h1>
                </header>

                <p></p>
                    <div className="login-page">
                        <div className="form" >

                            <div className="divClock">
                            <ReactCountdownClock className="clock"
                                seconds={10}
                                color="#c5c5c5"
                                alpha={0.9}
                                size={100}
                                weight={5}
                                paused={true}
                            />
                          </div>

                          <div>
                            <p>::PLAYERS::</p>
                          </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Lobby;
