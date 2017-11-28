import React, { Component } from 'react';
import './App.css';
import ReactDom from 'react-dom';
import axios from "./AxiosConfig"

class Congrats extends React.Component {
    constructor(props){
        super(props);
        this.state={itemArray:[]};
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
        console.log("in tick")
        var js = axios.get("/winnerLst/"+this.props.match.params.lobID);
        js.then((response) => {
            console.log(response.data.winnerLst)
            var winnerLst = response.data.winnerLst
            this.createPastGuess(winnerLst)

        }).catch(function (error) {
            console.log(error);
        });

    }
    componentDidMount() {
        this.interval = setInterval(this.tick, 2500);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render(){
        return (

        <div className="login-page">
            <div className="form" >
                <div>
                    <p>::LEADERBOARD {this.props.match.params.lobID}::</p>
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
        )
    }
}

export default Congrats;
