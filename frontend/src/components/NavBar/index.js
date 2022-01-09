import React from 'react';
import { Link } from 'react-router-dom';
//Styles
import './NavBar.css';

const NavBar = () => {
  // const { email } = JSON.parse(localStorage.getItem('user_info'));
  return (
    <div className="container">
      <div to="/" className="brand">
        Logo
      </div>
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem('user_info');
                document.cookie =
                  document.cookie + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
                console.log(document.cookie);
                window.location.reload();
              }}
              className="logout"
            >
              {(localStorage.hasOwnProperty('user_info') || document.cookie) &&
                'LOGOUT'}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
