import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Layout from './Layout';

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
