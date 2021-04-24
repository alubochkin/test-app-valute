import React from 'react';
import classes from './DinamicCurrency.module.css'

const DinamicCurrency = (props) => {
  const cls = +props.value > +props.previous
    ? [classes.DinamicCurrency, classes.Up]
    : [classes.DinamicCurrency, classes.Down]

  return (
    <div className={cls.join(' ')}>
      {+props.value > +props.previous
        ? <span className="material-icons"> call_made</span> 
        : <span className="material-icons"> call_received</span>
      }   
      {(+props.value - +props.previous).toFixed(4)}    
    </div>
  )
}

export default DinamicCurrency;

// value
// previous
// dynamicsCurrency