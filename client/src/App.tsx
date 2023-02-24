import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from './Layout';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/*' element={<Layout/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
