import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';

import classes from './ConverterCurrency.module.css';



const ConverterCurrency = (props) => {

  const data = useSelector(state => state.data);
  const RUB =  {
    CharCode: "RUB", 
    Name: "Российский Рубль" ,
    Value: 1,
    ID: "RUB" + Math.round(Math.random() * 10000)
  };

  const searhElemByData = (isSearch) => {
    return  currencyList.find(el => el.CharCode === isSearch);
  }


  const [currencyList, setCurrencyList] = useState([]);
  const [dataLeft, setDataLeft] = useState(1);
  const [dataRight, setDataRight] = useState(1);
  const [dataInput, setDataInput] = useState(1);

  const [titleLeft, setTitleLeft] = useState('');
  const [titleRight, setTitleRight] = useState('');


  useEffect(() => {
    if (data) {
      setCurrencyList(() => {
        return [...Object.values(data?.Valute), RUB ];
      }); 

      const startEl = [...Object.values(data?.Valute)][0];
      setDataLeft(() => startEl);
      setTitleLeft(startEl.Name);

      setDataRight(() => RUB);
      setTitleRight(RUB.Name);

    
    }
  }, [data]);

  const selectCurrHandler = (event, target) => {
    const data = searhElemByData(event.target.value);

    if (target === 'left') {
      setTitleLeft(data.Name);
      setDataLeft(data);
    }    
    if (target === 'right') {
      setTitleRight(data.Name);
      setDataRight(data);
    }      
  }

  const inputChangeHandler = (event) => {
    setDataInput( +event.target.value);
  }

 

  return (
    <div className={classes.ConverterCurrency}>
      <div className={classes.BlockSingleValute}>

        <p>{titleLeft}</p>
          <div className={classes.interactiveConvertVlock}>
            <select 
              onChange={(event) => selectCurrHandler(event, 'left')}
              className={classes.Select}>
              {currencyList.map(currency => (
                <option 
                  key={currency.ID}
                  value={currency.CharCode}>
                    {currency.CharCode}
                  </option>
              ))}
            </select>
            <input 
              type="number"
              placeholder={1}
              defaultValue={1}
              onChange={inputChangeHandler}
              className={classes.Input}
            />
          </div>

      </div>

      <div className={classes.BlockSingleValute}>
        <p>{titleRight}</p>
        <div className={classes.interactiveConvertVlock}>
          <select 
            value={dataRight.CharCode}
            onChange={(event) => selectCurrHandler(event, 'right')}
            className={classes.Select}>
            {currencyList.map(currency => (
                <option          
                  key={currency.ID}
                  value={currency.CharCode}>
                    {currency.CharCode}
                </option>
            ))}
          </select>
          <p> {(dataLeft.Value * dataInput / dataRight.Value).toFixed(4)} </p> 
        </div>
      </div>
      
    </div>
  )
}

export default ConverterCurrency;
