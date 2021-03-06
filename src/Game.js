import React from 'react';
import './Game.css';
import axios from "./AxiosConfig"

class Game extends React.Component {

    constructor(props){
        super(props);
        this.state={secondsElapsed: 0};
        this.tick = this.tick.bind(this);
        this.onUnload = this.onUnload.bind(this);
    }
    tick() {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    }

    onUnload(e) { // the method that will be used for both add and remove event
        axios.post("/myTimeElapsed/"+this.props.match.params.name+"/"+this.state.secondsElapsed)

        var message = "Your confirmation message goes here.";
        e = e || window.event;
        // For IE and Firefox
        if (e) {
        e.returnValue = message;
        }

        // For Safari
        return message;
    }


    componentDidMount() {
        document.body.style.overflow = "scroll"
        var js = axios.get("/isUserInTimeMap/"+this.props.match.params.name)
        js.then((response) =>{
            this.setState({secondsElapsed: response.data.timeElapsed});
        }).catch(function (error){
            console.log(error)
        });
        this.interval = setInterval(this.tick, 1000);
        window.addEventListener("beforeunload", this.onUnload)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        window.removeEventListener("beforeunload", this.onUnload)
    }
    checkTimeUsed(){
        var js = axios.get("/checkTimeUsed/"+this.props.match.params.name)

        js.then((response) => {
            this.setState({secondsElapsed:response.data.timeUsed})
        }).catch(function (error){
            console.log(error);
        });
    }



    render(){
        return (

         <div className="Game" style={{overflow: "scroll"}}>
             <header className="App-header">
                 <h1 className="App-title">Welcome to Master mind, {this.props.match.params.name}</h1>
                 <h2> Time Elapsed: {this.state.secondsElapsed}</h2>
             </header>



            <Button url = {this.props.match.params} history = {this.props.history} time = {this.state.secondsElapsed}/>


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
            color3: "White",
            white: "0",
            red: "0",
            ansColor0: "grey",
            ansColor1: "grey",
            ansColor2: "grey",
            ansColor3: "grey",
            checkCount: 0,
            itemArray: []
        };

    }

    changeColor(color){
        var numClick = this.state.numClick%4;
        if (numClick===0) this.setState({color0: color})
        else if (numClick===1) this.setState({color1: color})
        else if (numClick===2) this.setState({color2: color})
        else if (numClick===3) this.setState({color3: color})
        this.setState({numClick: this.state.numClick+1});
    }

    clear(){
        this.setState({
            numClick: 0,
            color0: "White",
            color1: "White",
            color2: "White",
            color3: "White",
            white: 0,
            red: 0,
            ansColor0: "grey",
            ansColor1: "grey",
            ansColor2: "grey",
            ansColor3: "grey",

        })
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
    performGetUserIDRequest(ans){
        return axios.get("/ans/"+this.props.url.lobID+"?guess="+ans+"&name="+this.props.url.name+"&timeElapsed="+this.props.time);
    }
    check(e){
        e.preventDefault();
        var ans = this.state.color0[0]+this.state.color1[0]+this.state.color2[0]+this.state.color3[0]
        if(ans.indexOf("W")!== -1){
            alert("GUESS INCOMPLETE! DON'T CHEAT!")
        }
        else{
            this.setState({checkCount: this.state.checkCount+1})
            var js = this.performGetUserIDRequest(ans);
            js.then((response) => {
                this.setState({white: response.data.white, red: response.data.red, checkCount: response.data.checkCount})
            }).then(() => {
                //change ans node
                var red = this.state.red
                var white = this.state.white
                if (red === "4"){
                    this.setState({ansColor0: "Red"});
                    this.setState({ansColor1: "Red"});
                    this.setState({ansColor2: "Red"});
                    this.setState({ansColor3: "Red"});
                    axios.post("/updateWinner/"+this.props.url.lobID+"/"+this.props.url.name+"/"+this.props.time)
                    this.props.history.push("/congrats/"+this.props.url.lobID+"/"+this.props.url.name);

                }
                else if( red === "3"){
                    this.setState({ansColor0: "Red"});
                    this.setState({ansColor1: "Red"});
                    this.setState({ansColor2: "Red"});

                }
                else if( red === "2"){
                    this.setState({ansColor0: "Red"});
                    this.setState({ansColor1: "Red"});


                }
                else if( red === "1"){
                   this.setState({ansColor0: "Red"});
                }

                if (white === "1"){
                    this.setState({ansColor3: "White"})
                }

                else if (white === "2"){
                    this.setState({ansColor2: "White"})
                    this.setState({ansColor3: "White"})
                }

                else if (white === "3"){
                    this.setState({ansColor1: "White"})
                    this.setState({ansColor2: "White"})
                    this.setState({ansColor3: "White"})
                }
                else if (white === "4"){
                    this.setState({ansColor0: "White"})
                    this.setState({ansColor1: "White"})
                    this.setState({ansColor2: "White"})
                    this.setState({ansColor3: "White"})
                }
                this.createPastGuess();
                this.clear();
            })
            .catch(function (error){
                console.log(error);
            });
        }
    }

    generatePastGuess(){
        const ansColor0 = this.state.ansColor0
        const ansColor1 = this.state.ansColor1
        const ansColor2 = this.state.ansColor2
        const ansColor3 = this.state.ansColor3
        const color0 = this.state.color0
        const color1 = this.state.color1
        const color2 = this.state.color2
        const color3 = this.state.color3
        return(
            <div>
                <div className="Button-Input">
                    <div className="buttonIn">
                     <div className="fourth-face">
                       <div className="column">
                         <span style={{backgroundColor: ansColor0}} className="pip"></span>
                         <span style={{backgroundColor: ansColor1}} className="pip"></span>
                       </div>
                       <div className="column">
                         <span style={{backgroundColor: ansColor2}} className="pip"></span>
                         <span style={{backgroundColor: ansColor3}} className="pip"></span>
                       </div>
                     </div>
                     <div>
                     <button type="button" id="1" className="WhiteNoHover" style={{backgroundColor: color0}}> </button>
                     <button type="button" id="2" className="WhiteNoHover" style={{backgroundColor: color1}}> </button>
                     <button type="button" id="3" className="WhiteNoHover" style={{backgroundColor: color2}}> </button>
                     <button type="button" id="4" className="WhiteNoHover" style={{backgroundColor: color3}}> </button>
                     <button className="button button6">#{this.state.checkCount}</button>
                     </div>

                    </div>
                </div>
            </div>
        )
    }
    createPastGuess() {
      var item = this.state.itemArray;
      const html = this.generatePastGuess();
      item = [{html}].concat(item)
      this.setState({itemArray: item})
    }

    render(){

        return (
        <div style={{height:"25%"}}>
            <div className="Button-Panel">
                <div className="Game2">
                    <p> </p>
                    <button type="button" className="Red" onClick={()=>this.changeColor("red")}> </button>
                    <p> </p>
                    <button type="button" className="Orange" onClick={()=>this.changeColor("orange")}> </button>
                    <p> </p>
                    <button type="button" className="Yellow" onClick={()=>this.changeColor("yellow")}> </button>
                    <p> </p>
                    <button type="button" className="Green" onClick={()=>this.changeColor("green")}> </button>
                    <p> </p>
                    <button type="button" className="Blue" onClick={()=>this.changeColor("blue")}> </button>
                    <p> </p>
                    <button type="button" className="Purple" onClick={()=>this.changeColor("purple")}> </button>
                </div>
            </div>
            <div>
                <div className="Button-Input">
                    <div className="buttonIn">
                        <div className="fourth-face">
                            <div className="column">
                                <span style={{backgroundColor: this.state.ansColor0}} className="pip"></span>
                                <span style={{backgroundColor: this.state.ansColor1}} className="pip"></span>
                            </div>
                            <div className="column">
                                <span style={{backgroundColor: this.state.ansColor2}} className="pip"></span>
                                <span style={{backgroundColor: this.state.ansColor3}} className="pip"></span>
                            </div>
                        </div>
                        <div>
                            <button type="button" id="1" className="White" style={{backgroundColor: this.state.color0}} onClick={this.zero.bind(this)}> </button>
                            <button type="button" id="2" className="White" style={{backgroundColor: this.state.color1}} onClick={this.one.bind(this)}> </button>
                            <button type="button" id="3" className="White" style={{backgroundColor: this.state.color2}} onClick={this.two.bind(this)}> </button>
                            <button type="button" id="4" className="White" style={{backgroundColor: this.state.color3}} onClick={this.three.bind(this)}> </button>
                            <button className="button button5" onClick={(e)=>this.check(e)}>Check</button>
                        </div>

                    </div>

                </div>
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
                    <div>

                    </div>
            </div>
        </div>
        )

    }
}





export default Game;


// send to james by post request telling input colour
// using json to pass parem




















