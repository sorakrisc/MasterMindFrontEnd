import React, { Component } from 'react';
import './App.css';
import ReactDom from 'react-dom';


//
//randomColor() {
//
//	for (let i = 0; i < 6; i++) {
//		color += alphabet[Math.floor(Math.random() * alphabet.length)]
//	}
//	return color
//}

class Game extends React.Component {


//    Color(){
//        var colour = ["#a93226", "#e67e22", "#f4d03f","#2e86c1", "9b59b6"];  //red orange yellow green blue purple
//
//
//    }





    render(){
        return (

         <div className="Game">
            <h1>Welcome to Master Mind Game, {this.props.match.params.name}</h1>

             <Button />

         </div>
        )
    }
}

class Button extends React.Component{
    constructor(props){
        super(props);
        this.state={
            numClick: 0,
            color0: "White",
            color1: "White",
            color2: "White",
            color3: "White"
        };
    }

    red(){
        var numClick = this.state.numClick%4;
        if (numClick==0) this.setState({color0: "Red"})
        else if (numClick==1) this.setState({color1: "Red"})
        else if (numClick==2) this.setState({color2: "Red"})
        else if (numClick==3) this.setState({color3: "Red"})
//        this.setState({numClick: this.state.numClick+1});
    }
    orange(){
        var numClick = this.state.numClick%4;
        if (numClick==0) this.setState({color0: "Orange"})
        else if (numClick==1) this.setState({color1: "Orange"})
        else if (numClick==2) this.setState({color2: "Orange"})
        else if (numClick==3) this.setState({color3: "Orange"})
//        this.setState({numClick: this.state.numClick+1});
    }
    yellow(){
        var numClick = this.state.numClick%4;
        if (numClick==0) this.setState({color0: "Yellow"})
        else if (numClick==1) this.setState({color1: "Yellow"})
        else if (numClick==2) this.setState({color2: "Yellow"})
        else if (numClick==3) this.setState({color3: "Yellow"})
//        this.setState({numClick: this.state.numClick+1});
    }
    green(){
        var numClick = this.state.numClick%4;
        if (numClick==0) this.setState({color0: "Green"})
        else if (numClick==1) this.setState({color1: "Green"})
        else if (numClick==2) this.setState({color2: "Green"})
        else if (numClick==3) this.setState({color3: "Green"})
//        this.setState({numClick: this.state.numClick+1});
    }
    blue(){
        var numClick = this.state.numClick%4;
        if (numClick==0) this.setState({color0: "Blue"})
        else if (numClick==1) this.setState({color1: "Blue"})
        else if (numClick==2) this.setState({color2: "Blue"})
        else if (numClick==3) this.setState({color3: "Blue"})
//        this.setState({numClick: this.state.numClick+1});
    }
    purple(){
        var numClick = this.state.numClick%4;
        if (numClick==0) this.setState({color0: "Purple"})
        else if (numClick==1) this.setState({color1: "Purple"})
        else if (numClick==2) this.setState({color2: "Purple"})
        else if (numClick==3) this.setState({color3: "Purple"})
//        this.setState({numClick: this.state.numClick+1});
    }
    clear(){
        var numClick = (this.state.numClick-1)%4;
        if (numClick==0) this.setState({color0: "White"})
        else if (numClick==1) this.setState({color1: "White"})
        else if (numClick==2) this.setState({color2: "White"})
        else if (numClick==3) this.setState({color3: "White"})
//        this.setState({numClick: this.state.numClick-1});
    }
    zero(){
        this.setState({numClick: 0})
    }
    one(){
        this.setState({numClick: 1})
    }
    two(){
        this.setState({numClick: 2})
    }
    three(){
        this.setState({numClick: 3})
    }
    render(){

        return (
        <div>
        <div className="Button-Panel">
            <div className="Game2">
              
                <p> </p>
                <button type="button" className="Red" onClick={this.red.bind(this)}> </button>
                <p> </p>
                <button type="button" className="Orange" onClick={this.orange.bind(this)}> </button>
                <p> </p>
                <button type="button" className="Yellow" onClick={this.yellow.bind(this)}> </button>
                <p> </p>
                <button type="button" className="Green" onClick={this.green.bind(this)}> </button>
                <p> </p>
                <button type="button" className="Blue" onClick={this.blue.bind(this)}> </button>
                <p> </p>
                <button type="button" className="Purple" onClick={this.purple.bind(this)}> </button>
            </div>
        </div>

        <div className="Button-Input">
            <div className="buttonIn">

             <button type="button" id="1" className="White" style={{backgroundColor: this.state.color0}} onClick={this.zero.bind(this)}> </button>
             <button type="button" id="2" className="White" style={{backgroundColor: this.state.color1}} onClick={this.one.bind(this)}> </button>
             <button type="button" id="3" className="White" style={{backgroundColor: this.state.color2}} onClick={this.two.bind(this)}> </button>
             <button type="button" id="4" className="White" style={{backgroundColor: this.state.color3}} onClick={this.three.bind(this)}> </button>



            </div>
        </div>
        </div>
        )

    }
}





export default Game;


// send to james by post request telling input colour
// using json to pass parem




















