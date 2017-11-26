import React, { Component } from 'react';
import './App.css';
import { Router, Route, Switch, browserHistory} from 'react-router';
import './Lobby.css';
import axios from "axios"

import ReactCountdownClock from 'react-countdown-clock'

class Lobby extends React.Component {
    constructor(props){
        super(props);
        this.state={secondsElapsed: 0, itemArray:[], playersInLob:0};


        this.tick = this.tick.bind(this);

    }
    generatePlayersDiv(name){
    const html =
        name.map(n =>
            (
                <div>
                    <p>{n}</p>
                </div>
            )
        )

        return(
            <div>
                {html}
            </div>
        )

    }
    createPastGuess(name) {
      var item = this.state.itemArray;
      const html = this.generatePlayersDiv(name);
      item = [{html}]

      this.setState({itemArray: item})
    }
    tick() {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
        var js = axios.get("http://localhost:8080/players/"+this.props.match.params.lobID);
        js.then((response) => {
            var playerLst = response.data.playerLst
            console.log(playerLst)

            this.createPastGuess(playerLst)

        }).catch(function (error) {
            console.log(error);
        });

    }
    componentDidMount() {
        console.log("yoyo")
        this.interval = setInterval(this.tick, 5000);
    }
    componentWillUnmount() {
        console.log("heyhey")
        clearInterval(this.interval);
    }

    render() {
        console.log(this.state.itemArray)
        return (
            <div>
                <header className="App-header">
                    {this.state.secondsElapsed}
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
                                <div className="Overview">
                                     <div>

                                       {this.state.itemArray.map((item, index) => {
                                         return (
                                           <div className="box" key={index}>
                                               <div>

                                                {item.html}

                                              </div>
                                           </div>
                                         )
                                       })}
                                     </div>
                                </div>
                          </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Lobby;
