import React  , {useState , useEffect}from "react";
import Header from "./compo/header";
import Figure from "./compo/figure";
import WrongLetters from "./compo/WrongLetters";
import Word from "./compo/word";
import Notifiction from "./compo/notifiction";
import {showNotification as show } from "./helpers/helpers"
import Popup from "./compo/popup";
import './App.css'
const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
function App() {
  const [playable, setPlayable ]= useState(true);
  const [correctLetters , setcorrectletters]= useState([]);
  const [wrongLetters , setwrongLetters]= useState([]);
  const [showNotification , setShowNotification ]= useState(false);
  useEffect(()=>{
    const handlerKeydown = event =>{
      const {key , keyCode } = event ;
      if ( playable&&keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setcorrectletters(currentletters => [...currentletters , letter])
          } else {
           show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setwrongLetters(wrongLetters => [...wrongLetters , letter])
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handlerKeydown);

    return() => window.removeEventListener('keydown', handlerKeydown);
  } , [correctLetters , wrongLetters ,playable , selectedWord]);
  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setcorrectletters([]);
    setwrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }
  
  return (
    <>
      < Header />
      <div className="game-container">
      < Figure wrongLetters={ wrongLetters} />
      < WrongLetters wrongLetters={ wrongLetters} />
      < Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>

      <Popup correctLetters = {correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord}
      setPlayable ={setPlayable}  playAgain ={playAgain}/>
      <Notifiction showNotification={showNotification}/>
    </>
  );
}

export default App;
