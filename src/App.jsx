import { useEffect, useState } from 'react'
import './App.scss'
import dividerMobile from './assets/pattern-divider-mobile.svg';
import dividerDesktop from './assets/pattern-divider-desktop.svg';
import iconDice from './assets/icon-dice.svg';
import Spinner from './components/Spinner/Spinner';

function App() {
  const [advice, setAdvice] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAdvice() {
      let response = await fetch('https://api.adviceslip.com/advice');
      response = await response.json();
      setAdvice(response.slip);
      setIsLoading(false);
    }
    fetchAdvice();
  }, [isLoading]);

  return (
    <>
      {
        isLoading
          ? <><Spinner /></>
          : <>
            <h1>ADVICE # {advice.id}</h1>
            <p>&ldquo;{advice.advice}&rdquo;</p>
            <picture>
              <source srcSet={dividerDesktop} media='(min-width: 768px)' />
              <img src={dividerMobile} alt='divider' />
            </picture>
          </>
      }
      <button onClick={() => setIsLoading(true)}>
        <img src={iconDice} alt='new advice' />
      </button>
    </>
  )
}

export default App
