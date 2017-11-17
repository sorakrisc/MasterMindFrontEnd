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
            <h1>Welcome to Master Mind Game, (name)</h1>

           <div className="Button-Panel">

             <Button />
           </div>

           <div className="Button-Input">
             <ButtonInput />
           </div>
         </div>
        )
    }
}

class Button extends React.Component{
    render(){
        return (

        <div className="Game2">
         <p> </p>
         <button type="button" className="Red" > </button>
         <p> </p>
         <button type="button" className="Orange"> </button>
         <p> </p>
         <button type="button" className="Yellow"> </button>
         <p> </p>
         <button type="button" className="Green"> </button>
         <p> </p>
         <button type="button" className="Blue"> </button>
         <p> </p>
         <button type="button" className="Purple"> </button>
        </div>

        )

    }
}


class ButtonInput extends React.Component{
    render(){
        return (

        <div className="buttonIn">

         <button type="button" className="White" > </button>
         <button type="button" className="White"> </button>
         <button type="button" className="White"> </button>
         <button type="button" className="White"> </button>
         <button type="button" className="White"> </button>


        </div>

        )

    }
}



export default Game;


// send to james by post request telling input colour
// using json to pass parem




















