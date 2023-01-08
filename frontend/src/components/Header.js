import React from "react";
import logo from "../images/logo.svg";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {Link, Route, Switch} from "react-router-dom";

function Header(props) {
  const location = useLocation();
  const linkClassName = (`link header__link ${props.email ? '' : 'header__link_type_hidden'}`)

  function handleLinkClick() {
    if (location.pathname === '/') {
        props.onSignOut();
    }
  }

 return (
   <header className="header">
     <img className="header__icon-logo" src={logo} alt="логотип сайта Место" />
       <Switch>
           <Route exact path='/'>
               <div className='header__link-container'>
                   <p className={linkClassName}>{props.email}</p>
                   <Link to="/sign-in" className="link header__link" onClick={handleLinkClick}>Выход</Link>
               </div>
           </Route>
           <Route path='/sign-up'>
               <div className='header__link-container'>
                   <p className={linkClassName}>{props.email}</p>
                   <Link to="/sign-in" className="link header__link" onClick={handleLinkClick}>Вход</Link>
               </div>
           </Route>
           <Route path='/sign-in'>
               <div className='header__link-container'>
                   <p className={linkClassName}>{props.email}</p>
                   <Link to="/sign-up" className="link header__link" onClick={handleLinkClick}>Регистрация</Link>
               </div>
           </Route>
       </Switch>
   </header>
 );
}

export default Header;