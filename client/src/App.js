import logo from './logo.svg';
import './App.css';
import GameBoard from './components/GameBoard';
import { BrowserRouter } from 'react-router-dom';
import  MainComponent from './components/MainComponent'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainComponent/>
        {/* <GameBoard/> */}
      </div>
    </BrowserRouter>
    
  );
}

export default App;
