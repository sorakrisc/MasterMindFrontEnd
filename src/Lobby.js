import React from 'react';
import './App.css';
import './Lobby.css';
import axios from "./AxiosConfig"

import ReactCountdownClock from 'react-countdown-clock'

class Lobby extends React.Component {
    constructor(props){
        super(props);
        this.state={itemArray:[], playersInLob:0, pausedStatus: true, initialStartTime: 10};


        this.tick = this.tick.bind(this);
        this.unpause=this.unpause.bind(this);
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
        var js = axios.get("/players/"+this.props.match.params.lobID);
        js.then((response) => {
            var playerLst = response.data.playerLst
            this.createPastGuess(playerLst)

        }).catch(function (error) {
            console.log(error);
        });
        var js2 = axios.get("/gamestatus/"+this.props.match.params.lobID);
        js2.then((response) => {
            var gameStatus= response.data.gameStatus
            if (gameStatus==="Started"){
                this.setState({pausedStatus: false, initialStartTime: 5})
                setTimeout(function() {  clearInterval(this.interval)}.bind(this), 10000);
                setTimeout(function(){ this.props.history.push("/game/"+this.props.match.params.lobID+"/"+this.props.match.params.name) }.bind(this) , 10000);
            }
        }).catch(function (error) {
            console.log(error);
        });

    }
    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    unpause(e){
        this.setState({pausedStatus: false})
        axios.post("/gamestatusStart/"+this.props.match.params.lobID)

        setTimeout(function() {  clearInterval(this.interval)}.bind(this), 10000);
        setTimeout(function(){ this.props.history.push("/game/"+this.props.match.params.lobID+"/"+this.props.match.params.name) }.bind(this) , 10000);
    }

    render() {

        return (
            <div>
                <header className="App-header">
                    <h1 style={{"textAlign": "center"}}className="App-title">Welcome to Master mind, {this.props.match.params.name}</h1>
                </header>


                <div className="login-page">
                    <div className="form" >


                        <div className="divClock">
                        <ReactCountdownClock onClick={(e) => this.unpause(e) } className="clock"
                            seconds={10}
                            color="#76b852"
                            alpha={0.9}
                            size={100}
                            weight={4}
                            paused={this.state.pausedStatus}
                            pausedText="Start"


                        />
                        </div>
                        <p style={{color: "#c1c1c1", fontSize: "small"}}>click on start to start race </p>
                        <div>
                            <p>::ALL PLAYERS IN LOBBY {this.props.match.params.lobID}::</p>
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
