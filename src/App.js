import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ConverterCurrency from './components/ConverterCurrency/ConverterCurrency';
import CurrencyBlock from './components/CurrencyBlock/CurrencyBlock';
import Layout from './components/HOC/Layout/Layout';
import { getDataCurrency, isVisibleAC } from './Redux/actions';


function App() {
  const dispatch = useDispatch();

  
  
  useEffect(() => {
    dispatch(getDataCurrency())
    // dispatch(isVisibleAC(false)); 
  },[dispatch])

  const data = useSelector(state => state.data); 

  const isVisibleHandler = () => dispatch(isVisibleAC(false));


  return (
    <div 
      className="wrapperApp"
      onClick={isVisibleHandler}>
      <Layout>
        <CurrencyBlock />
        <ConverterCurrency />
      </Layout>
    </div>
  );
}

export default App;
