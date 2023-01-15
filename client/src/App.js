import logo from './logo.svg';
import './App.css';
import GameBoard from './components/GameBoard';
import { BrowserRouter } from 'react-router-dom';
import  GameSetupComponent from './components/GameSetupComponent'
import HomeComponent from './components/HomeComponent';
import Main from './components/Main'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <GameSetupComponent/> */}
        <Main/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
