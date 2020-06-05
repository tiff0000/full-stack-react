import React from 'react';
import styles from './Modal.css';
import Aux from '../../utils/auxiliary';
import Backdrop from '../backdrop/Backdrop';

const modal = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.close}/>
    <div className={styles.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1':'0'
      }}>
      {props.children}
    </div>
  </Aux>
);

export default modal;
