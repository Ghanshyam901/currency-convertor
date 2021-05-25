// import logo from './logo.svg';
import React, {useEffect, useState}from 'react';
import './App.css';
import CurrencyConvertor from './CurrencyConvertor';
// import { useEffect } from 'react';

const Base_url ='http://api.exchangeratesapi.io/v1/latest?access_key=f25f2f36cbbc90564380e86ba7eb0987'



function App() {

  const[currencyOptions,setCurrencyOptions]= useState([])

  const [fromCurrency,setfromcurrency] = useState()
  const [toCurrency,setTocurrency] = useState()
  const [exchangeRate,SetExchangeRate] = useState();
  const [amount,setAmount] = useState(1);
  const [amountInfromCurrency,setAmountInFromCurrency] = useState(true) 
// console.log(exchangeRate);

let toAmount,fromAmount ;
if(amountInfromCurrency){
  fromAmount = amount
  toAmount = amount*exchangeRate
  
}else{
  toAmount = amount
  fromAmount =amount/exchangeRate
}


useEffect(() =>{
fetch(Base_url)
.then(res =>res.json())
.then(data =>{
  const firstCurrency = Object.keys(data.rates)[0];
  setCurrencyOptions([data.base, ...Object.keys(data.rates)])
  setfromcurrency(data.base)
  setTocurrency(firstCurrency)
  SetExchangeRate(data.rates[firstCurrency])
  

})},[])

useEffect(()=>{
  if(fromCurrency !=null && toCurrency !=null){
    fetch(`${Base_url}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => SetExchangeRate(data.rates[toCurrency]))
  }
},[fromCurrency,toCurrency])

function handlefromChnageAmount(e){
  setAmount(e.target.value)
  setAmountInFromCurrency(true)
}
function handletoChnageAmount(e){
  setAmount(e.target.value)
  setAmountInFromCurrency(false)
}


  return (
   <div>

      <h1>CURRENCY CONVERTOR</h1>
        <CurrencyConvertor 
        currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={e => setfromcurrency(e.target.value)}
          onchangeAmount={handlefromChnageAmount}
          amount={fromAmount}
        />
        <div className="equals">=</div>
        <CurrencyConvertor
         currencyOptions={currencyOptions}
         selectedCurrency={toCurrency}
         onChangeCurrency={e => setTocurrency(e.target.value)}
         onchangeAmount={handletoChnageAmount}
         amount={toAmount}
         />

    </div>
  )
}

export default App;
