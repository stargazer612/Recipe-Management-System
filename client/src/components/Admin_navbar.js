import React, { useState, useEffect } from 'react';
import { Link,Switch,Route} from 'react-router-dom';
import Cuisine from './Cuisine';
import Display from './Display';
import Recipe from './Recipe';
import './User_navbar.css';
import View from "./View";
import View_rdetails from './View_rdetails';
import View_user from './View_user';
import Update_rec from './Update_rec';

const Navbar=(props)=> {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const logout=()=>{
    localStorage.removeItem("token");
    props.history.replace('/')
    closeMobileMenu();
  }
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/Admin_navbar' className='navbar-logo' onClick={closeMobileMenu}>
            Recipe Management System
            {/* <i class='fab fa-typo3' /> */}
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/Admin_navbar/View_User' className='nav-links' onClick={closeMobileMenu}>
                User Details
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Admin_navbar/View_rdetails'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Recipe Details
             </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/'
                className='nav-links'
                onClick={logout}
              >
                Logout
             </Link>
             </li>
          </ul>
          </div>
          </nav>
          <Switch>
          <Route exact path="/Admin_navbar" component={View}/>
          <Route exact path="/Admin_navbar/View_rdetails" component={View_rdetails}/>
          <Route exact path="/Admin_navbar/View_rdetails/Update_rec" component={Update_rec}/>
          <Route exact path="/Admin_navbar/View_User" component={View_user}/>
          <Route exact path="/Admin_navbar/cuisine/Recipe" component={Recipe}/>
          <Route exact path="/Admin_navbar/cuisine/Recipe/Display" component={Display}/>
          <Route exact path="/Admin_navbar/cuisine" component={Cuisine}/>
          </Switch>
        
      
    </>
  );
}

export default Navbar;