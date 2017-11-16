import React, { Component } from 'react';
import './App.css';
import ReactDom from 'react-dom';


//import login from './login.js'


class Game extends React.Component {


    render(){
        return (

         <div className="Game">
            <h1>Welcome to Game Page,</h1>

           <div>
             <p>Lobby ID:</p>
             <textarea readonly id="code-content" className="lobby-code" ></textarea>
           </div>

         </div>


        )
    }
}



export default Game;


// send to james by post request telling input colour
// using json to pass parem