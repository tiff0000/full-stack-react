import React from 'react';
import styles from './Nav.css';
import { NavLink } from 'react-router-dom';

const Nav = (props) => (

      <nav className={styles.Navbar}>

        <ul className={styles.NavItems}>
        <h5 style = {{"font" : "italic bold 24px arial, sans-serif", "color" : "white"}}> FAST TICKET SYSTEM </h5>
            {(props.token) ? <li className={styles.NavItem} style = {{"paddingLeft" : "105px"}}>
                              <NavLink to='/issues' activeClassName="active">Issues</NavLink>
                              </li> : null }
            {(props.token) ? <li className={styles.NavItem} style = {{"paddingLeft" : "85px"}}>
                              <NavLink to='/tickets' activeClassName="active">Tickets</NavLink>
                              </li> : null }
            {(props.token) ? <li className={styles.NavItem} style = {{"paddingLeft" : "85px"}}>
                              <NavLink to='/offers' activeClassName="active">All Offers</NavLink>
                              </li> : null }
        </ul>
        {props.children}
      </nav>

);

export default Nav;
