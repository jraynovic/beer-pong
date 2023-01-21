import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main'
import {Container} from 'reactstrap'
function App() {
  return (
    <BrowserRouter>
    <div className='app'>
       <Main/>
    </div>
             
    </BrowserRouter>
    
  );
}

export default App;
