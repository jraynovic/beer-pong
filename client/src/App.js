import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main'
import {Container} from 'reactstrap'
import { ContextProvider } from './Context';
function App() {
  return (
    <BrowserRouter>
    <ContextProvider>
    <div className='app'>
       <Main/>
    </div>
    </ContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
