import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isVisibleAC } from '../../Redux/actions';
import classes from './CurrencyBlock.module.css'
import DinamicCurrency from './DinamicCurrency/DinamicCurrency';

const CurrencyBlock = (props) => {

  const data = useSelector(state => state.data);
  const isVisible = useSelector(state => state.isVisible); 
  // console.log('isVisible', isVisible);

  const [currencyList, setCurrencyList] = useState([]);
  const [isSelect, setIsSelect] = useState('');
  const [searchValute, setSearchValute] = useState([]);
  // const [visible, setVisible] = useState(isVisible);

 const dispatch = useDispatch()

  const inputRef = useRef(null)

  const cls = [
    classes.BlockResultSearch,
    isVisible ? classes.isOpen : null
  ]

  console.log(cls);


  useEffect(() => {
    if (data) {
      setCurrencyList(Object.values(data?.Valute));
      setIsSelect(Object.values(data?.Valute)[0]);
    }
    }, [data])

  const selectCurrHandler = (e) => {
    const [select] = currencyList.filter(currency => (
      currency.CharCode === e.target.value ? currency.Name : null
    )) 
    setIsSelect(select);
  }
  const inputChangeHandler = (event) => {
    const res = currencyList.filter(obj => 
        Object.values(obj)
        .some(val => String(val)
        .includes(event.target.value)));
        
    setSearchValute(res);
    dispatch(isVisibleAC(true));
    inputRef.current.value = event.target.value;
  }

  const valuteChangeHandler = (valute) => {
    
    setIsSelect(valute)
    dispatch(isVisibleAC(false));
    inputRef.current.placeholder = valute.Name;
    inputRef.current.value = '';
  }


  return (
    <div 
      className={classes.SelectList}>  
      <div className={classes.TitleCurrency}>
        <div className={classes.searchWrapper}>
          <input type="text" 
            ref={inputRef}
            onChange={inputChangeHandler}
            className={classes.Input}
            placeholder={isSelect.Name}
          />
          {searchValute.length > 0 
            ? <div className={cls.join(' ')}>
              {searchValute.map(res => 
                <div 
                  onClick={() => valuteChangeHandler(res)}
                  className={classes.ItemSearchList} 
                  key={res.ID}> 
                  {res.Name} 
                </div>)}
            </div>
            : null
          }
        </div>
      </div> 


      <div className={classes.InterActiveModule}>  

        <select 
          value={isSelect.CharCode}
          onChange={selectCurrHandler}
          className={classes.Select}>
          {currencyList.map(currency => (
            <option          
              key={currency.ID}
              value={currency.CharCode}>{currency.CharCode}
            </option>
          ))}
        </select>

        <div className={classes.DescriptionBlock}>
            <span>1 {isSelect.CharCode} </span> 
            <span className="material-icons"> cached</span>         
            <span>{isSelect.Value} Руб.</span>
        </div> 

        <DinamicCurrency 
          value={isSelect.Value}
          previous={isSelect.Previous}
        />

      </div> 

    </div>
  )
}

export default CurrencyBlock
