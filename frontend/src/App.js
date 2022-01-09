import React from 'react';
import { Routes, Route } from 'react-router-dom';
//Styles
import './App.css';
//Components
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import HelloUser from './components/HelloUser';

function App() {
  let email = null;
  if (document.cookie) {
    email = JSON.parse(document.cookie.split('=')[1]).email;
    console.log(email);
  } else if (localStorage.hasOwnProperty('user_info')) {
    email = JSON.parse(localStorage.getItem('user_info')).email;
  }
  return (
    <div className="App">
      <NavBar />
      {(email && <HelloUser />) || (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}
    </div>
  );
}
export default App;
