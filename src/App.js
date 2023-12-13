import React, {useEffect, useState} from 'react';
import './App.scss';
import colorArray from './ColorArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"


const quotesDBUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function App() {
  const [quote,setQuote] = useState('i dont love you like i did yesterday')
  const [author,setAuthor]= useState('mcr')
  const [random,setRandom] =useState(0)
  const [quotesArray,setQuotesArray] =useState(null)
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url)=>{
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }
  useEffect(() => {
    fetchQuotes(quotesDBUrl)
  }, [quotesDBUrl])
  
    
  const generateRandom = ()=>{
    let randomNumber =Math.floor(quotesArray.length*Math.random())
    setRandom(randomNumber)
    setAccentColor(colorArray[randomNumber])
    setQuote(quotesArray[randomNumber].quote)
    setAuthor(quotesArray[randomNumber].author)
  }
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor:accentColor,color:accentColor}}>
        <div id="quote-box">
        <p id="text" style={{color:accentColor}}><FontAwesomeIcon icon={faQuoteLeft} />
          {quote}" 
        </p>
        <p id="author" style={{color:accentColor}}>-{author}</p>
        <div className='button'>
          <a id="tweet-quote" style={{backgroundColor:accentColor}} href=
          {encodeURI(`https://twitter.com/intent/tweet?text=${quote} -${author}`)}>
          <FontAwesomeIcon icon={faTwitter}/></a>
          <button id="new-quote" onClick={generateRandom} style={{backgroundColor:accentColor}}>Generate a Random Quote</button>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
