import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main'
import {Container} from 'reactstrap'
function App() {
  return (
    <BrowserRouter>
       <Main/>       
    </BrowserRouter>
    
  );
}

export default App;
